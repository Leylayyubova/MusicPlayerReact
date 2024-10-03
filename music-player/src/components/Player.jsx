import React, { useRef, useState, useEffect } from "react";
import Track from "./Track";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faBackward, faForward } from "@fortawesome/free-solid-svg-icons";

const songs = [
  { title: "Me Gustas Tu", artist: "Manu Chaou", url: "manu.mp3", albumArt: "./assets/manu.jpg" },
  { title: "Barbie Girl", artist: "Aqua", url: "aqua.mp3", albumArt: "./assets/aqua.jpg" },
  { title: "Cherry lady", artist: "Modern Talking", url: "cherry.mp3", albumArt: "./assets/cherry.jpg" },
];

function Player() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    audioRef.current.src = songs[currentSongIndex].url;
    audioRef.current.load();
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [currentSongIndex, isPlaying]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="player">
      <audio
        ref={audioRef}
        onEnded={() => setCurrentSongIndex((currentSongIndex + 1) % songs.length)}
        onTimeUpdate={handleTimeUpdate}
      />
      <img
        src={songs[currentSongIndex].albumArt}
        alt={`${songs[currentSongIndex].title} albomu`}
        className="albumArt"
      />
      <Track title={songs[currentSongIndex].title} artist={songs[currentSongIndex].artist} />

      <div className="time-container">
        <span className="current-time">{formatTime(currentTime)}</span>
        <input
          type="range"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleProgressChange}
          className="progress-bar"
        />
        <span className="duration">{formatTime(duration)}</span>
      </div>

      <div className="controls"> 
        <button onClick={() => setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length)}>
          <FontAwesomeIcon icon={faBackward} />
        </button>

        <button onClick={togglePlayPause}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>

        <button onClick={() => setCurrentSongIndex((currentSongIndex + 1) % songs.length)}>
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </div>
  );
}

export default Player;
