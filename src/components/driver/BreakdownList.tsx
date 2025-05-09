
import React from 'react';
import { Car, AlertCircle, Wrench, Settings, Battery } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Types for breakdowns
interface Breakdown {
  id: number;
  name: string;
  description: string;
  icon: 'engine' | 'tire' | 'battery' | 'general';
  commonPrice: string;
  estimatedTime: string;
}

const breakdowns: Breakdown[] = [
  {
    id: 1,
    name: "Panne moteur",
    description: "Problèmes liés au moteur du véhicule",
    icon: "engine",
    commonPrice: "15 000 - 50 000 FCFA",
    estimatedTime: "1-3 heures"
  },
  {
    id: 2,
    name: "Crevaison pneu",
    description: "Réparation ou remplacement de pneu",
    icon: "tire",
    commonPrice: "5 000 - 15 000 FCFA",
    estimatedTime: "30-60 min"
  },
  {
    id: 3,
    name: "Problème batterie",
    description: "Démarrage, remplacement de batterie",
    icon: "battery",
    commonPrice: "8 000 - 30 000 FCFA",
    estimatedTime: "30-45 min"
  },
  {
    id: 4,
    name: "Panne générale",
    description: "Autres types de pannes",
    icon: "general",
    commonPrice: "Varie selon le problème",
    estimatedTime: "Varie selon le problème"
  }
];

const BreakdownList: React.FC = () => {
  const navigate = useNavigate();

  // Function to render the appropriate icon based on breakdown type
  const renderIcon = (type: string) => {
    switch (type) {
      case 'engine':
        return <Settings className="h-8 w-8 text-benin-blue" />;
      case 'tire':
        return <Wrench className="h-8 w-8 text-benin-green" />;
      case 'battery':
        return <Battery className="h-8 w-8 text-yellow-500" />;
      case 'general':
      default:
        return <Car className="h-8 w-8 text-benin-blue" />;
    }
  };

  const handleBreakdownSelect = (id: number) => {
    navigate(`/driver/quote/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Types de pannes</h1>
        <p className="text-gray-500">Sélectionnez le type de panne pour obtenir de l'aide</p>
      </div>

      {breakdowns.map((breakdown) => (
        <div 
          key={breakdown.id}
          className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4 cursor-pointer hover:bg-benin-offwhite transition-colors"
          onClick={() => handleBreakdownSelect(breakdown.id)}
        >
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            {renderIcon(breakdown.icon)}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">{breakdown.name}</h3>
            <p className="text-gray-500">{breakdown.description}</p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div className="flex items-center">
                <span className="font-medium mr-1">Prix:</span> {breakdown.commonPrice}
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-1">Temps:</span> {breakdown.estimatedTime}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="mt-6 bg-benin-blue/10 rounded-xl p-4 border border-benin-blue/20">
        <div className="flex items-center mb-2">
          <AlertCircle className="h-5 w-5 text-benin-blue mr-2" />
          <h3 className="font-medium">Besoin d'aide?</h3>
        </div>
        <p className="text-sm text-gray-600">
          Si vous ne trouvez pas le type de panne correspondant à votre problème, 
          vous pouvez contacter notre service client ou utiliser l'option SOS pour 
          une assistance immédiate.
        </p>
      </div>
    </div>
  );
};

export default BreakdownList;
