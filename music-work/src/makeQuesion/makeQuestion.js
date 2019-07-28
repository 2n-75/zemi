"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QUESTIONS = void 0;

var _const = require("./const.js");

var _setNotesData = require("./setNotesData.js");

var _difficultyDef = require("./difficultyDef.js");

var _levelDef = require("./levelDef.js");

// レベルを選ぶ
var LEVEL = "normal";
var QUESTIONS = []; // コンポーネントに投げる出題データ
// 問題生成

exports.QUESTIONS = QUESTIONS;

function checkLevel(TEST_DATA) {
  if (TEST_DATA === undefined) return false; // 難易度を調べる

  var difficulty = (0, _difficultyDef.calcDifficulty)(TEST_DATA);
  console.log("難易度: " + difficulty); // レベルを調べる

  var _level = (0, _levelDef.levelDef)(difficulty, _const.EASY, _const.HARD);

  console.log("レベル: " + _level);

  if (_level === LEVEL) {
    return true;
  } else {
    return false;
  }
} // 問題の配列を作る


function loopUnit() {
  return new Promise(function (resolve) {
    resolve((0, _setNotesData.setNotesData)());
  }).then(function (data) {
    var flag = checkLevel(data);

    if (flag) {
      QUESTIONS.push({
        notes: data,
        ansNum: Math.floor(Math.random() * data.length)
      });
    }
  });
}

function looper(e) {
  return new Promise(function (resolve) {
    // 永久ループにならないように限界条件を入れる (optional)
    if (QUESTIONS.length > 5) {
      resolve();
      return;
    } // ループ処理


    loopUnit().then(function (result) {
      if (QUESTIONS.length < 5) {
        looper().then(function () {
          return resolve();
        });
      } else {
        resolve();
      }
    });
  });
} // ページ遷移の前に問題を生成する


function btnClick(e) {
  looper();
  LEVEL = e.target.id;
  console.log(LEVEL);
  setTimeout(function () {
    // 問題をローカルストレージに保存する
    console.log(QUESTIONS);
    var setjson = JSON.stringify(QUESTIONS);
    localStorage.setItem('data', setjson);
    window.location.href = './?' + LEVEL; // 通常の遷移
  }, 1000);
}

function addEvents(id) {
  var btn = document.getElementById(id);

  if (btn) {
    btn.addEventListener("click", btnClick, false);
  }
}

addEvents('easy');
addEvents('normal');
addEvents('hard');