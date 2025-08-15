console.log('Lets write JavaScript');

// Select elements
const songListEl = document.querySelector(".songList ul");
const cardContainer = document.querySelector(".cardContainer");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const songInfo = document.querySelector(".songinfo");
const songTime = document.querySelector(".songtime");
const seekbar = document.querySelector(".seekbar");
const seekCircle = document.querySelector(".seekbar .circle");
const volumeSlider = document.querySelector(".range input");

// Audio element
let audio = new Audio();
let currentIndex = 0;
let currentSongs = [];

// 🎯 Add your unlimited playlists & songs here
// Just keep adding objects to this array — no other code changes needed
let playlists = [
    {
        name: "Top Hits",
        img: "Top Hits.jpeg",
        songs: [
            { title: "Tere Vaaste", src: "Songs/Tere Vaaste.mp3" },
            { title: "Tu Hain Toh", src: "Songs/Tu Hain Toh.mp3" },
            { title: "Tum Hi Ho Aashiqui 2", src: "Songs/Tum Hi Ho Aashiqui 2.mp3" },
            { title: "What Jhumka", src: "Songs/What Jhumka.mp3" },
            { title: "Saiyaara", src: "Songs/Saiyaara.mp3" },
            { title: "Samayama", src: "Songs/Samayama.mp3" },
            { title: "Sahiba", src: "Songs/Sahiba.mp3" },
            { title: "Soch Na Sake", src: "Songs/Soch Na Sake.mp3" },
            { title: "SAARI DUNIYA JALAA DENGE", src: "Songs/SAARI DUNIYA JALAA DENGE.mp3" },
            { title: "Raanjhan", src: "Songs/Raanjhan.mp3" }
        ]
    },
    {
        name: "Workout",
        img: "workout.jpeg",
        songs: [
            { title: "Ao Kabhi Haveli Pe", src: "Songs/Aao Kabhi Haveli Pe.mp3" },
            { title: "Arjan Vailly", src: "Songs/ARJAN VAILLY.mp3" },
            { title: "Bekhayali ", src: "Songs/Bekhayali.mp3" },
            { title: "Bhool Bhulaiyaa 3", src: "Songs/Bhool Bhulaiyaa 3.mp3" },
            { title: "Disco Disco", src: "Songs/Disco Disco.mp3" },
            { title: "Mauja Hi Mauja", src: "Songs/Mauja Hi Mauja.mp3" },
            { title: "Milegi Milegi", src: "Songs/Milegi Milegi.mp3" },
            { title: "Oo Bolega ya Oo Oo Bolega", src: "Songs/Oo Bolega ya Oo Oo Bolega.mp3" },
            { title: "Pistol Bole Gi", src: "Songs/Pistol Bole Gi.mp3" },
            { title: "Tamma Tamma Again", src: "Songs/Tamma Tamma Again.mp3" }
        ]
    },
    {
        name: "Party Time",
        img: "Party Time.jpeg",
        songs: [
            { title: "Main Tera Boyfriend", src: "Songs/Main Tera Boyfriend.mp3" },
            { title: "Shanivaar Raati", src: "Songs/Shanivaar Raati.mp3" },
            { title: "Pyaar Hota Kayi Baar Hai", src: "Songs/Pyaar Hota Kayi Baar Hai.mp3" },
            { title: "Raat Jashan Di", src: "Songs/Raat Jashan Di Video Song  ZORAWAR  Yo Yo Honey Singh, Jasmine Sandlas, Baani J  T-Series.mp3" },
            { title: "Uyi Amma - Azaad", src: "Songs/Uyi Amma - Azaad.mp3" },
            { title: "Tere Pyaar Mein", src: "Songs/Tere Pyaar Mein.mp3" },
            { title: "Naiyo Lagda", src: "Songs/Naiyo Lagda.mp3" },
            { title: "MILLIONAIR", src: "Songs/MILLIONAIR SONG.mp3" },
            { title: "Mere Mehboob", src: "Songs/Mere Mehboob.mp3" },
            { title: "Maan Meri Jaan", src: "Songs/Maan Meri Jaan.mp3" }
        ]
    },
     {
        name: "Chill Vibes",
        img: "Chill Vibe.jpeg",
        songs: [
            { title: "Aayi Nai", src: "Songs/Aayi Nai.mp3" },
            { title: "Bharat_ Slow Motion", src: "Songs/Bharat_ Slow Motion.mp3" },
            { title: "Chammak Challo", src: "Songs/Chammak Challo.mp3" },
            { title: "Ek Chumma", src: "Songs/Ek Chumma.mp3" },
            { title: "Ek Toh Kum Zindagani", src: "Songs/Ek Toh Kum Zindagani.mp3" },
            { title: "Galat Baat Hai", src: "Songs/Galat Baat Hai.mp3" },
            { title: "Ghagra", src: "Songs/Ghagra.mp3" },
            { title: "Jaane Tu  Chhaava", src: "Songs/Jaane Tu  Chhaava.mp3" },
            { title: "LAAL PARI", src: "Songs/LAAL PARI.mp3" },
            { title: "MAKHNA", src: "Songs/MAKHNA.mp3" }
        ]
    },
    {
         name: "Romantic",
        img: "Romantic.jpeg",
        songs: [
            { title: "Blue Eyes", src: "Songs/Blue Eyes.mp3" },
            { title: "Galliyan Returns", src: "Songs/Galliyan Returns.mp3" },
            { title: "Hass Hass", src: "Songs/Hass Hass.mp3" },
            { title: "Janiye", src: "Songs/Janiye.mp3" },
            { title: "Jhoom", src: "Songs/Jhoom.mp3" },
            { title: "JO TUM MERE HO", src: "Songs/JO TUM MERE HO.mp3" },
            { title: "Manwa Laage", src: "Songs/'Manwa Laage'.mp3" },
            { title: "Pachtaoge", src: "Songs/Pachtaoge.mp3" },
            { title: "Phir Aur Kya Chahiye", src: "Songs/Phir Aur Kya Chahiye.mp3" },
            { title: "Ranjha", src: "Songs/Ranjha.mp3" }
        ]
    },
    {
         name: "Krishna Songs",
        img: "Krishna.jpeg",
        songs: [
            { title: "A.R. Rahman - Radha Kaise Na Jale", src: "Songs/Krishna/A.R. Rahman - Radha Kaise Na Jale.mp3" },
            { title: "Go Go Govinda Full Song", src: "Songs/Krishna/Go Go Govinda Full Song.mp3" },
            { title: "Jubin Nautiyal_ Shri Krishna Govind Hare Muraris", src: "Songs/Krishna/Jubin Nautiyal_ Shri Krishna Govind Hare Murari.mp3" },
            { title: "Mann Basiya (Full Song)  Tere Naam", src: "Songs/Krishna/Mann Basiya (Full Song)  Tere Naam.mp3" },
            { title: "Nandlala  Song   Palak Muchhal", src: "Songs/Krishna/Nandlala  Song   Palak Muchhal.mp3" },
            { title: "Radhe Radhe - Full Song  Dream Girl", src: "Songs/Krishna/Radhe Radhe - Full Song  Dream Girl.mp3" },
            { title: "Saanwre Shyam  Vishal Mishra", src: "Songs/Krishna/Saanwre Shyam  Vishal Mishra,.mp3" },
            { title: "Tum Prem Ho - Reprise", src: "Songs/Krishna/Tum Prem Ho - Reprise.mp3" },
            { title: "Woh Kisna Hai  Krishna", src: "Songs/Krishna/Woh Kisna Hai  Krishna.mp3" },
            { title: "Ye Chamak Ye Damak", src: "Songs/Krishna/Ye Chamak Ye Damak.mp3" }
        ]
    }
];

