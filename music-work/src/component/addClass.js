"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addImgClass = addImgClass;

/* データからCSSのクラスを付与する */
function addImgClass(len, mode) {
  if (mode == 'note') {
    switch (len) {
      case 4:
        return "note--whole ";

      case 3:
        return "note--halfDot ";

      case 2:
        return "note--half ";

      case 1.5:
        return "note--quaterDot ";

      case 1:
        return "note--quater ";

      case 0.5:
        return "note--eighth ";

      default:
        break;
    }
  } else if (mode == 'hint') {
    switch (len) {
      case 4:
        return "hint--whole ";

      case 3:
        return "hint--halfDot ";

      case 2:
        return "hint--half ";

      case 1.5:
        return "hint--quaterDot ";

      case 1:
        return "hint--quater ";

      case 0.5:
        return "hint--eighth ";

      default:
        break;
    }
  }
}