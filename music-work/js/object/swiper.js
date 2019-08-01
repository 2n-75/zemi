import { showHint } from '../object/hint.js';
import { showResult } from '../object/result.js';
import { count } from '../component/score.js';

const swiper = new Swiper('.swiper-container', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	on: {
		slideNextTransitionStart: function () {
			if (this.activeIndex == 5) {
				const mess = document.getElementsByClassName("mess");
				mess[0].innerHTML = "";
				// 結果を表示する
				const resultText = document.getElementById('resultText');
				resultText.innerHTML = "けっか：" + (count) + "問 せいかい！";
			} else {
				const mess = document.getElementsByClassName("mess");
				mess[0].innerHTML = "";
				// ヒントを消す
				showHint(false);
			}
		},
	}
});
