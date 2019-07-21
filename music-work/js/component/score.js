// button-counter と呼ばれる新しいコンポーネントを定義します
import { TEST_DATA } from '../difficulty_def/const.js';
//import { calc_difficulty } from '../difficulty_def/difficulty_def.js'; // 難易度計算

//const TEST_DATA = [1, 0.5, 0.5, 1, 1];
const ansNum = 2;
Vue.component('score', {
	template: '#score-template',
	props: {
		//TEST_DATA: Array
	},
	data: function () {
		return {
			items: [
				// 出題内容によって変化する. mounted()で定義
			],
			hints: [
				// 出題内容によって変化する. mounted()で定義
			],
			items2: [{ no: 1, name: '全音符', length: 4, className: 'note--whole' }, { no: 2, name: '付点二分音符', length: 3, className: 'note--halfDot' }, { no: 3, name: '二分音符', length: 2, className: 'note--half' }, { no: 4, name: '付点四分音符', length: 1.5, className: 'note--quaterDot' }, { no: 5, name: '四分音符', length: 1, className: 'note--quater' }, { no: 6, name: '八分音符', length: 0.5, className: 'note--eighth' }],
			leftEnd: 15,
			rightEnd: 90
		};
	},
	mounted() {
		// boxの作成
		for (let i = 0; i < TEST_DATA.length; i++) {
			this.items.push({ length: TEST_DATA[i], className: addImgClass(TEST_DATA[i], 'note'), boxPos: 20 });
			this.hints.push({ length: TEST_DATA[i], className: addImgClass(TEST_DATA[i], 'hint'), boxPos: 20 });
		}
		// 位置のクラス付与
		for (let i = 0; i < this.items.length; i++) {
			const posRange = this.rightEnd - this.leftEnd;
			const interval = posRange / TEST_DATA.length;
			this.items[i].boxPos = this.leftEnd + interval * i;
			this.hints[i].boxPos = this.leftEnd + interval * i;

			// ハテナボックスと被るところは隠す
			if (i == ansNum) {
				this.items[i].className += "box--border blackbox";
			}
		}
	},
	methods: {
		start: function (e) {
			console.log("start" + e.target);
			//e.dataTransfer.setData('text', this.id);
		},
		update: function (e) {
			console.log("update" + e.currentTarget);
		},
		// endかaddかちょっと微妙
		add: function (e) {
			e.preventDefault();
			zone.appendChild(e.target);
			// はてなボックスを消す
			blackbox = document.getElementById("blackbox");
			console.log(blackbox);
			blackbox.classList.add("hidden");

			//
			console.log(e.currentTarget);
			checkAnswer(e.currentTarget.id);
		},
		end: function (e) {
			console.log("end" + e.target);
		}
	}
});

// #score-componentの中で使えるようになる
new Vue({
	el: 'main'
});

/* データからCSSのクラスを付与する */
function addImgClass(len, mode) {
	if (mode == 'note') {
		switch (len) {
			case 4:
				return "note--whole ";
			case 3:
				return "note--halfDot ";
			case 2:
				return "note--half ";
			case 1.5:
				return "note--quaterDot ";
			case 1:
				return "note--quater ";
			case 0.5:
				return "note--eighth ";
			default:
				break;
		}
	} else if (mode == 'hint') {
		switch (len) {
			case 4:
				return "hint--whole ";
			case 3:
				return "hint--halfDot ";
			case 2:
				return "hint--half ";
			case 1.5:
				return "hint--quaterDot ";
			case 1:
				return "hint--quater ";
			case 0.5:
				return "hint--eighth ";
			default:
				break;
		}
	}
}
