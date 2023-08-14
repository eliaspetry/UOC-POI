import PoiValidator from '../../lib/poi/poi-validator';
import { poiInput as mockPoiInput } from '../mock/poi/poi-validator';
import { cloneDeep } from 'lodash';

describe('Tests for PoiValidator class', () => {
	const poiValidator = new PoiValidator(),
		getMockPoiInput = () => cloneDeep(mockPoiInput);

	let mockInput: typeof mockPoiInput;

	beforeEach(() => {
		mockInput = getMockPoiInput();
	});

	it('should fail Poi validation if objects are missing keys from meta', () => {
		for (const key in mockInput[0]) {
			const copy = getMockPoiInput();
			// @ts-ignore
			delete copy[0][key];
			expect(poiValidator.areValidPois(copy)).toBe(false);
		}
	});

	it('should fail Poi validation if object have wrong key types when compared to meta', () => {
		for (const key in mockInput[0]) {
			const copy = getMockPoiInput();
			//@ts-ignore
			copy[0][key] = true;
			expect(poiValidator.areValidPois(copy)).toBe(false);
		}
	});

	it('should fail Poi validation if longitude or latitude are out of range', () => {
		mockInput[0]._lon = -181;
		expect(poiValidator.areValidPois(mockInput)).toBe(false);

		mockInput[0]._lon = 180.3;
		expect(poiValidator.areValidPois(mockInput)).toBe(false);

		mockInput = getMockPoiInput(); // Reset

		mockInput[0]._lat = -90.4;
		expect(poiValidator.areValidPois(mockInput)).toBe(false);

		mockInput[0]._lat = 91;
		expect(poiValidator.areValidPois(mockInput)).toBe(false);
	});

	it('should fail Review validation if objects are missing keys from meta', () => {
		for (const key in mockInput[0]._reviews[0]) {
			const copy = getMockPoiInput();
			// @ts-ignore
			delete copy[0]._reviews[0][key];
			expect(poiValidator.areValidReviews(copy[0]._reviews)).toBe(false);
		}
	});

	it('should fail Review validation if object have wrong key types when compared to meta', () => {
		for (const key in mockInput[0]._reviews[0]) {
			const copy = getMockPoiInput();
			//@ts-ignore
			copy[0]['_reviews'][0][key] = true;
			expect(poiValidator.areValidReviews(copy[0]._reviews)).toBe(false);
		}
	});

	it('should fail Review validation if rating is out of range', () => {
		mockInput[0]._reviews[0]._rating = 4;
		expect(poiValidator.areValidReviews(mockInput[0]._reviews)).toBe(false);

		mockInput[0]._reviews[0]._rating = -1;
		expect(poiValidator.areValidReviews(mockInput[0]._reviews)).toBe(false);
	});

	it('should pass Poi validation if all data is set', () => {
		expect(poiValidator.areValidPois(mockInput)).toBe(true);
	});

	it('should pass Review validation if all data is set', () => {
		expect(poiValidator.areValidReviews(mockInput[0]._reviews)).toBe(true);
	});

	it('should pass Poi and Review validation if all data is set but reviews array is empty', () => {
		mockInput[0]._reviews = [];
		expect(poiValidator.areValidPois(mockInput)).toBe(true);
		expect(poiValidator.areValidReviews(mockInput[0]._reviews)).toBe(true);
	});
});
