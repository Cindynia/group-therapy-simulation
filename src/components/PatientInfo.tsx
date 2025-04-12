
import React from 'react';
import { Patient } from '../data/patientsData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PatientInfoProps {
  patient: Patient;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-2" style={{ backgroundColor: `${patient.color}15` }}>
        <div className="flex items-center gap-2">
          <span className="text-3xl">{patient.avatar}</span>
          <div>
            <CardTitle>{patient.name}, {patient.age}</CardTitle>
            <CardDescription>{patient.gender}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ScrollArea className="h-[calc(100vh-370px)] pr-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-1">Clinical Profile</h3>
              <p className="text-sm">{patient.clinicalProfile}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-1">Attachment Style</h3>
              <p className="text-sm">{patient.attachmentStyle}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-1">Personality Traits</h3>
              <div className="flex flex-wrap gap-1">
                {patient.personalityTraits.map((trait, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-1">Trauma History</h3>
              <p className="text-sm">{patient.traumaHistory}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-1">Therapy Goals</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {patient.therapyGoals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-1">Response Style</h3>
              <p className="text-sm">{patient.responseStyle}</p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PatientInfo;
