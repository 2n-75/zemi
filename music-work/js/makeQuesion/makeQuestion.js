import { EASY, HARD } from './const.js';
import { setNotesData } from "./setNotesData.js";
import { calcDifficulty } from "./difficultyDef.js";
import { levelDef } from "./levelDef.js";
export const QUESTIONS = []; // コンポーネントに投げる出題データ

// レベルを選ぶ
let LEVEL = "normal";
var result = new Promise(function (resolve) {
	resolve(window.onload);
}).then(function () {
	console.log("get query");
	if (window.location.search) {
		/* URLの「?」以降のパラメータを変数nに代入 */
		LEVEL = window.location.search.substring(1, window.location.search.length);
	}
});

function makeQuestion() {
	result.then(function () {
		return setNotesData();
	}).then(function (data) {
		let flag = checkLevel(data)
		if (flag) {
			QUESTIONS.push({
				notes: data, ansNum: Math.floor(Math.random() * data.length)
			});
		} else {
			setTimeout(() => {
				makeQuestion();
			}, 1000);
		}
	});
	console.log("end");
}
for (let i = 0; i < 5; i++) {
	makeQuestion();
}


// 問題生成
function checkLevel(TEST_DATA) {
	if (TEST_DATA === undefined) return false;
	// 難易度を調べる
	const difficulty = calcDifficulty(TEST_DATA);
	console.log("難易度: " + difficulty);

	// レベルを調べる
	const _level = levelDef(difficulty, EASY, HARD);
	console.log("レベル: " + _level);

	if (_level != LEVEL) {
		return false;
	} else {
		return true;
	}
}
