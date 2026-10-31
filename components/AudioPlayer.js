"use client";

import React, { useState, useRef } from "react";
import { MdForward10, MdReplay10 } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";
import { formatTime } from "@/lib/duration";

const SKIP_SECONDS = 10;

const AudioPlayer = ({ book, onEnded }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const seekTo = (seconds) => {
    const audio = audioRef.current;
    audio.currentTime = Math.min(Math.max(seconds, 0), duration || 0);
    setCurrentTime(audio.currentTime);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio__wrapper">
      <audio
        ref={audioRef}
        src={book.audioLink}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          onEnded?.();
        }}
      ></audio>

      <div className="audio__track--wrapper">
        <figure className="audio__track--image-mask">
          <img src={book.imageLink} alt={book.title} />
        </figure>
        <div className="audio__track--details-wrapper">
          <div className="audio__track--title">{book.title}</div>
          <div className="audio__track--author">{book.author}</div>
        </div>
      </div>

      <div className="audio__controls--wrapper">
        <div className="audio__controls">
          <button
            className="audio__controls--btn"
            onClick={() => seekTo(currentTime - SKIP_SECONDS)}
            aria-label="Back 10 seconds"
          >
            <MdReplay10 />
          </button>
          <button
            className="audio__controls--btn audio__controls--btn-play"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause /> : <FaPlay className="audio__controls--play-icon" />}
          </button>
          <button
            className="audio__controls--btn"
            onClick={() => seekTo(currentTime + SKIP_SECONDS)}
            aria-label="Forward 10 seconds"
          >
            <MdForward10 />
          </button>
        </div>
      </div>

      <div className="audio__progress--wrapper">
        <div className="audio__time">{formatTime(currentTime)}</div>
        <input
          type="range"
          className="audio__progress--bar"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={(e) => seekTo(Number(e.target.value))}
          style={{ "--progress": `${progress}%` }}
          aria-label="Seek"
        />
        <div className="audio__time">{formatTime(duration)}</div>
      </div>
    </div>
  );
};

export default AudioPlayer;
