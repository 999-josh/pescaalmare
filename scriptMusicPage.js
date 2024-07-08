function togglePlayPause(audioId) {
    const audioElement = document.getElementById(audioId);
    const playPauseBtn = audioElement.parentElement.querySelector('.play-pause-btn i');
    
    if (audioElement.paused) {
        playAudio(audioElement, playPauseBtn);
    } else {
        pauseAudio(audioElement, playPauseBtn);
    }
}

function playAudio(audioElement, playPauseBtn) {
    audioElement.play();
    playPauseBtn.classList.remove('fa-play');
    playPauseBtn.classList.add('fa-pause');
}

function pauseAudio(audioElement, playPauseBtn) {
    audioElement.pause();
    playPauseBtn.classList.remove('fa-pause');
    playPauseBtn.classList.add('fa-play');
}

function seek(audioId, slider) {
    const audioElement = document.getElementById(audioId);
    const seekTo = audioElement.duration * (slider.value / 100);
    audioElement.currentTime = seekTo;
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('timeupdate', (event) => {
        const slider = event.target.parentElement.querySelector('.seek-slider');
        const currentTime = event.target.currentTime;
        const duration = event.target.duration;

        // Aggiorna il valore e la visualizzazione del seek slider
        slider.value = (currentTime / duration) * 100;

        // Aggiorna il tempo corrente e totale
        const currentTimeDisplay = event.target.parentElement.querySelector('.current-time');
        const totalTimeDisplay = event.target.parentElement.querySelector('.total-time');
        currentTimeDisplay.textContent = formatTime(currentTime);
        totalTimeDisplay.textContent = formatTime(duration);
    });

    audio.addEventListener('play', (event) => {
        const playPauseBtn = event.target.parentElement.querySelector('.play-pause-btn i');
        playAudio(event.target, playPauseBtn);
    });

    audio.addEventListener('pause', (event) => {
        const playPauseBtn = event.target.parentElement.querySelector('.play-pause-btn i');
        pauseAudio(event.target, playPauseBtn);
    });
});
