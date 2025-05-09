
import React, { useState } from 'react';
import { Search, Calendar, ArrowUpDown, Eye, Clock, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

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

// Helper functions for styling
const getUrgencyColor = (urgency: string) => {
  return urgency === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'waiting':
      return 'bg-purple-100 text-purple-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Terminé';
    case 'in_progress':
      return 'En cours';
    case 'pending':
      return 'En attente';
    case 'waiting':
      return 'Recherche technicien';
    case 'cancelled':
      return 'Annulé';
    default:
      return status;
  }
};

// Mock data for service requests
const serviceRequests = [
  { 
    id: 1, 
    type: 'Réparation pneu',
    client: 'Jean Kokou',
    clientPhone: '229 91234567',
    technician: 'Garage Central',
    technicianPhone: '229 91234569',
    status: 'completed',
    date: '10 Avr 2023',
    time: '14:30',
    location: 'Cotonou',
    amount: '12 000 FCFA',
    urgency: 'normal'
  },
  { 
    id: 2, 
    type: 'Remorquage',
    client: 'Marie Dossou',
    clientPhone: '229 91234568',
    technician: 'Auto Express',
    technicianPhone: '229 91234570',
    status: 'in_progress',
    date: '12 Mai 2023',
    time: '10:15',
    location: 'Porto-Novo',
    amount: '25 000 FCFA',
    urgency: 'high'
  },
  { 
    id: 3, 
    type: 'Batterie',
    client: 'Ahmed Moussa',
    clientPhone: '229 91234572',
    technician: 'Électro Auto',
    technicianPhone: '229 91234571',
    status: 'pending',
    date: '12 Mai 2023',
    time: '16:45',
    location: 'Cotonou',
    amount: '8 000 FCFA',
    urgency: 'normal'
  },
  { 
    id: 4, 
    type: 'Diagnostic',
    client: 'Sophie Koudjo',
    clientPhone: '229 91234573',
    technician: null,
    technicianPhone: null,
    status: 'waiting',
    date: '13 Mai 2023',
    time: '09:20',
    location: 'Cotonou',
    amount: 'À déterminer',
    urgency: 'high'
  },
  { 
    id: 5, 
    type: 'Vidange',
    client: 'Paul Adjovi',
    clientPhone: '229 91234574',
    technician: 'Garage Central',
    technicianPhone: '229 91234569',
    status: 'cancelled',
    date: '9 Avr 2023',
    time: '11:00',
    location: 'Cotonou',
    amount: '15 000 FCFA',
    urgency: 'normal'
  },
];

const AdminRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<typeof serviceRequests[0] | null>(null);
  
  // Apply filters to requests
  const filteredRequests = serviceRequests.filter(request => {
    // Apply search filter
    const matchesSearch = 
      request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.technician && request.technician.toLowerCase().includes(searchTerm.toLowerCase())) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    // Apply date filter (simplified - in a real app, would use proper date filtering)
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'today' && request.date === '12 Mai 2023') ||
      (dateFilter === 'yesterday' && request.date === '11 Mai 2023') ||
      (dateFilter === 'past_week' && ['10 Avr 2023', '11 Mai 2023', '12 Mai 2023'].includes(request.date));
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  // Apply sorting
  const sortedRequests = sortConfig 
    ? [...filteredRequests].sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      })
    : filteredRequests;
  
  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Demandes de service</h1>
        <p className="text-muted-foreground">Gérez les demandes d'assistance routière</p>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-2">
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200" variant="outline">
          Terminé: {serviceRequests.filter(r => r.status === 'completed').length}
        </Badge>
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200" variant="outline">
          En cours: {serviceRequests.filter(r => r.status === 'in_progress').length}
        </Badge>
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200" variant="outline">
          En attente: {serviceRequests.filter(r => r.status === 'pending').length}
        </Badge>
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200" variant="outline">
          Recherche: {serviceRequests.filter(r => r.status === 'waiting').length}
        </Badge>
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200" variant="outline">
          Annulé: {serviceRequests.filter(r => r.status === 'cancelled').length}
        </Badge>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher par type, client ou prestataire..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="waiting">Recherche</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les dates</SelectItem>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="yesterday">Hier</SelectItem>
                  <SelectItem value="past_week">7 derniers jours</SelectItem>
                  <SelectItem value="past_month">30 derniers jours</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Calendrier
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('type')}
                  >
                    <div className="flex items-center">
                      Service
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prestataire
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('date')}
                  >
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localisation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedRequests.length > 0 ? (
                  sortedRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-benin-offwhite flex items-center justify-center">
                            <Car className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{request.type}</div>
                            <Badge className={`text-xs ${getUrgencyColor(request.urgency)}`}>
                              {request.urgency === 'high' ? 'Urgent' : 'Normal'}
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">{request.client}</div>
                        <div className="text-xs text-gray-500">{request.clientPhone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.technician ? (
                          <>
                            <div className="text-sm font-medium">{request.technician}</div>
                            <div className="text-xs text-gray-500">{request.technicianPhone}</div>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500 italic">Non assigné</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{request.date}</div>
                        <div className="text-xs text-gray-500">{request.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{request.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">{request.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                          {getStatusLabel(request.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex items-center"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Détails
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Détails de la demande #{request.id}</DialogTitle>
                              <DialogDescription>
                                Informations complètes sur la demande de service
                              </DialogDescription>
                            </DialogHeader>
                            <RequestDetailContent request={selectedRequest} />
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center">
                      <div className="text-center">
                        <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <h3 className="text-sm font-medium text-gray-900">Aucune demande trouvée</h3>
                        <p className="text-sm text-gray-500">
                          Essayez d'ajuster vos filtres de recherche
                        </p>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="mt-3"
                          onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('all');
                            setDateFilter('all');
                          }}
                        >
                          Réinitialiser les filtres
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">
              Affichage de {sortedRequests.length} sur {serviceRequests.length} demandes
            </p>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface RequestDetailContentProps {
  request: typeof serviceRequests[0] | null;
}

const RequestDetailContent: React.FC<RequestDetailContentProps> = ({ request }) => {
  if (!request) return null;
  
  return (
    <div className="space-y-4 pt-3">
      <Tabs defaultValue="info">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="client">Client</TabsTrigger>
          <TabsTrigger value="technician">Prestataire</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="p-4 bg-white rounded-md">
          <div className="space-y-3">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{request.type}</h3>
                <Badge className={`mt-1 ${getUrgencyColor(request.urgency)}`}>
                  {request.urgency === 'high' ? 'Urgent' : 'Normal'}
                </Badge>
              </div>
              <Badge className={`${getStatusColor(request.status)}`}>
                {getStatusLabel(request.status)}
              </Badge>
            </div>
            
            <Separator />
            
            <div>
              <div className="text-sm text-gray-500">Date et heure</div>
              <div className="font-medium flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-2" />
                {request.date} à {request.time}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Localisation</div>
              <div className="font-medium">{request.location}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Montant</div>
              <div className="font-medium">{request.amount}</div>
            </div>
            
            <div className="bg-benin-offwhite p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-2">
                Journal d'activité
              </div>
              <div className="space-y-2">
                <div className="text-xs">
                  <span className="text-gray-500">12 Mai, 10:15 -</span> Demande créée par {request.client}
                </div>
                {request.status !== 'waiting' && request.technician && (
                  <div className="text-xs">
                    <span className="text-gray-500">12 Mai, 10:20 -</span> Acceptée par {request.technician}
                  </div>
                )}
                {request.status === 'in_progress' && (
                  <div className="text-xs">
                    <span className="text-gray-500">12 Mai, 10:35 -</span> Service en cours
                  </div>
                )}
                {request.status === 'completed' && (
                  <>
                    <div className="text-xs">
                      <span className="text-gray-500">10 Avr, 14:35 -</span> Service en cours
                    </div>
                    <div className="text-xs">
                      <span className="text-gray-500">10 Avr, 15:10 -</span> Service terminé
                    </div>
                    <div className="text-xs">
                      <span className="text-gray-500">10 Avr, 15:15 -</span> Paiement effectué
                    </div>
                  </>
                )}
                {request.status === 'cancelled' && (
                  <div className="text-xs">
                    <span className="text-gray-500">9 Avr, 11:10 -</span> Demande annulée par {request.client}
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="client" className="p-4 bg-white rounded-md">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-benin-offwhite flex items-center justify-center text-lg font-medium">
                {request.client.charAt(0)}
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{request.client}</h3>
                <div className="text-sm text-gray-500">{request.clientPhone}</div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <div className="text-sm text-gray-500">Historique</div>
              <div className="mt-1 text-sm">
                <span className="font-medium">5</span> services demandés
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                Voir profil
              </Button>
              <Button size="sm">
                Contacter
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="technician" className="p-4 bg-white rounded-md">
          {request.technician ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-benin-offwhite flex items-center justify-center text-lg font-medium">
                  {request.technician.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{request.technician}</h3>
                  <div className="text-sm text-gray-500">{request.technicianPhone}</div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm text-gray-500">Performance</div>
                <div className="mt-1 flex items-center text-sm">
                  <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                  <span className="font-medium">4.8</span>
                  <span className="text-gray-500 ml-1">(156 avis)</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  Voir profil
                </Button>
                <Button size="sm">
                  Contacter
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="h-12 w-12 rounded-full bg-benin-offwhite flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="font-medium">En attente d'assignation</h3>
              <p className="text-sm text-gray-500 mt-1">
                Aucun prestataire n'a encore accepté cette demande
              </p>
              <Button className="mt-4 bg-benin-green text-white">
                Assigner manuellement
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRequests;
