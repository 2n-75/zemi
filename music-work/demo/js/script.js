const lengths = []
const notes = []
/* 音符のボタン押した時 */
function notesBtnClick(e) {
	const btns = document.getElementsByClassName("btn-cube");
	for (let index = 0; index < btns.length; index++) {
		btns[index].classList.contains('btn-cube__selected') &&
			btns[index].classList.remove('btn-cube__selected');
	}
	const element = e.currentTarget;
	element.classList.toggle('btn-cube__selected');
}

/* 五線譜押した時 */
function staveClick(e) {
	console.log("配列にデータを入れる");

	/* 長さを取得 */
	let setValue = 0;
	const btns = document.getElementsByClassName("btn-cube");
	for (let index = 0; index < btns.length; index++) {
		if (btns[index].classList.contains('btn-cube__selected')) {
			setValue = idToLength(btns[index].id);
		}
	}

	/* 音符が休符かを取得 */
	const radios = document.getElementsByName("radio");
	const isNote = radios[0].checked ? 1 : 0;

	/* 配列に入れる */
	lengths.push(setValue);
	console.log(lengths);
	notes.push(isNote);
	console.log(notes);
}

/* 難易度を調べるボタン */
function getDifficulty(e) {
	console.log("計算する");
}


/* ボタンにイベントを追加 */
function addEvents(id, method) {
	const btn = document.getElementById(id);
	if (btn) {
		btn.addEventListener("click", method, false);
	}
}
addEvents('whole', notesBtnClick);
addEvents('halfDot', notesBtnClick);
addEvents('half', notesBtnClick);
addEvents('quaterDot', notesBtnClick);
addEvents('quater', notesBtnClick);
addEvents('eighth', notesBtnClick);
addEvents('stave', staveClick);
addEvents('submit', getDifficulty);

function idToLength(idName) {
	switch (idName) {
		case "whole":
			return 4;
		case "haleDot":
			return 3;
		case "half":
			return 2;
		case "quaterDot":
			return 1.5;
		case "quater":
			return 1;
		case "eighth":
			return 0.5;
		default:
			break;
	}
}
