import PoiManager from '../../lib/poi/poi-manager';
import PoiValidator from '../../lib/poi/poi-validator';
import { uploadInputString as mockUploadInput, distanceChallenge } from '../mock/poi/poi-manager';
import type Poi from '../../lib/poi/poi';
import { pois } from '../../lib/store/pois';
import { mappedDistances } from '../../lib/store/distances';

type PoisUpdateCallback = (map: Map<string, Poi>) => Map<string, Poi>;
type PoisSubscribeCallback = (map: Map<string, Poi>) => void;

// Mock state (these calls will be hoisted by jest before import execution)
jest.mock('../../lib/store/pois', () => {
	const poisStore = new Map<string, Poi>(); // We will mutate the same reference throughout

	return {
		pois: {
			update: (cb: PoisUpdateCallback) => {
				const newMap = cb(new Map([...poisStore]));
				poisStore.clear();
				newMap.forEach((poi) => poisStore.set(poi.hash, poi));
			},
			subscribe: (cb: PoisSubscribeCallback) => {
				cb(poisStore);
				return () => {};
			},
			set: (map: Map<string, Poi>) => {
				const newMap = map;
				poisStore.clear();
				newMap.forEach((poi) => poisStore.set(poi.hash, poi));
			}
		}
	};
});

// Similar pattern for the mapped distances
type DistanceUpdateCallback = (map: Map<string, Map<string, number>>) => Map<string, Map<string, number>>;
type DistanceSubscribeCallback = (map: Map<string, Map<string, number>>) => void;

jest.mock('../../lib/store/distances', () => {
	const mappedDistances = new Map<string, Map<string, number>>();

	return {
		mappedDistances: {
			update: (cb: DistanceUpdateCallback) => {
				const newMap = cb(new Map([...mappedDistances]));
				mappedDistances.clear();
				newMap.forEach((map, key) => mappedDistances.set(key, map));
			},
			subscribe: (cb: DistanceSubscribeCallback) => cb(mappedDistances)
		}
	};
});

describe('Tests for PoiManager class', () => {
	let poiManager: PoiManager;

	beforeEach(() => {
		poiManager = new PoiManager();
	});

	it('should initialize with a validator instance', () => {
		expect(poiManager.poiValidator).toBeDefined();
		expect(poiManager.poiValidator).toBeInstanceOf(PoiValidator);
	});

	it('should invoke the main validation functions from the validator class on upload', function () {
		const areValidPoisSpy = jest.spyOn(poiManager.poiValidator, 'areValidPois'),
			areValidReviewsSpy = jest.spyOn(poiManager.poiValidator, 'areValidReviews');

		poiManager.uploadPois(mockUploadInput, false);

		expect(areValidPoisSpy).toHaveBeenCalled();
		expect(areValidReviewsSpy).toHaveBeenCalled();
	});

	it('should not save the Pois in state if the flag is set to false on upload call', () => {
		pois.subscribe((map) => {
			poiManager.uploadPois(mockUploadInput, false);
			expect(map.size).toBe(0);
		});
	});

	it('should save the Pois in state if the flag is set to true on upload call', () => {
		pois.subscribe((map) => {
			poiManager.uploadPois(mockUploadInput, true);
			expect(map.size).toBe(2);
		});
	});

	it('should be able to delete a specific Poi', () => {
		pois.subscribe((map) => {
			poiManager.uploadPois(mockUploadInput, true);
			expect(map.size).toBe(2);

			const deleteHash = [...map.keys()][0];
			// @ts-ignore
			poiManager.deletePoi(map.get(deleteHash));
			expect(map.size).toBe(1);

			const remainingHash = [...map.keys()][0];
			expect(remainingHash).toBeDefined();
			expect(remainingHash).not.toEqual(deleteHash);
		});
	});

	it('should be able to delete all Pois', () => {
		pois.subscribe((map) => {
			poiManager.uploadPois(mockUploadInput, true);
			expect(map.size).toBe(2);
			poiManager.deleteAllPois();
			expect(map.size).toBe(0);
		});
	});

	it('should be able to get the nearest Pois excluding the queried one', () => {
		const { input, queries } = distanceChallenge;

		pois.subscribe((map) => {
			poiManager.uploadPois(input, true);
			expect(map.size).toBe(4);

			// For efficiency, we'll be getting rid of the matched ones after each iteration
			const storedPoisCopy = [...map.values()];

			queries.forEach((query) => {
				for (let i = 0; i < storedPoisCopy.length; i++) {
					const poi = storedPoisCopy[i];

					if (poi.description !== query.origin) continue;

					const nearest = poiManager.getNearestPois(poi);
					expect(nearest.length).toBe(3);
					expect(query.expectedOrder).toEqual(nearest.map((poi) => poi.description));

					storedPoisCopy.splice(i, 1);
					break;
				}
			});
		});
	});

	it('should map any already calculated distances in state for efficiency', () => {
		const { input } = distanceChallenge;

		pois.subscribe((map) => {
			poiManager.uploadPois(input, true);
			expect(map.size).toBe(4);

			mappedDistances.subscribe((distancesMap) => {
				map.forEach((originPoi) => {
					const nearestPois = poiManager.getNearestPois(originPoi);

					expect(distancesMap.has(originPoi.hash)).toBe(true);

					for (const destinationPoi of nearestPois) {
						expect(distancesMap.get(originPoi.hash)?.has(destinationPoi.hash)).toBe(true);

						const { longitude, latitude } = destinationPoi;
						expect(distancesMap.get(originPoi.hash)?.get(destinationPoi.hash)).toBe(originPoi.calculateKmDistance(longitude, latitude));
					}
				});
			});
		});
	});
});
