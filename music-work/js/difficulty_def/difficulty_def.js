/*
譜面の難易度を判定する
*/
// 音符の長さと難易度のデータ
const NOTES_DATA = [
	{ Dc: 1, L: 4 },
	{ Dc: 2, L: 2 },
	{ Dc: 4, L: 1 },
	{ Dc: 8, L: 0.5 }
];
// 楽譜のデータ
const TEST_DATA = [1, 0.5, 0.5, 1, 2]; // それぞれの音符のL

// もっともよく使われている音符の平均難易度を求める
function calc_Dp(_data) {
	const countsList = appearanceCounter(_data);
	// countsList.map(function (c) { return c.count; }) でcountsListからcountの列だけ取り出した配列ができる
	const maxCount = Math.max.apply(null, countsList.map(function (c) { return c.count; }));
	let denominator = 0; // 分母
	for (let i = 0; i < countsList.length; i++) {
		if (countsList[i].count == maxCount) {
			denominator += countsList[i].Dc;
		}
	}
	return denominator / _data.length;
}

// 音符の難易度と出現回数のjsonを返す
function appearanceCounter(_data) {
	counts = [];
	for (let i = 0; i < NOTES_DATA.length; i++) {
		counts.push({ Dc: NOTES_DATA[i].Dc, count: 0 });
	}
	for (let j = 0; j < counts.length; j++) {
		for (let i = 0; i < _data.length; i++) {
			let currentDc = L_to_Dc(_data[i]);
			if (counts[j].Dc == currentDc) {
				counts[j].count = (counts[j].count) ? counts[j].count + 1 : 1;
			}
		}
	}
	return counts;
}

// 音符の長さから難易度を返す
function L_to_Dc(l) {
	let dc = 0;
	for (let i = 0; i < NOTES_DATA.length; i++) {
		if (NOTES_DATA[i].L == l) {
			dc = NOTES_DATA[i].Dc;
		}
	}
	return dc;
}

// もっともよく使われている音符の平均難易度
const Dp = calc_Dp(TEST_DATA);
console.log("一番多く使われている音符の平均難易度は" + Dp);
