
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate,
  onComplete,
  className
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false
  });
  
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false
  });

  const [flippingDigits, setFlippingDigits] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });

  const calculateTimeLeft = useCallback(() => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      onComplete?.();
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true
      };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false
    };
  }, [targetDate, onComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setPrevTimeLeft(timeLeft);
      setTimeLeft(newTimeLeft);
      
      // Trigger flip animations when digits change
      setFlippingDigits({
        days: prevTimeLeft.days !== newTimeLeft.days,
        hours: prevTimeLeft.hours !== newTimeLeft.hours,
        minutes: prevTimeLeft.minutes !== newTimeLeft.minutes,
        seconds: prevTimeLeft.seconds !== newTimeLeft.seconds
      });
      
      // Reset flip state after animation completes
      setTimeout(() => {
        setFlippingDigits({
          days: false,
          hours: false,
          minutes: false,
          seconds: false
        });
      }, 500);
      
    }, 1000);
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    return () => clearInterval(timer);
  }, [calculateTimeLeft, prevTimeLeft, timeLeft]);

  // Pad single digits with a leading zero
  const padWithZero = (num: number) => {
    return String(num).padStart(2, '0');
  };

  // Create digit display with animation class
  const renderDigit = (value: number, isFlipping: boolean, label: string, delay: number) => {
    const paddedValue = padWithZero(value);
    return (
      <div className={cn(
        "flex flex-col items-center",
        `delayed-${delay}`,
        "staggered"
      )}>
        <div className="digit-container">
          <div className={cn(
            "digit glass-panel w-20 h-24 md:w-24 md:h-28 flex items-center justify-center text-3xl md:text-4xl font-light mb-2",
            isFlipping && "flip"
          )}>
            {paddedValue}
          </div>
        </div>
        <span className="text-xs text-gray-400 uppercase tracking-widest">{label}</span>
      </div>
    );
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex gap-4 md:gap-6 justify-center mb-8">
        {renderDigit(timeLeft.days, flippingDigits.days, "Days", 1)}
        <div className="self-center text-2xl font-thin mb-8">:</div>
        {renderDigit(timeLeft.hours, flippingDigits.hours, "Hours", 2)}
        <div className="self-center text-2xl font-thin mb-8">:</div>
        {renderDigit(timeLeft.minutes, flippingDigits.minutes, "Minutes", 3)}
        <div className="self-center text-2xl font-thin mb-8">:</div>
        {renderDigit(timeLeft.seconds, flippingDigits.seconds, "Seconds", 4)}
      </div>
    </div>
  );
};

export default CountdownTimer;
