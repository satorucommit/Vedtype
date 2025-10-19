
import React, { useState, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Controls from '@/components/Controls';
import TypingArea from '@/components/TypingArea';
import Results from '@/components/Results';
import useTypingGame from '@/hooks/useTypingGame';
import { Difficulty } from '@/lib/paragraphs';

const timeOptions = [15, 30, 60, 120];
const difficultyOptions: Difficulty[] = ["easy", "medium", "hard"];

const Index = () => {
  const [selectedTime, setSelectedTime] = useState<number>(timeOptions[1]); // Default to 30s
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(difficultyOptions[0]); // Default to easy
  
  const {
    paragraph,
    typedText,
    charStates,
    timeLeft,
    timerRunning,
    testFinished,
    wpm,
    accuracy,
    errors,
    correctChars,
    handleInputChange,
    handleKeyDown,
    resetTest,
    setParagraph, // exposing these to allow Controls to update them indirectly
    setTypedText,
  } = useTypingGame(selectedTime, selectedDifficulty);

  const handleTimeChange = useCallback((time: number) => {
    setSelectedTime(time);
    resetTest(time, selectedDifficulty);
  }, [selectedDifficulty, resetTest]);

  const handleDifficultyChange = useCallback((difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    resetTest(selectedTime, difficulty);
  }, [selectedTime, resetTest]);

  const handleRestart = useCallback(() => {
    resetTest(selectedTime, selectedDifficulty);
  }, [selectedTime, selectedDifficulty, resetTest]);

  // Focus input on load and after restart/settings change
  useEffect(() => {
    // TypingArea handles its own focus, this is more for initial load if needed
    // Or after parameters change and test isn't running.
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (inputElement && !timerRunning && !testFinished) {
      inputElement.focus();
    }
  }, [selectedTime, selectedDifficulty, timerRunning, testFinished]);


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-start">
        <div className="w-full max-w-4xl flex flex-col items-center">
          <Controls
            timeOptions={timeOptions}
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
            difficultyOptions={difficultyOptions}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={handleDifficultyChange}
            onRestart={handleRestart}
            disabled={timerRunning && !testFinished}
          />
          <Results 
            wpm={wpm} 
            accuracy={accuracy} 
            errors={errors}
            timeInitial={selectedTime}
            timeLeft={timeLeft}
            testFinished={testFinished} 
          />
          {!testFinished && (
            <TypingArea
              charStates={charStates}
              typedText={typedText}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={testFinished || timeLeft === 0}
              currentTypedIndex={typedText.length}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

