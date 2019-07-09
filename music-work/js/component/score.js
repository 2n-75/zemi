// button-counter と呼ばれる新しいコンポーネントを定義します
const ansNum = 2;
const notes = [2, 0, 1, 1];
Vue.component('score', {
	template: '#score-template',
	data: function () {
		return {
			items: [
				{ no: 1, name: 'pos1', categoryNo: '1', className: addImgClass(notes[0]) },
				{ no: 2, name: 'pos2', categoryNo: '1', className: addImgClass(notes[1]) },
				{ no: 3, name: 'pos3', categoryNo: '1', className: addImgClass(notes[2]) },
				{ no: 4, name: 'pos4', categoryNo: '1', className: addImgClass(notes[3]) },
			],
			items2: [
				{ no: 5, name: '二分音符', categoryNo: '2', className: 'note--half' },
				{ no: 6, name: '四分音符', categoryNo: '2', className: 'note--quater' },
				{ no: 7, name: '付点四分音符', categoryNo: '2', className: 'note--quaterDot' },
				{ no: 8, name: '八分音符', categoryNo: '2', className: 'note--eighth' },
			]
		}

	},
	mounted() {
		//className参照ができればこの下のコードはいらない
		// 回答パーツ
		/*	const answerParts = this.$refs.answerParts;
			for (let i = 0; i < answerParts.length; i++) {
				const className = answerParts[i].classList;

			}*/

		// 問題パーツ
		const questionParts = this.$refs.questionParts;
		for (let i = 0; i < questionParts.length; i++) {
			const className = questionParts[i].classList;
			className.add(addPosClass(i));
			//
			if (i == ansNum) {
				className.add("hidden");
			}
		}
	},
	methods: {
		start: function (e) {
			e.dataTransfer.setData('text', this.id);
		},
		// endかaddかちょっと微妙
		end: function (e) {
			e.preventDefault();
			zone.appendChild(e.target);
			// はてなボックスを消す
			blackbox = document.getElementById("blackbox");
			console.log(blackbox);
			blackbox.classList.add("hidden");

			checkAnswer(e.currentTarget.id);

		},
	},
});
function addImgClass(index) {
	switch (index) {
		case 0:
			break;
		case 1:
			return "note--quater";
		case 2:
			return "note--half";
		case 3:
			return "note--quaterDot";
		case 4:
			return "note--eighth";
		default:
			break;
	}
}
function addPosClass(index) {
	switch (index) {
		case 0:
			return "box--pos1";
		case 1:
			return "box--pos2";
		case 2:
			return "box--pos3";
		case 3:
			return "box--pos4";
		default:
			break;
	}
}

// #score-componentの中で使えるようになる
new Vue({
	el: '#score-component'
})
