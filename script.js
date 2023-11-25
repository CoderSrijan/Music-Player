console.log("Spotify");

// For Song Details Img, Tracks , Singer, Duration
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let bgimg = document.getElementById("sbg");
let artist = document.getElementById("artist");
let songtitle = document.getElementById("songname");
let duracheck = document.getElementById("duration");
let livetime = document.getElementById("currenttime");

// For Darkmode and LightMode
let darkmode = document.getElementById("dark");
let lightmode = document.getElementById("light");
let musicpl = document.getElementById("musicplayer");

// For Play/Pause and to Change the Tracks
let Played = document.getElementById("played");
let Paused = document.getElementById("pause");
let progress = document.getElementById("srg");
let forward = document.getElementById("forward");
let backward = document.getElementById("backward");

// Sources of Songs, Images and Singers
let songs = [
  {
    songname: "Channa Mereya",
    filepath: "songs/1.mp3",
    coverpath: "arijit.jpg",
    artistname: "Arijit Singh",
  },
  {
    songname: "Arjan Vailly",
    filepath: "songs/2.mp3",
    coverpath: "arjan-vailly.jpg",
    artistname: "Bhupinder Babbal",
  },
  {
    songname: "Tenu Leke",
    filepath: "songs/3.mp3",
    coverpath: "tenuleke.jpg",
    artistname: "Sonu Nigam",
  },
  {
    songname: "Ordinary Person",
    filepath: "songs/4.mp3",
    coverpath: "Ordinary-Person.jpg",
    artistname: "Nikita Gandhi",
  },
  {
    songname: "Has Has",
    filepath: "songs/5.mp3",
    coverpath: "has-has.webp",
    artistname: "Diljit Dosanjh, Sia",
  },
  {
    songname: "One Love",
    filepath: "songs/6.mp3",
    coverpath: "one-love.jpg",
    artistname: "Blue",
  },
  {
    songname: "Animals",
    filepath: "songs/7.mp3",
    coverpath: "animals.jpg",
    artistname: "Maroon-5",
  },
];


// Play Button - Play Song on Click and Change To Pause Icon
Played.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    Paused.style.display = "inline";
    Played.style.display = "none";
  }
  duracheck.innerText = formatTime(audioElement.duration);
});

// Pause Button - Play Song on Click and Change To Play Icon
Paused.addEventListener("click", () => {
  audioElement.pause();
  Paused.style.display = "none";
  Played.style.display = "inline";
});

// Forward Button - Change and Play Next Song on Click
forward.addEventListener("click", () => {
  if (songIndex < songs.length - 1) {
    songIndex += 1;
  } else {
    songIndex = 0;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  bgimg.src = songs[songIndex].coverpath;
  songtitle.innerText = songs[songIndex].songname;
  artist.innerText = songs[songIndex].artistname;
  audioElement.play();
  audioElement.currentTime = 0;
  Paused.style.display = "inline";
  Played.style.display = "none";
});

// Backward Button - Change and Play Previous Song on Click
backward.addEventListener("click", () => {
  if (songIndex > 0) {
    songIndex -= 1;
  } else {
    songIndex = 0;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  bgimg.src = songs[songIndex].coverpath;
  songtitle.innerText = songs[songIndex].songname;
  artist.innerText = songs[songIndex].artistname;
  audioElement.play();
  audioElement.currentTime = 0;
  Paused.style.display = "inline";
  Played.style.display = "none";
});

// Progress Bar 
audioElement.addEventListener("timeupdate", () => {
  console.log("timeupdate");
  pgbar = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  // console.log(pgbar);
  progress.value = pgbar;

  livetime.innerText = formatTime(audioElement.currentTime);

  if (audioElement.currentTime >= audioElement.duration) {
    audioElement.pause();
    Paused.style.display = "none";
    Played.style.display = "inline";
  }
});

//Update The Seekbar
progress.addEventListener("change", () => {
  audioElement.currentTime = (progress.value * audioElement.duration) / 100;

});

// Makes Seekbar Very Smooth
progress.addEventListener("input", () => {
  // Calculate the new time based on the progress bar value
  const newTime = (progress.value / 100) * audioElement.duration;

  // Update the audio element's current time
  audioElement.currentTime = newTime;
});

//Update Songs CurrentTime
audioElement.addEventListener("loadeddata", () => {
    duracheck.innerText = formatTime(audioElement.duration);
});

//COnvert Integers To Minutes and Seconds
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
};

//Display- Switch To DarkMode
darkmode.addEventListener("click", () => {
  if ((musicpl.style.backgroundColor = "white")) {
    musicpl.style.backgroundColor = "black";
    artist.style.color = "white";
    songtitle.style.color = "white";
    lightmode.style.display = "inline";
    darkmode.style.display = "none";
    livetime.style.color = "white";
    duracheck.style.color = "white";
  } else {
    musicpl.style.backgroundColor = "white";
    artist.style.color = "black";
    songtitle.style.backgroundColor = "black";
  }
});

//Display- Switch to Lightmode
lightmode.addEventListener("click", () => {
  if ((musicpl.style.backgroundColor = "black")) {
    musicpl.style.backgroundColor = "white";
    artist.style.color = "black";
    songtitle.style.color = "black";
    lightmode.style.display = "none";
    darkmode.style.display = "inline";
    livetime.style.color = "black";
    duracheck.style.color = "black";
  } else {
    musicpl.style.backgroundColor = "black";
    artist.style.color = "white";
    songtitle.style.backgroundColor = "white";
  }
});
