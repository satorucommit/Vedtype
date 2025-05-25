
import React from 'react';
import { cn } from '@/lib/utils';

interface TypingCharProps {
  char: string;
  state: 'default' | 'correct' | 'incorrect' | 'extra';
  isCurrent: boolean;
}

const TypingChar: React.FC<TypingCharProps> = ({ char, state, isCurrent }) => {
  return (
    <span
      className={cn(
        'font-mono text-xl sm:text-2xl md:text-3xl relative transition-colors duration-150', // Adjusted font size
        {
          'text-muted-foreground': state === 'default',
          'text-green-400': state === 'correct',
          'text-red-500': state === 'incorrect',
          'text-red-600 bg-red-900/50 rounded': state === 'extra',
          'border-b-2 border-primary animate-caret-blink': isCurrent && state !== 'extra',
        },
        isCurrent && char === ' ' && 'min-w-[0.25em] inline-block',
        char === ' ' ? 'px-[0.1em]' : ''
      )}
    >
      {isCurrent && state !== 'extra' && (
        <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-primary animate-caret-blink rounded-full" />
      )}
      {char === ' ' && state === 'incorrect' ? <span className="bg-red-500/30 rounded px-[0.1em]">_</span> : char}
    </span>
  );
};

export default TypingChar;
