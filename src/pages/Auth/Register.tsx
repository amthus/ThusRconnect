
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userTypeSelect, setUserTypeSelect] = useState<'driver' | 'technician'>('driver');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    
    try {
      await register(
        {
          name,
          phone,
          email,
          type: userTypeSelect,
        },
        password
      );
      
      // Redirect based on user type
      if (userTypeSelect === 'driver') {
        navigate('/driver');
      } else {
        navigate('/technician');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-benin-offwhite px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-benin-blue flex items-center justify-center">
              <span className="text-white font-bold text-2xl">BA</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Créer un compte</CardTitle>
          <CardDescription className="text-center">
            Inscrivez-vous pour accéder aux services BeninAuto Connect
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Button 
                type="button" 
                variant={userTypeSelect === 'driver' ? 'default' : 'outline'}
                className={userTypeSelect === 'driver' ? 'bg-benin-blue text-white' : ''}
                onClick={() => setUserTypeSelect('driver')}
              >
                Je suis conducteur
              </Button>
              <Button 
                type="button" 
                variant={userTypeSelect === 'technician' ? 'default' : 'outline'} 
                className={userTypeSelect === 'technician' ? 'bg-benin-green text-white' : ''}
                onClick={() => setUserTypeSelect('technician')}
              >
                Je suis technicien
              </Button>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm">Nom complet</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Entrez votre nom"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm">Numéro de téléphone</label>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Entrez votre numéro"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm">Email (optionnel)</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm">Mot de passe</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Créez un mot de passe"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="confirmPassword" className="text-sm">Confirmer le mot de passe</label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez votre mot de passe"
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-benin-blue">
              S'inscrire
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-center text-gray-500 mt-2">
            Vous avez déjà un compte?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/login')}>
              Se connecter
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
