
import React, { useState, useEffect } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import RevealMessage from '@/components/RevealMessage';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { toast } = useToast();

  // Target date: March 10th at 12am
  const targetDate = new Date('2025-03-31T00:00:00');
  
  // Check if the countdown is already complete on page load
  useEffect(() => {
    const now = new Date();
    if (now >= targetDate) {
      setIsCountdownComplete(true);
    }
    
    // Set page as loaded after a short delay to allow for animations
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [targetDate]);

  const handleCountdownComplete = () => {
    setIsCountdownComplete(true);
    toast({
      title: "Moment has arrived",
      description: "The countdown has reached zero. The message is now available.",
    });
  };

  const handleRevealFullMessage = () => {
    // Instead of directly navigating to an HTML file, we'll open it in a new tab/window
    // This ensures it works both locally and when deployed
    const fullURL = 'https://iamsandeshk.github.io/birthday/';
    window.open(fullURL);
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative py-8 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] bg-[radial-gradient(circle_at_center,rgba(45,45,45,0.1),rgba(5,5,5,0.4))] animate-pulse-soft"></div>
      </div>
      
      <div className={`w-full max-w-4xl mx-auto flex flex-col items-center transition-all duration-700 ease-out ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <div className="staggered mb-10 md:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight mb-4 md:mb-6">
            <span className="block">Awaiting a Special Moment</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto px-2">
            Something extraordinary is coming. Return when the timer reaches zero to discover what's waiting for you.
          </p>
        </div>
        
        {/* Main Content */}
        <div className="w-full flex justify-center">
          {!isCountdownComplete ? (
            <div className="countdown-section relative w-full max-w-2xl flex flex-col items-center">
              <CountdownTimer 
                targetDate={targetDate}
                onComplete={handleCountdownComplete}
                className="mb-6 md:mb-10"
              />
              
              <div className="staggered text-center mt-6 md:mt-10 px-4">
                <p className="text-gray-300 text-lg sm:text-xl font-light">
                  Please return when the countdown reaches zero
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  This message will be revealed at the designated time
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <RevealMessage isRevealed={true} className="text-center mb-10 glass-panel p-6 sm:p-10 w-full max-w-2xl mx-4">
                <h2 className="text-3xl sm:text-4xl font-light mb-6">The Moment Has Arrived</h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-8">
                  What you've been waiting for is now revealed.
                </p>
                
                {!showFullMessage ? (
                  <Button 
                    onClick={handleRevealFullMessage}
                    className="bg-white text-black hover:bg-gray-200 transition-all duration-300 px-6 sm:px-8 py-4 sm:py-6 text-base rounded-full"
                  >
                    Reveal the Message
                  </Button>
                ) : (
                  <div className="animate-fade-in">
                    <p className="text-xl sm:text-2xl mb-6">Your special moment awaits.</p>
                    <p className="text-gray-400">This is the beginning of something memorable.</p>
                  </div>
                )}
              </RevealMessage>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <footer className="mt-auto pt-10 pb-6 w-full text-center">
          <p className="text-gray-600 text-sm">
            Come back when the time is right
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
