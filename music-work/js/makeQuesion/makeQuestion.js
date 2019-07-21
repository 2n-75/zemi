import { EASY, HARD } from './const.js';
import { setNotesData } from "./setNotesData.js";
import { calcDifficulty } from "./difficultyDef.js";
import { levelDef } from "./levelDef.js";
export const QUESTIONS = []; // コンポーネントに投げる出題データ

// レベルを選ぶ
const LEVEL = 'normal'; // あとで最初のページで選べるようにする

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

for (let index = 0; index < 5; index++) {
	makeQuestion();
	console.log("----------");
}
