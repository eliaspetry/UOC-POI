// Conectaremos el Poi Manager al reducer que guarda los Pois
import { pois } from '../store/pois';
import { getPoiHash } from './hashing';
import Poi from './poi';
import Review from './review';
import PoiValidator from './poi-validator';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import type { IGetCompareValue } from '@datastructures-js/priority-queue';
import { mappedDistances } from '../store/distances';

/**
 * @class PoiManager
 * @classdesc Exposes the main methods to manage Pois
 */
class PoiManager {
	poiValidator: PoiValidator;

	/**
	 * @public
	 * @constructor
	 * @description Creates a new PoiManager instance and sets a poiValidator instance on it
	 */
	constructor() {
		this.poiValidator = new PoiValidator();
	}

	/**
	 * @protected
	 * @description Parses and validates an array of raw Poi objects and their nested reviews
	 * @param {any[]} pois The raw array of Poi objects to be parsed and validated
	 * @returns {Poi[]} An array of validated Pois
	 * @throws {Error} If the array of Pois is invalid
	 */
	protected parsePois(pois: any[]): Poi[] {
		if (!this.poiValidator.areValidPois(pois)) throw new Error('Invalid Pois');
		return pois.map(({ _lon, _lat, _description, _reviews }) => new Poi(_lon, _lat, _description, this.parseReviews(_reviews)));
	}

	/**
	 * @protected
	 * @description Parses and validates an array of raw reviews
	 * @param {any[]} reviews The raw array of reviews
	 * @returns {Review[]} An array of validated reviews
	 * @throws {Error} If the array of reviews is invalid
	 */
	protected parseReviews(reviews: any[]): Review[] {
		if (!this.poiValidator.areValidReviews(reviews)) throw new Error('Invalid reviews');
		return reviews.map(({ _rating, _comment }) => new Review(_rating, _comment));
	}

	/**
	 *
	 * @protected
	 * @description Retrieves the distance between two Pois and stores in state under the mapped distances
	 * @param {Poi} origin The origin Poi
	 * @param {Poi} destination The destination Poi
	 * @returns {number} The distance between both Pois in km
	 */
	protected calculateDistance(origin: Poi, destination: Poi): number {
		const distance = origin.calculateKmDistance(destination.longitude, destination.latitude);
		mappedDistances.update((map) => {
			const [originHash, destinationHash] = [origin, destination].map((poi) => getPoiHash(poi));
			if (!map.has(originHash)) {
				const newMap = new Map<string, number>();
				map.set(originHash, newMap);
			}

			map.get(originHash)!.set(destinationHash, distance);
			return map;
		});

		return distance;
	}

	/**
	 * @public
	 * @description Parses and stores in state (optional) a raw JSON input string containing Pois
	 * @param {string} poiJson The raw JSON string containing the Pois and Reviews, to be parsed
	 * @param {boolean} save If true, saves the Pois in state
	 * @returns {boolean} True if the input string is valid, else false
	 */
	uploadPois(poiJson: string, save: boolean = false): boolean {
		// Procesamos la string para comprobar su validez
		try {
			const json = JSON.parse(poiJson),
				parsed = this.parsePois(json._pois);

			if (save) [...parsed].forEach((poi) => pois.update((map) => map.set(getPoiHash(poi), poi)));

			return true;
		} catch (e) {
			return false;
		}
	}

	/**
	 * @public
	 * @description Deletes a Poi from state
	 * @param {Poi} poi The Poi to be deleted
	 * @returns {void}
	 */
	deletePoi(poi: Poi) {
		const hash = poi.hash;

		pois.update((map) => {
			const updatedMap = new Map(map);
			updatedMap.delete(hash);
			return updatedMap;
		});
	}

	/**
	 * @public
	 * @description Deletes all Pois from state
	 * @returns {void}
	 */
	deleteAllPois() {
		pois.set(new Map());
	}

	/**
	 * @public
	 * @description Retrieves the nearest Pois to a given one and triggers a flow to map the obtained results in state
	 * @param {Poi} poi The origin Poi
	 * @returns {Poi[]} An array containing the nearest Pois, sorted by ascending distance
	 */
	getNearestPois(poi: Poi): Poi[] {
		let storedPois = new Map<string, Poi>();
		const unsubscribe = pois.subscribe((map) => {
				storedPois = map;
			}),
			getDistance: IGetCompareValue<Poi> = (current: Poi) => this.calculateDistance(poi, current),
			queue = new MinPriorityQueue<Poi>(getDistance);

		unsubscribe();

		storedPois.forEach((currentPoi, hash) => {
			// If the hash matches, we'll just ommit the entry since it's the same Poi object
			if (hash === getPoiHash(poi)) return;

			this.calculateDistance(currentPoi, poi);

			// We'll order them using a priority queue for better time complexity
			// To make life easier, we'll be simply resorting to https://www.npmjs.com/package/@datastructures-js/priority-queue
			queue.enqueue(currentPoi);
		});

		return queue.toArray();
	}
}

export default PoiManager;
