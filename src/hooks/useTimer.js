import { useState, useEffect, useRef } from 'react';

export const useTimer = (isRunning) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current); // Cleanup
  }, [isRunning]);

  const resetTimer = () => {
    setSeconds(0);
  };

  return { seconds, resetTimer };
};