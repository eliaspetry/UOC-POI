// Validation meta used by PoiValidator class

const poi = {
		_lon: 'number',
		_lat: 'number',
		_description: 'string',
		_reviews: 'object'
	},
	review = {
		_comment: 'string',
		_rating: 'number'
	},
	ranges = {
		poi: {
			latitude: {
				min: -90,
				max: 90
			},
			longitude: {
				min: -180,
				max: 180
			}
		},
		review: {
			rating: {
				min: 0,
				max: 3
			}
		}
	};

export { poi, review, ranges };
