let elPause,
	elPlay,
	elForward,
	elAudio,
	elH2,
	elH3,
	elPlaylist,
	currentSong = 0,
	elVolume;
document.addEventListener("DOMContentLoaded", function(){
	elPause = document.getElementById("pause");
	elPlay = document.getElementById("play");
	elForward = document.getElementById("forward");
	elAudio = document.querySelector("audio");
	elH2 = document.getElementById('title');
	elH3 = document.getElementById('artist');
	elPlaylist = ["Blackbird.mp3", "NoSatisfaction.mp3"];
	
	// create volume slider:
	elVolume = document.getElementById('volume');
	var slider = document.getElementById('slider');
	noUiSlider.create(elVolume,{
		start: 0.8,
		connect: true,
		range: {
			'min': 0,
			'max': 1
		}
	});
	elVolume.noUiSlider.on('slide', function(){
		elAudio.volume = parseFloat(elVolume.noUiSlider.get());
	});

	// play player for the first time:
	elAudio.src = "audio/" + elPlaylist[currentSong];
	elAudio.play();

	elPlay.addEventListener("click", function(){
		elAudio.play();
	});

	function Track (title, artist, file) {
		this.title = title;
		this.artist = artist;
		this.file = file;
	}
	var track1 = new Track("Blackbird", "The Beatles", "Blackbird.mp3");
	var track2 = new Track("Can't Get No (Satisfaction)", "The Rolling Stones", "NoSatisfaction.mp3");

	function Playlist() {
		Track.call(this.title);
		this.elPlaylist = [];
	}
	

	Playlist.prototype.addTrack = function( track ){
		this.track = track;
		if ( !track instanceof Track ) return false;
		if ( track instanceof Track ) {
			this.track.push(track)}
			return true;
	}

	
		// title = ["Blackbird", "Can't Get No (Satisfaction)"];
		// artist = ["The Beatles", "The Rolling Stones"];
		// file = [""]
	// create Track Object (title, artist) with arrays for title and artist, functions to access them- getTitle, getArtist
		// if( /Blackbird\.mp3/.test(elAudio.src) ) {
		// 	elH2.innerText = "Blackbird";
		// 	elH3.innerText = "The Beatles";
		// };
		// if( /NoSatisfaction\.mp3/.test(elAudio.src) ) {
		// 	elH2.innerText = "Can't Get No (Satisfaction)";
		// 	elH3.innerText = "The Rolling Stones";
		// };
	elPause.addEventListener("click", function(){
		elAudio.pause();
	});
	elForward.addEventListener("click", playNext);
	elAudio.addEventListener("ended", function(){
		playNext();
// it's like this for the "ended" event because we don't want to invoke it instantly, not till we want it (when song has ended);
});
function playNext(){
	currentSong = (currentSong + 1) % elPlaylist.length;
		elAudio.src = "audio/" + elPlaylist[currentSong];
		elAudio.play();
};
});


// function Player( el ) {
// 	this.el = el;
// 	this.currentTrack = 0;
// 	this.elPlaylist = [];
// }
// Player.prototype.play = function(){
// 	this.el.play();
// }
// Player.prototype.pause = function(){
// 	this.el.pause();
// }

// document.addEventListener("DOMContentLoaded",function(){

// player = new Player(document.querySelector("audio"));

// elPlay.addEventListener("click",function(){
//     player.play();
//   });
// }


// to go to next track:
// create array of songs by title
// function Next to play following sequential track in array
// keep track of current song [0], modular operator (remainder) for length of array

// elForward.addEventListener("click", function(){
// var Playlist;
// Playlist = ["title", ...];
// function getCurrentSong
// 	return current
// function Next {
// 	[current + 1].play
// };
// });



// to allow a user to load one of their own songs:
// input for address where song is hosted?
// options (on buttons?) of songs for them to choose from?
// design function for user to upload song?