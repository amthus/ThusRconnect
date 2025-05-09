
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Car, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

// Mock data for recent requests
const recentRequests = [
  {
    id: 1,
    customerName: 'Jean Kokou',
    service: 'Panne mécanique',
    location: '1.5 km',
    status: 'new',
    time: '2 min'
  },
  {
    id: 2,
    customerName: 'Marie Dossou',
    service: 'Crevaison',
    location: '0.8 km',
    status: 'new',
    time: '5 min'
  }
];

// Mock data for today's completed services
const completedServices = [
  {
    id: 101,
    customerName: 'Paul Adjovi',
    service: 'Remorquage',
    amount: '15,000 FCFA',
    time: '10:30'
  },
  {
    id: 102,
    customerName: 'Sophie Koudjo',
    service: 'Batterie',
    amount: '8,000 FCFA',
    time: '09:15'
  }
];

const TechnicianHome: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);
  
  // Stats data
  const todayEarnings = '23,000';
  const weeklyEarnings = '145,000';
  const completedJobsToday = 2;
  const totalCustomers = 24;
  
  return (
    <div className="space-y-6 pb-8">
      <section className="pt-4">
        <h1 className="text-2xl font-bold mb-2">Bonjour, {user?.name || 'Technicien'}!</h1>
        <div className="flex items-center">
          <Badge variant={isAvailable ? "default" : "outline"} className={isAvailable ? "bg-benin-green" : ""}>
            {isAvailable ? 'En ligne' : 'Hors ligne'}
          </Badge>
          <p className="text-gray-500 ml-2">Aujourd'hui, vous avez {recentRequests.length} demandes en attente</p>
        </div>
      </section>
      
      <section>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm text-gray-500 mb-1">Gains aujourd'hui</h3>
              <p className="text-2xl font-bold">{todayEarnings} FCFA</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm text-gray-500 mb-1">Cette semaine</h3>
              <p className="text-2xl font-bold">{weeklyEarnings} FCFA</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm text-gray-500 mb-1">Services complétés</h3>
              <p className="text-2xl font-bold">{completedJobsToday}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm text-gray-500 mb-1">Total clients</h3>
              <p className="text-2xl font-bold">{totalCustomers}</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Demandes récentes</h2>
          <Button variant="link" size="sm" onClick={() => navigate('/technician/requests')}>
            Voir tout
          </Button>
        </div>
        
        {recentRequests.length > 0 ? (
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{request.customerName}</h3>
                      <p className="text-sm text-gray-500">{request.service}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{request.location}</span>
                        <Clock className="h-4 w-4 ml-3 mr-1 text-gray-400" />
                        <span>Il y a {request.time}</span>
                      </div>
                    </div>
                    <Badge className="bg-benin-blue">Nouveau</Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Ignorer
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-benin-green"
                      onClick={() => navigate(`/technician/request/${request.id}`)}
                    >
                      Accepter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              <Car className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Aucune demande en attente</p>
            </CardContent>
          </Card>
        )}
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Services complétés aujourd'hui</h2>
        </div>
        
        {completedServices.length > 0 ? (
          <div className="space-y-3">
            {completedServices.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{service.customerName}</h3>
                      <p className="text-sm text-gray-500">{service.service}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{service.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-benin-green">{service.amount}</p>
                      <Badge variant="outline" className="mt-2">Complété</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              <p>Aucun service complété aujourd'hui</p>
            </CardContent>
          </Card>
        )}
      </section>
      
      <div className="pt-4">
        <Button
          className="w-full flex justify-between items-center"
          onClick={() => navigate('/technician/earnings')}
        >
          <span>Voir tous les gains</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TechnicianHome;
