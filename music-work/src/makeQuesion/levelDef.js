"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelDef = levelDef;

/* 難易度から3段階のレベル分けをする */
function levelDef(difficulty, EASY, HARD) {
  if (HARD < difficulty) {
    return 'hard';
  } else if (EASY < difficulty && difficulty <= HARD) {
    return 'normal';
  } else {
    return 'easy';
  }
}