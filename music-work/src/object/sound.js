"use strict";

/* 音 */
function setFileName(id) {
  return fileName = "./sound/q" + id + ".wav";
}

function playSound(value) {
  // 数値を引数とした場合はファイル名を別関数で定義
  var fileName = isNaN(value) ? value : setFileName(value);
  var audioElem;
  audioElem = new Audio();
  audioElem.src = fileName;
  audioElem.play();
}