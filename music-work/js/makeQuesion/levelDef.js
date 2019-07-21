/* 難易度から3段階のレベル分けをする */
export function levelDef(difficulty, EASY, HARD) {
	if (HARD < difficulty) {
		return 'difficult';
	} else if (EASY < difficulty <= HARD) {
		return 'normal';
	} else {
		return 'easy';
	}
}
