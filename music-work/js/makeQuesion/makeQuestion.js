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
		console.log("level:" + LEVEL);
	}
}).then(function () {
	console.log("make question");
	for (let index = 0; index < 5; index++) {
		makeQuestion();
		console.log("----------");
	}
	console.log("end");
});



// 問題生成
function makeQuestion() {
	// 音符のデータを作る
	const TEST_DATA = setNotesData();
	console.log(TEST_DATA);

	// 難易度を調べる
	const difficulty = calcDifficulty(TEST_DATA);
	console.log("難易度: " + difficulty);

	// レベルを調べる
	const _level = levelDef(difficulty, EASY, HARD);
	console.log("レベル: " + _level);

	if (_level != LEVEL) {
		makeQuestion();
	} else {
		QUESTIONS.push({
			notes: TEST_DATA, ansNum: Math.floor(Math.random() * TEST_DATA.length)
		});
		return;
	}
}
