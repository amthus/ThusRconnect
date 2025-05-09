
import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const DriverPayment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const serviceType = searchParams.get('service') || 'standard';
  
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Mock price based on service type
  const price = serviceType === 'premium' ? '25 000 FCFA' : '15 000 FCFA';
  
  // Mock breakdown data based on ID
  const breakdownTypes: Record<string, { name: string; }> = {
    "1": { name: "Panne moteur" },
    "2": { name: "Crevaison pneu" },
    "3": { name: "Problème batterie" },
    "4": { name: "Panne générale" },
  };
  
  const breakdown = breakdownTypes[id || "4"] || breakdownTypes["4"];

  const handleSubmit = () => {
    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv)) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs de la carte",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Paiement effectué",
        description: "Votre paiement a été traité avec succès",
        variant: "default",
      });
      navigate(`/driver/invoice/${id}?service=${serviceType}`);
    }, 2000);
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
        <h1 className="text-xl font-bold">Paiement</h1>
      </div>
      
      <Card className="shadow-md border-none">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">{breakdown.name}</h2>
            <span className="text-xl font-bold text-benin-green">{price}</span>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <h3 className="font-medium">Méthode de paiement</h3>
            
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <CreditCard className="h-5 w-5 mr-2 text-benin-blue" />
                  <span>Carte bancaire</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="mobile" id="mobile" />
                <Label htmlFor="mobile" className="flex items-center cursor-pointer">
                  <Wallet className="h-5 w-5 mr-2 text-benin-green" />
                  <span>Mobile Money</span>
                </Label>
              </div>
            </RadioGroup>
            
            {paymentMethod === 'card' && (
              <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="cardNumber">Numéro de carte</Label>
                  <Input 
                    id="cardNumber"
                    placeholder="**** **** **** ****"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Date d'expiration</Label>
                    <Input 
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="mt-1"
                      type="password"
                      maxLength={4}
                    />
                  </div>
                </div>
                
                <div className="flex items-start p-3 bg-benin-blue/10 rounded-md text-sm">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-benin-blue" />
                  <p>Les informations de votre carte sont sécurisées et cryptées.</p>
                </div>
              </div>
            )}
            
            {paymentMethod === 'mobile' && (
              <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="mobileNumber">Numéro de téléphone</Label>
                  <Input 
                    id="mobileNumber"
                    placeholder="+229 XX XX XX XX"
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-start p-3 bg-benin-green/10 rounded-md text-sm">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-benin-green" />
                  <p>Vous recevrez une demande de confirmation sur votre téléphone pour finaliser le paiement.</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-3 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Montant du service</span>
          <span>{price}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-500">Frais de traitement</span>
          <span>500 FCFA</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-benin-green">
            {serviceType === 'premium' ? '25 500 FCFA' : '15 500 FCFA'}
          </span>
        </div>
      </div>
      
      <div className="fixed bottom-20 inset-x-0 p-4 bg-white border-t border-gray-200">
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-benin-green text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Traitement en cours...
            </>
          ) : (
            <>
              Payer maintenant
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default DriverPayment;
