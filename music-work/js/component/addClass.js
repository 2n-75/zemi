/* データからCSSのクラスを付与する */
export function addImgClass(len, mode, convert) {
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
		let className = convert ? "hint--convert " : "";
		switch (len) {
			case 4:
				className += "hint--whole";
				return className;
			case 3:
				className += "hint--halfDot";
				return className;
			case 2:
				className += "hint--half";
				return className;
			case 1.5:
				className += "hint--quaterDot";
				return className;
			case 1:
				className += "hint--quater";
				return className;
			case 0.5:
				className += "hint--eighth";
				return className;
			default:
				break;
		}
	}
	return className;
}
