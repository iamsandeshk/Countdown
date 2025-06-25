
import React, { useState, useEffect } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import RevealMessage from '@/components/RevealMessage';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showBirthdayWishes, setShowBirthdayWishes] = useState(false);
  const { toast } = useToast();

  // Target date: June 25th at 9:50 PM
  const targetDate = new Date('2025-06-25T21:50:00');
  
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
    setShowFullMessage(true);
    setShowBirthdayWishes(true);
    
    // Trigger confetti effect
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 500);
  };

  const toggleBirthdayWishes = () => {
    setShowBirthdayWishes(!showBirthdayWishes);
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
            <span className="block">
              {isCountdownComplete ? (
                <span className="bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  Happy Birthday! 🎉
                </span>
              ) : (
                "Awaiting a Special Moment"
              )}
            </span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto px-2">
            {isCountdownComplete 
              ? "The special moment has arrived! Here's your birthday surprise."
              : "Something extraordinary is coming. Return when the timer reaches zero to discover what's waiting for you."
            }
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
                <h2 className="text-3xl sm:text-4xl font-light mb-6 bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">
                  The Moment Has Arrived
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-8">
                  What you've been waiting for is now revealed.
                </p>
                
                {!showFullMessage ? (
                  <Button 
                    onClick={handleRevealFullMessage}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transition-all duration-300 px-6 sm:px-8 py-4 sm:py-6 text-base rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Reveal the Message ✨
                  </Button>
                ) : (
                  <div className="animate-fade-in space-y-6">
                    {/* Birthday Header */}
                    <div className="glass-panel p-6 rounded-2xl border border-pink-500/20">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="glass-panel p-4 rounded-xl">
                          <div className="text-2xl font-bold text-white">01</div>
                          <div className="text-sm text-gray-300">July</div>
                        </div>
                        <div className="glass-panel p-4 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20">
                          <div className="text-sm text-gray-300">2K25</div>
                        </div>
                        <div className="glass-panel p-4 rounded-xl">
                          <div className="text-sm text-gray-300">Age</div>
                          <div className="text-xl font-bold text-white">19 years</div>
                        </div>
                      </div>
                      <p className="text-lg text-gray-300 text-center">
                        "Hey!😜, you're still younger than you will be next year 🥳"
                      </p>
                    </div>

                    {/* Birthday Wishes Toggle */}
                    <Button 
                      onClick={toggleBirthdayWishes}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 px-6 py-3 rounded-full"
                    >
                      {showBirthdayWishes ? "Hide Wishes" : "See Birthday Wishes"} 🎂
                    </Button>

                    {/* Birthday Wishes */}
                    {showBirthdayWishes && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="glass-panel p-6 rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-purple-500/10">
                          <p className="text-lg text-gray-200">
                            "To a special person❤️, I wish you Never ending happiness!🥰"
                          </p>
                        </div>
                        
                        <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                          <p className="text-lg text-gray-200">
                            "A Day filled with Love❤️, Laughter, and all the things that make you Happy🥰"
                          </p>
                        </div>
                        
                        <div className="glass-panel p-6 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                          <p className="text-lg text-gray-200">
                            "On this special day❤️, may sun shine a little brighter, the smiles😊 be bit wider and joy🥳 be endless"
                          </p>
                        </div>
                        
                        <div className="glass-panel p-6 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
                          <p className="text-lg text-gray-200">
                            "You don't get older, you get better❤️."
                          </p>
                        </div>
                        
                        <div className="glass-panel p-6 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-teal-500/10">
                          <p className="text-lg text-gray-200">
                            "May your birthday🎂 be as amazing as you are❤️"
                          </p>
                        </div>

                        {/* Thank You Link */}
                        <div className="mt-8">
                          <a 
                            href="https://www.instagram.com/iamsandeshk/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 glass-panel px-6 py-3 rounded-full text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                          >
                            Say Thank You 📸
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </RevealMessage>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <footer className="mt-auto pt-10 pb-6 w-full text-center">
          <p className="text-gray-600 text-sm">
            {isCountdownComplete ? "Happy Birthday! 🎉" : "Come back when the time is right"}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
