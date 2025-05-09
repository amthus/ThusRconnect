
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for services
const initialServices = [
  {
    id: 1,
    name: 'Réparation mécanique',
    description: 'Diagnostic et réparation de problèmes mécaniques',
    price: '5,000-15,000 FCFA',
    isActive: true
  },
  {
    id: 2,
    name: 'Remorquage',
    description: 'Service de remorquage pour véhicules en panne',
    price: '10,000-30,000 FCFA',
    isActive: true
  },
  {
    id: 3,
    name: 'Changement de pneu',
    description: 'Remplacement et réparation de pneus crevés',
    price: '2,000-8,000 FCFA',
    isActive: true
  },
  {
    id: 4,
    name: 'Démarrage batterie',
    description: 'Aide au démarrage avec batterie externe',
    price: '5,000 FCFA',
    isActive: false
  }
];

const TechnicianServices: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = React.useState(initialServices);
  const [newServiceName, setNewServiceName] = React.useState('');
  const [newServiceDescription, setNewServiceDescription] = React.useState('');
  const [newServicePrice, setNewServicePrice] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  
  const toggleServiceStatus = (serviceId: number) => {
    setServices(services.map(service => 
      service.id === serviceId ? 
      { ...service, isActive: !service.isActive } : 
      service
    ));
  };
  
  const handleAddService = () => {
    if (!newServiceName || !newServicePrice) return;
    
    const newService = {
      id: services.length + 1,
      name: newServiceName,
      description: newServiceDescription,
      price: newServicePrice + ' FCFA',
      isActive: true
    };
    
    setServices([...services, newService]);
    setNewServiceName('');
    setNewServiceDescription('');
    setNewServicePrice('');
    setIsDialogOpen(false);
  };
  
  const handleDeleteService = (serviceId: number) => {
    setServices(services.filter(service => service.id !== serviceId));
  };
  
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate('/technician')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Mes services</h1>
      </div>
      
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-benin-green">
              <Plus className="h-4 w-4 mr-1" />
              Ajouter un service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau service</DialogTitle>
              <DialogDescription>
                Créez un nouveau service que vous proposez à vos clients.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nom du service</label>
                <Input
                  id="name"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="Ex: Réparation mécanique"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                  placeholder="Décrivez ce service en quelques mots"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Prix (FCFA)</label>
                <Input
                  id="price"
                  value={newServicePrice}
                  onChange={(e) => setNewServicePrice(e.target.value)}
                  placeholder="Ex: 5,000 ou 5,000-15,000"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button className="bg-benin-green" onClick={handleAddService}>
                Ajouter le service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        {services.length > 0 ? (
          services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                    <p className="text-sm font-medium text-benin-green mt-2">{service.price}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{service.isActive ? 'Actif' : 'Inactif'}</span>
                      <Switch 
                        checked={service.isActive}
                        onCheckedChange={() => toggleServiceStatus(service.id)}
                        className={service.isActive ? 'bg-benin-green' : ''}
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <Car className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">Vous n'avez pas encore ajouté de services.</p>
              <Button 
                className="mt-4 bg-benin-green"
                onClick={() => setIsDialogOpen(true)}
              >
                Ajouter votre premier service
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TechnicianServices;
