import { useState, useEffect, useCallback } from 'react';
import { getParagraph, Difficulty, resetParagraphMemory } from '@/lib/paragraphs';

export type CharState = 'default' | 'correct' | 'incorrect' | 'extra';

export interface TypedChar {
  char: string;
  state: CharState;
}

const PARAGRAPH_FETCH_THRESHOLD = 50; // Increased threshold for longer paragraphs

const useTypingGame = (initialTime: number, initialDifficulty: Difficulty) => {
  const [paragraph, setParagraph] = useState<string>(() => {
    resetParagraphMemory(); // Reset memory before getting initial paragraph
    return getParagraph(initialDifficulty);
  });
  const [typedText, setTypedText] = useState<string>("");
  const [charStates, setCharStates] = useState<TypedChar[]>([]);
  
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [testFinished, setTestFinished] = useState<boolean>(false);

  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [correctChars, setCorrectChars] = useState<number>(0); // This state might be less relevant for "net WPM" if not used in final calculation.

  const resetTest = useCallback((newTime?: number, newDifficulty?: Difficulty) => {
    setTimerRunning(false);
    setTestFinished(false);
    setTimeLeft(newTime !== undefined ? newTime : initialTime);
    resetParagraphMemory(); // Reset paragraph generation memory
    setParagraph(getParagraph(newDifficulty !== undefined ? newDifficulty : initialDifficulty));
    setTypedText("");
    setCharStates([]); // Will be repopulated by the effect below
    setWpm(0);
    setAccuracy(0);
    setErrors(0);
    setCorrectChars(0);
  }, [initialTime, initialDifficulty]); // initialDifficulty is a dependency here for getParagraph

  // Effect to reset test when initialTime or initialDifficulty props change
  useEffect(() => {
    resetTest(initialTime, initialDifficulty);
  }, [initialTime, initialDifficulty, resetTest]);


  // Effect to update charStates and handle game logic based on typedText and paragraph
  useEffect(() => {
    const newCharStates: TypedChar[] = [];
    let currentErrors = 0;
    let currentCorrectChars = 0;

    for (let i = 0; i < Math.max(paragraph.length, typedText.length); i++) {
      const paragraphChar = paragraph[i];
      const typedChar = typedText[i];

      if (i < typedText.length) { // Character has been typed
        if (i < paragraph.length) { // Comparing with paragraph character
          if (typedChar === paragraphChar) {
            newCharStates.push({ char: paragraphChar, state: 'correct' });
            currentCorrectChars++;
          } else {
            newCharStates.push({ char: paragraphChar, state: 'incorrect' });
            currentErrors++;
          }
        } else { // Extra character typed beyond current paragraph (before it possibly extends)
          newCharStates.push({ char: typedChar, state: 'extra' });
          currentErrors++;
        }
      } else { // Character in paragraph not yet typed
         newCharStates.push({ char: paragraphChar, state: 'default' });
      }
    }
    setCharStates(newCharStates);
    setErrors(currentErrors);
    setCorrectChars(currentCorrectChars); // Tracks correct characters typed so far

    // Start timer on first typed character if not already running/finished
    if (typedText.length > 0 && !timerRunning && !testFinished) {
      setTimerRunning(true);
    }
    
    // Logic for endless paragraph: fetch more text if nearing the end
    if (
      !testFinished &&
      timerRunning &&
      paragraph.length > 0 && // Ensure there's an initial paragraph
      typedText.length >= paragraph.length - PARAGRAPH_FETCH_THRESHOLD
    ) {
      // Append new paragraph. Uses initialDifficulty as the difficulty for the current test session.
      setParagraph(prevParagraph => prevParagraph + " " + getParagraph(initialDifficulty));
    }

    // IMPORTANT: Test completion based on paragraph being fully typed is REMOVED.
    // Test now only finishes when time runs out (handled in the timer useEffect).

  }, [typedText, paragraph, timerRunning, testFinished, initialDifficulty]); // Added initialDifficulty as getParagraph uses it


  // Effect for the countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timerRunning && timeLeft > 0 && !testFinished) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) { // Timer reached zero
      setTimerRunning(false);
      setTestFinished(true); // Finish the test
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft, testFinished]);

  // Effect to calculate WPM and Accuracy when the test is finished
  useEffect(() => {
    if (testFinished) {
      const timeTakenMinutes = (initialTime - timeLeft) / 60; // This will be initialTime / 60 if timeLeft is 0
      
      if (timeTakenMinutes > 0) {
        // Standard WPM: (all typed characters / 5) / time_in_minutes
        // The `/ 5` is because an average word is 5 chars long.
        // Use typedText.length for gross WPM.
        const grossWpm = (typedText.length / 5) / timeTakenMinutes;
        setWpm(Math.round(grossWpm > 0 ? grossWpm : 0));
        
        // Accuracy calculation: (typed_length - errors) / typed_length
        // Ensure totalTyped is at least 1 to avoid division by zero if nothing was typed.
        const totalTypedChars = typedText.length;
        if (totalTypedChars > 0) {
          const acc = Math.round(((totalTypedChars - errors) / totalTypedChars) * 100);
          setAccuracy(Math.max(0, acc)); // Ensure accuracy is not negative
        } else {
          setAccuracy(0); // No characters typed, so 0 accuracy
        }
      } else {
        setWpm(0);
        setAccuracy(0);
      }
    }
  }, [testFinished, typedText, errors, initialTime, timeLeft]); // timeLeft included as it defines exact timeTaken

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (testFinished) return; // Don't allow input if test is finished
    setTypedText(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Existing logic to start timer on first valid key press (if not already started)
    // This ensures timer starts even if handleInputChange is slightly delayed or for non-character keys initially.
    if (typedText.length === 0 && !timerRunning && !testFinished) {
        // Check for actual typing keys, not just modifiers
        if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
             setTimerRunning(true);
        }
    }
    // No changes needed for backspace or other specific key handling here for "endless" text
  };


  return {
    paragraph, // This will now be the dynamically growing paragraph
    typedText,
    charStates, // Will reflect the state of the growing paragraph
    timeLeft,
    timerRunning,
    testFinished,
    wpm,
    accuracy,
    errors,
    correctChars, // Tracks correctly typed characters
    handleInputChange,
    handleKeyDown,
    resetTest,
    // Exposing these might not be strictly necessary if Index.tsx doesn't directly set them anymore
    setParagraph, // Keep if direct manipulation is ever needed, though internal logic now handles growth
    setTypedText, // Keep for similar reasons or direct reset needs outside of resetTest
  };
};

export default useTypingGame;
