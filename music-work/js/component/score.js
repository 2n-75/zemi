import { addImgClass } from './addClass.js';
import { showHint } from '../object/hint.js';

let result = 0;
export let count = 0;
export const scoreComponent = Vue.component('score', {
	template: '#score-template',
	props: ['question'],
	data: function () {
		return {
			items: [
				// 出題内容によって変化する. mounted()で定義
			],
			hints: [
				// 出題内容によって変化する. mounted()で定義
			],
			items2: [
				{ no: 0, name: '全音符', length: 4, className: 'note--whole' },
				{ no: 1, name: '付点二分音符', length: 3, className: 'note--halfDot' },
				{ no: 2, name: '二分音符', length: 2, className: 'note--half' },
				{ no: 3, name: '付点四分音符', length: 1.5, className: 'note--quaterDot' },
				{ no: 4, name: '四分音符', length: 1, className: 'note--quater' },
				{ no: 5, name: '八分音符', length: 0.5, className: 'note--eighth' }
			],
			leftEnd: 15,
			rightEnd: 90,
			ansNum: this.question.ansNum,
		};
	},
	mounted() {
		const NOTES = this.question.notes;
		// boxの作成
		for (let i = 0; i < NOTES.length; i++) {
			this.items.push({ length: NOTES[i], className: addImgClass(NOTES[i], 'note'), boxPos: 20 });
			this.hints.push({ length: NOTES[i], className: addImgClass(NOTES[i], 'hint'), boxPos: 20 });
		}
		// 位置のクラス付与
		for (let i = 0; i < this.items.length; i++) {
			const posRange = this.rightEnd - this.leftEnd;
			const interval = posRange / NOTES.length;
			this.items[i].boxPos = this.leftEnd + interval * i;
			this.hints[i].boxPos = this.leftEnd + interval * i;

			// ハテナボックスと被るところは隠す
			if (i == this.ansNum) {
				this.items[i].className += "box--border blackbox";
			}
		}
	},
	methods: {
		noteClick: function (len) {
			const answerNote = this.items[this.ansNum];
			if (answerNote.length == len) {
				count += 1;
				// はてなボックスを消す
				this.items[this.ansNum].className = this.items[this.ansNum].className.replace(/blackbox/g, '');
				this.changeMess(true);
				this.recordResult(true);
				showHint(false);
			} else {
				this.changeMess(false);
				this.recordResult(false);
				showHint();
			}
		},
		changeMess(correct) {
			const mess = document.getElementsByClassName("mess");
			if (correct) {
				mess[0].innerHTML = "せいかい！次の問題に進もう！";
			} else {
				mess[0].innerHTML = "ざんねん！もういちど考えてみよう！";
			}
		},
		recordResult(correct) {
			const level = window.location.search.replace('?', '');
			if (localStorage.getItem('result') != null) {
				const resultJson = localStorage.getItem('result');
				const resultArray = JSON.parse(resultJson);

				resultArray.push({ level: level, notes: this.question.notes, correct: correct });
				const setJson = JSON.stringify(resultArray);
				localStorage.setItem('result', setJson);
			} else {
				const setJson = JSON.stringify([{ level: level, notes: this.question.notes, correct: correct }]);
				localStorage.setItem('result', setJson);
			}
		}
	}
});

new Vue({
	el: '#score-component',
	data: {
		questions: []
	},
	mounted() {
		const getjson = localStorage.getItem('data');
		const data = JSON.parse(getjson);

		this.questions = data;
		console.log(this.questions);
	},
});
