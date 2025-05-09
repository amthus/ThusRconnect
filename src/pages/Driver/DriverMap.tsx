
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowLeft, Phone, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const DriverMap: React.FC = () => {
  const navigate = useNavigate();
  const [openTechDetails, setOpenTechDetails] = React.useState(false);
  const [selectedTechnician, setSelectedTechnician] = React.useState<any>(null);
  
  // Mock data for a technician
  const technicianData = {
    id: 1,
    name: "Garage Central",
    distance: "1.2 km",
    rating: 4.8,
    reviews: 120,
    phone: "229 91234567",
    address: "42 Rue des Mécaniciens, Cotonou",
    services: ["Mécanique générale", "Électricité auto", "Climatisation"],
    hours: "Ouvert · Ferme à 18:00"
  };
  
  const handleTechnicianClick = () => {
    setSelectedTechnician(technicianData);
    setOpenTechDetails(true);
  };

  return (
    <div className="h-screen flex flex-col -mt-16 -mb-20">
      {/* Map header */}
      <div className="absolute top-20 left-4 right-4 z-10">
        <div className="glass-effect rounded-xl shadow-lg flex items-center p-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-1"
            onClick={() => navigate('/driver')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <Input 
            className="border-0 focus-visible:ring-0 flex-1 bg-transparent" 
            placeholder="Rechercher un service" 
          />
        </div>
      </div>
      
      {/* Map placeholder */}
      <div className="flex-1 bg-gray-200 relative">
        <div className="absolute inset-0">
          {/* Map background with gradient to make it look more professional */}
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
            <p className="text-gray-500 font-medium">Carte interactive</p>
          </div>
          
          {/* Grid overlay for map-like effect */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-300/20"></div>
            ))}
          </div>
        </div>
        
        {/* Current location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-benin-blue rounded-full flex items-center justify-center animate-pulse">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <div className="w-24 h-24 bg-benin-blue/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 animate-ping opacity-50"></div>
        </div>
        
        {/* Technician marker */}
        <Button
          variant="default"
          className="absolute top-[45%] left-[60%] bg-white text-black border shadow-lg hover:bg-gray-100 card-hover"
          onClick={handleTechnicianClick}
        >
          <MapPin className="h-5 w-5 text-benin-green mr-1" />
          Garage Central
        </Button>

        {/* Additional markers */}
        <div className="absolute top-[30%] left-[40%] w-3 h-3 bg-benin-green rounded-full shadow-lg"></div>
        <div className="absolute top-[60%] left-[30%] w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
        <div className="absolute top-[35%] left-[70%] w-3 h-3 bg-benin-blue rounded-full shadow-lg"></div>
      </div>
      
      {/* Bottom buttons */}
      <div className="absolute bottom-24 right-4 space-y-3">
        <Button size="icon" className="rounded-full h-14 w-14 bg-white text-black shadow-xl hover:bg-gray-100 card-hover border-none">
          <Navigation className="h-6 w-6 text-benin-blue" />
        </Button>
        <Button size="icon" className="rounded-full h-14 w-14 bg-benin-green text-white shadow-xl hover:bg-green-600 card-hover border-none">
          <MapPin className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Technician details sheet */}
      <Sheet open={openTechDetails} onOpenChange={setOpenTechDetails}>
        <SheetContent side="bottom" className="h-[70%] rounded-t-xl p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-benin-blue to-benin-green h-1 w-full"></div>
          <div className="px-6 py-4">
            <SheetHeader>
              <SheetTitle className="text-xl">{selectedTechnician?.name}</SheetTitle>
              <SheetDescription className="flex items-center">
                {selectedTechnician?.distance} • {selectedTechnician?.hours}
              </SheetDescription>
            </SheetHeader>
            
            {selectedTechnician && (
              <div className="space-y-5 mt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-benin-green text-white rounded-full px-3 py-1 flex items-center">
                      <span className="text-base font-medium mr-1">{selectedTechnician.rating}</span>
                      <span className="text-yellow-200">★</span>
                    </div>
                    <span className="text-sm ml-2">
                      {selectedTechnician.reviews} avis
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 bg-benin-blue/10 text-benin-blue border-benin-blue/20"
                    onClick={() => window.open(`tel:${selectedTechnician.phone}`)}
                  >
                    <Phone className="h-4 w-4" />
                    Appeler
                  </Button>
                </div>
                
                <div className="bg-benin-offwhite/50 p-4 rounded-xl">
                  <h3 className="font-medium text-gray-700 mb-2">Adresse</h3>
                  <p className="text-sm">{selectedTechnician.address}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTechnician.services.map((service: string, index: number) => (
                      <div key={index} className="bg-benin-offwhite px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm">
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-benin-green to-benin-blue text-white hover:opacity-90 shadow-md"
                    onClick={() => navigate(`/driver/services/${selectedTechnician.id}`)}
                  >
                    Demander un service
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DriverMap;
