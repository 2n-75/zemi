/* アンケート */
export function showReview(flag) {
	const review = document.getElementsByClassName("review")
	if (flag) {
		for (let i = 0; i < review.length; i++) {
			review[i].classList.remove("hidden")
		}
	} else {
		for (let i = 0; i < review.length; i++) {
			review[i].classList.add("hidden")
		}
	}
}
