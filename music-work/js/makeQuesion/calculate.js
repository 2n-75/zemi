/* 計算系 */
export function sum(arr, fn) {
	if (fn) {
		return sum(arr.map(fn));
	} else {
		return arr.reduce(function (prev, current, i, arr) {
			return prev + current;
		});
	}
}

export function average(arr, fn) {
	return sum(arr, fn) / arr.length;
}