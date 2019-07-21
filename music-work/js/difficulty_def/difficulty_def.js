/*
譜面の難易度を判定する
*/

import { average } from "./calculate.js";
import { NOTES_DATA, TEST_DATA } from './const.js';

/* 実行 */
export const SCORE_DIFFICULTY = calc_difficulty(TEST_DATA);
export function calc_difficulty(notesArray) {
	console.log("入力データ:" + notesArray);
	// もっともよく使われている音符の平均難易度と平均音価
	const { Dp, aveL } = calc_average(notesArray);
	console.log("一番多く使われている音符の平均難易度は" + Dp + " 平均音価は" + aveL);
	const { A, S } = calc_sumValue(aveL, Dp, notesArray);
	return Math.round(Dp + A - S);
}
console.log("この譜面の難易度は:" + calc_difficulty(TEST_DATA));

/* 便利関数 */
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

/* こっからただの計算 */
// もっともよく使われている音符の平均音価と平均難易度を求める
function calc_average(_data) {
	const countsList = appearanceCounter(_data);
	// countsList.map(function (c) { return c.count; }) でcountsListからcountの列だけ取り出した配列ができる
	const maxCount = Math.max.apply(null, countsList.map(function (x) {
		return x.count;
	}));
	// 最頻値のリスト
	const L_mode = countsList.filter(x => x.count === maxCount).map(function (x) {
		return x.L;
	});
	const Dc_mode = countsList.filter(x => x.count === maxCount).map(function (x) {
		return x.Dc;
	});
	return { Dp: average(Dc_mode), aveL: average(L_mode) };
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
				counts[j].count = counts[j].count ? counts[j].count + 1 : 1;
			}
		}
	}
	return counts;
}
// 合計加算値A, 合計減算値Sを求める
function calc_sumValue(aveL, Dp, notesArray) {
	let notesNum = 0;
	// 長さがaveL(頻出音価)より短い音符の総数をNs、長い音符の総数をNlとする
	let Dsn = [];
	let Dln = [];
	for (let i = 0; i < notesArray.length; i++) {
		if (notesArray[i] != aveL) {
			notesNum += 1;
			if (notesArray[i] < aveL) {
				Dsn.push(L_to_Dc(notesArray[i]));
			} else if (notesArray[i] > aveL) {
				Dln.push(L_to_Dc(notesArray[i]));
			}
		}
	}
	// Dsn, Dlnの重複をなくす(あったほうがいいのか？)
	Dsn = Dsn.filter(function (x, i, self) {
		return self.indexOf(x) === i;
	});
	Dln = Dln.filter(function (x, i, self) {
		return self.indexOf(x) === i;
	});

	// 1回の比較で増加、減少され得る上限値
	let Amax = (10 - Dp) / notesNum;
	let Smax = (Dp - 1) / notesNum;

	// 合計加算値
	let A = 0;
	for (let i = 0; i < Dsn.length; i++) {
		let tmp = (Dsn[i] - Dp) / Dp;
		A += tmp * Amax;
	}
	// 合計減算値
	let S = 0;
	for (let i = 0; i < Dln.length; i++) {
		let tmp = (Dp - Dln[i]) / Dp;
		S += tmp * Smax;
	}
	return { A, S };
}
