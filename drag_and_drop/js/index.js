/* drag and drop */
let count = 0;
const zone = document.getElementById('dropzone');
zone.addEventListener('dragover', onDragOver, false);
zone.addEventListener('drop', onDrop, false);
const boxs = document.getElementsByClassName("draggable");
for (let index = 0; index < boxs.length; index++) {
	boxs[index].addEventListener('dragend', onDragend, false);
	boxs[index].addEventListener('dragstart', onDragStart, false);
}

function onDragStart(e) {
	e.dataTransfer.setData('text', this.id);
}
function onDragOver(e) {
	e.preventDefault();
	//this.textContent = 'onDragOver';
}
function onDrop(e) {
	e.preventDefault();
	//this.textContent = 'onDrop';
}
function onDragend(e) {
	console.log("aaa");
	e.preventDefault();
	zone.appendChild(e.target);
	// はてなボックスを消す
	blackbox = document.getElementById("blackbox");
	console.log(blackbox);
	blackbox.classList.add("hidden");

	checkAnswer(e.currentTarget.id);
}

/* hint */
function showHint() {
	let hints = document.getElementsByClassName("hint");
	for (let i = 0; i < hints.length; i++) {
		hints[i].classList.toggle("hidden");
	}
}

// 正誤判定
const answer = "note4";
function checkAnswer(idName) {
	let mess = document.getElementsByClassName("mess"); //messが配列の形でとれるんだけどなんで？classだとそうなる？
	if (idName === answer) {
		mess[0].innerHTML = "せいかい！";
	} else {
		mess[0].innerHTML = "ざんねん！";
	}
}
