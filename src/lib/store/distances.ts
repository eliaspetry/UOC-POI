import { writable } from 'svelte/store';

const mappedDistances = writable<Map<string, Map<string, number>>>(new Map<string, Map<string, number>>());

export { mappedDistances };
