/* hint */
export function showHint(flag = true) {
	console.log("hint");
	const hints = document.getElementsByClassName("hint");
	if (flag) {
		for (let i = 0; i < hints.length; i++) {
			hints[i].classList.toggle("hidden");
		}
	} else {
		for (let i = 0; i < hints.length; i++) {
			hints[i].classList.add("hidden");
		}
	}

	// しばらく経ったらヒントが消える
}
const hintBtn = document.getElementById('hintBtn');
hintBtn.addEventListener('click', showHint, false);
