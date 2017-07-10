function Jukebox(){
	this.playlist = [];
	this.currentTrack = 0;
  	this.el = {};
  	this.newSongIndex = 0;
}

// creating addTrack function to Jukebox constructor:
Jukebox.prototype.addSong = function( song ){
		if( song instanceof Song ) {
    	this.playlist.push( song );
    	document.querySelector('ol').innerHTML += "<li id='" + this.newSongIndex + "'>" + song.title + " - " + song.artist + "</li>";
    		this.newSongIndex ++;
    	return true;
  		} else {
    	return false;
  		}
  		
}

// creating play function to Jukebox
Jukebox.prototype.play = function(){
	var currentSong = this.playlist[this.currentTrack];
	this.el.artist.innerText = currentSong.artist;
 	this.el.title.innerText = currentSong.title;
	if (this.el.play.classList.contains("fa-pause")) {
		this.el.audio.pause();
	} else {
  		this.el.audio.src = currentSong.file;
  		this.el.audio.play();
	}
	// to toggle play/pause buttons:
	this.el.play.classList.toggle("fa-play");
	this.el.play.classList.toggle("fa-pause");
};

// creating forward function to Jukebox constructor:
Jukebox.prototype.next = function(){
	this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
	this.el.audio.src = this.playlist[this.currentTrack].file;
	this.el.audio.play();
	var currentSong = this.playlist[this.currentTrack];
	this.el.artist.innerText = currentSong.artist;
 	this.el.title.innerText = currentSong.title;
	
	this.el.play.classList.remove("fa-play");
	this.el.play.classList.add("fa-pause");
}

// creating back function to Jukebox constructor:
Jukebox.prototype.back = function(){
	if( this.currentTrack >= 1 ){
    this.currentTrack = (this.currentTrack - 1) % this.playlist.length;
  	}
  else if( this.currentTrack === 0 ){
    this.currentTrack = this.playlist.length - 1;
  	}
	this.el.audio.src = this.playlist[this.currentTrack].file;
	this.el.audio.play();
	var currentSong = this.playlist[this.currentTrack];
	this.el.artist.innerText = currentSong.artist;
 	this.el.title.innerText = currentSong.title;
 	// to switch to the pause icon while song is playing:
 	this.el.play.classList.remove("fa-play");
	this.el.play.classList.add("fa-pause");
}

// creating shuffle function to Jukebox constructor:
Jukebox.prototype.shuffle = function(){
	this.currentTrack = parseInt(Math.random()*this.playlist.length);
	this.el.audio.src = this.playlist[this.currentTrack].file;
	this.el.audio.play();
	var currentSong = this.playlist[this.currentTrack];
	this.el.artist.innerText = currentSong.artist;
 	this.el.title.innerText = currentSong.title;
 	this.el.play.classList.remove("fa-play");
	this.el.play.classList.add("fa-pause");
}

function Song(file, title, artist) {
  this.file = file;
  this.title = title;
  this.artist = artist;
}

Jukebox.prototype.create = function(el, options){
  let self = this;
  el.innerHTML = `
  <audio></audio>
  <div class="info">
  <h3 class="name font-effect-neon">${options.name}</h3>
  <div class="track">
  <span class="artist"></span><br /><span class="title"></span></div>
    </div><br />
    <div class="controls">
    <i id="backward" class="back fa fa-backward"></i>
		<i class="play-pause fa fa-play"></i>
		<i id="forward" class="next fa fa-forward"></i>
		<i class="shuffle fa fa-random"></i><br /><br />
		<div id="volume"></div>
		<div id="songList">
			<ol id="list"></ol>
		</div>
    </div> 
    `;
  
  this.el.main = el;
  this.el.audio = el.querySelector("audio");      
  this.el.artist = el.querySelector(".artist");   
  this.el.title = el.querySelector(".title");       
  this.el.play = el.querySelector(".play-pause"); 
  this.el.back = el.querySelector(".back");       
  this.el.next = el.querySelector(".next");      
  this.el.shuffle = el.querySelector(".shuffle"); 
 
  this.el.play.addEventListener("click",self.play.bind(self));
  this.el.back.addEventListener("click",self.back.bind(self));
  this.el.next.addEventListener("click",self.next.bind(self));
  this.el.shuffle.addEventListener("click",self.shuffle.bind(self));
}

var player;
document.addEventListener("DOMContentLoaded",function(){
  	player = new Jukebox();
  	player.create(document.getElementById("jukebox"),{name: "Katy's Super Cool Jukebox"});
  	player.addSong(new Song("audio/Blackbird.mp3","Blackbird","The Beatles"));
    player.addSong(new Song("audio/NoSatisfaction.mp3","Can't Get No (Satisfaction)","The Rolling Stones"));
    player.addSong(new Song("audio/AmericanGirl.mp3","American Girl","Tom Petty & The Heartbreakers"));
    player.addSong(new Song("audio/MrJones.mp3","Mr. Jones","Counting Crows"));
    player.addSong(new Song("audio/Home.mp3","Home","Edward Sharpe and the Magnetic Zeros"));
    player.addSong(new Song("audio/DogDays.mp3","Dog Days Are Over","Florence + The Machine"));
    // to play on page load:
    player.play();
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
    // make playlist songs clickable:
  for(i=0; i<player.playlist.length; i++){
   	elSelectSong = document.getElementsByTagName('li')[i];

   	elSelectSong.addEventListener("click", function(){
    	currentSong = player.playlist[this.getAttribute('id')];
    	player.el.audio.src = currentSong.file;
    	document.getElementsByClassName('artist')[0].innerHTML = currentSong.artist;
    	document.getElementsByClassName('title')[0].innerHTML = currentSong.title;
    	console.log(player);
    	player.el.audio.play();
    });
  };
});



// jQuery experiments:

// $(document).ready(function () {
// 	$(".name").fadeOut(4000);
// });

// $(document).ready(function () {
// 		$(".name").animate( {  opacity: 0.4,  width: "70%" },2000 );
// });

// $(document).ready(function () {
// 	$(".name").click(
// 		function(){
// 		alert("HEY!");
// 	});
// });

// $(document).ready(function () {
// 	$("li").click(
// 		$("li").animate( { opacity: 0.6, width: "90%" },1000 ));
// });