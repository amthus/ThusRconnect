
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Search, Wrench, X, Check, MapPin, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Mock data for service types
const serviceTypes = [
  { id: 1, name: 'Mécanique', icon: Wrench, color: '#0089e1' },
  { id: 2, name: 'Remorquage', icon: Car, color: '#50cd89' },
  { id: 3, name: 'Pneu/Roue', icon: Car, color: '#ff9500' },
  { id: 4, name: 'Carburant', icon: Car, color: '#ff3b30' },
];

// Mock data for service providers
const serviceProviders = [
  { 
    id: 1,
    name: 'Garage Central',
    rating: 4.8,
    reviews: 156,
    services: ['Mécanique', 'Électrique', 'Pneu'],
    distance: '1.2 km',
    image: '/placeholder.svg',
    available: true,
    estTime: '15 min'
  },
  { 
    id: 2,
    name: 'Auto Express',
    rating: 4.5,
    reviews: 98,
    services: ['Remorquage', 'Dépannage'],
    distance: '2.5 km',
    image: '/placeholder.svg',
    available: true,
    estTime: '20 min'
  },
  { 
    id: 3,
    name: 'MécaPro',
    rating: 4.2,
    reviews: 75,
    services: ['Mécanique', 'Diagnostic'],
    distance: '3.7 km',
    image: '/placeholder.svg',
    available: false,
    estTime: '30 min'
  },
];

const DriverServices: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<number | null>(null);
  
  const filteredProviders = serviceProviders.filter(provider => 
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!selectedType || provider.services.includes(serviceTypes.find(t => t.id === selectedType)?.name || ''))
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center mb-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full mr-2"
          onClick={() => navigate('/driver')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Services</h1>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          className="pl-10 bg-benin-offwhite border-none" 
          placeholder="Rechercher un service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-medium mb-3">Type de service</h2>
        <div className="grid grid-cols-4 gap-3">
          {serviceTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? "default" : "outline"}
              className={`flex flex-col h-24 p-2 ${
                selectedType === type.id 
                  ? "bg-benin-blue text-white" 
                  : "bg-white border-gray-200"
              }`}
              onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  selectedType === type.id 
                    ? "bg-white/20" 
                    : "bg-benin-offwhite"
                }`}
                style={{ 
                  backgroundColor: selectedType === type.id 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : `${type.color}20` 
                }}
              >
                <type.icon 
                  className={`h-5 w-5 ${
                    selectedType === type.id 
                      ? "text-white" 
                      : "text-gray-700"
                  }`} 
                  style={{ color: selectedType === type.id ? 'white' : type.color }} 
                />
              </div>
              <span className="text-xs text-center">{type.name}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-3 h-auto">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="nearby">À proximité</TabsTrigger>
          <TabsTrigger value="rated">Mieux notés</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredProviders.length > 0 ? (
            <div className="space-y-4">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="overflow-hidden border-none shadow-md">
                  <CardContent className="p-0">
                    <div className="flex justify-between">
                      <div className="p-4 flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{provider.name}</h3>
                          <Badge className={`ml-2 ${provider.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {provider.available ? 'Disponible' : 'Indisponible'}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">{provider.rating}</span>
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          </div>
                          <span className="text-gray-500 ml-1">({provider.reviews} avis)</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <MapPin className="h-4 w-4 mr-1 text-benin-blue" />
                          <span className="text-sm">{provider.distance}</span>
                          <Clock className="h-4 w-4 ml-3 mr-1 text-benin-green" />
                          <span className="text-sm">{provider.estTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {provider.services.map((service, idx) => (
                            <span key={idx} className="text-xs bg-benin-offwhite px-2 py-1 rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-benin-offwhite">
                        <div className="w-10 h-10 rounded-full overflow-hidden mb-2">
                          <img 
                            src={provider.image} 
                            alt={provider.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button 
                          size="sm"
                          className="bg-benin-blue text-white" 
                          onClick={() => navigate(`/driver/request/${provider.id}`)}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <X className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">Aucun résultat</h3>
              <p className="text-gray-500 mt-1">Essayez d'autres critères de recherche</p>
              {selectedType && (
                <Button 
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSelectedType(null)}
                >
                  Réinitialiser les filtres
                </Button>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="nearby">
          {/* Similar content structure to "all" tab but sorted by distance */}
          <div className="space-y-4 mt-6">
            {filteredProviders
              .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
              .map((provider) => (
                <Card key={provider.id} className="overflow-hidden border-none shadow-md">
                  <CardContent className="p-0">
                    {/* Same card content as in "all" tab */}
                    <div className="flex justify-between">
                      <div className="p-4 flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{provider.name}</h3>
                          <Badge className={`ml-2 ${provider.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {provider.available ? 'Disponible' : 'Indisponible'}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">{provider.rating}</span>
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          </div>
                          <span className="text-gray-500 ml-1">({provider.reviews} avis)</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <MapPin className="h-4 w-4 mr-1 text-benin-blue" />
                          <span className="text-sm">{provider.distance}</span>
                          <Clock className="h-4 w-4 ml-3 mr-1 text-benin-green" />
                          <span className="text-sm">{provider.estTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {provider.services.map((service, idx) => (
                            <span key={idx} className="text-xs bg-benin-offwhite px-2 py-1 rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-benin-offwhite">
                        <div className="w-10 h-10 rounded-full overflow-hidden mb-2">
                          <img 
                            src={provider.image} 
                            alt={provider.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button 
                          size="sm"
                          className="bg-benin-blue text-white" 
                          onClick={() => navigate(`/driver/request/${provider.id}`)}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="rated">
          {/* Similar content structure to "all" tab but sorted by rating */}
          <div className="space-y-4 mt-6">
            {filteredProviders
              .sort((a, b) => b.rating - a.rating)
              .map((provider) => (
                <Card key={provider.id} className="overflow-hidden border-none shadow-md">
                  <CardContent className="p-0">
                    {/* Same card content as in "all" tab */}
                    <div className="flex justify-between">
                      <div className="p-4 flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{provider.name}</h3>
                          <Badge className={`ml-2 ${provider.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {provider.available ? 'Disponible' : 'Indisponible'}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">{provider.rating}</span>
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          </div>
                          <span className="text-gray-500 ml-1">({provider.reviews} avis)</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <MapPin className="h-4 w-4 mr-1 text-benin-blue" />
                          <span className="text-sm">{provider.distance}</span>
                          <Clock className="h-4 w-4 ml-3 mr-1 text-benin-green" />
                          <span className="text-sm">{provider.estTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {provider.services.map((service, idx) => (
                            <span key={idx} className="text-xs bg-benin-offwhite px-2 py-1 rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-benin-offwhite">
                        <div className="w-10 h-10 rounded-full overflow-hidden mb-2">
                          <img 
                            src={provider.image} 
                            alt={provider.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button 
                          size="sm"
                          className="bg-benin-blue text-white" 
                          onClick={() => navigate(`/driver/request/${provider.id}`)}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Fix missing Star component
const Star = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z" />
  </svg>
);

export default DriverServices;
