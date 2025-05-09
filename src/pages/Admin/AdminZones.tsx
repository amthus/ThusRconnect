
import React, { useState } from 'react';
import { MapPin, Plus, Search, Edit, Trash2, Check, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for zones
const zones = [
  {
    id: 1,
    name: 'Cotonou Centre',
    type: 'urban',
    technicians: 45,
    requests: 187,
    coverage: 'high',
    neighborhoods: ['Ganhi', 'Xwlacodji', 'Gbeto', 'Sikècodji'],
  },
  {
    id: 2,
    name: 'Cotonou Nord',
    type: 'urban',
    technicians: 28,
    requests: 124,
    coverage: 'medium',
    neighborhoods: ['Cadjehoun', 'Gbégamey', 'Houéyiho'],
  },
  {
    id: 3,
    name: 'Porto-Novo',
    type: 'urban',
    technicians: 20,
    requests: 95,
    coverage: 'medium',
    neighborhoods: ['Djassin', 'Houinmè', 'Louho'],
  },
  {
    id: 4,
    name: 'Parakou',
    type: 'urban',
    technicians: 12,
    requests: 47,
    coverage: 'low',
    neighborhoods: ['Ganhi', 'Banikanni', 'Kpebié'],
  },
  {
    id: 5,
    name: 'Route Cotonou-Porto-Novo',
    type: 'highway',
    technicians: 8,
    requests: 65,
    coverage: 'medium',
    neighborhoods: [],
  },
  {
    id: 6,
    name: 'Zone rurale Abomey',
    type: 'rural',
    technicians: 5,
    requests: 28,
    coverage: 'low',
    neighborhoods: ['Sèmè', 'Agblangandan'],
  }
];

const AdminZones: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZoneType, setSelectedZoneType] = useState('all');
  const [isEditMode, setIsEditMode] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [zoneToDelete, setZoneToDelete] = useState<number | null>(null);
  
  const filteredZones = zones.filter(zone => {
    const matchesSearch = zone.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedZoneType === 'all' || zone.type === selectedZoneType;
    return matchesSearch && matchesType;
  });
  
  const coverageColor = (coverage: string) => {
    switch (coverage) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100';
    }
  };
  
  const coverageLabel = (coverage: string) => {
    switch (coverage) {
      case 'high':
        return 'Élevée';
      case 'medium':
        return 'Moyenne';
      case 'low':
        return 'Faible';
      default:
        return coverage;
    }
  };
  
  const zoneTypeLabel = (type: string) => {
    switch (type) {
      case 'urban':
        return 'Urbaine';
      case 'rural':
        return 'Rurale';
      case 'highway':
        return 'Route principale';
      default:
        return type;
    }
  };

  const handleDeleteClick = (zoneId: number) => {
    setZoneToDelete(zoneId);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    // In a real app, this would delete the zone from the database
    console.log(`Deleting zone ${zoneToDelete}`);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Zones</h1>
          <p className="text-muted-foreground">Gérez les zones de couverture de la plateforme</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-benin-green">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une zone
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle zone</DialogTitle>
              <DialogDescription>
                Créez une nouvelle zone pour étendre la couverture de vos services.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium" htmlFor="zone-name">
                  Nom de la zone
                </label>
                <Input id="zone-name" placeholder="Ex: Cotonou Centre" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="zone-type">
                  Type de zone
                </label>
                <Select defaultValue="urban">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urban">Urbaine</SelectItem>
                    <SelectItem value="rural">Rurale</SelectItem>
                    <SelectItem value="highway">Route principale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="zone-neighborhoods">
                  Quartiers (séparés par des virgules)
                </label>
                <Input id="zone-neighborhoods" placeholder="Ex: Ganhi, Xwlacodji, Gbeto" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Zone sur la carte
                </label>
                <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Interface carte</p>
                  {/* In a real app, this would be a map component */}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Créer la zone</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher une zone..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedZoneType} onValueChange={setSelectedZoneType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type de zone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="urban">Urbaine</SelectItem>
            <SelectItem value="rural">Rurale</SelectItem>
            <SelectItem value="highway">Route principale</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredZones.map((zone) => (
          <Card key={zone.id} className="overflow-hidden border-none shadow-md">
            <div className={`h-1 ${
              zone.coverage === 'high' 
                ? 'bg-green-500' 
                : zone.coverage === 'medium' 
                ? 'bg-yellow-500' 
                : 'bg-red-500'
            }`}></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-benin-blue mr-1" />
                    <CardTitle className="text-lg">{zone.name}</CardTitle>
                  </div>
                  <Badge className="mt-1" variant="outline">
                    {zoneTypeLabel(zone.type)}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsEditMode(isEditMode === zone.id ? null : zone.id)}
                  >
                    {isEditMode === zone.id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Edit className="h-4 w-4" />
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteClick(zone.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-benin-offwhite p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Prestataires</div>
                    <div className="text-xl font-bold">{zone.technicians}</div>
                  </div>
                  <div className="bg-benin-offwhite p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Demandes</div>
                    <div className="text-xl font-bold">{zone.requests}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Couverture</div>
                  <Badge className={coverageColor(zone.coverage)}>
                    {coverageLabel(zone.coverage)}
                  </Badge>
                </div>
                
                {zone.neighborhoods.length > 0 && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="neighborhoods" className="border-none">
                      <AccordionTrigger className="py-2">
                        <span className="text-sm">Quartiers ({zone.neighborhoods.length})</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-1">
                          {zone.neighborhoods.map((neighborhood, index) => (
                            <Badge key={index} variant="outline" className="bg-benin-offwhite">
                              {neighborhood}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
                
                <Button className="w-full" variant="outline">
                  Voir les détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add Zone Card */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="overflow-hidden border-dashed border-2 border-gray-300 shadow-sm hover:border-benin-blue hover:bg-benin-blue/5 transition-colors cursor-pointer h-[235px] flex items-center justify-center">
              <CardContent className="text-center">
                <div className="w-12 h-12 rounded-full bg-benin-blue/10 flex items-center justify-center mx-auto mb-3">
                  <Plus className="h-6 w-6 text-benin-blue" />
                </div>
                <h3 className="font-medium text-benin-blue">Ajouter une zone</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Étendre la couverture de service
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle zone</DialogTitle>
              <DialogDescription>
                Créez une nouvelle zone pour étendre la couverture de vos services.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium" htmlFor="zone-name">
                  Nom de la zone
                </label>
                <Input id="zone-name" placeholder="Ex: Cotonou Centre" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="zone-type">
                  Type de zone
                </label>
                <Select defaultValue="urban">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urban">Urbaine</SelectItem>
                    <SelectItem value="rural">Rurale</SelectItem>
                    <SelectItem value="highway">Route principale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="zone-neighborhoods">
                  Quartiers (séparés par des virgules)
                </label>
                <Input id="zone-neighborhoods" placeholder="Ex: Ganhi, Xwlacodji, Gbeto" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Zone sur la carte
                </label>
                <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Interface carte</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Créer la zone</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {filteredZones.length === 0 && (
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <MapPin className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700">Aucune zone trouvée</h3>
          <p className="text-gray-500 mt-1">Essayez d'ajuster vos filtres</p>
          <Button 
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setSelectedZoneType('all');
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Supprimer la zone</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette zone ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">
              La suppression de cette zone désactivera tous les services associés dans cette région.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminZones;
