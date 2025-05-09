
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const DriverBottomNav: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      icon: Home, 
      label: "Accueil", 
      to: "/driver" 
    },
    { 
      icon: Map, 
      label: "Carte", 
      to: "/driver/map" 
    },
    { 
      icon: Clock, 
      label: "Services", 
      to: "/driver/services" 
    },
    { 
      icon: User, 
      label: "Profil", 
      to: "/driver/profile" 
    },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 h-16 bg-white rounded-full shadow-lg border border-gray-100 z-50 w-11/12 max-w-md overflow-hidden">
      <div className="h-full">
        <div className="grid grid-cols-4 h-full relative">
          {/* Background indicator for active item */}
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.to;
            
            if (isActive) {
              return (
                <div 
                  key={`bg-${item.to}`}
                  className="absolute top-0 h-full transition-all duration-300 rounded-full"
                  style={{ 
                    left: `${index * 25}%`, 
                    width: '25%', 
                    background: 'linear-gradient(135deg, rgba(80, 205, 137, 0.1) 0%, rgba(0, 137, 225, 0.15) 100%)' 
                  }}
                />
              );
            }
            return null;
          })}
          
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center justify-center relative z-10"
              >
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                  isActive ? "bg-benin-green text-white shadow-md" : "text-gray-500"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className={cn(
                  "text-xs mt-0.5 transition-colors",
                  isActive ? "text-benin-green font-medium" : "text-gray-500"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default DriverBottomNav;
