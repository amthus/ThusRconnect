
import React, { useState } from 'react';
import { Settings, Save, User, Wallet, Shield, Bell, Globe, Award, Zap, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const AdminSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate saving settings
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Paramètres sauvegardés",
        description: "Vos modifications ont été enregistrées avec succès.",
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground">Configuration de l'application</p>
        </div>
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sauvegarde en cours
            </span>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </>
          )}
        </Button>
      </div>
      
      <Tabs defaultValue="general">
        <div className="border-b">
          <div className="flex overflow-x-auto py-2">
            <TabsList className="bg-transparent">
              <TabsTrigger value="general" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-benin-blue rounded-none">
                <Settings className="h-4 w-4 mr-2" />
                Général
              </TabsTrigger>
              <TabsTrigger value="app" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-benin-blue rounded-none">
                <Zap className="h-4 w-4 mr-2" />
                Application
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-benin-blue rounded-none">
                <User className="h-4 w-4 mr-2" />
                Utilisateurs
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-benin-blue rounded-none">
                <Wallet className="h-4 w-4 mr-2" />
                Paiements
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-benin-blue rounded-none">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-benin-blue rounded-none">
                <Shield className="h-4 w-4 mr-2" />
                Sécurité
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="general" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Paramètres généraux de la plateforme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Nom de l'application</Label>
                  <Input id="app-name" defaultValue="BeninAuto Connect" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="app-description">Description</Label>
                  <Textarea 
                    id="app-description" 
                    rows={3}
                    defaultValue="Application de mise en relation entre conducteurs et techniciens automobiles au Bénin"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email de contact</Label>
                    <Input id="contact-email" type="email" defaultValue="contact@beninconnect.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Numéro de téléphone</Label>
                    <Input id="contact-phone" defaultValue="+229 90 12 34 56" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" defaultValue="54 Rue de Commerce, Cotonou, Bénin" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Réglages régionaux</CardTitle>
              <CardDescription>Configuration des paramètres locaux</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Langue par défaut</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Sélectionner la langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">Anglais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select defaultValue="africa-porto-novo">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Sélectionner le fuseau horaire" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="africa-porto-novo">Africa/Porto-Novo (GMT+1)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Select defaultValue="fcfa">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Sélectionner la devise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fcfa">FCFA (XOF)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="usd">Dollar ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-format">Format de date</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Sélectionner le format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">JJ/MM/AAAA</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM/JJ/AAAA</SelectItem>
                      <SelectItem value="yyyy-mm-dd">AAAA/MM/JJ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="app" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration de l'application</CardTitle>
              <CardDescription>Paramètres de fonctionnement de l'application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mode maintenance</h3>
                    <p className="text-sm text-gray-500">Mettre l'application en mode maintenance</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mode débogage</h3>
                    <p className="text-sm text-gray-500">Activer les logs et informations de débogage</p>
                  </div>
                  <Switch id="debug-mode" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Géolocalisation automatique</h3>
                    <p className="text-sm text-gray-500">Activer la détection automatique de la position</p>
                  </div>
                  <Switch id="auto-geo" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mode hors ligne</h3>
                    <p className="text-sm text-gray-500">Permettre l'utilisation de certaines fonctionnalités hors ligne</p>
                  </div>
                  <Switch id="offline-mode" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="search-radius">Rayon de recherche par défaut (km)</Label>
                  <Input id="search-radius" type="number" defaultValue="5" min="1" max="50" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="request-timeout">Délai d'expiration des demandes (minutes)</Label>
                  <Input id="request-timeout" type="number" defaultValue="30" min="5" max="120" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Intégrations</CardTitle>
              <CardDescription>Paramètres des services et API externes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className="h-6 w-6 text-blue-500 mr-3" />
                    <div>
                      <h3 className="font-medium">Google Maps</h3>
                      <p className="text-sm text-gray-500">Cartes et géolocalisation</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">Actif</Badge>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Wallet className="h-6 w-6 text-green-500 mr-3" />
                    <div>
                      <h3 className="font-medium">FeedaPay</h3>
                      <p className="text-sm text-gray-500">Passerelle de paiement</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">Actif</Badge>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-6 w-6 text-orange-500 mr-3" />
                    <div>
                      <h3 className="font-medium">Service de notifications</h3>
                      <p className="text-sm text-gray-500">Push et SMS</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-red-100 text-red-800">Inactif</Badge>
                </div>
                
                <Separator />
                
                <Button variant="outline" className="w-full gap-2">
                  <Globe className="h-4 w-4" />
                  Configurer les API
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des utilisateurs</CardTitle>
              <CardDescription>Configuration des comptes utilisateurs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Inscription ouverte</h3>
                    <p className="text-sm text-gray-500">Permettre à de nouveaux utilisateurs de s'inscrire</p>
                  </div>
                  <Switch id="allow-registration" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Validation des inscriptions</h3>
                    <p className="text-sm text-gray-500">Exiger la validation des nouveaux comptes</p>
                  </div>
                  <Switch id="validate-registration" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Vérification par SMS</h3>
                    <p className="text-sm text-gray-500">Envoyer un code de vérification par SMS</p>
                  </div>
                  <Switch id="sms-verification" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Vérification des identités</h3>
                    <p className="text-sm text-gray-500">Exiger une pièce d'identité pour les techniciens</p>
                  </div>
                  <Switch id="id-verification" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="max-vehicles">Nombre max. de véhicules par utilisateur</Label>
                  <Input id="max-vehicles" type="number" defaultValue="5" min="1" max="20" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Validation des prestataires</CardTitle>
              <CardDescription>Paramètres pour l'approbation des techniciens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Validation automatique</h3>
                    <p className="text-sm text-gray-500">Approuver automatiquement les nouveaux prestataires</p>
                  </div>
                  <Switch id="auto-approve" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Preuve d'expérience</h3>
                    <p className="text-sm text-gray-500">Exiger des documents prouvant l'expérience</p>
                  </div>
                  <Switch id="require-experience" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Visites de validation</h3>
                    <p className="text-sm text-gray-500">Planifier des visites d'inspection des installations</p>
                  </div>
                  <Switch id="validation-visits" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration des paiements</CardTitle>
              <CardDescription>Paramètres pour les transactions et commissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="commission-rate">Taux de commission standard (%)</Label>
                    <Input id="commission-rate" type="number" defaultValue="10" min="0" max="50" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergency-commission">Taux pour urgences (%)</Label>
                    <Input id="emergency-commission" type="number" defaultValue="5" min="0" max="50" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="min-payment">Montant minimum (FCFA)</Label>
                    <Input id="min-payment" type="number" defaultValue="1000" min="0" step="500" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="withdrawal-threshold">Seuil de retrait (FCFA)</Label>
                    <Input id="withdrawal-threshold" type="number" defaultValue="5000" min="0" step="1000" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Paiements en espèces</h3>
                    <p className="text-sm text-gray-500">Autoriser le paiement en espèces</p>
                  </div>
                  <Switch id="cash-payments" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mobile Money</h3>
                    <p className="text-sm text-gray-500">Autoriser les paiements via Mobile Money</p>
                  </div>
                  <Switch id="mobile-money" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Paiements par carte</h3>
                    <p className="text-sm text-gray-500">Autoriser les paiements par carte de crédit/débit</p>
                  </div>
                  <Switch id="card-payments" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Services premium</CardTitle>
              <CardDescription>Paramètres des services d'abonnement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="visibility-price">Service "Visibilité améliorée" (FCFA/semaine)</Label>
                    <Input id="visibility-price" type="number" defaultValue="2000" min="0" step="500" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expert-price">Badge "Expert Certifié" (FCFA/an)</Label>
                    <Input id="expert-price" type="number" defaultValue="8000" min="0" step="1000" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="protection-price">Protection Voyage (FCFA/mois)</Label>
                    <Input id="protection-price" type="number" defaultValue="1000" min="0" step="500" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority-price">Assistance Premium (FCFA/mois)</Label>
                    <Input id="priority-price" type="number" defaultValue="2500" min="0" step="500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notifications</CardTitle>
              <CardDescription>Configuration des alertes et messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Notifications conducteur</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="driver-request">Statut des demandes</Label>
                    <Switch id="driver-request" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="driver-technician">Arrivée du technicien</Label>
                    <Switch id="driver-technician" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="driver-payment">Confirmation de paiement</Label>
                    <Switch id="driver-payment" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="driver-promo">Promotions et offres</Label>
                    <Switch id="driver-promo" />
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="font-medium text-sm">Notifications technicien</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tech-new-request">Nouvelles demandes</Label>
                    <Switch id="tech-new-request" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tech-cancel">Annulations</Label>
                    <Switch id="tech-cancel" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tech-payment">Paiements reçus</Label>
                    <Switch id="tech-payment" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tech-rating">Nouvelles évaluations</Label>
                    <Switch id="tech-rating" defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <h3 className="font-medium text-sm">Méthodes de notification</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="method-push">Notifications push</Label>
                    <Switch id="method-push" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="method-sms">SMS</Label>
                    <Switch id="method-sms" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="method-email">Email</Label>
                    <Switch id="method-email" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6 pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de sécurité</CardTitle>
              <CardDescription>Configuration de la sécurité et de la confidentialité</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password-min-length">Longueur minimale des mots de passe</Label>
                  <Input id="password-min-length" type="number" defaultValue="8" min="6" max="16" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Exiger des caractères spéciaux</h3>
                    <p className="text-sm text-gray-500">Imposer au moins un caractère spécial dans les mots de passe</p>
                  </div>
                  <Switch id="password-special-chars" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Authentification à deux facteurs</h3>
                    <p className="text-sm text-gray-500">Activer l'authentification 2FA pour les administrateurs</p>
                  </div>
                  <Switch id="2fa" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Expiration de session (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="60" min="5" max="1440" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Verrouillage de compte</h3>
                    <p className="text-sm text-gray-500">Bloquer le compte après plusieurs échecs de connexion</p>
                  </div>
                  <Switch id="account-lockout" defaultChecked />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lockout-attempts">Nombre d'essais avant verrouillage</Label>
                    <Input id="lockout-attempts" type="number" defaultValue="5" min="1" max="10" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lockout-duration">Durée du verrouillage (minutes)</Label>
                    <Input id="lockout-duration" type="number" defaultValue="30" min="5" max="1440" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Données et confidentialité</CardTitle>
              <CardDescription>Gestion des données utilisateurs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Conservation des données de localisation</h3>
                    <p className="text-sm text-gray-500">Durée de conservation des données de géolocalisation</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 jours</SelectItem>
                      <SelectItem value="30">30 jours</SelectItem>
                      <SelectItem value="90">90 jours</SelectItem>
                      <SelectItem value="365">365 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Partage de données anonymisées</h3>
                    <p className="text-sm text-gray-500">Autoriser le partage de données anonymisées à des fins d'amélioration</p>
                  </div>
                  <Switch id="anonymous-data-sharing" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Suppression automatique des comptes inactifs</h3>
                    <p className="text-sm text-gray-500">Supprimer les comptes après une longue période d'inactivité</p>
                  </div>
                  <Switch id="auto-delete-inactive" />
                </div>
                
                <Button variant="outline" className="w-full gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Configurer la politique de confidentialité
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
