import { showHint } from '../object/hint.js';

let swiper = new Swiper('.swiper-container', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
});

/* つぎへともどるのぼたん */
function prevBtnClick() {
	console.log("prevbtn");
}
function nextBtnClick() {
	console.log("nextbtn");
	const mess = document.getElementsByClassName("mess");
	mess[0].innerHTML = "";
	// ヒントを消す
	showHint(false);
}
const prevBtn = document.getElementById('prevBtn');
prevBtn.addEventListener('click', prevBtnClick, false);

const nextBtn = document.getElementById('nextBtn');
nextBtn.addEventListener('click', nextBtnClick, false);
