
import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface TherapyInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const TherapyInput: React.FC<TherapyInputProps> = ({
  onSubmit,
  disabled = false,
  placeholder = "Type your response as the therapist...",
  className = "",
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() === '' || disabled) return;
    
    onSubmit(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`flex items-end gap-2 ${className}`}>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="resize-none min-h-[80px]"
        rows={3}
      />
      <Button 
        onClick={handleSubmit} 
        disabled={disabled || input.trim() === ''}
        size="icon"
        className="h-10 w-10"
      >
        <Send size={18} />
      </Button>
    </div>
  );
};

export default TherapyInput;
