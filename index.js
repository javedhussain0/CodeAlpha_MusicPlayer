
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const playPauseBtn = document.getElementById('play-pause');
  const stopBtn = document.getElementById('stop');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const progress = document.getElementById('progress');
  const currentTimeSpan = document.getElementById('current-time');
  const durationSpan = document.getElementById('duration');

  const playlist = [
 'assets/song1.mpeg',
 'assets/song2.mpeg',
  ];
  let currentSongIndex = 0;

  function loadSong(index) {
      audio.src = playlist[index];
      audio.load();
  }

  loadSong(currentSongIndex);
//for the time update
  audio.addEventListener('loadedmetadata', () => {
      durationSpan.textContent = formatTime(audio.duration);
      progress.max = audio.duration;
    
  });

 //button functinality

  playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
          audio.play();
          playPauseBtn.textContent = 'Pause';
      } else {
          audio.pause();
          playPauseBtn.textContent = 'Play';
      }
  });

  stopBtn.addEventListener('click', () => {
      audio.pause();
      audio.currentTime = progress.duration;
      playPauseBtn.textContent = 'Play';
  });

  prevBtn.addEventListener('click', () => {
      if (currentSongIndex > 0) {
          currentSongIndex--;
          loadSong(currentSongIndex);
          audio.play();
          playPauseBtn.textContent = 'Pause';
      }
  });

  nextBtn.addEventListener('click', () => {
      if (currentSongIndex < playlist.length - 1) {
          currentSongIndex++;
          loadSong(currentSongIndex);
          audio.play();
          playPauseBtn.textContent = 'Pause';
      }
  });
  // progress bar
   audio.addEventListener('timeupdate', () => {
      currentTimeSpan.textContent = formatTime(audio.currentTime);
      progress.value = audio.currentTime;
  });

  progress.addEventListener('input', () => {
      audio.currentTime = progress.value;
      audio.play()     //seekbar

  });

  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
});