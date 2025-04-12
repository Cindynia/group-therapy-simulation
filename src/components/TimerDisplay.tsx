
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";

interface TimerDisplayProps {
  totalMinutes: number;
  currentMinute: number;
  onSessionEnd: () => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  totalMinutes, 
  currentMinute, 
  onSessionEnd 
}) => {
  const [progress, setProgress] = useState(0);
  const [timeDisplay, setTimeDisplay] = useState('');
  
  useEffect(() => {
    // Calculate progress percentage
    const progressPercent = (currentMinute / totalMinutes) * 100;
    setProgress(progressPercent);
    
    // Calculate time remaining
    const minutesRemaining = totalMinutes - currentMinute;
    const minutesText = minutesRemaining === 1 ? 'minute' : 'minutes';
    setTimeDisplay(`${minutesRemaining} ${minutesText} remaining`);
    
    // Check if session has ended
    if (currentMinute >= totalMinutes) {
      onSessionEnd();
    }
  }, [currentMinute, totalMinutes, onSessionEnd]);
  
  const colorClass = currentMinute > totalMinutes * 0.8 
    ? 'text-red-600' 
    : currentMinute > totalMinutes * 0.5 
      ? 'text-orange-500' 
      : 'text-green-600';
  
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-between w-full mb-1">
        <span className="text-sm font-medium">Session Timer</span>
        <span className={`text-sm font-semibold ${colorClass}`}>
          {timeDisplay}
        </span>
      </div>
      <Progress 
        value={progress} 
        className="h-2 w-full" 
        indicatorClassName={
          currentMinute > totalMinutes * 0.8 
            ? 'bg-red-600' 
            : currentMinute > totalMinutes * 0.5 
              ? 'bg-orange-500' 
              : 'bg-green-600'
        }
      />
    </div>
  );
};

export default TimerDisplay;
