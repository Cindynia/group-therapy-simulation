
import React from 'react';
import { Patient } from '../data/patientsData';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface PatientAvatarProps {
  patient: Patient;
  isActive?: boolean;
  onClick?: () => void;
}

const PatientAvatar: React.FC<PatientAvatarProps> = ({ 
  patient, 
  isActive = false,
  onClick
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center" onClick={onClick}>
            <Avatar 
              className={`h-14 w-14 cursor-pointer transition-all duration-200 ${
                isActive 
                  ? 'ring-4 ring-opacity-80 shadow-lg scale-110' 
                  : 'opacity-80 hover:opacity-100 hover:scale-105'
              }`}
              style={{ 
                backgroundColor: patient.color,
                borderColor: patient.color,
                ringColor: patient.color 
              }}
            >
              <AvatarFallback className="text-2xl">
                {patient.avatar}
              </AvatarFallback>
            </Avatar>
            <span className={`mt-1 text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
              {patient.name}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="w-64 p-2">
            <h3 className="font-bold text-sm">{patient.name}, {patient.age}</h3>
            <p className="text-xs mt-1"><span className="font-semibold">Clinical:</span> {patient.clinicalProfile}</p>
            <p className="text-xs mt-1"><span className="font-semibold">Attachment:</span> {patient.attachmentStyle}</p>
            <p className="text-xs mt-1"><span className="font-semibold">Goals:</span> {patient.therapyGoals[0]}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PatientAvatar;
