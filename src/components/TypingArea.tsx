
import React, { useRef, useEffect } from 'react';
import TypingChar from './TypingChar';
import { TypedChar } from '@/hooks/useTypingGame';
import { Input } from '@/components/ui/input';

interface TypingAreaProps {
  charStates: TypedChar[];
  typedText: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled: boolean;
  currentTypedIndex: number;
}

const TypingArea: React.FC<TypingAreaProps> = ({
  charStates,
  typedText,
  onInputChange,
  onKeyDown,
  disabled,
  currentTypedIndex,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the component mounts or when the test is not disabled (e.g., on restart)
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-4" onClick={() => inputRef.current?.focus()}>
      <div
        className="text-left p-8 bg-card rounded-lg shadow-lg leading-relaxed tracking-wider select-none min-h-[180px] flex flex-wrap items-center border border-primary/20 shadow-primary/10"
        aria-label="Text to type"
      >
        {charStates.map((charObj, index) => (
          <TypingChar
            key={`${charObj.char}-${index}`}
            char={charObj.char}
            state={charObj.state}
            isCurrent={index === currentTypedIndex && !disabled}
          />
        ))}
        {charStates.length === 0 && <p className="text-muted-foreground font-mono text-2xl">Loading text...</p>}
      </div>
      <Input
        ref={inputRef}
        type="text"
        value={typedText}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-default"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </div>
  );
};

export default TypingArea;

