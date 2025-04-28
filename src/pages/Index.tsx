
import React from 'react';
import TherapySimulator from '../components/TherapySimulator';
import { patients } from '../data/patientsData';

const Index = () => {
  return (
    <div className="container py-6">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Grief Support Circle
        </h1>
        <p className="text-muted-foreground mt-1">
          A safe space to share our journeys with loss and find connection through shared experiences.
        </p>
      </header>
      
      <main>
        <TherapySimulator patients={patients} />
      </main>
    </div>
  );
};

export default Index;
