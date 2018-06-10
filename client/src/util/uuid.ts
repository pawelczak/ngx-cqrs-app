// tslint:disable:no-bitwise
function getRandomFromMathRandom() {
	let result = new Array(16);

	let r = 0;
	for (let i = 0; i < 16; i++) {
		if ((i & 0x03) === 0) {
			r = Math.random() * 0x100000000;
		}
		result[i] = r >>> ((i & 0x03) << 3) & 0xff;
	}

	return result as Array<number>;
}

function getRandomFunction() {
	// tslint:disable-next-line:no-string-literal
	let browserCrypto = window.crypto || (window['msCrypto'] as Crypto);
	if (browserCrypto && browserCrypto.getRandomValues) {
		// WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
		//
		// Moderately fast, high quality
		try {
			return function getRandomFromCryptoRandom() {
				let result = new Uint8Array(16);
				browserCrypto.getRandomValues(result);
				return result as any;
			};
		} catch (e) { /* fallback*/
		}
	}

	// Math.random()-based (RNG)
	//
	// If all else fails, use Math.random().  It's fast, but is of unspecified
	// quality.
	return getRandomFromMathRandom;
}

const getRandom = getRandomFunction();

class ByteHexMappings {
	byteToHex: string[] = [];
	hexToByte: { [hex: string]: number; } = {};

	constructor() {
		for (let i = 0; i < 256; i++) {
			this.byteToHex[i] = (i + 0x100).toString(16).substr(1);
			this.hexToByte[this.byteToHex[i]] = i;
		}
	}
}

const byteHexMappings = new ByteHexMappings();

export function getUuidV4() {
	const result = getRandom();

	// Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	result[6] = (result[6] & 0x0f) | 0x40;
	result[8] = (result[8] & 0x3f) | 0x80;

	return result;
}

export function uuidToString(buf: Array<number>, offset: number = 0) {
	let i = offset;
	let bth = byteHexMappings.byteToHex;
	return bth[buf[i++]] + bth[buf[i++]] +
		bth[buf[i++]] + bth[buf[i++]] + '-' +
		bth[buf[i++]] + bth[buf[i++]] + '-' +
		bth[buf[i++]] + bth[buf[i++]] + '-' +
		bth[buf[i++]] + bth[buf[i++]] + '-' +
		bth[buf[i++]] + bth[buf[i++]] +
		bth[buf[i++]] + bth[buf[i++]] +
		bth[buf[i++]] + bth[buf[i++]];
}

export function getUuidV4String(): string {
	return uuidToString(getUuidV4());
}
