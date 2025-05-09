
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for service types
const serviceTypes = [
  { id: 1, name: 'Mécanique', icon: Car, color: '#0089e1' },
  { id: 2, name: 'Remorquage', icon: Car, color: '#50cd89' },
  { id: 3, name: 'Pneu/Roue', icon: Car, color: '#ff9500' },
  { id: 4, name: 'Carburant', icon: Car, color: '#ff3b30' },
];

// Mock data for recent technicians
const recentTechnicians = [
  { 
    id: 1, 
    name: 'Garage Central', 
    specialties: ['Mécanique', 'Électricité'],
    distance: '1.2 km',
    rating: 4.8,
    phone: '229 91234567'
  },
  { 
    id: 2, 
    name: 'Auto Express', 
    specialties: ['Remorquage', 'Dépannage'],
    distance: '2.5 km',
    rating: 4.5,
    phone: '229 91234568'
  },
];

const DriverHome: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 pb-8">
      <section className="pt-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Bonjour, {user?.name || 'Conducteur'}!</h1>
            <p className="text-gray-500">Besoin d'assistance aujourd'hui?</p>
          </div>
          <div className="h-12 w-12 bg-benin-offwhite rounded-full flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="h-full w-full rounded-full object-cover" />
            ) : (
              <span className="text-benin-blue font-bold text-xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </span>
            )}
          </div>
        </div>
      </section>
      
      <section>
        <Button 
          onClick={() => navigate('/driver/sos')}
          className="w-full py-8 text-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse-sos border-none"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </div>
            <span>SOS - Assistance Immédiate</span>
          </div>
        </Button>
      </section>
      
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <span className="w-1 h-5 bg-benin-blue rounded-full mr-2"></span>
          Services
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {serviceTypes.map((service) => (
            <Button
              key={service.id}
              variant="outline"
              className="flex flex-col h-24 p-2 card-hover bg-white border-gray-100"
              onClick={() => navigate(`/driver/services/${service.id}`)}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: service.color }}
              >
                <service.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs text-center">{service.name}</span>
            </Button>
          ))}
        </div>
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <span className="w-1 h-5 bg-benin-green rounded-full mr-2"></span>
            À proximité
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/driver/map')}
            className="text-benin-blue font-medium"
          >
            Voir la carte
          </Button>
        </div>
        <div className="space-y-3">
          {recentTechnicians.map((tech) => (
            <Card key={tech.id} className="overflow-hidden border-none shadow-md card-hover">
              <CardContent className="p-0">
                <div className="flex justify-between">
                  <div className="p-4">
                    <h3 className="font-medium">{tech.name}</h3>
                    <p className="text-sm text-gray-500">{tech.specialties.join(', ')}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-benin-blue" />
                      <span>{tech.distance}</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end p-4 bg-benin-offwhite">
                    <div className="bg-benin-green text-white rounded-full px-2 py-1 text-sm mb-2">
                      {tech.rating} ★
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="gap-1 bg-white"
                      onClick={() => window.open(`tel:${tech.phone}`)}
                    >
                      <Phone className="h-3 w-3" />
                      Appeler
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <span className="w-1 h-5 bg-benin-blue rounded-full mr-2"></span>
            Demandes récentes
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/driver/history')}
            className="text-benin-blue font-medium"
          >
            Historique
          </Button>
        </div>
        <Card className="overflow-hidden border-none shadow-md card-hover bg-gradient-to-br from-white to-benin-offwhite/30">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-full bg-benin-green/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-benin-green" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">Réparation pneu</h3>
                  <span className="text-sm text-gray-500">Hier</span>
                </div>
                <p className="text-sm text-gray-500">Garage Central - 12 000 FCFA</p>
                <div className="mt-2 text-xs py-1 px-3 bg-green-100 text-green-800 rounded-full inline-block">
                  Terminé
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default DriverHome;
