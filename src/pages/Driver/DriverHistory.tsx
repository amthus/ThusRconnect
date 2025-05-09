
import React from 'react';
import { ArrowLeft, Calendar, Clock, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

// Mock data for service history
const completedServices = [
  {
    id: 1,
    type: 'Réparation pneu',
    provider: 'Garage Central',
    date: '10 Avr 2023',
    price: '12 000 FCFA',
    status: 'completed',
    rating: 5,
  },
  {
    id: 2,
    type: 'Remorquage',
    provider: 'Express Dépannage',
    date: '15 Mar 2023',
    price: '25 000 FCFA',
    status: 'completed',
    rating: 4,
  },
  {
    id: 3,
    type: 'Batterie',
    provider: 'Auto Électrique Plus',
    date: '28 Fév 2023',
    price: '8 000 FCFA',
    status: 'completed',
    rating: 5,
  },
];

const pendingServices = [
  {
    id: 4,
    type: 'Vidange',
    provider: 'MécaPro',
    date: 'Aujourd\'hui',
    time: '14:30',
    status: 'pending',
  },
];

const DriverHistory: React.FC = () => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Terminé</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">En attente</Badge>;
      case 'canceled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Annulé</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Historique des services</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
        >
          <Filter className="h-5 w-5" />
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-benin-offwhite h-auto p-1">
          <TabsTrigger value="all" className="rounded-lg py-2 data-[state=active]:bg-white data-[state=active]:shadow">Tous</TabsTrigger>
          <TabsTrigger value="pending" className="rounded-lg py-2 data-[state=active]:bg-white data-[state=active]:shadow">En cours</TabsTrigger>
          <TabsTrigger value="completed" className="rounded-lg py-2 data-[state=active]:bg-white data-[state=active]:shadow">Terminés</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {pendingServices.length > 0 && (
              <>
                <h2 className="text-sm text-gray-500 uppercase tracking-wide">En attente</h2>
                {pendingServices.map((service) => (
                  <div 
                    key={service.id} 
                    className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center"
                    onClick={() => navigate(`/driver/service/${service.id}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-benin-blue/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-benin-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">{service.type}</h3>
                        <p className="text-sm text-gray-500">{service.provider}</p>
                        <div className="mt-1 flex items-center text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{service.date}, {service.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {getStatusBadge(service.status)}
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </>
            )}
            
            {completedServices.length > 0 && (
              <>
                <h2 className="text-sm text-gray-500 uppercase tracking-wide mt-6">Historique</h2>
                {completedServices.map((service) => (
                  <div 
                    key={service.id} 
                    className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center"
                    onClick={() => navigate(`/driver/service/${service.id}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-benin-green/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-benin-green" />
                      </div>
                      <div>
                        <h3 className="font-medium">{service.type}</h3>
                        <p className="text-sm text-gray-500">{service.provider}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {Array(service.rating).fill(0).map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div>{service.price}</div>
                      <div className="text-xs text-gray-500">{service.date}</div>
                      {getStatusBadge(service.status)}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {pendingServices.length > 0 ? (
              pendingServices.map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center"
                  onClick={() => navigate(`/driver/service/${service.id}`)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-benin-blue/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-benin-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium">{service.type}</h3>
                      <p className="text-sm text-gray-500">{service.provider}</p>
                      <div className="mt-1 flex items-center text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{service.date}, {service.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(service.status)}
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">Aucun service en cours</h3>
                <p className="text-gray-500 mt-1">Vous n'avez pas de service en attente actuellement</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="space-y-4">
            {completedServices.length > 0 ? (
              completedServices.map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center"
                  onClick={() => navigate(`/driver/service/${service.id}`)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-benin-green/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-benin-green" />
                    </div>
                    <div>
                      <h3 className="font-medium">{service.type}</h3>
                      <p className="text-sm text-gray-500">{service.provider}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          {Array(service.rating).fill(0).map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div>{service.price}</div>
                    <div className="text-xs text-gray-500">{service.date}</div>
                    {getStatusBadge(service.status)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">Aucun historique</h3>
                <p className="text-gray-500 mt-1">Vous n'avez pas encore demandé de services</p>
              </div>
            )}
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

export default DriverHistory;
