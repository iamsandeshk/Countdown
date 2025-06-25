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
  const targetDate = new Date('2025-06-25T22:34:00');
  
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
      if (typeof window !== 'undefined' && (window as any).confetti) {
        (window as any).confetti({
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

  const wishes = [
    "To a special person❤️, I wish you Never ending happiness!🥰",
    "A Day filled with Love❤️, Laughter, and all the things that make you Happy🥰",
    "On this special day❤️, may sun shine a little brighter, the smiles😊 be bit wider and joy🥳 be endless",
    "You don't get older, you get better❤️.",
    "May your birthday🎂 be as amazing as you are❤️"
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative py-8 px-4 overflow-hidden font-dancing">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] bg-[radial-gradient(circle_at_center,rgba(45,45,45,0.1),rgba(5,5,5,0.4))] animate-pulse-soft"></div>
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-pink-400 rounded-full animate-float-slow opacity-60"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-rose-400 rounded-full animate-float-medium opacity-70"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-amber-400 rounded-full animate-float-fast opacity-50"></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-fuchsia-400 rounded-full animate-float-slow opacity-60"></div>
      </div>
      
      <div className={`w-full max-w-4xl mx-auto flex flex-col items-center transition-all duration-700 ease-out ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <div className="staggered mb-10 md:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-dancing font-bold tracking-tight mb-4 md:mb-6">
            <span className="block">
              {isCountdownComplete ? (
                <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-fuchsia-400 bg-clip-text text-transparent animate-pulse">
                  Happy Birthday! 🎉
                </span>
              ) : (
                "Awaiting a Special Moment"
              )}
            </span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto px-2 font-poppins">
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
              <RevealMessage isRevealed={true} className="text-center mb-10 w-full max-w-2xl mx-4">
                <p className="text-lg sm:text-xl text-gray-300 mb-8 font-poppins">
                  What you've been waiting for is now revealed.
                </p>
                
                {!showFullMessage ? (
                  <Button 
                    onClick={handleRevealFullMessage}
                    className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white transition-all duration-300 px-6 sm:px-8 py-4 sm:py-6 text-base rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 font-poppins"
                  >
                    Reveal the Message ✨
                  </Button>
                ) : (
                  <div className="animate-fade-in space-y-6">
                    {/* Birthday Header - Improved Cards */}
                    <div className="flex justify-center gap-3 sm:gap-4 mb-8 flex-wrap">
                      <div className="bg-gradient-to-br from-rose-500/20 to-pink-600/20 backdrop-blur-sm border border-rose-400/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transform hover:scale-105 transition-all duration-300 animate-birthday-float-1 shadow-lg">
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-white mb-2 font-dancing">01</div>
                          <div className="text-xs sm:text-sm text-rose-200 font-poppins">July</div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 backdrop-blur-sm border border-fuchsia-400/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transform hover:scale-105 transition-all duration-300 animate-birthday-float-2 shadow-lg">
                        <div className="text-center">
                          <div className="text-xs sm:text-sm text-fuchsia-200 mb-2 font-poppins">Year</div>
                          <div className="text-lg sm:text-xl font-bold text-white font-dancing">2K25</div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transform hover:scale-105 transition-all duration-300 animate-birthday-float-3 shadow-lg">
                        <div className="text-center">
                          <div className="text-xs sm:text-sm text-amber-200 mb-2 font-poppins">Age</div>
                          <div className="text-xl sm:text-2xl font-bold text-white font-dancing">19</div>
                        </div>
                      </div>
                    </div>

                    {/* Cute Message */}
                    <div className="bg-gradient-to-r from-orange-500/15 to-rose-500/15 backdrop-blur-sm border border-orange-400/25 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-8 animate-birthday-float-1 shadow-lg">
                      <p className="text-base sm:text-lg text-rose-100 text-center leading-relaxed font-poppins font-medium">
                        "Hey!😜, you're still younger than you will be next year 🥳"
                      </p>
                    </div>

                    {/* Birthday Wishes Toggle */}
                    <Button 
                      onClick={toggleBirthdayWishes}
                      className="bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white transition-all duration-300 px-6 py-3 rounded-full transform hover:scale-105 shadow-lg font-poppins"
                    >
                      {showBirthdayWishes ? "Hide Wishes" : "See Birthday Wishes"} 🎂
                    </Button>

                    {/* Birthday Wishes - Alternating Layout */}
                    {showBirthdayWishes && (
                      <div className="space-y-6 sm:space-y-8 mt-8 max-w-4xl mx-auto">
                        {wishes.map((wish, index) => (
                          <div
                            key={index}
                            className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} animate-fade-in px-2 sm:px-0`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                          >
                            <div className={`
                              max-w-xs sm:max-w-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-sm border transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg
                              ${index % 3 === 0 
                                ? 'bg-gradient-to-br from-rose-500/15 to-pink-500/15 border-rose-400/25 animate-birthday-wish-float-1' 
                                : index % 3 === 1
                                ? 'bg-gradient-to-br from-fuchsia-500/15 to-purple-500/15 border-fuchsia-400/25 animate-birthday-wish-float-2'
                                : 'bg-gradient-to-br from-amber-500/15 to-orange-500/15 border-amber-400/25 animate-birthday-wish-float-3'
                              }
                            `}>
                              <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-poppins font-medium">
                                {wish}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        {/* Thank You Link - Updated to WhatsApp */}
                        <div className="mt-12 text-center">
                          <a 
                            href="https://wa.me/919353173113?text=Thank%20you%20for%20the%20amazing%20birthday%20surprise!%20🎉" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm border border-emerald-400/30 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white hover:bg-gradient-to-r hover:from-emerald-500/30 hover:to-green-500/30 transition-all duration-300 transform hover:scale-105 animate-birthday-float-2 shadow-lg text-sm sm:text-base font-poppins"
                          >
                            Say Thank You 💬
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
          <p className="text-gray-600 text-sm font-poppins">
            {isCountdownComplete ? "Happy Birthday! 🎉" : "Come back when the time is right"}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
