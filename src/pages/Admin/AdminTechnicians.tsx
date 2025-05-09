
import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for technicians
const technicians = [
  { 
    id: 1, 
    name: 'Garage Central', 
    owner: 'Paul Adjovi',
    email: 'garage.central@example.com', 
    phone: '229 91234569', 
    specialties: ['Mécanique', 'Électrique', 'Pneus'],
    status: 'active',
    location: 'Cotonou',
    registeredDate: '15 Jan 2023',
    rating: 4.8,
    completedServices: 243
  },
  { 
    id: 2, 
    name: 'Auto Express', 
    owner: 'Jean Kokou',
    email: 'auto.express@example.com', 
    phone: '229 91234570', 
    specialties: ['Remorquage', 'Dépannage'],
    status: 'active',
    location: 'Porto-Novo',
    registeredDate: '20 Fév 2023',
    rating: 4.5,
    completedServices: 187
  },
  { 
    id: 3, 
    name: 'Électro Auto', 
    owner: 'Marie Dossou',
    email: 'electro.auto@example.com', 
    phone: '229 91234571', 
    specialties: ['Électrique', 'Batterie'],
    status: 'pending',
    location: 'Cotonou',
    registeredDate: '5 Mar 2023',
    rating: 4.2,
    completedServices: 56
  },
  { 
    id: 4, 
    name: 'Pneu Pro', 
    owner: 'Ahmed Moussa',
    email: 'pneu.pro@example.com', 
    phone: '229 91234572', 
    specialties: ['Pneus', 'Suspension'],
    status: 'inactive',
    location: 'Parakou',
    registeredDate: '12 Avr 2023',
    rating: 3.9,
    completedServices: 42
  },
];

const AdminTechnicians: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  
  const filteredTechnicians = technicians.filter(tech => {
    // Apply search filter
    const matchesSearch = 
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.phone.includes(searchTerm);
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || tech.status === statusFilter;
    
    // Apply location filter
    const matchesLocation = locationFilter === 'all' || tech.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });
  
  const statusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Prestataires</h1>
          <p className="text-muted-foreground">Gérez les techniciens de la plateforme</p>
        </div>
        <Button className="bg-benin-green">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un prestataire
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher par nom, email ou téléphone..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  <SelectItem value="Cotonou">Cotonou</SelectItem>
                  <SelectItem value="Porto-Novo">Porto-Novo</SelectItem>
                  <SelectItem value="Parakou">Parakou</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredTechnicians.length > 0 ? (
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prestataire
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Spécialités
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performances
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
                  {filteredTechnicians.map((technician) => (
                    <tr key={technician.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-benin-offwhite flex items-center justify-center">
                            {technician.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{technician.name}</div>
                            <div className="text-sm text-gray-500">{technician.owner}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{technician.email}</div>
                        <div className="text-sm text-gray-500">{technician.phone}</div>
                        <div className="text-sm text-gray-500">{technician.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {technician.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="bg-benin-offwhite">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-medium mr-1">{technician.rating}</span>
                          <span className="text-gray-500 ml-2">({technician.completedServices} services)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor(technician.status)}`}>
                          {technician.status === 'active' ? 'Actif' : 
                            technician.status === 'inactive' ? 'Inactif' : 'En attente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Voir détails</DropdownMenuItem>
                            <DropdownMenuItem>Modifier</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {technician.status === 'active' ? (
                              <DropdownMenuItem className="text-red-600">
                                Désactiver
                              </DropdownMenuItem>
                            ) : technician.status === 'inactive' ? (
                              <DropdownMenuItem className="text-green-600">
                                Activer
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                Approuver
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Car className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">Aucun prestataire trouvé</h3>
              <p className="text-gray-500 mt-1">Modifiez vos critères de recherche</p>
              <Button 
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setLocationFilter('all');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500">
              Affichage de {filteredTechnicians.length} sur {technicians.length} prestataires
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

// Fix missing Car component
const Car = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
    <circle cx="6.5" cy="16.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
);

export default AdminTechnicians;
