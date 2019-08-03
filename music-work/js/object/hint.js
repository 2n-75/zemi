/* hint */
export function showHint(flag = true) {
	const hints = document.getElementsByClassName("hint");
	const headingHint = document.getElementById("headingHint");
	if (flag) {
		headingHint.classList.toggle("hidden");
		for (let i = 0; i < hints.length; i++) {
			hints[i].classList.toggle("hidden");
		}
	} else {
		headingHint.classList.add("hidden");
		for (let i = 0; i < hints.length; i++) {
			hints[i].classList.add("hidden");
		}
	}

	// しばらく経ったらヒントが消える
}
const hintBtn = document.getElementById('hintBtn');
hintBtn.addEventListener('click', showHint, false);
