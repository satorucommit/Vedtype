
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Target, Clock } from 'lucide-react';

interface ResultsProps {
  wpm: number;
  accuracy: number;
  errors: number;
  timeInitial: number;
  timeLeft: number;
  testFinished: boolean;
}

const Results: React.FC<ResultsProps> = ({ wpm, accuracy, errors, timeInitial, timeLeft, testFinished }) => {
  if (!testFinished) {
    // Enhanced timer display when the test is active
    return (
      <div className="flex justify-center items-center my-4 w-full">
        <div className="p-6 bg-card rounded-lg shadow-lg border border-primary/20 text-center w-full max-w-sm mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary drop-shadow-[0_0_4px_rgba(139,92,246,0.3)]" />
            <h3 className="text-lg uppercase tracking-wider text-muted-foreground">
              Time Remaining
            </h3>
          </div>
          <div className="flex justify-center items-center mb-4">
            <p className="text-6xl font-bold text-primary">
              {timeLeft}
            </p>
          </div>
          <div className="w-full bg-secondary/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 ease-linear" 
              style={{ width: `${((timeInitial - timeLeft) / timeInitial) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Show full results card when test is finished
  const timeTaken = timeInitial - timeLeft;

  return (
    <div className="my-8 w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-lg border border-primary/20 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 text-center">
          <h2 className="text-3xl font-bold text-primary">
            Test Completed!
          </h2>
          <p className="text-muted-foreground mt-2">Here are your results</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg transition-all hover:bg-secondary/30 border border-secondary/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-green-500 drop-shadow-[0_0_4px_rgba(34,197,94,0.3)]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Words Per Minute</p>
                <p className="text-lg font-semibold">WPM</p>
              </div>
            </div>
            <span className="text-3xl font-bold text-green-500">{wpm}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg transition-all hover:bg-secondary/30 border border-secondary/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-blue-500 drop-shadow-[0_0_4px_rgba(59,130,246,0.3)]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-lg font-semibold">Correctness</p>
              </div>
            </div>
            <span className="text-3xl font-bold text-blue-500">{accuracy}%</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg transition-all hover:bg-secondary/30 border border-secondary/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <XCircle className="h-6 w-6 text-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.3)]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-lg font-semibold">Mistakes</p>
              </div>
            </div>
            <span className="text-3xl font-bold text-red-500">{errors}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg transition-all hover:bg-secondary/30 border border-secondary/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-yellow-500 drop-shadow-[0_0_4px_rgba(234,179,8,0.3)]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Taken</p>
                <p className="text-lg font-semibold">Duration</p>
              </div>
            </div>
            <span className="text-3xl font-bold text-yellow-500">{timeTaken}s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