// Load songs into library
function loadSongList(songsToLoad) {
    songListEl.innerHTML = "";
    currentSongs = songsToLoad;
    songsToLoad.forEach((song, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<img class="invert" src="music.svg" alt=""> ${song.title}`;
        li.addEventListener("click", () => {
            playSong(index);
        });
        songListEl.appendChild(li);
    });
}

// Play a song
function playSong(index) {
    currentIndex = index;
    audio.src = currentSongs[currentIndex].src;
    audio.play();
    playBtn.src = "pause.svg";
    songInfo.textContent = currentSongs[currentIndex].title;
}

// Play/Pause button
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.src = "pause.svg";
    } else {
        audio.pause();
        playBtn.src = "play.svg";
    }
});

// Next/Previous buttons
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentSongs.length;
    playSong(currentIndex);
});
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentSongs.length) % currentSongs.length;
    playSong(currentIndex);
});

// Auto-play next song when current ends (loop playlist)
audio.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % currentSongs.length;
    playSong(currentIndex);
});

// Seek bar and time
audio.addEventListener("timeupdate", () => {
    let progress = (audio.currentTime / audio.duration) * 100 || 0;
    seekCircle.style.left = `${progress}%`;
    songTime.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

// Seek when clicking on bar
seekbar.addEventListener("click", (e) => {
    let rect = seekbar.getBoundingClientRect();
    let percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
});

// Volume control
volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
});

// Format time (mm:ss)
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let m = Math.floor(seconds / 60);
    let s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

// Load playlist cards dynamically
function loadCards() {
    cardContainer.innerHTML = "";
    playlists.forEach((p) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${p.img}" alt="">
            <h3>${p.name}</h3>
            <p>${p.songs.length} Songs</p>
        `;
        card.addEventListener("click", () => {
            loadSongList(p.songs);       // Load songs
            currentIndex = 0;            // Start from first
            playSong(currentIndex);      // Auto play
            audio.loop = false;
        });
        cardContainer.appendChild(card);
    });
}

// Initialize
loadCards();
if (playlists.length > 0) {
    loadSongList(playlists[0].songs);
}
