"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HARD = exports.EASY = exports.NOTES_DATA = void 0;

/* 定数はこのファイルにまとめる */
// 音符の長さと難易度のデータ
var NOTES_DATA = [{
  Dc: 1,
  L: 4
}, {
  Dc: 1,
  L: 3
}, {
  Dc: 2,
  L: 2
}, {
  Dc: 3,
  L: 2.5
}, {
  Dc: 4,
  L: 1
}, {
  Dc: 6,
  L: 1.5
}, {
  Dc: 8,
  L: 0.5
}]; // レベルを分ける難易度

exports.NOTES_DATA = NOTES_DATA;
var EASY = 3;
exports.EASY = EASY;
var HARD = 6;
exports.HARD = HARD;