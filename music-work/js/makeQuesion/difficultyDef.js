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
	const Wrest = setRestWeight(notesArray, isNoteArray);
	console.log("休符による重み付けパターン:" + Wrest);
	const WoffBeat = checkOffBeat(notesArray, isNoteArray).includes(1) ? 1 : 0;
	console.log("裏拍:" + WoffBeat);
	const difficulty = Dp + A - S + W1[Wrest] + W2[WoffBeat];
	console.log("難易度:" + difficulty);
	return Math.round(difficulty * 10) / 10;
}

/* 便利関数 */
/**
 * 難易度を返す関数
 * @param {音符の長さ} l
 * @param {休符による重み付けを行うか} isRestWeight
 */
const to_Dc = (l) => {
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
const appearanceCounter = (_data) => {
	let counter = [];
	for (let j = 0; j < NOTES_DATA.length; j++) {
		counter[j] = 0;
		for (let i = 0; i < _data.length; i++) {
			if (NOTES_DATA[j].L == _data[i]) {
				counter[j] += 1;
			}
		}
	}
	const ary = []
	for (let i = 0; i < NOTES_DATA.length; i++) {
		const newData = { Dc: NOTES_DATA[i].Dc, L: NOTES_DATA[i].L, count: counter[i] }
		ary.push(newData);
	}
	return ary;
}
// 合計加算値A, 合計減算値Sを求める
const calc_sumValue = (aveL, Dp, notesArray, isNoteArray) => {
	let notesNum = 0;
	// 長さがaveL(頻出音価)より短い音符の総数をNs、長い音符の総数をNlとする
	let Dsn = [];
	let Dln = [];
	for (let i = 0; i < notesArray.length; i++) {
		if (notesArray[i] != aveL) {
			notesNum += 1;
			/** 重み付けしない場合 */
			const D = to_Dc(notesArray[i]);
			/** 重み付けする場合 */
			// const D = to_Dc(notesArray[i]);
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
	const Amax = (10 - Dp) / notesNum;
	const Smax = (Dp - 1) / notesNum;

	// 合計加算値
	let A = 0;
	for (let i = 0; i < Dsn.length; i++) {
		let tmp = (Dsn[i] - Dp) / Dp;
		console.log(tmp);
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
 * @param {音符の長さの配列} notesArray
 * @param {音符かどうかの配列} isNoteArray
 * 休符による重み付けが必要かを返す関数
 * return
 * 0:休符なし
 * 1:8分以下の休符あり
 * 2:4分休符あり
 * 3:それ以外
 */
const setRestWeight = (notesArray, isNoteArray) => {
	/** 休符が一つでも含まれる時 */
	if (isNoteArray.includes(false)) {
		let tmpL = 4;
		for (let i = 0; i < isNoteArray.length; i++) {
			if (!isNoteArray[i]) {
				if (i == 0 && isNoteArray[i + 1]) {
					/** 左端にありすぐ右隣が音符 */
					if (tmpL > notesArray[i]) {
						tmpL = notesArray[i];
					}
				} else if (i == isNoteArray.length - 1 && isNoteArray[i - 1]) {
					/** 右端にありすぐ左隣が音符 */
					if (tmpL > notesArray[i]) {
						tmpL = notesArray[i];
					}
				} else if (isNoteArray[i - 1] && isNoteArray[i + 1]) {
					/** 両隣を音符に挟まれた休符 */
					if (tmpL > notesArray[i]) {
						tmpL = notesArray[i];
					}
				} else {
					/** 重み付けしない休符 */
				}
			}
		}
		if (tmpL <= 0.5) {
			return 1;
		} else if (0.5 < tmpL && tmpL <= 1) {
			return 2;
		} else {
			return 3;
		}
	} else {
		return 0;
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
