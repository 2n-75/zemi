/* バーのアニメーション */
function barActive() {
	console.log("btnclick");
	const bar = document.getElementById("timing-bar");
	bar.classList.toggle("bar-active");

	Promise.resolve()
		.then(wait(5.5)) // ここで10秒待つ（「Promiseオブジェクトを返す関数」を thenに渡しています）
		.then(function () {
			const bar = document.getElementById("timing-bar");
			bar.classList.toggle("bar-active");
		})
		.catch(function (err) {
			console.error(err);
			self.result_message = error;
		});
}

var wait = function (sec) {
	return function () {
		return new Promise(function (resolve/*, reject*/) {
			setTimeout(resolve, sec * 1000)
		});
	}
};
