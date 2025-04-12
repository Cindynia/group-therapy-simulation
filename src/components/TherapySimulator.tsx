
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlayCircle, Pause } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Patient } from '../data/patientsData';
import { TherapyEvent, ResponseType, generateTherapyEvent, generateSessionSummary } from '../services/therapyService';
import PatientAvatar from './PatientAvatar';
import TherapyMessage from './TherapyMessage';
import TherapyInput from './TherapyInput';
import TimerDisplay from './TimerDisplay';
import PatientInfo from './PatientInfo';
import SessionSummary from './SessionSummary';

interface TherapySimulatorProps {
  patients: Patient[];
  sessionDuration?: number;
}

// Helper function to randomize a small delay
const getRandomDelay = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const TherapySimulator: React.FC<TherapySimulatorProps> = ({ 
  patients, 
  sessionDuration = 45 
}) => {
  // State for selected patient (for info panel)
  const [selectedPatient, setSelectedPatient] = useState<Patient>(patients[0]);
  
  // State for messages in the chat
  const [messages, setMessages] = useState<Array<TherapyEvent | { isTherapist: true, message: string }>>([]);
  
  // Timer state
  const [currentMinute, setCurrentMinute] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  
  // State for typing indicators
  const [isPatientTyping, setIsPatientTyping] = useState(false);
  const [typingPatient, setTypingPatient] = useState<Patient | null>(null);
  
  // Session summary
  const [sessionSummary, setSessionSummary] = useState<string>('');
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const patientResponseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Start a new session
  const startSession = () => {
    // Reset state
    setMessages([]);
    setCurrentMinute(0);
    setIsSessionActive(true);
    setSessionEnded(false);
    setSessionSummary('');
    
    // Welcome message
    const welcomeMessage = {
      isTherapist: true as const,
      message: "Welcome everyone to today's group session. Let's take a moment to check in with how everyone is feeling today."
    };
    setMessages([welcomeMessage]);
    
    // Schedule first patient response
    schedulePatientResponse();
    
    // Start timer
    timerRef.current = setInterval(() => {
      setCurrentMinute(prev => {
        const next = prev + 1;
        // If session time is up, end the session
        if (next >= sessionDuration) {
          if (timerRef.current) clearInterval(timerRef.current);
          return sessionDuration;
        }
        return next;
      });
    }, 60000); // Real-time: 60000ms = 1 minute
    // For testing: 5000ms = 5 seconds
  };
  
  // End the session
  const endSession = () => {
    setIsSessionActive(false);
    setSessionEnded(true);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (patientResponseTimeoutRef.current) {
      clearTimeout(patientResponseTimeoutRef.current);
      patientResponseTimeoutRef.current = null;
    }
    
    // Generate therapist wrap-up message
    const wrapUpMessage = {
      isTherapist: true as const,
      message: "We're coming to the end of our time together today. Thank you all for your participation and honesty. We'll pick up these threads in our next session."
    };
    setMessages(prev => [...prev, wrapUpMessage]);
    
    // Generate session summary
    const therapistMessages = messages
      .filter(msg => 'isTherapist' in msg && msg.isTherapist)
      .map(msg => ('message' in msg ? msg.message : ''));
    
    const patientEvents = messages.filter(msg => !('isTherapist' in msg)) as TherapyEvent[];
    
    const summary = generateSessionSummary(patientEvents, therapistMessages);
    setSessionSummary(summary);
    
    toast({
      title: "Session completed",
      description: "Session summary has been generated.",
      duration: 3000
    });
  };
  
  // Reset the session
  const resetSession = () => {
    setMessages([]);
    setCurrentMinute(0);
    setIsSessionActive(false);
    setSessionEnded(false);
    setSessionSummary('');
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (patientResponseTimeoutRef.current) {
      clearTimeout(patientResponseTimeoutRef.current);
      patientResponseTimeoutRef.current = null;
    }
  };
  
  // Schedule a patient response
  const schedulePatientResponse = (delay = 3000) => {
    if (!isSessionActive) return;
    
    // Clear any existing timeouts
    if (patientResponseTimeoutRef.current) {
      clearTimeout(patientResponseTimeoutRef.current);
    }
    
    // Schedule next patient response
    patientResponseTimeoutRef.current = setTimeout(() => {
      // Generate a random patient event
      const event = generateTherapyEvent(patients);
      const respondingPatient = patients.find(p => p.id === event.patientId);
      
      if (respondingPatient) {
        // Show typing indicator
        setIsPatientTyping(true);
        setTypingPatient(respondingPatient);
        
        // Schedule the actual message to appear after typing
        setTimeout(() => {
          setIsPatientTyping(false);
          setTypingPatient(null);
          
          // Add the message
          setMessages(prev => [...prev, event]);
          
          // Schedule next patient response after a random delay
          const nextDelay = getRandomDelay(5000, 15000);
          schedulePatientResponse(nextDelay);
        }, getRandomDelay(1500, 5000));
      }
    }, delay);
  };
  
  // Handle therapist input
  const handleTherapistInput = (message: string) => {
    const therapistMessage = {
      isTherapist: true as const,
      message
    };
    
    setMessages(prev => [...prev, therapistMessage]);
    
    // Schedule a quicker patient response after therapist speaks
    const responseDelay = getRandomDelay(2000, 6000);
    schedulePatientResponse(responseDelay);
  };
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isPatientTyping]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (patientResponseTimeoutRef.current) clearTimeout(patientResponseTimeoutRef.current);
    };
  }, []);
  
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Left sidebar - Patient information */}
      <div className="md:col-span-1 space-y-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap justify-center gap-3 py-2">
              {patients.map(patient => (
                <PatientAvatar
                  key={patient.id}
                  patient={patient}
                  isActive={selectedPatient.id === patient.id}
                  onClick={() => setSelectedPatient(patient)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <PatientInfo patient={selectedPatient} />
      </div>
      
      {/* Main content - Therapy session */}
      <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-4 h-[calc(100vh-2rem)]">
        {!sessionEnded ? (
          <div className="flex flex-col h-full">
            {/* Session controls */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <TimerDisplay
                      totalMinutes={sessionDuration}
                      currentMinute={currentMinute}
                      onSessionEnd={endSession}
                    />
                  </div>
                  
                  <Separator orientation="vertical" className="mx-4 h-8" />
                  
                  <Button
                    variant={isSessionActive ? "outline" : "default"}
                    size="sm"
                    onClick={isSessionActive ? endSession : startSession}
                    className="flex items-center gap-1"
                  >
                    {isSessionActive ? (
                      <>
                        <Pause size={16} />
                        End Session
                      </>
                    ) : (
                      <>
                        <PlayCircle size={16} />
                        Start Session
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Messages */}
            <Card className="shadow-sm flex-1 flex flex-col mt-4 overflow-hidden">
              <CardContent className="p-4 h-[calc(100vh-180px)] flex flex-col">
                <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-4">
                    {messages.map((msg, index) => {
                      if ('isTherapist' in msg) {
                        return (
                          <TherapyMessage
                            key={index}
                            content={msg.message}
                            isTherapist={true}
                          />
                        );
                      } else {
                        const patient = patients.find(p => p.id === msg.patientId);
                        return (
                          <TherapyMessage
                            key={index}
                            content={msg.message}
                            isTherapist={false}
                            patient={patient}
                            responseType={msg.type}
                          />
                        );
                      }
                    })}
                    
                    {isPatientTyping && typingPatient && (
                      <TherapyMessage
                        content=""
                        isTherapist={false}
                        patient={typingPatient}
                        isTyping={true}
                      />
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <div className="mt-auto">
                  <TherapyInput
                    onSubmit={handleTherapistInput}
                    disabled={!isSessionActive || sessionEnded}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <SessionSummary 
            summary={sessionSummary} 
            onReset={resetSession} 
          />
        )}
      </div>
    </div>
  );
};

export default TherapySimulator;
