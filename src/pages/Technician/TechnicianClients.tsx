
import React from 'react';
import { User, Phone, MapPin, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Custom Star Icon component
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

// Mock data for clients
const clients = [
  {
    id: 1,
    name: 'Jean Kokou',
    phone: '+229 97 12 34 56',
    location: 'Cotonou',
    rating: 4.8,
    lastService: '12 Mai, 2023',
    totalServices: 5,
    photo: null
  },
  {
    id: 2,
    name: 'Marie Dossou',
    phone: '+229 97 12 34 57',
    location: 'Porto-Novo',
    rating: 4.5,
    lastService: '05 Avr, 2023',
    totalServices: 2,
    photo: null
  },
  {
    id: 3,
    name: 'Ahmed Moussa',
    phone: '+229 97 12 34 58',
    location: 'Cotonou',
    rating: 5.0,
    lastService: '20 Mai, 2023',
    totalServices: 8,
    photo: null
  }
];

const TechnicianClients: React.FC = () => {
  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold">Mes Clients</h1>
        <p className="text-gray-500">Gérez vos relations clients</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Rechercher un client..." 
          className="pl-9 bg-white"
        />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="recent">Récents</TabsTrigger>
          <TabsTrigger value="frequent">Fréquents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          {clients
            .sort((a, b) => new Date(b.lastService).getTime() - new Date(a.lastService).getTime())
            .slice(0, 2)
            .map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
        </TabsContent>
        
        <TabsContent value="frequent" className="space-y-4">
          {clients
            .sort((a, b) => b.totalServices - a.totalServices)
            .slice(0, 2)
            .map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ClientProps {
  client: typeof clients[0];
}

const ClientCard: React.FC<ClientProps> = ({ client }) => {
  return (
    <Card className="shadow-sm border-none overflow-hidden">
      <CardContent className="p-0">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-benin-offwhite flex items-center justify-center">
              {client.photo ? (
                <img 
                  src={client.photo} 
                  alt={client.name} 
                  className="w-full h-full rounded-full object-cover" 
                />
              ) : (
                <User className="h-6 w-6 text-gray-500" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{client.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                {client.location}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-medium">{client.rating}</span>
            </div>
            <div className="text-xs text-gray-500">
              {client.totalServices} services
            </div>
          </div>
        </div>
        <div className="flex border-t">
          <Button variant="ghost" className="flex-1 py-2 rounded-none flex justify-center items-center gap-1">
            <Phone className="h-4 w-4" />
            Appeler
          </Button>
          <div className="border-r"></div>
          <Button 
            variant="ghost" 
            className="flex-1 py-2 rounded-none flex justify-center items-center gap-1 text-benin-blue"
            onClick={() => {/* Navigate to client detail */}}
          >
            <Clock className="h-4 w-4" />
            Historique
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicianClients;
