import { poi as poiMeta, review as reviewMeta, ranges as validRanges } from './validation-meta';

/**
 * @class
 * @classdesc Exposes the main methods to validate Pois and Reviews
 */
class PoiValidator {
	/**
	 * @protected
	 * @description Validates the geo position (longitude and latitude) of a raw Poi object
	 * @param {{ _lon: number, _lat: number }} obj The Poi object to be validated
	 * @returns {boolean} True if the geo position is valid within the range constraints, else false
	 */
	protected isValidGeoPosition({ _lon, _lat }: any): boolean {
		const { longitude: lon, latitude: lat } = validRanges.poi;
		return _lon >= lon.min && _lon <= lon.max && _lat >= lat.min && _lat <= lat.max;
	}

	/**
	 * @protected
	 * @description Validates the review score of a raw Review object
	 * @param {{ _rating: number }} obj The Review object to be validated
	 * @returns {boolean} True if the review score is valid within the range constraints, else false
	 */
	protected isValidReviewScore({ _rating }: any): boolean {
		const { min, max } = validRanges.review.rating;
		return Number.isInteger(_rating) && _rating >= min && _rating <= max;
	}

	/**
	 * @protected
	 * @description Recursively validates the meta (keys and value types) of a raw object
	 * @param {object} obj The raw object to be validated
	 * @param {object} meta The meta object to validate it against
	 * @returns {boolean} True if the meta is valid, else false
	 */
	protected isValidMeta(obj: any, meta: object): boolean {
		const isObject = (obj: any) => typeof obj === 'object' && obj !== null && !Array.isArray(obj);

		// Verificamos que el argumento inicial es un objeto
		if (!isObject(obj)) return false;

		// Por cada clave del meta
		for (const key in meta) {
			// Verificamos que el objeto contiene la clave de meta
			if (!(key in obj)) return false;
			// Si la clave es un objeto, entramos recursivamente y verificamos el siguiente nivel
			// @ts-ignore
			if (isObject(meta[key])) return this.isValidMeta(obj[key], meta[key]);
			// Verificamos los tipos
			// @ts-ignore
			if (meta[key] !== typeof obj[key]) return false;
		}

		return true;
	}

	/**
	 * @public
	 * @description Validates the meta and geoposition for each raw Poi object in an array of Pois
	 * @param {object[]} pois The raw array of Pois
	 * @returns {boolean} True if every element in the array of Pois is valid, else false
	 */
	areValidPois(pois: any[]): boolean {
		return pois.every((poi) => this.isValidMeta(poi, poiMeta) && this.isValidGeoPosition(poi));
	}

	/**
	 * @public
	 * @description Validates the meta and review score for each raw Review
	 * @param {object[]} reviews The raw array of Reviews
	 * @returns {boolean} True if every element in the array of Reviews is valid, else false
	 */
	areValidReviews(reviews: any[]): boolean {
		return reviews.every((review) => this.isValidMeta(review, reviewMeta) && this.isValidReviewScore(review));
	}
}

export default PoiValidator;
