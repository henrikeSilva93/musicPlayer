const songs = [
    {
        title: "Rosanna",
        Artist: "toto",
        Album_src: "https://m.media-amazon.com/images/I/71NT9ty1FNL._AC_SL1500_.jpg",
        src: './assets/rosanna - toto.mp3'
    },
    {
        title: "Pamella",
        Artist: "toto",
        Album_src: "https://m.media-amazon.com/images/I/715a7-WnPrL._AC_SL1500_.jpg",
        src: './assets/pamella - toto.mp3'
    }
]
function $(el) {
    return document.querySelectorAll(el)
}
const play = $('#play')[0]
const audio = $('#audio')[0]
const albumCover = $("#album_cover")[0]
const songTitle = $(".song-title")[0]
const songArtist = $('.song-artist')[0]
const songDuration = $('.duration')[0]
const songCurrentTime = $(".current-time")[0]
const progressBar = $('.progress-bar')[0]
const forward = $('#forward')[0]
const rewind = $('#rewind')[0]




let currentSong = 0
playing = false

function audioPlay() {
    audio.src = songs[currentSong].src
    audio.play()
}



play.addEventListener('click', () => {
    if (!audio.paused) {
        audio.pause()
        play.attributes.src.value = './assets/play.png'
    } else {
        play.attributes.src.value = './assets/pause.png'
        audioPlay()
    }

}
)


function padZero(v) {
    return (v < 10) ? "0" + v : v;
}

function sToTime(t) {
    return padZero(parseInt((t / (60 * 60)) % 24)) + ":" +
        padZero(parseInt((t / (60)) % 60)) + ":" +
        padZero(parseInt((t) % 60));
}


function renderSongInfo() {
    albumCover.attributes.src.value = songs[currentSong].Album_src
    songTitle.innerText = songs[currentSong].title
    songArtist.innerText = songs[currentSong].Artist
    setInterval(() => {
        songDuration.innerText = sToTime(audio.duration)
        songCurrentTime.innerText = sToTime(audio.currentTime)
        progressBar.min = 0
        progressBar.max = audio.duration
        progressBar.value = audio.currentTime
    }, 900)

}
progressBar.addEventListener('input', (e) => {
    audio.currentTime = e.target.value
})
function nextSong() {
    if (currentSong >= songs.length) {
        currentSong = songs.length - 1
        audioPlay()
    }
    audioPlay()
    currentSong += 1
    renderSongInfo()

}
function previousSong() {
    if (currentSong < 0) {
        currentSong = 0
        renderSongInfo()
    }
    currentSong -= 1
    renderSongInfo()
}

forward.addEventListener('click', () => {
    nextSong()
    audioPlay()
})

rewind.addEventListener('click', () => {
    previousSong()
    audioPlay()
})
renderSongInfo()

