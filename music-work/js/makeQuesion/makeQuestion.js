import { EASY, HARD, QUESTIONS } from './const.js';
import { setNotesData } from "./setNotesData.js";
import { calcDifficulty } from "./difficultyDef.js";
import { levelDef } from "./levelDef.js";

// レベルを選ぶ
let LEVEL = "normal";
function makeQuestion() {
	new Promise((resolve) => {
		resolve(setNotesData());
	}).then((data) => {
		let flag = checkLevel(data);
		if (flag) {
			QUESTIONS.push({
				notes: data, ansNum: Math.floor(Math.random() * data.length)
			});
		} else {
			setTimeout(() => {
				makeQuestion();
			}, 500);
		}
	})
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

	if (_level === LEVEL) {
		return true;
	} else {
		return false;
	}
}

// ページ遷移の前に問題を生成する
function makeQuestions(e) {
	LEVEL = e.target.id;
	console.log(LEVEL);
	new Promise((resolve) => {
		for (let i = 0; i < 5; i++) {
			makeQuestion(LEVEL);
			console.log(i);
		}
		resolve()
	}).then(() => {
		console.log(QUESTIONS);
		window.location.href = './?' + LEVEL; // 通常の遷移
	})

}
document.getElementById("easy").addEventListener("click", makeQuestions, false);
document.getElementById("normal").addEventListener("click", makeQuestions, false);
document.getElementById("hard").addEventListener("click", makeQuestions, false);
