// Mocks for poi-manager.test.ts

const uploadInputString = `{
        "_pois": [
            {
                "_lon": -3.70379,
                "_lat": 40.416775,
                "_description": "Madrid",
                "_reviews": [
                    {
                        "_comment": "Interesante",
                        "_rating": 2
                    }
                ]
            },
            {
                "_lon": 2.173404,
                "_lat": 41.385063,
                "_description": "Barcelona",
                "_reviews": [
                    {
                        "_comment": "Awesome",
                        "_rating": 3
                    },
                    {
                        "_comment": "Regular",
                        "_rating": 1
                    }
                ]
            }
        ]
    }`,
	distanceChallenge = {
		input: `{
            "_pois": [
                {
                    "_lon": -3.70379,
                    "_lat": 40.416775,
                    "_description": "Madrid",
                    "_reviews": []
                },
                {
                    "_lon": 2.173404,
                    "_lat": 41.385063,
                    "_description": "Barcelona",
                    "_reviews": []
                },
                {
                    "_lon": -5.97317,
                    "_lat": 37.38283,
                    "_description": "Sevilla",
                    "_reviews": []
                },
                {
                    "_lon": -15.41343,
                    "_lat": 28.09973,
                    "_description": "Las Palmas de Gran Canaria",
                    "_reviews": []
                }
            ]
        }`,
		queries: [
			{
				origin: 'Madrid',
				expectedOrder: ['Sevilla', 'Barcelona', 'Las Palmas de Gran Canaria']
			},
			{
				origin: 'Barcelona',
				expectedOrder: ['Madrid', 'Sevilla', 'Las Palmas de Gran Canaria']
			},
			{
				origin: 'Sevilla',
				expectedOrder: ['Madrid', 'Barcelona', 'Las Palmas de Gran Canaria']
			},
			{
				origin: 'Las Palmas de Gran Canaria',
				expectedOrder: ['Sevilla', 'Madrid', 'Barcelona']
			}
		]
	};

export { uploadInputString, distanceChallenge };
