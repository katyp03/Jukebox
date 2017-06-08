let elPause,
	elPlay,
	elForward,
	elAudio,
	elVolume;

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
	// 	forward;
	// };
	// elAudio.addEventListener("ended", function(){
	// 	forward());
	
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
});
// creating Jukebox constructor:
function Jukebox(){
	this.playlist = [];
	this.currentSong = 0;
	// this.elAudio;
	// console.log(this.playlist)
	// var currentTrack = this.playlist[this.currentSong];

 //  	this.elArtist.innerText = currentTrack.artist;
 //  	this.elTitle.innerText = currentTrack.title;
  	this.el = {};
}

// creating Track constructor:
function Track(file, name, artist){
	this.file = file;
	this.name = name;
	this.artist = artist;
}

// creating Jukebox prototype:
Jukebox.prototype.create = function(el, options){
	let self = this;
	el.innerHTML = `
	<audio></audio>
	<div class="info">
      <h3 class="name">${options.name}</h3>
      <div class="track"><span class="artist"></span> &mdash; <span class="title"></span></div>
    </div>
    <div class="controls">
      	<i id="backward" class="back fa fa-backward"></i>
		<div id="pause"><i class="play-pause fa fa-pause"></i></div>
		<div id="play"><i class="play-pause fa fa-play"></i></div>
		<i id="forward" class="next fa fa-forward"></i>
		<i id="shuffle" class="random fa fa-random"></i>
		<div id="volume"></div>
    </div> 
    `;

	this.el.main = el;
  this.el.audio = el.querySelector("audio");      // audio tag
  this.el.artist = el.querySelector(".artist");   // artist area
  this.el.title = el.querySelector(".title");       // song area
  this.el.play = el.querySelector(".play-pause"); // play/pause toggle
  // this.el.back = el.querySelector(".back");       // back button
  this.el.next = el.querySelector(".next");       // next button
  // this.el.shuffle = el.querySelector(".shuffle"); // shuffle button
  // attach eventlisteners for our buttons
  // we use our "self" variable to refer to the jukebox instance
  // since the meaning of the "this" keyword variable changes
  // to refer to the button control within the addEventListener
  
  // add js for play/pause div here?
  this.el.play.addEventListener("click",self.play.bind(self));
  // this.el.back.addEventListener("click",self.back.bind(self));
  this.el.next.addEventListener("click",self.next.bind(self));
  // this.el.shuffle.addEventListener("click",self.next.bind(self));

}

// creating addTrack function to Jukebox:
Jukebox.prototype.addTrack = function( track ){
		if (Array.isArray(track) && track.every(t => t instanceof Track)){
		Array.protoype.push.apply(this.playlist, track);
		}
		this.track = track;
		if ( !track instanceof Track ) return false;
		if ( track instanceof Track ) {
			this.playlist.push(track)
		}
			return true;
}
	
// creating play function to Jukebox:
Jukebox.prototype.play = function(){
  	this.el.audio.src = currentTrack.file;
  	this.el.audio.play();
}

// creating pause function to Jukebox constructor:
Jukebox.prototype.pause = function(){
  	this.el.audio.src = currentTrack.file;
  	this.el.audio.pause();
}

// creating forward function to Jukebox constructor:
Jukebox.prototype.next = function(){
	currentSong = (currentSong + 1) % playlist.length;
	this.el.audio.src = playlist[currentSong];
	this.el.audio.play();
}

// CREATE BACKWARD AND RANDOM FUNCTIONS



// create and call my player from Jukebox prototype?
var player;
document.addEventListener("DOMContentLoaded",function(){
  player = new Jukebox();
  player.create(document.getElementById("jukebox"),{name: "Katy's Super Cool Jukebox"});
  player.addTrack([
    new Track("audio/Blackbird.mp3","Blackbird","The Beatles"),
    new Track("audio/NoSatisfaction.mp3","Can't Get No (Satisfaction)","The Rolling Stones"),
  ])
});