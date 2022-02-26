export function toCurrency(num: bigint) {
	return BigInt(num).toLocaleString('en-In');
}
