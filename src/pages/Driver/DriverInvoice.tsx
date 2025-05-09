
import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Download, Share2, Calendar, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

const DriverInvoice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const serviceType = searchParams.get('service') || 'standard';
  
  // Generate a random invoice number
  const invoiceNumber = `INV-${Math.floor(Math.random() * 9000) + 1000}`;
  const currentDate = format(new Date(), 'dd MMM yyyy');
  
  // Mock breakdown data based on ID
  const breakdownTypes: Record<string, { name: string; }> = {
    "1": { name: "Panne moteur" },
    "2": { name: "Crevaison pneu" },
    "3": { name: "Problème batterie" },
    "4": { name: "Panne générale" },
  };
  
  const breakdown = breakdownTypes[id || "4"] || breakdownTypes["4"];
  
  // Mock price based on service type
  const price = serviceType === 'premium' ? '25 000' : '15 000';
  const fees = '500';
  const total = serviceType === 'premium' ? '25 500' : '15 500';

  const handleRequestService = () => {
    navigate('/driver/breakdowns');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full mr-2"
          onClick={() => navigate('/driver/services')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Facture</h1>
      </div>
      
      <div className="bg-gradient-to-b from-green-50 to-blue-50 rounded-xl p-6 text-center">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-benin-green" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Paiement réussi!</h2>
        <p className="text-gray-600 mt-1">Votre demande de service a été confirmée</p>
        
        <div className="mt-6 flex justify-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
            onClick={() => {}}  // Download functionality would be implemented here
          >
            <Download className="h-4 w-4 mr-1" />
            PDF
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
            onClick={() => {}}  // Share functionality would be implemented here
          >
            <Share2 className="h-4 w-4 mr-1" />
            Partager
          </Button>
        </div>
      </div>
      
      <Card className="shadow-md border-none">
        <CardContent className="p-0">
          <div className="p-4 bg-white">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold">FACTURE</h3>
                <p className="text-sm text-gray-500">{invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{currentDate}</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <h4 className="text-sm text-gray-500">Service</h4>
              <p className="font-medium">{breakdown.name} - {serviceType === 'premium' ? 'Premium' : 'Standard'}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{format(new Date(), 'HH:mm')}</span>
              </div>
            </div>
            
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-gray-500">Prestataire</h4>
                <p className="font-medium">Garage Central</p>
                <p className="text-sm text-gray-500">Pro ID: TECH-2581</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Client</h4>
                <p className="font-medium">Jean Kokou</p>
                <p className="text-sm text-gray-500">Toyota Corolla (AB 1234 RB)</p>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{breakdown.name}</p>
                  <p className="text-sm text-gray-500">{serviceType === 'premium' ? 'Service Premium' : 'Service Standard'}</p>
                </div>
                <p>{price} FCFA</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Frais de traitement</p>
                </div>
                <p>{fees} FCFA</p>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between items-center font-bold">
                <p>Total</p>
                <p className="text-xl text-benin-green">{total} FCFA</p>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-benin-blue" />
                <p className="text-sm font-medium">Informations de paiement</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">Paiement effectué par carte bancaire •••• 4242</p>
              <p className="text-xs text-gray-500">Transaction ID: TXN-{Math.floor(Math.random() * 9000) + 1000}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="fixed bottom-20 inset-x-0 p-4 bg-white border-t border-gray-200">
        <Button 
          onClick={handleRequestService} 
          className="w-full bg-benin-green text-white"
        >
          <Calendar className="h-5 w-5 mr-2" />
          Demander un autre service
        </Button>
      </div>
    </div>
  );
};

export default DriverInvoice;
