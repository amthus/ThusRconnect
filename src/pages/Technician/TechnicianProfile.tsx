
import React, { useState } from 'react';
import { User, Car, MapPin, Bell, Shield, Edit, LogOut, ChevronDown, ChevronUp, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';

const TechnicianProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [showServices, setShowServices] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  
  // Mock data
  const technicianData = {
    name: user?.name || 'Technicien',
    business: 'Garage Central',
    specialties: ['Mécanique', 'Électrique', 'Pneus'],
    joinDate: 'Juin 2023',
    rating: 4.8,
    reviews: 156,
    completedServices: 243,
    contact: {
      phone: '+229 97 12 34 57',
      email: 'garage@example.com',
      address: '42 Rue des Mécaniciens, Cotonou'
    },
    services: [
      { id: 1, name: 'Changement de pneu', price: '5 000 FCFA', popular: true },
      { id: 2, name: 'Diagnostic électronique', price: '10 000 FCFA', popular: false },
      { id: 3, name: 'Vidange', price: '15 000 FCFA', popular: true },
      { id: 4, name: 'Réparation démarreur', price: '20 000 FCFA', popular: false },
      { id: 5, name: 'Batterie', price: '8 000 FCFA', popular: false }
    ]
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="relative">
        {/* Banner with gradient background */}
        <div className="h-32 bg-gradient-to-r from-benin-green to-benin-blue rounded-b-xl"></div>
        
        {/* Availability toggle */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm flex items-center space-x-2 px-3 py-1.5 rounded-full">
          <span className={`text-sm font-medium ${isAvailable ? 'text-green-600' : 'text-gray-600'}`}>
            {isAvailable ? 'Disponible' : 'Indisponible'}
          </span>
          <Switch 
            checked={isAvailable} 
            onCheckedChange={setIsAvailable} 
            className="data-[state=checked]:bg-green-500"
          />
        </div>
        
        {/* Profile info overlapping banner */}
        <div className="absolute left-0 right-0 -bottom-16 px-4">
          <div className="flex items-end">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-benin-green text-white text-xl">
                {technicianData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 pb-2 flex-1">
              <h1 className="text-xl font-bold">{technicianData.name}</h1>
              <p className="text-sm text-gray-500">{technicianData.business}</p>
            </div>
            <Button variant="outline" size="icon" className="rounded-full bg-white mb-2">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Space to account for the overlapping profile section */}
      <div className="h-16"></div>
      
      {/* User info cards */}
      <div className="px-4 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-benin-green/10 text-benin-green p-2 rounded-full mr-2">
              <StarIcon className="h-4 w-4 fill-benin-green" />
            </div>
            <div>
              <div className="text-xl font-bold">{technicianData.rating}</div>
              <div className="text-xs text-gray-500">{technicianData.reviews} avis</div>
            </div>
          </div>
          <div className="border-r border-gray-300 h-10"></div>
          <div className="flex items-center">
            <div className="bg-benin-blue/10 text-benin-blue p-2 rounded-full mr-2">
              <Car className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xl font-bold">{technicianData.completedServices}</div>
              <div className="text-xs text-gray-500">Services</div>
            </div>
          </div>
          <div className="border-r border-gray-300 h-10"></div>
          <div className="flex items-center">
            <div className="bg-yellow-100 text-yellow-800 p-2 rounded-full mr-2">
              <Badge className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xl font-bold">Pro</div>
              <div className="text-xs text-gray-500">Statut</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {technicianData.specialties.map((specialty, index) => (
            <span 
              key={index} 
              className="bg-benin-green/10 text-benin-green px-3 py-1 rounded-full text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>
        
        <Card className="shadow-md border-none overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h2 className="text-lg font-medium flex items-center">
                <User className="h-5 w-5 text-benin-blue mr-2" />
                Information du Garage
              </h2>
            </div>
            <Separator />
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Téléphone</span>
                <span className="font-medium">{technicianData.contact.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{technicianData.contact.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Adresse</span>
                <span className="font-medium">{technicianData.contact.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-none overflow-hidden">
          <CardContent className="p-0">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => setShowServices(!showServices)}
            >
              <h2 className="text-lg font-medium flex items-center">
                <Wrench className="h-5 w-5 text-benin-green mr-2" />
                Mes Services
              </h2>
              {showServices ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
            
            {showServices && (
              <>
                <Separator />
                <div className="p-4 space-y-3">
                  {technicianData.services.map((service) => (
                    <div key={service.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-medium">{service.name}</span>
                        {service.popular && (
                          <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                            Populaire
                          </Badge>
                        )}
                      </div>
                      <span className="font-medium">{service.price}</span>
                    </div>
                  ))}
                  <Button className="w-full mt-2 border-dashed border-2 border-benin-blue/30 bg-benin-blue/10 text-benin-blue hover:bg-benin-blue/20">
                    + Ajouter un service
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-none overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h2 className="text-lg font-medium flex items-center">
                <MapPin className="h-5 w-5 text-red-500 mr-2" />
                Zone d'intervention
              </h2>
            </div>
            <Separator />
            <div className="p-4">
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Carte de votre zone</p>
                {/* In a real app, this would be a map component */}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-gray-600">Rayon d'intervention:</span>
                <span className="font-medium">5 km</span>
              </div>
              <Button className="w-full mt-3 bg-benin-blue text-white">
                Modifier ma zone
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-auto py-3 justify-start space-x-3 shadow-sm border-gray-200">
            <Bell className="h-5 w-5 text-benin-blue" />
            <span>Notifications</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-3 justify-start space-x-3 shadow-sm border-gray-200">
            <Shield className="h-5 w-5 text-benin-green" />
            <span>Sécurité</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-3 justify-start space-x-3 shadow-sm border-gray-200">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <span>Mes évaluations</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-3 justify-start space-x-3 shadow-sm border-gray-200">
            <Car className="h-5 w-5 text-blue-500" />
            <span>Équipement</span>
          </Button>
        </div>
        
        <Button 
          onClick={logout}
          variant="outline" 
          className="w-full h-auto py-3 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 mt-6"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};

// Custom Star icon component to avoid conflicts
const StarIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z" />
  </svg>
);

export default TechnicianProfile;
