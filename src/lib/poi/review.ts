/**
 * @class Review
 * @classdesc Class for a new user Review object
 */
class Review {
	comment: string;
	rating: number;
	creationDate: Date;

	/**
	 * @public
	 * @constructor
	 * @param {string?} comment (optional) The comment for the review. If undefined, a default one will be set based on the rating
	 * @param {number} rating The rating for the review
	 */
	constructor(rating: number, comment?: string) {
		this.rating = rating;
		this.comment = comment ? comment : this.generateReviewText();
		this.creationDate = new Date();
	}

	/**
	 * @public
	 * @description Generates a predefined placeholder review text based on the user rating
	 * @returns {string} The generated review text
	 */
	generateReviewText(): string {
		switch (this.rating) {
			case 3:
				return 'Awesome';
			case 2:
				return 'Interesante';
			case 0:
				return 'No merece la pena';
			default:
				return 'Normal';
		}
	}
}

export default Review;
