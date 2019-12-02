import { calcDifficulty } from "../../js/makeQuesion/difficultyDef.js";

const lengths = []
const notes = []
let imgLeft = 100;
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
	/* 長さを取得 */
	const selectedId = fetchSelectedNote();
	const value = idToLength(selectedId);
	/* 音符が休符かを取得 */
	const radios = document.getElementsByName("radio");
	const isNote = radios[0].checked ? 1 : 0;

	/* 五線譜に画像を追加する */
	addImage(selectedId, isNote);

	/* 配列に入れる */
	lengths.push(value);
	console.log(lengths);
	notes.push(isNote);
	console.log(notes);

}

/* 難易度を調べるボタン */
function getDifficulty() {
	console.log("計算する");
	const text = document.getElementById("difficultyText");
	calcDifficulty(lengths);
	document.getElementById("difficulty").innerHTML = calcDifficulty(lengths);
	text.classList.remove("hidden");

}

/* 配列にデータを入れる */
function fetchSelectedNote() {
	/* 長さを取得 */
	let selectedId = '';
	const btns = document.getElementsByClassName("btn-cube");
	for (let index = 0; index < btns.length; index++) {
		if (btns[index].classList.contains('btn-cube__selected')) {
			selectedId = btns[index].id;
		}
	}
	return selectedId;
}

/* 五線譜に音符を追加 */
function addImage(id, isNote) {
	const stave = document.getElementById('stave');
	const newNote = document.createElement('div');
	newNote.classList.add('box');
	newNote.classList.add(setImgClass(id, isNote));
	// leftをidから設定する
	newNote.style.left = imgLeft.toString() + "px";
	imgLeft += 100 * idToLength(id);
	//最後の子要素として追加
	stave.appendChild(newNote);

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
		case "halfDot":
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

function setImgClass(id, isNote) {
	let className = "";
	if (isNote) {
		className = "note--" + id;
	} else {
		className = "rest--" + id
	}
	return className;
}
