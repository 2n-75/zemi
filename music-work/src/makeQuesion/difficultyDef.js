"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcDifficulty = calcDifficulty;

var _calculate = require("./calculate.js");

var _const = require("./const.js");

/*
譜面の難易度を判定する
*/

/* 実行 */
function calcDifficulty(notesArray) {
  console.log("入力データ:" + notesArray); // もっともよく使われている音符の平均難易度と平均音価

  var _calc_average = calc_average(notesArray),
      Dp = _calc_average.Dp,
      aveL = _calc_average.aveL;

  console.log("一番多く使われている音符の平均難易度は" + Dp + " 平均音価は" + aveL);

  var _calc_sumValue = calc_sumValue(aveL, Dp, notesArray),
      A = _calc_sumValue.A,
      S = _calc_sumValue.S;

  return Math.round(Dp + A - S);
}
/* 便利関数 */
// 音符の長さから難易度を返す


function L_to_Dc(l) {
  var dc = 0;

  for (var i = 0; i < _const.NOTES_DATA.length; i++) {
    if (_const.NOTES_DATA[i].L == l) {
      dc = _const.NOTES_DATA[i].Dc;
    }
  }

  return dc;
}
/* こっからただの計算 */
// もっともよく使われている音符の平均音価と平均難易度を求める


function calc_average(_data) {
  var countsList = appearanceCounter(_data); // countsList.map(function (c) { return c.count; }) でcountsListからcountの列だけ取り出した配列ができる

  var maxCount = Math.max.apply(null, countsList.map(function (x) {
    return x.count;
  })); // 最頻値のリスト

  var L_mode = countsList.filter(function (x) {
    return x.count === maxCount;
  }).map(function (x) {
    return x.L;
  });
  var Dc_mode = countsList.filter(function (x) {
    return x.count === maxCount;
  }).map(function (x) {
    return x.Dc;
  });
  return {
    Dp: (0, _calculate.average)(Dc_mode),
    aveL: (0, _calculate.average)(L_mode)
  };
} // 音符の難易度と出現回数のjsonを返す


function appearanceCounter(_data) {
  var counts = [];

  for (var i = 0; i < _const.NOTES_DATA.length; i++) {
    counts.push({
      Dc: _const.NOTES_DATA[i].Dc,
      L: _const.NOTES_DATA[i].L,
      count: 0
    });
  }

  for (var j = 0; j < counts.length; j++) {
    for (var _i = 0; _i < _data.length; _i++) {
      var currentDc = L_to_Dc(_data[_i]);

      if (counts[j].Dc == currentDc) {
        counts[j].count = counts[j].count ? counts[j].count + 1 : 1;
      }
    }
  }

  return counts;
} // 合計加算値A, 合計減算値Sを求める


function calc_sumValue(aveL, Dp, notesArray) {
  var notesNum = 0; // 長さがaveL(頻出音価)より短い音符の総数をNs、長い音符の総数をNlとする

  var Dsn = [];
  var Dln = [];

  for (var i = 0; i < notesArray.length; i++) {
    if (notesArray[i] != aveL) {
      notesNum += 1;

      if (notesArray[i] < aveL) {
        Dsn.push(L_to_Dc(notesArray[i]));
      } else if (notesArray[i] > aveL) {
        Dln.push(L_to_Dc(notesArray[i]));
      }
    }
  } // Dsn, Dlnの重複をなくす(あったほうがいいのか？)


  Dsn = Dsn.filter(function (x, i, self) {
    return self.indexOf(x) === i;
  });
  Dln = Dln.filter(function (x, i, self) {
    return self.indexOf(x) === i;
  }); // 1回の比較で増加、減少され得る上限値

  var Amax = (10 - Dp) / notesNum;
  var Smax = (Dp - 1) / notesNum; // 合計加算値

  var A = 0;

  for (var _i2 = 0; _i2 < Dsn.length; _i2++) {
    var tmp = (Dsn[_i2] - Dp) / Dp;
    A += tmp * Amax;
  } // 合計減算値


  var S = 0;

  for (var _i3 = 0; _i3 < Dln.length; _i3++) {
    var _tmp = (Dp - Dln[_i3]) / Dp;

    S += _tmp * Smax;
  }

  return {
    A: A,
    S: S
  };
}