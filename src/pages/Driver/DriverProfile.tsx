
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Car, MapPin, Star, Bell, Shield, Edit, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

// Custom Star icon component for consistency
const StarIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z" />
  </svg>
);

const DriverProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Mock vehicle data
  const vehicles = [
    {
      id: 1,
      name: 'Toyota Corolla',
      year: 2018,
      plate: 'AB 1234 RB',
      color: 'Gris',
    }
  ];
  
  return (
    <div className="space-y-6 pb-10">
      <div className="relative">
        {/* Banner with gradient background */}
        <div className="h-32 bg-gradient-to-r from-benin-blue to-benin-green rounded-b-xl"></div>
        
        {/* Profile info overlapping banner */}
        <div className="absolute left-0 right-0 -bottom-16 px-4">
          <div className="flex items-end">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-benin-blue text-white text-xl">
                {user?.name ? user.name.charAt(0) : 'C'}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 pb-2 flex-1">
              <h1 className="text-xl font-bold">{user?.name || 'Conducteur'}</h1>
              <p className="text-sm text-gray-500">Client depuis Juin 2023</p>
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
        <Card className="shadow-md border-none overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h2 className="text-lg font-medium flex items-center">
                <User className="h-5 w-5 text-benin-blue mr-2" />
                Information Personnelle
              </h2>
            </div>
            <Separator />
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Téléphone</span>
                <span className="font-medium">+229 97 12 34 56</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">user@example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Localisation</span>
                <span className="font-medium">Cotonou, Bénin</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md border-none overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h2 className="text-lg font-medium flex items-center">
                <Car className="h-5 w-5 text-benin-green mr-2" />
                Mes Véhicules
              </h2>
            </div>
            <Separator />
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{vehicle.name}</h3>
                    <p className="text-sm text-gray-500">{vehicle.year} • {vehicle.color}</p>
                    <div className="mt-1 bg-gray-100 px-2 py-1 rounded-full text-xs inline-block">
                      {vehicle.plate}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                </div>
              </div>
            ))}
            <div className="px-4 pb-4">
              <Button className="w-full bg-benin-blue/10 text-benin-blue hover:bg-benin-blue/20 border-dashed border-2 border-benin-blue/30">
                + Ajouter un véhicule
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
            <MapPin className="h-5 w-5 text-red-500" />
            <span>Adresses</span>
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

export default DriverProfile;
