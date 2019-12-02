/*
譜面の難易度を判定する データ収集用
*/
import { calcDifficulty } from "../../js/makeQuesion/difficultyDef.js";

const arrayA = [0.5, 0.5, 1, 0.5, 0.5, 1]
const arrayB = [0.5, 1, 0.5, 0.5, 0.5, 1]
calcDifficulty(arrayA);
calcDifficulty(arrayB);
