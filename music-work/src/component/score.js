"use strict";

var _addClass = require("./addClass.js");

var _hint = require("../object/hint.js");

Vue.component('score', {
  template: '#score-template',
  props: ['question'],
  data: function data() {
    return {
      items: [// 出題内容によって変化する. mounted()で定義
      ],
      hints: [// 出題内容によって変化する. mounted()で定義
      ],
      items2: [{
        no: 0,
        name: '全音符',
        length: 4,
        className: 'note--whole'
      }, {
        no: 1,
        name: '付点二分音符',
        length: 3,
        className: 'note--halfDot'
      }, {
        no: 2,
        name: '二分音符',
        length: 2,
        className: 'note--half'
      }, {
        no: 3,
        name: '付点四分音符',
        length: 1.5,
        className: 'note--quaterDot'
      }, {
        no: 4,
        name: '四分音符',
        length: 1,
        className: 'note--quater'
      }, {
        no: 5,
        name: '八分音符',
        length: 0.5,
        className: 'note--eighth'
      }],
      leftEnd: 15,
      rightEnd: 90,
      ansNum: this.question.ansNum
    };
  },
  mounted: function mounted() {
    var NOTES = this.question.notes; // boxの作成

    for (var i = 0; i < NOTES.length; i++) {
      this.items.push({
        length: NOTES[i],
        className: (0, _addClass.addImgClass)(NOTES[i], 'note'),
        boxPos: 20
      });
      this.hints.push({
        length: NOTES[i],
        className: (0, _addClass.addImgClass)(NOTES[i], 'hint'),
        boxPos: 20
      });
    } // 位置のクラス付与


    for (var _i = 0; _i < this.items.length; _i++) {
      var posRange = this.rightEnd - this.leftEnd;
      var interval = posRange / NOTES.length;
      this.items[_i].boxPos = this.leftEnd + interval * _i;
      this.hints[_i].boxPos = this.leftEnd + interval * _i; // ハテナボックスと被るところは隠す

      if (_i == this.ansNum) {
        this.items[_i].className += "box--border blackbox";
      }
    }
  },
  methods: {
    noteClick: function noteClick(len) {
      var answerNote = this.items[this.ansNum];
      var mess = document.getElementsByClassName("mess");

      if (answerNote.length == len) {
        // はてなボックスを消す
        this.items[this.ansNum].className = this.items[this.ansNum].className.replace(/blackbox/g, '');
        mess[0].innerHTML = "せいかい！";
        (0, _hint.showHint)(false);
      } else {
        mess[0].innerHTML = "ざんねん！";
        (0, _hint.showHint)();
      }
    }
  }
});
new Vue({
  el: '#score-component',
  data: {
    questions: []
  },
  mounted: function mounted() {
    var getjson = localStorage.getItem('data');
    var data = JSON.parse(getjson);
    this.questions = data;
    console.log(this.questions);
  }
});