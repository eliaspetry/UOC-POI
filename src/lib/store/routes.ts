import { readable } from 'svelte/store';

const routeMapping = [
		{
			name: 'Añadir Pois',
			path: '/'
		},
		{
			name: 'Ver Pois',
			path: '/view'
		},
		{
			name: 'Pois Cercanos',
			path: '/view/nearest/'
		},
		{
			name: 'Crear Review',
			path: '/reviews/add/'
		},
		{
			name: 'Ver Reviews',
			path: '/reviews/'
		},
		{
			name: 'Eliminar Pois',
			path: '/delete/'
		}
	],
	routes = readable<Map<string, string>>(new Map<string, string>(routeMapping.map(({ name, path }) => [path, name])));

export default routes;
