import Review from '../../lib/poi/review';
import { comments as expectedCommentMapping } from '../mock/poi/review';

describe('Tests for Review class', () => {
	it('should instantiate a new Review with its default comment if it has one', () => {
		const { comment } = new Review(0, 'test comment');
		expect(comment).toBe('test comment');
	});

	it('should instantiate a new Review with the right predefined comment if only a rating is set', () => {
		for (const [key, value] of Object.entries(expectedCommentMapping)) {
			const { comment } = new Review(Number(key), value);
			expect(comment).toBe(value);
		}
	});

	it('should instantiate a new Review with an automatically set timestamp', () => {
		const { creationDate } = new Review(0);
		expect(creationDate).toBeInstanceOf(Date);
	});
});
