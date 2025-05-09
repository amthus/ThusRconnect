
import React from 'react';
import { 
  Activity, AlertTriangle, BarChart3, Calendar, Car, 
  Clock, Download, Map, Star, User, Users 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data for stats
const monthlyData = [
  { name: 'Jan', users: 200, requests: 150, revenue: 750000 },
  { name: 'Fév', users: 250, requests: 180, revenue: 900000 },
  { name: 'Mar', users: 320, requests: 220, revenue: 1100000 },
  { name: 'Avr', users: 400, requests: 280, revenue: 1400000 },
  { name: 'Mai', users: 450, requests: 320, revenue: 1600000 },
  { name: 'Juin', users: 520, requests: 380, revenue: 1900000 },
  { name: 'Juil', users: 580, requests: 430, revenue: 2150000 },
];

const serviceTypeData = [
  { name: 'Mécanique', value: 35 },
  { name: 'Remorquage', value: 25 },
  { name: 'Pneu/Roue', value: 20 },
  { name: 'Batterie', value: 15 },
  { name: 'Carburant', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminStats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Statistiques</h1>
          <p className="text-muted-foreground">Vue d'ensemble et analyse de l'activité</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Semaine</SelectItem>
              <SelectItem value="monthly">Mois</SelectItem>
              <SelectItem value="yearly">Année</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="Utilisateurs" 
              value="4,287" 
              trend="up" 
              change="+12.5%" 
              comparison="vs mois précédent"
              icon={<Users className="h-5 w-5" />}
              iconColor="text-benin-blue"
            />
            
            <StatsCard 
              title="Demandes" 
              value="2,345" 
              trend="up" 
              change="+8.2%" 
              comparison="vs mois précédent"
              icon={<Car className="h-5 w-5" />}
              iconColor="text-benin-green"
            />
            
            <StatsCard 
              title="Taux de conversion" 
              value="87.3%" 
              trend="up" 
              change="+2.1%" 
              comparison="vs mois précédent"
              icon={<Activity className="h-5 w-5" />}
              iconColor="text-purple-500"
            />
            
            <StatsCard 
              title="Revenue" 
              value="8.4M FCFA" 
              trend="up" 
              change="+18.7%" 
              comparison="vs mois précédent"
              icon={<BarChart3 className="h-5 w-5" />}
              iconColor="text-yellow-500"
            />
          </div>
          
          {/* Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Croissance</CardTitle>
              <CardDescription>Évolution du nombre d'utilisateurs et de demandes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0089e1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0089e1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#50cd89" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#50cd89" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="users" stroke="#0089e1" fillOpacity={1} fill="url(#colorUsers)" />
                    <Area type="monotone" dataKey="requests" stroke="#50cd89" fillOpacity={1} fill="url(#colorRequests)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Revenue & Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenus par mois</CardTitle>
                <CardDescription>Évolution du chiffre d'affaires</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toLocaleString()} FCFA`, 'Revenu']} />
                      <Bar dataKey="revenue" fill="#0089e1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distribution des services</CardTitle>
                <CardDescription>Répartition par type d'intervention</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center">
                <div className="h-72 w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Pourcentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 pl-4">
                  {serviceTypeData.map((entry, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <div className="flex justify-between w-full">
                        <span>{entry.name}</span>
                        <span className="font-medium">{entry.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-6">
          {/* Service distribution cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard 
              title="Demandes en attente" 
              value="87" 
              trend="down" 
              change="-15%" 
              comparison="vs hier"
              icon={<Clock className="h-5 w-5" />}
              iconColor="text-yellow-500"
            />
            
            <StatsCard 
              title="Temps moyen" 
              value="42 min" 
              trend="down" 
              change="-3 min" 
              comparison="vs mois précédent"
              icon={<Calendar className="h-5 w-5" />}
              iconColor="text-benin-blue"
            />
            
            <StatsCard 
              title="Taux de satisfaction" 
              value="4.7/5" 
              trend="up" 
              change="+0.2" 
              comparison="vs mois précédent"
              icon={<Star className="h-5 w-5" />}
              iconColor="text-benin-green"
            />
          </div>
          
          {/* Additional service stats here */}
          <Card>
            <CardHeader>
              <CardTitle>Performance des services</CardTitle>
              <CardDescription>Analyse des métriques clés</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add service performance charts */}
              <div className="text-center py-10 text-gray-500">
                Graphique détaillé des performances par service
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          {/* User stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard 
              title="Nouveaux utilisateurs" 
              value="324" 
              trend="up" 
              change="+22%" 
              comparison="vs mois précédent"
              icon={<User className="h-5 w-5" />}
              iconColor="text-benin-blue"
            />
            
            <StatsCard 
              title="Techniciens actifs" 
              value="178" 
              trend="up" 
              change="+5%" 
              comparison="vs mois précédent"
              icon={<Car className="h-5 w-5" />}
              iconColor="text-benin-green"
            />
            
            <StatsCard 
              title="Taux de rétention" 
              value="84%" 
              trend="down" 
              change="-2%" 
              comparison="vs mois précédent"
              icon={<AlertTriangle className="h-5 w-5" />}
              iconColor="text-amber-500"
            />
          </div>
          
          {/* Additional user stats here */}
          <Card>
            <CardHeader>
              <CardTitle>Distribution géographique</CardTitle>
              <CardDescription>Répartition des utilisateurs par région</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center space-y-4">
                  <Map className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="text-gray-500">Carte de distribution des utilisateurs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  trend: "up" | "down";
  change: string;
  comparison: string;
  icon: React.ReactNode;
  iconColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  trend,
  change,
  comparison,
  icon,
  iconColor
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconColor} bg-opacity-10`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1 text-sm">
          <span className={`${trend === 'up' ? 'text-green-600' : 'text-red-600'} mr-1`}>
            {change}
          </span>
          <span className="text-gray-500">{comparison}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminStats;
