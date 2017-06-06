let elPause,
	elPlay,
	elForward,
	elAudio;
document.addEventListener("DOMContentLoaded", function(){
	elPause = document.getElementById("pause");
	elPlay = document.getElementById("play");
	elForward = document.getElementById("forward");
	elAudio = document.querySelector("audio");
	elPlay.addEventListener("click", function(){
		elAudio.play();
	});
	elPause.addEventListener("click", function(){
		elAudio.pause();
	});
	// elForward.addEventListener("click", function(){
	// 	elAudio.forward();
	// });
});