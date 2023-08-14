import { writable } from 'svelte/store';
import type Poi from '../poi/poi';

const selectedPoi = writable<Poi | undefined>();

export { selectedPoi };
