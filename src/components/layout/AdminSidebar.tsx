
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Car, Settings, 
  BarChart, Route, Flag, LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const navItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      to: "/admin" 
    },
    { 
      icon: Users, 
      label: "Utilisateurs", 
      to: "/admin/users" 
    },
    { 
      icon: Car, 
      label: "Prestataires", 
      to: "/admin/technicians" 
    },
    { 
      icon: Flag, 
      label: "Demandes", 
      to: "/admin/requests" 
    },
    { 
      icon: Route, 
      label: "Zones", 
      to: "/admin/zones" 
    },
    { 
      icon: BarChart, 
      label: "Statistiques", 
      to: "/admin/stats" 
    },
    { 
      icon: Settings, 
      label: "Paramètres", 
      to: "/admin/settings" 
    },
  ];

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-16 border-b border-gray-200 flex items-center px-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-benin-blue flex items-center justify-center">
            <span className="text-white font-bold text-sm">BAC</span>
          </div>
          <span className="font-bold text-lg">BeninAuto Admin</span>
        </div>
      </div>

      <div className="p-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-md",
                  isActive 
                    ? "bg-benin-blue text-white" 
                    : "text-gray-600 hover:bg-benin-offwhite"
                )}
                onClick={() => setOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 pt-4 border-t">
          <button
            onClick={logout}
            className="flex items-center px-4 py-3 text-sm text-gray-600 rounded-md hover:bg-benin-offwhite w-full"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Se déconnecter
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
