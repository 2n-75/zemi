//let fileName = "./sound/q2.wav";
function playSound(fileName) {
	let audioElem;
	audioElem = new Audio();
	audioElem.src = fileName;
	audioElem.play();
	console.log("play!");
}
