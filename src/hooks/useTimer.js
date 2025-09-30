import { useEffect, useState } from 'react';

export default function useTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let id;
    if (isRunning) id = setInterval(() => setSeconds(p => p + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  const formatTime = () => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return { isRunning, seconds, formatTime, toggle: () => setIsRunning(v => !v), reset: () => { setIsRunning(false); setSeconds(0); } };
}
