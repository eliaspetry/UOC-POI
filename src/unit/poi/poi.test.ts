import Poi from '../../lib/poi/poi';
import Review from '../../lib/poi/review';
import { poi as mockPoi, distances as mockDistances } from '../mock/poi/poi';
import { getPoiHash } from '../../lib/poi/hashing';

describe('Tests for Poi class', () => {
	let poi: Poi, reviews: Review[];

	beforeEach(() => {
		const { longitude, latitude, description, reviews: _reviews } = mockPoi;
		reviews = _reviews.map(({ rating, comment }) => new Review(rating, comment));
		poi = new Poi(longitude, latitude, description, reviews);
	});

	it('should instantiate a new Poi correctly', () => {
		expect(poi.description).toBe(mockPoi.description);
		expect(poi.latitude).toBe(mockPoi.latitude);
		expect(poi.longitude).toBe(mockPoi.longitude);
		expect(poi.reviews).toBe(reviews);
		expect(poi.hash).toBe(getPoiHash(poi));
	});

	it('should calculate the average review score correctly if reviews exist', () => {
		const avg = reviews.map((review) => review.rating).reduce((acc: number, curr: number) => acc + curr, 0) / reviews.length;
		expect(poi.calculateAvgReviewScore()).toBe(avg);
	});

	it('should return zero as the average review score if no reviews exist', () => {
		poi.reviews = [];
		expect(poi.calculateAvgReviewScore()).toBe(0);
	});

	it('should add a review correctly', () => {
		const review = new Review(0),
			oldReviewLength = poi.reviews.length;

		poi.addReview(review);

		expect(poi.reviews).toHaveLength(oldReviewLength + 1);
	});

	it('should calculate distances correctly', () => {
		mockDistances.forEach(({ longitude, latitude, distance }) => expect(poi.calculateKmDistance(longitude, latitude)).toBe(distance));
	});
});
