import { showHint } from '../object/hint.js';
import { showResult } from '../object/result.js';

let swiper = new Swiper('.swiper-container', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	on: {
		slideNextTransitionStart: function () {
			console.log(this.activeIndex);
			if (this.activeIndex == 4) {
				// 次に進もう→結果を見るに文字を変更
				const mess = document.getElementsByClassName("mess");
				mess[0].innerHTML = "けっかを見る";
			}
			else if (this.activeIndex == 5) {
				//
				const mess = document.getElementsByClassName("mess");
				mess[0].innerHTML = "";
				// 結果を計算する
				showResult();
			} else {
				console.log("nextbtn");
				const mess = document.getElementsByClassName("mess");
				mess[0].innerHTML = "";
				// ヒントを消す
				showHint(false);
			}
		},
	}
});
