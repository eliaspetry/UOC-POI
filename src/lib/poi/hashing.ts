import type Poi from './poi';
import SHA256 from 'crypto-js/sha256';

/**
 * @public
 * @description Generates a SHA256 hash for a Poi
 * @param {Poi} poi The Poi for which to retrieve the hash
 * @returns {string} The hash for the Poi
 */
function getPoiHash({ longitude, latitude, description }: Poi): string {
	// Encrypting in SHA256 allows us to generate keys with constant length to be used in our lookup Map
	return SHA256(`${description}${longitude}${latitude}`).toString();
}

export { getPoiHash };
