
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
import { toast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userTypeSelect, setUserTypeSelect] = useState<'driver' | 'technician' | 'admin'>('driver');
  const { login, userType, setUserType } = useAuth();
  const navigate = useNavigate();

  // For demo purposes, set default values based on user type
  React.useEffect(() => {
    if (userTypeSelect === 'driver') {
      setPhone('123456');
      setPassword('password');
    } else if (userTypeSelect === 'technician') {
      setPhone('654321');
      setPassword('password');
    } else if (userTypeSelect === 'admin') {
      setPhone('999999');
      setPassword('password');
    }
  }, [userTypeSelect]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(phone, password, userTypeSelect);
      
      // Redirect based on user type
      if (userTypeSelect === 'driver') {
        navigate('/driver');
      } else if (userTypeSelect === 'technician') {
        navigate('/technician');
      } else if (userTypeSelect === 'admin') {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-benin-offwhite px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-benin-blue flex items-center justify-center">
              <span className="text-white font-bold text-2xl">BA</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">BeninAuto Connect</CardTitle>
          <CardDescription className="text-center">
            Connectez-vous pour accéder à vos services
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-3 gap-2">
            <Button 
              type="button" 
              variant={userTypeSelect === 'driver' ? 'default' : 'outline'}
              className={userTypeSelect === 'driver' ? 'bg-benin-blue text-white' : ''}
              onClick={() => setUserTypeSelect('driver')}
            >
              Conducteur
            </Button>
            <Button 
              type="button" 
              variant={userTypeSelect === 'technician' ? 'default' : 'outline'} 
              className={userTypeSelect === 'technician' ? 'bg-benin-green text-white' : ''}
              onClick={() => setUserTypeSelect('technician')}
            >
              Technicien
            </Button>
            <Button 
              type="button" 
              variant={userTypeSelect === 'admin' ? 'default' : 'outline'}
              onClick={() => setUserTypeSelect('admin')}
            >
              Admin
            </Button>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
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
              <label htmlFor="password" className="text-sm">Mot de passe</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-benin-blue">
              Se connecter
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-center text-gray-500 mt-2">
            Vous n'avez pas de compte?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/register')}>
              S'inscrire
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
