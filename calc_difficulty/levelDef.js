/* 難易度から3段階のレベル分けをする */
export function levelDef(difficulty, EASY, HARD) {
	if (HARD < difficulty) {
		return 'hard';
	} else if (EASY < difficulty && difficulty <= HARD) {
		return 'normal';
	} else {
		return 'easy';
	}
}
