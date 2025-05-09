
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle, CreditCard, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const DriverQuote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string>('standard');
  
  // Mock breakdown data based on ID
  const breakdownTypes: Record<string, { name: string; description: string }> = {
    "1": { name: "Panne moteur", description: "Problèmes liés au moteur du véhicule" },
    "2": { name: "Crevaison pneu", description: "Réparation ou remplacement de pneu" },
    "3": { name: "Problème batterie", description: "Démarrage, remplacement de batterie" },
    "4": { name: "Panne générale", description: "Autres types de pannes" },
  };
  
  const breakdown = breakdownTypes[id || "4"] || breakdownTypes["4"];
  
  // Mock quote options
  const quoteOptions = [
    {
      id: 'standard',
      title: 'Standard',
      description: 'Service de réparation standard',
      price: '15 000 FCFA',
      time: '60-90 min',
      features: ['Diagnostique complet', 'Réparation sur place', 'Garantie 7 jours']
    },
    {
      id: 'premium',
      title: 'Premium',
      description: 'Service de réparation prioritaire',
      price: '25 000 FCFA',
      time: '30-60 min',
      features: ['Diagnostique complet', 'Technicien senior', 'Réparation sur place', 'Garantie 30 jours', 'Suivi après-service']
    }
  ];

  const handleSubmit = () => {
    navigate(`/driver/payment/${id}?service=${selectedService}`);
  };

  const selectedQuote = quoteOptions.find(option => option.id === selectedService) || quoteOptions[0];

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
        <h1 className="text-xl font-bold">Devis de réparation</h1>
      </div>
      
      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-benin-blue to-benin-green p-4 text-white">
            <div>
              <h2 className="text-lg font-medium">{breakdown.name}</h2>
              <p className="text-white/80">{breakdown.description}</p>
              <div className="flex items-center mt-2 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>Estimation: {selectedQuote.time}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium text-lg mb-3">Choisissez votre service</h3>
            
            <RadioGroup 
              value={selectedService} 
              onValueChange={setSelectedService}
              className="space-y-4"
            >
              {quoteOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3">
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <div className="flex-1">
                    <Label 
                      htmlFor={option.id} 
                      className="flex justify-between cursor-pointer"
                    >
                      <span className="font-medium">{option.title}</span>
                      <span className="font-bold text-benin-green">{option.price}</span>
                    </Label>
                    <p className="text-gray-500 text-sm mt-1">{option.description}</p>
                    <ul className="mt-2 space-y-1">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="text-sm flex items-start">
                          <CheckCircle className="h-3.5 w-3.5 text-benin-green mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-2">
        <h3 className="font-medium">Informations sur la demande</h3>
        <Card className="shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-benin-blue/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-benin-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">Aujourd'hui</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-benin-green/10 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-benin-green" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Localisation</p>
                <p className="font-medium">Votre position actuelle</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-sm text-gray-500">
          <div className="flex items-start mb-2">
            <Shield className="h-4 w-4 mr-2 mt-0.5 text-benin-green" />
            <p>Toutes les réparations sont effectuées par des techniciens certifiés et comprennent une garantie.</p>
          </div>
          <div className="flex items-start">
            <CreditCard className="h-4 w-4 mr-2 mt-0.5 text-benin-blue" />
            <p>Paiement sécurisé via notre application avec plusieurs options disponibles.</p>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-20 inset-x-0 p-4 bg-white border-t border-gray-200">
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-benin-green text-white"
        >
          Continuer vers le paiement
        </Button>
      </div>
    </div>
  );
};

export default DriverQuote;
