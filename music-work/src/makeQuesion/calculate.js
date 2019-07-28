"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sum = sum;
exports.average = average;

/* 計算系 */
function sum(arr, fn) {
  if (fn) {
    return sum(arr.map(fn));
  } else {
    return arr.reduce(function (prev, current, i, arr) {
      return prev + current;
    });
  }
}

function average(arr, fn) {
  return sum(arr, fn) / arr.length;
}