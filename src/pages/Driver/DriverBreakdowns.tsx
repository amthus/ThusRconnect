
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BreakdownList from '@/components/driver/BreakdownList';

const DriverBreakdowns: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Demande d'assistance</h1>
      </div>
      
      <BreakdownList />
    </div>
  );
};

export default DriverBreakdowns;
