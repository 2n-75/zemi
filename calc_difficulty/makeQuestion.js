import { EASY, HARD } from './const.js';
import { setNotesData } from "./setNotesData.js";
import { calcDifficulty } from "./difficultyDef.js";
import { levelDef } from "./levelDef.js";

// レベルを選ぶ
let LEVEL = "normal";
const QUESTIONS = []; // コンポーネントに投げる出題データ

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
// 問題の配列を作る
function loopUnit() {
	return new Promise(resolve => {
		resolve(setNotesData());
	}).then((data) => {
		let flag = checkLevel(data);
		if (flag) {
			QUESTIONS.push({
				notes: data, ansNum: Math.floor(Math.random() * data.length)
			});
		}
	})
}

function looper(e) {
	return new Promise(resolve => {
		// 永久ループにならないように限界条件を入れる (optional)
		if (QUESTIONS.length > 5) {
			resolve()
			return
		}
		// ループ処理
		loopUnit().then(result => {
			if (QUESTIONS.length < 5) {
				looper().then(() => resolve())
			} else {
				resolve()
			}
		})
	})
}


// ページ遷移の前に問題を生成する
function btnClick(e) {
	looper();
	LEVEL = e.target.id;

	setTimeout(() => {
		// 問題をローカルストレージに保存する
		console.log(QUESTIONS);
		let setjson = JSON.stringify(QUESTIONS);
		localStorage.setItem('data', setjson);
		window.location.href = './?' + LEVEL; // 通常の遷移
	}, 3000);
}

function addEvents(id) {
	const btn = document.getElementById(id);
	if (btn) {
		btn.addEventListener("click", btnClick, false);
	}
}
addEvents('easy');
addEvents('normal');
addEvents('hard');
