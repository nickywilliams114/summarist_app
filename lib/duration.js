"use client";

import { useEffect, useState } from "react";

// The API has no duration field, so it's read from each book's audio metadata.
// Results are cached per audio link so each file is only probed once per visit.
const cache = new Map();

function loadDuration(audioLink) {
  if (!cache.has(audioLink)) {
    const promise = new Promise((resolve) => {
      const audio = new Audio();
      audio.preload = "metadata";
      audio.onloadedmetadata = () => resolve(audio.duration);
      audio.onerror = () => resolve(null);
      audio.src = audioLink;
    });
    cache.set(audioLink, promise);
  }
  return cache.get(audioLink);
}

export function useAudioDuration(audioLink) {
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (!audioLink) return;
    let cancelled = false;
    loadDuration(audioLink).then((seconds) => {
      if (!cancelled) setDuration(seconds);
    });
    return () => {
      cancelled = true;
    };
  }, [audioLink]);

  return duration;
}

// 292 -> "04:52"
export function formatTime(totalSeconds) {
  if (!totalSeconds || isNaN(totalSeconds)) return "00:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// 292 -> "4 mins 52 secs"
export function formatLongTime(totalSeconds) {
  if (!totalSeconds || isNaN(totalSeconds)) return "";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes} mins ${seconds} secs`;
}

export function BookDuration({ audioLink, long = false }) {
  const duration = useAudioDuration(audioLink);
  if (duration === null) return <>--:--</>;
  return <>{long ? formatLongTime(duration) : formatTime(duration)}</>;
}
