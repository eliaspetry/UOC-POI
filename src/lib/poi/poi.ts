import type Review from './review';
import { getPoiHash } from './hashing';

/**
 * @class
 * @classdesc Class for a new Poi object
 */
class Poi {
	longitude: number;
	latitude: number;
	description: string;
	reviews: Review[];
	hash: string;

	/**
	 * @public
	 * @constructor
	 * @param {number} longitude The longitude for the Poi
	 * @param {number} latitude The latitude for the Poi
	 * @param {string} description The description for the Poi
	 * @param {Review[]} reviews The reviews for the Poi
	 */
	constructor(longitude: number, latitude: number, description: string, reviews: Review[]) {
		this.longitude = longitude;
		this.latitude = latitude;
		this.description = description;
		this.reviews = reviews;
		this.hash = getPoiHash(this);
	}

	/**
	 * @public
	 * @description Calculates the km distance between this Poi and another, based on the given target coordinates
	 * @param {number} longitude The longitude of the target destination Poi
	 * @param {number} latitude The latitude of the target destination Poi
	 * @returns {number} The distance between the current instance and target destination Poi, in kilometers
	 */
	calculateKmDistance(longitude: number, latitude: number): number {
		const R = 6371e3, // meters
			lat1 = (this.latitude * Math.PI) / 180, // lat1, lat2 in radians
			lat2 = (latitude * Math.PI) / 180,
			deltaLat = ((latitude - this.latitude) * Math.PI) / 180,
			deltaLon = ((longitude - this.longitude) * Math.PI) / 180,
			a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2),
			c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
			d = R * c; // meters

		return d / 1000; // km
	}

	/**
	 * @public
	 * @description Calculates the average review score for this Poi
	 * @returns {number} The average review score
	 */
	calculateAvgReviewScore(): number {
		return this.reviews.length
			? Number(this.reviews.map((review) => review.rating).reduce((acc: number, curr: number) => acc + curr, 0) / this.reviews.length)
			: 0;
	}

	/**
	 * @public
	 * @description Adds a new review to this Poi, pushing it at the end of the Reviews array
	 * @param {Review} review The new review object to be appended
	 * @returns {void}
	 */
	addReview(review: Review): void {
		this.reviews.push(review);
	}
}

export default Poi;
