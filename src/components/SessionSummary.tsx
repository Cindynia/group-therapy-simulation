
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clipboard, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { TherapyEvent } from '../services/therapyService';

interface SessionSummaryProps {
  summary: string;
  onReset: () => void;
}

const SessionSummary: React.FC<SessionSummaryProps> = ({ summary, onReset }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(summary.replace(/##/g, '').replace(/#/g, '').replace(/\*/g, ''));
    toast({
      title: "Summary copied to clipboard",
      description: "You can now paste the session summary elsewhere.",
      duration: 3000
    });
  };

  const sections = summary.split('###').filter(Boolean);

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-2 bg-blue-50">
        <CardTitle className="flex items-center justify-between">
          <span>Session Summary</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopy}
              className="h-8 px-2 text-xs"
            >
              <Clipboard size={14} className="mr-1" />
              Copy
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={onReset}
              className="h-8 px-2 text-xs"
            >
              <RefreshCw size={14} className="mr-1" />
              New Session
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <div className="prose prose-sm max-w-none">
            {sections.map((section, index) => {
              if (index === 0) {
                // First section is the title
                return (
                  <h2 key={index} className="text-lg font-bold mt-0">
                    {section.replace('## ', '')}
                  </h2>
                );
              }
              
              // Split section into title and content
              const [title, ...content] = section.split('\n');
              
              return (
                <div key={index} className="mt-4">
                  <h3 className="text-md font-semibold mb-2">{title.trim()}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {content
                      .filter(line => line.trim().startsWith('-'))
                      .map((line, lineIndex) => (
                        <li key={lineIndex} className="text-sm">
                          {line.replace('- ', '')}
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SessionSummary;
