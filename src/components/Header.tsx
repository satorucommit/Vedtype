import React, { useState, useEffect } from 'react';
import { Type } from 'lucide-react';
import InfinityParticles from './InfinityParticles';

const TypingText: React.FC = () => {
  const text = "VedTyper";
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 150;
    const pauseTime = 1000;

    const timer = setTimeout(() => {
      if (isDeleting) {
        // Deleting phase
        setDisplayText(text.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
        
        if (currentIndex === 0) {
          setIsDeleting(false);
          setLoopCount(prev => prev + 1);
        }
      } else {
        // Typing phase
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
        
        if (currentIndex === text.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, text]);

  return (
    <h1 className="text-3xl font-bold text-primary">
      {displayText}
      <span className="ml-1 animate-pulse text-accent">|</span>
    </h1>
  );
};

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border bg-background">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 group">
          <Type className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]" />
          <TypingText />
        </div>
        <div className="flex items-center space-x-4">
          <InfinityParticles />
          <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
            <span className="px-2 py-1 bg-secondary/50 rounded-md border border-secondary">v1.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;