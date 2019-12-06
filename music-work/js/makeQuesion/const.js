/* 定数はこのファイルにまとめる */
// 音符の長さと難易度のデータ
export const NOTES_DATA = [
	{ Dc: 2, L: 4 }, { Dc: 2, L: 3 }, { Dc: 2, L: 2 },
	{ Dc: 6, L: 1.5 }, { Dc: 4, L: 1 }, { Dc: 6, L: 0.5 },
];

// レベルを分ける難易度
export const EASY = 3;
export const HARD = 6;

/* 重み付けの値 */
// 音符に対し休符につける重み
export const W1 = 0.3;
// 裏拍につける重み
export const W2 = 1.5;
