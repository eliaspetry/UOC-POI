// Mocks for poi.test.ts

const poi = {
		longitude: 2.173404,
		latitude: 41.385063,
		description: 'Barcelona',
		reviews: [
			{
				comment: 'Espectacular',
				rating: 3
			},
			{
				comment: 'Normal',
				rating: 1
			}
		]
	},
	distances = [
		{
			longitude: 2.173404,
			latitude: 41.385063,
			distance: 0
		},
		{
			longitude: -15.41343,
			latitude: 28.09973,
			distance: 2174.750516459227
		}
	];

export { poi, distances };
