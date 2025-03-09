
import React from 'react';
import { cn } from '@/lib/utils';

interface RevealMessageProps {
  isRevealed: boolean;
  className?: string;
}

const RevealMessage: React.FC<RevealMessageProps & React.HTMLAttributes<HTMLDivElement>> = ({ 
  isRevealed,
  children,
  className,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "reveal-message transition-all duration-700 ease-out",
        isRevealed && "visible animate-fade-in",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default RevealMessage;
