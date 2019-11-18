/*
譜面の難易度を判定する データ収集用
*/
import { calcDifficulty } from "../makeQuesion/difficultyDef.js";

const arrayA = [0.5, 0.5, 1, 2]
const arrayB = [1, 1, 1, 0.5, 0.5]
calcDifficulty(arrayA);
calcDifficulty(arrayB);
