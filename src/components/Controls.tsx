
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Timer, Zap, RotateCcw } from 'lucide-react';
import { Difficulty } from '@/lib/paragraphs';

interface ControlsProps {
  timeOptions: number[];
  selectedTime: number;
  onTimeChange: (time: number) => void;
  difficultyOptions: Difficulty[];
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onRestart: () => void;
  disabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  timeOptions,
  selectedTime,
  onTimeChange,
  difficultyOptions,
  selectedDifficulty,
  onDifficultyChange,
  onRestart,
  disabled,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-8 p-4 bg-card rounded-lg shadow w-full max-w-md sm:max-w-xl md:max-w-2xl">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Timer className="h-5 w-5 text-primary" />
        <Select
          value={String(selectedTime)}
          onValueChange={(value) => onTimeChange(Number(value))}
          disabled={disabled}
        >
          <SelectTrigger className="w-full sm:w-[120px] bg-background">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((time) => (
              <SelectItem key={time} value={String(time)}>
                {time}s
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Zap className="h-5 w-5 text-primary" />
         <Select
          value={selectedDifficulty}
          onValueChange={(value) => onDifficultyChange(value as Difficulty)}
          disabled={disabled}
        >
          <SelectTrigger className="w-full sm:w-[140px] bg-background capitalize">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficultyOptions.map((diff) => (
              <SelectItem key={diff} value={diff} className="capitalize">
                {diff}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button onClick={onRestart} variant="outline" className="gap-2 w-full sm:w-auto">
        <RotateCcw className="h-4 w-4" /> Restart
      </Button>
    </div>
  );
};

export default Controls;
