import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-benin-white">
      {/* Hero Section */}
      <header className="bg-benin-blue text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-benin-green mb-4">Nouveau au Bénin</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Assistance routière instantanée au Bénin
            </h1>
            <p className="text-xl mb-8">
              Mise en relation géolocalisée entre conducteurs en panne et techniciens dépanneurs de proximité
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-benin-green hover:bg-green-600 text-lg py-6 px-8"
                onClick={() => navigate('/login')}
              >
                Se connecter
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-benin-blue text-lg py-6 px-8"
                onClick={() => navigate('/register')}
              >
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-benin-offwhite">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça fonctionne</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-benin-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Géolocalisation</h3>
              <p className="text-gray-600">
                Trouvez les techniciens les plus proches de votre position actuelle en un clic
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-benin-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Assistance Immédiate</h3>
              <p className="text-gray-600">
                Bouton d'urgence pour les situations critiques avec réponse rapide des professionnels
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-benin-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multiples Services</h3>
              <p className="text-gray-600">
                Mécanique, dépannage, remorquage, assistance pneus et plus encore
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-benin-green text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à rejoindre BeninAuto Connect?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Que vous soyez conducteur cherchant de l'assistance ou technicien offrant vos services, notre plateforme vous connecte facilement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-benin-green hover:bg-gray-100 text-lg py-6 px-8" 
              onClick={() => navigate('/register')}
            >
              S'inscrire comme conducteur
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-benin-green text-lg py-6 px-8"
              onClick={() => navigate('/register')}
            >
              S'inscrire comme technicien
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BeninAuto Connect</h3>
              <p className="text-gray-400 mb-4">
                La meilleure solution d'assistance routière au Bénin.
              </p>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>+229 97 12 34 56</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Liens utiles</h3>
              <ul className="space-y-2">
                <li><Button variant="link" className="text-gray-400 p-0 h-auto hover:text-white">À propos</Button></li>
                <li><Button variant="link" className="text-gray-400 p-0 h-auto hover:text-white">Comment ça marche</Button></li>
                <li><Button variant="link" className="text-gray-400 p-0 h-auto hover:text-white">Témoignages</Button></li>
                <li><Button variant="link" className="text-gray-400 p-0 h-auto hover:text-white">Nous contacter</Button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Télécharger</h3>
              <p className="text-gray-400 mb-4">
                Obtenez l'application mobile pour une expérience optimale.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="border-white text-white">
                  Android
                </Button>
                <Button variant="outline" className="border-white text-white">
                  iOS (Bientôt)
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BeninAuto Connect. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
