"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showHint = showHint;

/* hint */
function showHint() {
  var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var hints = document.getElementsByClassName("hint");

  if (flag) {
    for (var i = 0; i < hints.length; i++) {
      hints[i].classList.toggle("hidden");
    }
  } else {
    for (var _i = 0; _i < hints.length; _i++) {
      hints[_i].classList.add("hidden");
    }
  } // しばらく経ったらヒントが消える

}

var hintBtn = document.getElementById('hintBtn');
hintBtn.addEventListener('click', showHint, false);