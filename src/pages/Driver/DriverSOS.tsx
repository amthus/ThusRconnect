
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, MapPin, Phone, ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

// Mock data for nearby technicians
const nearbyTechnicians = [
  { 
    id: 1, 
    name: 'Garage Express', 
    specialties: ['Mécanique', 'Électricité'],
    distance: '0.8 km',
    rating: 4.9,
    phone: '229 91234567',
    estimatedTime: '5-10 min'
  },
  { 
    id: 2, 
    name: 'Auto Secours', 
    specialties: ['Remorquage', 'Dépannage'],
    distance: '1.2 km',
    rating: 4.7,
    phone: '229 91234568',
    estimatedTime: '7-12 min'
  },
  { 
    id: 3, 
    name: 'Mécanicien Rapide', 
    specialties: ['Mécanique', 'Pneus'],
    distance: '1.5 km',
    rating: 4.5,
    phone: '229 91234569',
    estimatedTime: '10-15 min'
  },
];

const DriverSOS: React.FC = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('auto');
  
  React.useEffect(() => {
    // Simulate finding nearby technicians
    const timer = setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Techniciens trouvés!",
        description: "Nous avons trouvé 3 techniciens près de vous.",
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSendRequest = (techId: number) => {
    // In a real app, this would send a request to the technician
    toast({
      title: "Demande envoyée!",
      description: "Le technicien a été notifié de votre demande d'assistance.",
    });
    navigate(`/driver/request-tracking/${techId}`);
  };
  
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 hover:bg-red-50 hover:text-red-500"
          onClick={() => navigate('/driver')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Assistance d'urgence</h1>
          <p className="text-sm text-gray-500">Nous sommes là pour vous aider</p>
        </div>
      </div>
      
      <Card className="bg-gradient-to-br from-red-50 to-white border-red-100 overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600"></div>
        <CardContent className="p-4">
          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h2 className="font-medium mb-1">Votre position actuelle</h2>
              <p className="text-sm text-gray-600 mb-3">Restez à cet endroit pour permettre aux techniciens de vous trouver facilement</p>
              <div className="bg-gray-100 rounded-xl overflow-hidden h-40 flex items-center justify-center mb-3 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300">
                  {/* Map grid overlay */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="border border-white/20"></div>
                    ))}
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="w-24 h-24 bg-red-500/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 animate-ping opacity-50"></div>
                </div>
              </div>
              <p className="text-sm bg-white rounded-lg py-2 px-3 shadow-sm border border-gray-100 flex items-center">
                <MapPin className="h-4 w-4 text-red-500 mr-2" />
                Rue 234, Cotonou, Bénin
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="auto" value={selectedOption} onValueChange={setSelectedOption} className="w-full">
        <TabsList className="grid grid-cols-3 mb-3 bg-benin-offwhite p-1 rounded-xl">
          <TabsTrigger 
            value="auto"
            className="data-[state=active]:bg-white data-[state=active]:text-benin-blue data-[state=active]:shadow-sm"
          >
            Panne auto
          </TabsTrigger>
          <TabsTrigger 
            value="tire"
            className="data-[state=active]:bg-white data-[state=active]:text-benin-blue data-[state=active]:shadow-sm"
          >
            Pneu
          </TabsTrigger>
          <TabsTrigger 
            value="tow"
            className="data-[state=active]:bg-white data-[state=active]:text-benin-blue data-[state=active]:shadow-sm"
          >
            Remorquage
          </TabsTrigger>
        </TabsList>
        <TabsContent value="auto" className="mt-0">
          <Card className="border-none shadow-md">
            <CardContent className="p-4 bg-gradient-to-br from-benin-blue/5 to-white">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-benin-blue/10 flex items-center justify-center mr-3">
                  <Car className="h-5 w-5 text-benin-blue" />
                </div>
                <p>Assistance pour problèmes mécaniques ou électriques. Nos techniciens sont qualifiés pour diagnostiquer et résoudre la plupart des pannes sur place.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tire" className="mt-0">
          <Card className="border-none shadow-md">
            <CardContent className="p-4 bg-gradient-to-br from-benin-green/5 to-white">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-benin-green/10 flex items-center justify-center mr-3">
                  <Car className="h-5 w-5 text-benin-green" />
                </div>
                <p>Assistance pour crevaison ou problèmes de roue. Service rapide pour remplacer ou réparer vos pneus et vous permettre de reprendre la route.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tow" className="mt-0">
          <Card className="border-none shadow-md">
            <CardContent className="p-4 bg-gradient-to-br from-yellow-500/5 to-white">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                  <Car className="h-5 w-5 text-yellow-500" />
                </div>
                <p>Service de remorquage pour déplacer votre véhicule vers un garage ou un lieu sûr quand la réparation sur place n'est pas possible.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <span className="w-1 h-5 bg-red-500 rounded-full mr-2"></span>
          Techniciens à proximité
        </h2>
        
        {isSearching ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="relative mx-auto mb-4 h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-t-benin-blue border-r-benin-blue border-b-gray-200 border-l-gray-200 animate-spin"></div>
              <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center">
                <MapPin className="h-5 w-5 text-benin-blue" />
              </div>
            </div>
            <p className="text-gray-800 font-medium">Recherche de techniciens à proximité...</p>
            <p className="text-sm text-gray-500 mt-2">Nous vous connectons aux meilleurs techniciens disponibles</p>
          </div>
        ) : (
          <div className="space-y-3">
            {nearbyTechnicians.map((tech, index) => (
              <Card key={tech.id} className={`overflow-hidden border-none card-hover shadow-md ${index === 0 ? 'ring-2 ring-benin-green' : ''}`}>
                <CardContent className="p-0">
                  {index === 0 && (
                    <div className="bg-benin-green text-white text-xs py-1 px-2 text-center">
                      Recommandé
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{tech.name}</h3>
                        <p className="text-sm text-gray-500">{tech.specialties.join(', ')}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <div className="flex items-center mr-4">
                            <MapPin className="h-4 w-4 mr-1 text-benin-blue" />
                            <span>{tech.distance}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-benin-green" />
                            <span>{tech.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-benin-green text-white rounded-full px-2 py-1 text-sm">
                          {tech.rating} ★
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 gap-1 border-benin-blue/30 text-benin-blue hover:bg-benin-blue/5"
                        onClick={() => window.open(`tel:${tech.phone}`)}
                      >
                        <Phone className="h-3 w-3" />
                        Appeler
                      </Button>
                      <Button 
                        size="sm"
                        className={`flex-1 ${index === 0 ? 'bg-benin-green' : 'bg-benin-blue'}`}
                        onClick={() => handleSendRequest(tech.id)}
                      >
                        Demander
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DriverSOS;
