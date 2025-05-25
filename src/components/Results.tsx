
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
      <div className="flex justify-center my-8 w-full max-w-sm mx-auto">
        <Card className="p-6 bg-card rounded-lg shadow-lg text-center w-full border-2 border-primary/50">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-lg uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-2">
              <Clock className="h-5 w-5" />
              Time Remaining
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-6xl font-bold text-primary mt-1">{timeLeft}s</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show full results card when test is finished
  const timeTaken = timeInitial - timeLeft;

  return (
    <Card className="my-8 w-full max-w-md mx-auto shadow-xl animate-in fade-in duration-500">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary">Test Completed!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-green-500" />
            <span className="text-lg">Words Per Minute:</span>
          </div>
          <span className="text-2xl font-semibold text-green-400">{wpm}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-blue-500" />
            <span className="text-lg">Accuracy:</span>
          </div>
          <span className="text-2xl font-semibold text-blue-400">{accuracy}%</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
          <div className="flex items-center gap-2">
            <XCircle className="h-6 w-6 text-red-500" />
            <span className="text-lg">Errors:</span>
          </div>
          <span className="text-2xl font-semibold text-red-400">{errors}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-yellow-500" />
            <span className="text-lg">Time Taken:</span>
          </div>
          <span className="text-2xl font-semibold text-yellow-400">{timeTaken}s</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Results;
