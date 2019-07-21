import { EASY, HARD } from './const';
import { setNotesData } from "./setNotesData";
import { calcDifficulty } from "./difficultyDef";
import { levelDef } from "./levelDef";
const QUESTIONS = []; // コンポーネントに投げる出題データ

// レベルを選ぶ
const LEVEL = 'normal'; // あとで最初のページで選べるようにする

// 問題生成
function makeQuestion() {
	// 音符のデータを作る
	const TEST_DATA = setNotesData();
	console.log(TEST_DATA);

	// 難易度を調べる
	const difficulty = calcDifficulty(TEST_DATA);
	console.log("難易度:" + difficulty);

	// レベルを調べる
	const _level = levelDef(difficulty, EASY, HARD);
	console.log(_level);

	if (_level != LEVEL) {
		makeQuestion();
	} else {
		QUESTIONS.push(TEST_DATA);
		return;
	}
}

for (let index = 0; index < 5; index++) {
	console.log("----------");
	makeQuestion();
	console.log("----------");
}
console.log(QUESTIONS);
export default QUESTIONS;
