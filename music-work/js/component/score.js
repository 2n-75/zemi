import { addImgClass } from './addClass.js';
import { showHint } from '../object/hint.js';
import { showReview } from '../object/review.js';

let result = 0;
export let count = 0;
export const scoreComponent = Vue.component('score', {
	template: '#score-template',
	props: ['question'],
	data() {
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
			leftEnd: 10,
			rightEnd: 88,
			ansNum: this.question.ansNum,
			correct: false,
			sumUntilLastNote: 0,
			currentNo: 0
		};
	},
	mounted() {
		const NOTES = this.question.notes;
		let position = this.leftEnd;
		// boxの作成
		for (let i = 0; i < NOTES.length; i++) {
			this.items.push({ length: NOTES[i], className: addImgClass(NOTES[i], 'note', false), boxPos: this.leftEnd });
			this.hints.push({ length: NOTES[i], className: addImgClass(NOTES[i], 'hint', this.convertImage(i)), boxPos: this.leftEnd });
		}
		// 位置のクラス付与
		for (let i = 0; i < this.items.length; i++) {
			if (i > 0) {
				const interval = (this.items[i - 1].length * 2) * 10;
				position += interval;
				this.items[i].boxPos = position;
				this.hints[i].boxPos = position;
			}


			// ハテナボックスと被るところは隠す
			if (i == this.ansNum) {
				this.items[i].className += "box--border blackbox";
			}
		}
	},
	methods: {
		noteSelected(e) {
			console.log(e);
			// ドラッグされた要素
			const selected = this.items2.find(item =>
				e.item.className.includes(item.className)
			);
			console.log(selected.name);
			const answerNote = this.items[this.ansNum];
			if (answerNote.length == selected.length) {
				count += 1;
				// はてなボックスを消す
				this.items[this.ansNum].className = this.items[this.ansNum].className.replace(/blackbox/g, '');
				this.correct = true;
				console.log("せいかい");
				showHint(false);
				/*
				* 3秒後に次の問題にスクロールする
				* this.scrollToNext(count)だと動かない
				*/
				window.setTimeout(this.scrollToNext, 3000, count)
			} else {
				this.correct = false;
				console.log("ちがう");
				showHint();
			}
			this.changeMess(this.correct);

			const review = '';
			this.recordResult(this.correct, review);
			// アンケートを表示する
			//showReview(true);
		},
		changeMess(correct) {
			const headMess = document.getElementById("headingHint")
			if (correct) {
				headMess.classList.remove("hidden");
				headMess.innerHTML = "せいかい！次の問題に進むよ！";

			} else {
				headMess.classList.remove("hidden");
				headMess.innerHTML = "ざんねん！もういちど考えてみよう！</br>【ヒント】りんごが全部で4つ分になるようにえらぼう";
			}
		},
		/* アンケートに回答した時 */
		btnClick(e) {
			const review = e.target.id;
			this.recordResult(this.correct, review);
		},
		/* 結果を記録する */
		recordResult(correct, review) {
			const level = window.location.search.replace('?', '');
			if (localStorage.getItem('result') != null) {
				const resultJson = localStorage.getItem('result');
				const resultArray = JSON.parse(resultJson);
				const newData = { level: level, notes: this.question.notes, correct: correct, review: review }
				// 直前のものと同じ結果だったら記録しない
				if (newData === resultArray.slice(-1)[0]) {
					return
				}
				resultArray.push(newData);
				const setJson = JSON.stringify(resultArray);
				localStorage.setItem('result', setJson);
			} else {
				const setJson = JSON.stringify([{ level: level, notes: this.question.notes, correct: correct, review: review }]);
				localStorage.setItem('result', setJson);
			}
		},
		/* 裏拍の時はヒントの画像を反転させる */
		convertImage(index) {
			if (index == 0) return false
			this.sumUntilLastNote += this.question.notes[index - 1];
			return !Number.isInteger(this.sumUntilLastNote);
		},
		scrollToNext(count) {
			console.log("hige");
			/* 一定時間経過後次の問題へスクロールする */
			const scrollY = 600 * count
			console.log(count);
			console.log(scrollY);
			window.scrollTo({
				top: scrollY,
				behavior: "smooth"
			})
		},
	}
});

new Vue({
	el: '#score-component',
	data: {
		questions: [],
	},
	mounted() {
		const getjson = localStorage.getItem('data');
		const data = JSON.parse(getjson);

		this.questions = data;
		console.log(this.questions);
	}
});
