"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNotesData = setNotesData;

/*
	譜面データをランダム生成する
*/
function setNotesData() {
  // 譜面生成の元になる配列。二拍分のデータ、1が八分音符、0が八分休符とする
  var SORTDATA_HALF = [1, 1, 1, 1, 0, 0, 0];
  var notesDataBase = []; // sortDataHalfを二つ繋げて譜面データの元になる配列を作る

  for (var l = 0; l < 2; l++) {
    // ランダムでソート
    for (var i = SORTDATA_HALF.length - 1; i > 0; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = SORTDATA_HALF[i];
      SORTDATA_HALF[i] = SORTDATA_HALF[r];
      SORTDATA_HALF[r] = tmp;
    }

    Array.prototype.push.apply(notesDataBase, SORTDATA_HALF);
  } // ソートした配列から音価の配列を作る


  var notesData = [];
  var noteShow = false;
  var noteLength = 0;

  for (var _i = 0; _i < notesDataBase.length; _i++) {
    if (notesDataBase[_i] == 1) {
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
  var reTry = false; // 長さが2.5の音符がないので2.5がでた時はやり直す

  for (var _i2 = 0; _i2 < notesData.length; _i2++) {
    if (notesData[_i2] == 2.5) {
      reTry = true;
    }
  }

  if (reTry) {
    setNotesData();
  } else {
    return notesData;
  }
}