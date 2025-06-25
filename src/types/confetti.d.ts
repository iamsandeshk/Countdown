
declare global {
  interface Window {
    confetti: (options?: {
      particleCount?: number;
      spread?: number;
      origin?: { y: number };
      colors?: string[];
      startVelocity?: number;
      gravity?: number;
      drift?: number;
      ticks?: number;
      shapes?: string[];
      scalar?: number;
      zIndex?: number;
    }) => Promise<void>;
  }
}

export {};
