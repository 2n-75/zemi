/*
	譜面データをランダム生成する
*/

export function setNotesData() {
	// 譜面生成の元になる配列。二拍分のデータ、1が八分音符、0が八分休符とする
	const SORTDATA_HALF = [1, 1, 1, 1, 0, 0, 0];

	const notesDataBase = [];
	// sortDataHalfを二つ繋げて譜面データの元になる配列を作る
	for (let l = 0; l < 2; l++) {
		// ランダムでソート
		for (let i = SORTDATA_HALF.length - 1; i > 0; i--) {
			let r = Math.floor(Math.random() * (i + 1));
			let tmp = SORTDATA_HALF[i];
			SORTDATA_HALF[i] = SORTDATA_HALF[r];
			SORTDATA_HALF[r] = tmp;
		}
		Array.prototype.push.apply(notesDataBase, SORTDATA_HALF);
	}

	// ソートした配列から音価の配列を作る
	const notesData = [];
	let noteShow = false;
	let noteLength = 0;
	for (let i = 0; i < notesDataBase.length; i++) {
		if (notesDataBase[i] == 1) {
			noteLength += 0.5;
			if (!noteShow) noteShow = true;
		} else {
			if (noteShow) {
				notesData.push(noteLength);
				noteLength = 0;
				noteShow = false;
			}
		}
	}
	if (noteShow) notesData.push(noteLength);
	return notesData;
}
