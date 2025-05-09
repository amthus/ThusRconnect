
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const TechnicianBottomNav: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      icon: Home, 
      label: "Accueil", 
      to: "/technician" 
    },
    { 
      icon: Clock, 
      label: "Demandes", 
      to: "/technician/requests" 
    },
    { 
      icon: Users, 
      label: "Clients", 
      to: "/technician/clients" 
    },
    { 
      icon: Settings, 
      label: "Services", 
      to: "/technician/services" 
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-benin-white border-t border-gray-200 z-50">
      <div className="container max-w-md mx-auto h-full">
        <div className="grid grid-cols-4 h-full">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center justify-center",
                  isActive 
                    ? "text-benin-green" 
                    : "text-gray-500"
                )}
              >
                <item.icon className={cn(
                  "h-6 w-6",
                  isActive && "text-benin-green"
                )} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TechnicianBottomNav;
