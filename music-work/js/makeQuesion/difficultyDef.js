/*
譜面の難易度を判定する
*/

import { average } from "./calculate.js";
import { NOTES_DATA, W1, W2 } from './const.js';

/* 実行 */
export const calcDifficulty = (notesArray, isNoteArray) => {
	console.log("長さの配列:" + notesArray);
	console.log("音符かどうかの配列:" + isNoteArray);
	// もっともよく使われている音符の平均難易度と平均音価
	const { Dp, aveL } = calc_average(notesArray);
	console.log("一番多く使われている音符の平均難易度は" + Dp + " 平均音価は" + aveL);
	const { A, S } = calc_sumValue(aveL, Dp, notesArray, isNoteArray);
	const hasOffBeat = checkOffBeat(notesArray, isNoteArray);
	console.log("裏拍:" + hasOffBeat.includes(1));
	let difficulty = Dp + A - S;
	if (hasOffBeat.includes(1)) {
		difficulty += W2;
	}
	console.log("難易度:" + difficulty);
	return Math.round(difficulty * 10) / 10;
}

/* 便利関数 */
/**
 * 難易度を返す関数
 * @param {音符の長さ} l
 * @param {休符による重み付けを行うか} isRestWeight
 */
const to_Dc = (l, isRestWeight) => {
	let dc = 0;
	const W = 1.5 / l
	for (let i = 0; i < NOTES_DATA.length; i++) {
		if (NOTES_DATA[i].L == l) {
			dc = isRestWeight ? NOTES_DATA[i].Dc + W : NOTES_DATA[i].Dc;
		}
	}
	return dc;
}

/* こっからただの計算 */
// もっともよく使われている音符の平均音価と平均難易度を求める
const calc_average = (_data) => {
	const countsList = appearanceCounter(_data);
	// countsList.map( (c) => { return c.count; }) でcountsListからcountの列だけ取り出した配列ができる
	const maxCount = Math.max.apply(null, countsList.map((x) => {
		return x.count;
	}));
	// 最頻値のリスト
	const L_mode = countsList.filter(x => x.count === maxCount).map((x) => {
		return x.L;
	});
	const Dc_mode = countsList.filter(x => x.count === maxCount).map((x) => {
		return x.Dc;
	});
	return { Dp: average(Dc_mode), aveL: average(L_mode) };
}

// 音符の難易度と出現回数のjsonを返す
const appearanceCounter = (_data, isNoteArray) => {
	let counts = [];
	for (let i = 0; i < NOTES_DATA.length; i++) {
		counts.push({ Dc: NOTES_DATA[i].Dc, L: NOTES_DATA[i].L, count: 0 });
	}
	for (let j = 0; j < counts.length; j++) {
		for (let i = 0; i < _data.length; i++) {
			// 暫定的にDcを求める時は音符の難易度を入れておく
			let currentDc = to_Dc(_data[i], true);
			if (counts[j].Dc == currentDc) {
				counts[j].count = counts[j].count ? counts[j].count + 1 : 1;
			}
		}
	}
	return counts;
}
// 合計加算値A, 合計減算値Sを求める
const calc_sumValue = (aveL, Dp, notesArray, isNoteArray) => {
	let notesNum = 0;
	// 長さがaveL(頻出音価)より短い音符の総数をNs、長い音符の総数をNlとする
	let Dsn = [];
	let Dln = [];
	for (let i = 0; i < notesArray.length; i++) {
		if (isNoteArray[i]) {
			if (notesArray[i] != aveL) {
				notesNum += 1;
				const isRestWeight = restWeight(i, isNoteArray);
				if (notesArray[i] < aveL) {
					Dsn.push(to_Dc(notesArray[i], false));
				} else if (notesArray[i] > aveL) {
					Dln.push(to_Dc(notesArray[i], false));
				}
			}
		} else {
			console.log("休符の時");
			notesNum += 1;
			const isRestWeight = restWeight(i, isNoteArray);
			console.log(i + "の休符重み付け" + isRestWeight);
			const D = to_Dc(notesArray[i], isRestWeight);
			console.log(D);
			if (notesArray[i] < aveL) {
				Dsn.push(D);
			} else if (notesArray[i] > aveL) {
				Dln.push(D);
			}
		}

	}
	// Dsn, Dlnの重複をなくす
	Dsn = Dsn.filter((x, i, self) => {
		return self.indexOf(x) === i;
	});
	Dln = Dln.filter((x, i, self) => {
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
/**
 *
 * @param {配列のindex} index
 * @param {音符かどうかの配列} isNoteArray
 * 休符による重み付けが必要かを返す関数
 * 休符は前後を音符に挟まれている場合true
 */
const restWeight = (index, isNoteArray) => {
	if (index == 0) {
		return isNoteArray[index + 1];
	} else if (index == isNoteArray.length - 1) {
		return isNoteArray[index - 1];
	} else {
		if (isNoteArray[index - 1] == false && isNoteArray[index + 1] == false) {
			return false;
		} else {
			return true;
		}
	}
}
/**
 *
 * @param {音長の配列} notesArray
 * その音符が裏拍かを返す関数
 * 裏拍の条件：
 * 一つ前までの音符の長さの合計が整数でない
 * はじく：たた（一つ前が音符，An-1+An==1）
 * 一つ前がAn-1+An!=1
 * 一つ前が音符かつと自分の長さを足すと整数でない
 */
const checkOffBeat = (notesArray, isNoteArray) => {
	const offBeatArray = [];
	let lenSum = 0;
	offBeatArray[0] = 0;
	for (let i = 1; i < notesArray.length; i++) {
		lenSum = lenSum + notesArray[i - 1];
		if (!Number.isInteger(lenSum)) {
			if (isNoteArray[i - 1] == true && notesArray[i - 1] + notesArray[i] == 1) {
				offBeatArray.push(0);
			} else {
				offBeatArray.push(1);
			}
		} else {
			offBeatArray.push(0);
		}
	}
	return offBeatArray;
}


/* 一つの楽譜に含まれる音符or休符の種類 */
const paramsNotesKind = (array) => {
	return array.filter(function (x, i, self) {
		return self.indexOf(x) === i;
	});
}
