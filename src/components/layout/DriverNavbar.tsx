
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const DriverNavbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-benin-white shadow-sm z-50">
      <div className="container h-full max-w-md mx-auto px-4 flex items-center justify-between">
        <Link to="/driver" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-benin-blue flex items-center justify-center">
            <span className="text-white font-bold text-lg">BA</span>
          </div>
          <span className="font-bold text-lg text-benin-blue">BeninAuto Connect</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="py-6 flex flex-col gap-4">
              {user && (
                <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
                  <div className="w-12 h-12 rounded-full bg-benin-offwhite flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="h-6 w-6 text-benin-blue" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>
                </div>
              )}
              <Link to="/driver/profile" className="py-2 px-4 hover:bg-benin-offwhite rounded-md">
                Mon profil
              </Link>
              <Link to="/driver/vehicles" className="py-2 px-4 hover:bg-benin-offwhite rounded-md">
                Mes véhicules
              </Link>
              <Link to="/driver/history" className="py-2 px-4 hover:bg-benin-offwhite rounded-md">
                Historique
              </Link>
              <Link to="/driver/settings" className="py-2 px-4 hover:bg-benin-offwhite rounded-md">
                Paramètres
              </Link>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={logout}
              >
                Se déconnecter
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default DriverNavbar;
