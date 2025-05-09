
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from '@/components/ui/use-toast';

export type UserType = 'driver' | 'technician' | 'admin' | null;

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  type: UserType;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  userType: UserType;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, password: string, userType: UserType) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  setUserType: (type: UserType) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data for demonstration
const MOCK_USERS = {
  drivers: [
    { id: "d1", name: "Jean Pierre", phone: "40147078", email: "jean@example.com", type: "driver", avatar: "/placeholder.svg" },
  ],
  technicians: [
    { id: "t1", name: "Paul Mèchè", phone: "40147079", email: "paul@example.com", type: "technician", avatar: "/placeholder.svg" },
  ],
  admins: [
    { id: "a1", name: "ThusRconnect ", phone: "40147090", email: "admin@example.com", type: "admin", avatar: "/placeholder.svg" },
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage (simulating persistence)
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType') as UserType;
    
    if (storedUser && storedUserType) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (phoneNumber: string, password: string, type: UserType) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let foundUser = null;
      
      // Find user based on type and phone
      if (type === 'driver') {
        foundUser = MOCK_USERS.drivers.find(u => u.phone === phoneNumber);
      } else if (type === 'technician') {
        foundUser = MOCK_USERS.technicians.find(u => u.phone === phoneNumber);
      } else if (type === 'admin') {
        foundUser = MOCK_USERS.admins.find(u => u.phone === phoneNumber);
      }
      
      if (foundUser) {
        setUser(foundUser);
        setUserType(type);
        
        // Save to localStorage for persistence
        localStorage.setItem('user', JSON.stringify(foundUser));
        localStorage.setItem('userType', type);
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${foundUser.name}!`,
        });
      } else {
        throw new Error("Identifiants invalides");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user with the provided data
      const newUser: User = {
        id: `new-${Date.now()}`,
        name: userData.name || '',
        phone: userData.phone || '',
        email: userData.email,
        type: userData.type || 'driver',
        avatar: '/placeholder.svg',
      };
      
      setUser(newUser);
      setUserType(newUser.type);
      
      // Save to localStorage for persistence
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('userType', newUser.type);
      
      toast({
        title: "Inscription réussie",
        description: `Bienvenue, ${newUser.name}!`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    
    toast({
      title: "Déconnexion réussie",
      description: "A bientôt!",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        userType,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        setUserType 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
