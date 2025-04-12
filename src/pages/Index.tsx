
import React from 'react';
import TherapySimulator from '../components/TherapySimulator';
import { patients } from '../data/patientsData';

const Index = () => {
  return (
    <div className="container py-6">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-therapy-text">
          Virtual Group Therapy Simulator
        </h1>
        <p className="text-muted-foreground mt-1">
          Lead a simulated 45-minute group therapy session. You are the therapist guiding the conversation.
        </p>
      </header>
      
      <main>
        <TherapySimulator patients={patients} />
      </main>
    </div>
  );
};

export default Index;
