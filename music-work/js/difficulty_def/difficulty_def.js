/*
譜面の難易度を判定する
*/

import { average } from "./calculate";
import { NOTES_DATA, TEST_DATA } from './const';

/* 実行 */
function main(notesArray) {
	// もっともよく使われている音符の平均難易度と平均音価
	const { Dp, aveL } = calc_average(notesArray);
	console.log("一番多く使われている音符の平均難易度は" + Dp + " 平均音価は" + aveL);

	const { Amax, Smax } = calc_maxLimit(aveL, Dp, notesArray);
	console.log("Amax:" + Amax + " Smax:" + Smax);
}
main(TEST_DATA);

// もっともよく使われている音符の平均音価と平均難易度を求める
function calc_average(_data) {
	const countsList = appearanceCounter(_data);
	// countsList.map(function (c) { return c.count; }) でcountsListからcountの列だけ取り出した配列ができる
	const maxCount = Math.max.apply(null, countsList.map(function (x) { return x.count; }));
	// 最頻値のリスト
	const L_mode = countsList.filter(x => x.count === maxCount).map(function (x) { return x.L; });
	const Dc_mode = countsList.filter(x => x.count === maxCount).map(function (x) { return x.Dc; });
	return { Dp: average(Dc_mode), aveL: average(L_mode) }
}

// 音符の難易度と出現回数のjsonを返す
function appearanceCounter(_data) {
	let counts = [];
	for (let i = 0; i < NOTES_DATA.length; i++) {
		counts.push({ Dc: NOTES_DATA[i].Dc, L: NOTES_DATA[i].L, count: 0 });
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

// 1回あたりの比較で増加または減少され得る値の上限値Amax, Smaxを求める
function calc_maxLimit(aveL, Dp, notesArray) {
	let notesNum = 0;
	for (let i = 0; i < notesArray.length; i++) {
		if (notesArray[i] != aveL) notesNum += 1;
	}
	return { Amax: (10 - Dp) / notesNum, Smax: (Dp - 1) / notesNum };
}
