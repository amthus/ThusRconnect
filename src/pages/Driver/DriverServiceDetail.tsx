
import React from 'react';
import { ArrowLeft, CheckCircle, Calendar, Clock, MapPin, Phone, MessageSquare, Star, FileText, CreditCard } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const DriverServiceDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Mock service data
  const service = {
    id: Number(id),
    type: 'Réparation pneu',
    provider: 'Garage Central',
    providerImage: '/placeholder.svg',
    date: '10 Avr 2023',
    time: '14:30',
    status: 'completed',
    location: 'Rue du Commerce, Cotonou',
    price: '12 000 FCFA',
    rating: 5,
    vehicle: 'Toyota Corolla (AB 1234 RB)',
    description: 'Crevaison pneu avant droit',
    phone: '+229 97 12 34 56',
    timeline: [
      { label: 'Demande envoyée', time: '14:05', completed: true },
      { label: 'Acceptée par le prestataire', time: '14:08', completed: true },
      { label: 'Technicien en route', time: '14:10', completed: true },
      { label: 'Service en cours', time: '14:30', completed: true },
      { label: 'Service terminé', time: '15:15', completed: true },
      { label: 'Paiement effectué', time: '15:20', completed: true },
    ]
  };

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
        <h1 className="text-xl font-bold">Détails du service</h1>
      </div>
      
      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-benin-blue to-benin-green p-4 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium">{service.type}</h2>
                <p className="text-white/80">{service.vehicle}</p>
                <div className="flex items-center mt-2 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{service.date} • {service.time}</span>
                </div>
              </div>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                {service.status === 'completed' ? 'Terminé' : 'En attente'}
              </Badge>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-benin-offwhite rounded-full overflow-hidden">
                <img 
                  src={service.providerImage} 
                  alt={service.provider}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{service.provider}</h3>
                <div className="flex items-center">
                  {Array(service.rating).fill(0).map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
              <div className="ml-auto">
                <Button 
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => window.open(`tel:${service.phone.replace(/\s/g, '')}`)}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Appeler
                </Button>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-4 space-y-3">
            <div>
              <label className="text-sm text-gray-500">Localisation</label>
              <div className="flex items-center text-sm font-medium mt-1">
                <MapPin className="h-4 w-4 text-benin-blue mr-1" />
                {service.location}
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Description</label>
              <p className="text-sm font-medium mt-1">{service.description}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Montant</label>
              <p className="text-lg font-bold mt-1 text-benin-green">{service.price}</p>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 flex items-center justify-center"
                onClick={() => navigate(`/driver/invoice/${service.id}`)}
              >
                <FileText className="h-4 w-4 mr-1" />
                Voir la facture
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 flex items-center justify-center"
                onClick={() => navigate(`/driver/payment/${service.id}`)}
              >
                <CreditCard className="h-4 w-4 mr-1" />
                Paiement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-lg font-medium mb-4">Suivi du service</h2>
        <div className="relative">
          {/* Timeline connector */}
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-benin-green/20"></div>
          
          {/* Timeline events */}
          <div className="space-y-6">
            {service.timeline.map((event, index) => (
              <div key={index} className="flex items-start">
                <div className={`h-4 w-4 rounded-full mt-1 z-10 ${
                  event.completed ? 'bg-benin-green' : 'bg-gray-300'
                }`}></div>
                <div className="ml-4">
                  <p className="font-medium">{event.label}</p>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {service.status === 'completed' && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Votre évaluation</h2>
          <Card className="shadow-md border-none overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-8 w-8 ${i < service.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-green-800 font-medium">Excellent service !</p>
              <p className="text-sm text-gray-600 mt-1">Merci pour votre évaluation</p>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="fixed bottom-20 inset-x-0 p-4 bg-white border-t border-gray-200">
        {service.status === 'completed' ? (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => navigate('/driver/services')} 
              className="bg-benin-green text-white"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Demander à nouveau
            </Button>
            <Button 
              onClick={() => navigate('/driver/breakdowns')} 
              className="bg-benin-blue text-white"
            >
              Autres services
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Progress value={75} className="h-2 w-full bg-benin-blue/20" />
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-benin-blue text-benin-blue"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Contacter
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-red-500 text-red-500"
              >
                Annuler
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverServiceDetail;
