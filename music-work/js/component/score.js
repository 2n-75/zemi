// button-counter と呼ばれる新しいコンポーネントを定義します
Vue.component('score', {
	template: '#score-template',
	data: function () {
		return {
			items: [
				{ no: 1, name: 'キャベツ', categoryNo: '1' },
				{ no: 2, name: 'ステーキ', categoryNo: '2' }
			],
			items2: [
				{ no: 5, name: 'きゅうり', categoryNo: '1' },
				{ no: 6, name: 'ハンバーグ', categoryNo: '2' }
			]
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


// #score-componentの中で使えるようになる
new Vue({
	el: '#score-component'
})
