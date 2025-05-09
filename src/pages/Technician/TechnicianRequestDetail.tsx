
import React, { useState } from 'react';
import { ArrowLeft, Car, MapPin, Phone, MessageSquare, Clock, User, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

const TechnicianRequestDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const [showDetails, setShowDetails] = useState(true);
  
  // Mock data for the request
  const request = {
    id: Number(id),
    status: 'pending',
    client: {
      name: 'Jean Kokou',
      phone: '+229 97 12 34 56',
      rating: 4.8,
      image: '/placeholder.svg'
    },
    vehicle: {
      model: 'Toyota Corolla',
      year: '2018',
      plate: 'AB 1234 RB',
      color: 'Gris'
    },
    service: {
      type: 'Réparation pneu',
      description: 'Crevaison pneu avant droit, besoin d\'un changement rapide',
      urgency: 'high'
    },
    location: {
      address: 'Rue du Commerce, Cotonou',
      distance: '1.2 km',
      coordinates: {
        lat: 6.3702928,
        lng: 2.3912362
      }
    },
    time: {
      requested: '14:05',
      estimated: '15-20 min'
    }
  };

  const handleAccept = () => {
    // In a real app, this would communicate with the backend
    alert('Demande acceptée! Vous allez être mis en contact avec le client.');
    navigate('/technician');
  };
  
  const handleReject = () => {
    // In a real app, this would communicate with the backend
    alert('Demande rejetée.');
    navigate('/technician');
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full mr-2"
          onClick={() => navigate('/technician')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Détails de la demande</h1>
      </div>
      
      <Card className="shadow-md border-none overflow-hidden bg-gradient-to-r from-benin-green/10 to-benin-blue/10">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <h2 className="text-lg font-medium">{request.service.type}</h2>
                <Badge className={`ml-2 ${
                  request.service.urgency === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.service.urgency === 'high' ? 'Urgent' : 'Standard'}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mt-1">{request.vehicle.model} • {request.vehicle.year}</p>
              <div className="flex items-center mt-2">
                <Clock className="h-4 w-4 mr-1 text-benin-green" />
                <span className="text-sm">Demandé à {request.time.requested}</span>
              </div>
            </div>
            <div className="bg-benin-green text-white px-3 py-1 rounded-full text-sm font-medium">
              {request.location.distance}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
              <img 
                src={request.client.image} 
                alt={request.client.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <div className="flex items-center">
                <h3 className="font-medium">{request.client.name}</h3>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1">{request.client.rating}</span>
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
            <div className="ml-auto">
              <Button 
                size="sm" 
                variant="outline"
                className="rounded-full"
                onClick={() => window.open(`tel:${request.client.phone.replace(/\s/g, '')}`)}
              >
                <Phone className="h-4 w-4 mr-1" />
                Appeler
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div 
            className="p-4 flex justify-between items-center cursor-pointer"
            onClick={() => setShowDetails(!showDetails)}
          >
            <h3 className="font-medium">Détails de la demande</h3>
            {showDetails ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {showDetails && (
            <>
              <Separator />
              
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p>{request.service.description}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Véhicule</p>
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-benin-blue mr-2" />
                    <div>
                      <p className="font-medium">{request.vehicle.model} ({request.vehicle.year})</p>
                      <p className="text-sm text-gray-500">{request.vehicle.color} • {request.vehicle.plate}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Localisation</p>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-red-500 mr-2" />
                    <p>{request.location.address}</p>
                  </div>
                </div>
                
                <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Carte interactive</p>
                  {/* In a real app, this would be a map component */}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <div className="fixed bottom-20 inset-x-0 p-4 bg-white border-t border-gray-200">
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
            onClick={handleReject}
          >
            <X className="h-5 w-5 mr-2" />
            Refuser
          </Button>
          <Button 
            className="flex-1 bg-benin-green text-white hover:bg-benin-green/90"
            onClick={handleAccept}
          >
            <Check className="h-5 w-5 mr-2" />
            Accepter
          </Button>
        </div>
      </div>
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

export default TechnicianRequestDetail;
