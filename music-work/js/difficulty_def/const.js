import { set_notesData } from "./set_notesData.js";
/* 定数はこのファイルにまとめる */
// 音符の長さと難易度のデータ
export const NOTES_DATA = [{ Dc: 1, L: 4 }, { Dc: 1, L: 3 }, { Dc: 2, L: 2 }, { Dc: 3, L: 2.5 }, { Dc: 4, L: 1 }, { Dc: 6, L: 1.5 }, { Dc: 8, L: 0.5 }];

// 譜面のテストデータ
//export const TEST_DATA = [1, 0.5, 0.5, 1, 0.5, 0.5]; // それぞれの音符のL
export const TEST_DATA = set_notesData();