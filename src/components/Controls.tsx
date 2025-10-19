
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
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-4 p-6 bg-card rounded-lg shadow-lg border border-primary/20 w-full max-w-md sm:max-w-xl md:max-w-2xl shadow-primary/10">
      <div className="flex items-center gap-3 w-full sm:w-auto bg-secondary/30 rounded-lg px-4 py-3 transition-all hover:bg-secondary/50 border border-secondary/30">
        <Timer className="h-5 w-5 text-primary drop-shadow-[0_0_4px_rgba(139,92,246,0.3)]" />
        <Select
          value={String(selectedTime)}
          onValueChange={(value) => onTimeChange(Number(value))}
          disabled={disabled}
        >
          <SelectTrigger className="w-full sm:w-[120px] bg-transparent border-0 p-0 focus:ring-0 text-primary font-medium">
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

      <div className="flex items-center gap-3 w-full sm:w-auto bg-secondary/30 rounded-lg px-4 py-3 transition-all hover:bg-secondary/50 border border-secondary/30">
        <Zap className="h-5 w-5 text-primary drop-shadow-[0_0_4px_rgba(139,92,246,0.3)]" />
         <Select
          value={selectedDifficulty}
          onValueChange={(value) => onDifficultyChange(value as Difficulty)}
          disabled={disabled}
        >
          <SelectTrigger className="w-full sm:w-[140px] bg-transparent border-0 p-0 focus:ring-0 capitalize text-primary font-medium">
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
      
      <Button 
        onClick={onRestart} 
        variant="default" 
        className="gap-2 w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl px-6 py-3"
      >
        <RotateCcw className="h-4 w-4" /> Restart
      </Button>
    </div>
  );
};

export default Controls;
