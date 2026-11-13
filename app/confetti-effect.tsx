"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const PIECE_COUNT = 200;
const CONFETTI_DURATION_MS = 5000;
const RESIZE_DEBOUNCE_MS = 150;

function shouldShowConfetti() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches === false
  );
}

export default function ConfettiEffect() {
  const [mounted, setMounted] = useState(false);
  const [running, setRunning] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!shouldShowConfetti()) return;
    setMounted(true);
    setSize({ width: window.innerWidth, height: window.innerHeight });

    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }, RESIZE_DEBOUNCE_MS);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const stop = setTimeout(() => setRunning(false), CONFETTI_DURATION_MS);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timeout);
      clearTimeout(stop);
    };
  }, []);

  if (!mounted || !running || size.width === 0) return null;

  return (
    <Confetti
      width={size.width}
      height={size.height}
      numberOfPieces={PIECE_COUNT}
      recycle={false}
      onConfettiComplete={() => setRunning(false)}
    />
  );
}
