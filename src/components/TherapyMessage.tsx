
import React from 'react';
import { TherapyEvent } from '../services/therapyService';
import { Patient } from '../data/patientsData';
import { cn } from '@/lib/utils';

interface TherapyMessageProps {
  content: string;
  isTherapist: boolean;
  patient?: Patient;
  responseType?: string;
  isTyping?: boolean;
}

const TherapyMessage: React.FC<TherapyMessageProps> = ({
  content,
  isTherapist,
  patient,
  responseType,
  isTyping = false
}) => {
  // Determine message styling based on whether it's from therapist or patient
  const messageClass = isTherapist
    ? "message-bubble therapist bg-blue-100"
    : "message-bubble patient";

  // For patient messages, add styling based on response type
  let responseTypeClass = "";
  if (!isTherapist && responseType) {
    switch (responseType) {
      case "resistant":
        responseTypeClass = "border-l-4 border-orange-400";
        break;
      case "breakthrough":
        responseTypeClass = "border-l-4 border-green-500";
        break;
      case "silence":
        responseTypeClass = "italic text-gray-500";
        break;
      case "interruption":
        responseTypeClass = "border-l-4 border-red-400";
        break;
      case "peer-interaction":
        responseTypeClass = "border-l-4 border-purple-400";
        break;
      default:
        responseTypeClass = "";
    }
  }

  // Patient color styling
  const patientStyle = patient 
    ? { backgroundColor: `${patient.color}25`, borderColor: patient.color } 
    : {};

  return (
    <div 
      className={cn(
        messageClass,
        responseTypeClass,
        "shadow-sm"
      )}
      style={!isTherapist && patient ? patientStyle : {}}
    >
      {isTyping ? (
        <div className="flex items-center">
          <span className="typing-indicator"></span>
        </div>
      ) : (
        <div>
          {content}
        </div>
      )}
    </div>
  );
};

export default TherapyMessage;
