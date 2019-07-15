/* データからCSSのクラスを付与する */
export function addImgClass(len) {
	switch (len) {
		case 4:
			return "note--full ";
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
}
