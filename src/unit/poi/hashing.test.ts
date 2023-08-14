import { getPoiHash } from '../../lib/poi/hashing';
import Poi from '../../lib/poi/poi';

describe('Tests for Poi hashing function', () => {
	let poi: Poi;

	beforeEach(() => {
		poi = new Poi(0, 0, 'test instance', []);
	});

	it('should return a SHA256 hash', () => {
		const hash = getPoiHash(poi);
		expect(typeof hash).toBe('string');
		expect(hash).toMatch(/^[0-9a-f]{64}$/);
	});

	it('should return the same hash for the same Poi', () => {
		expect(getPoiHash(poi)).toBe(getPoiHash(poi));
	});

	it('should return different hashes for different Pois', () => {
		const differentPoi = new Poi(0, 0, 'not same instance', []);
		expect(getPoiHash(poi)).not.toBe(getPoiHash(differentPoi));
	});
});
