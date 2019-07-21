/* hint */
function showHint() {
	let hints = document.getElementsByClassName("hint");
	for (let i = 0; i < hints.length; i++) {
		hints[i].classList.toggle("hidden");
	}
}

/* 正誤判定 */
const answer = "note4";
function checkAnswer(idName) {
	let mess = document.getElementsByClassName("mess"); //messが配列の形でとれるんだけどなんで？classだとそうなる？
	if (idName === answer) {
		mess[0].innerHTML = "せいかい！";
	} else {
		mess[0].innerHTML = "ざんねん！";
	}
	// jSONファイルに書き込み
}