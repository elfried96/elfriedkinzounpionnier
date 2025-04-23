
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Award, Users, Code } from "lucide-react";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <section className="py-16 bg-gradient-to-b from-cassava-50 to-white">
          <div className="container max-w-screen-xl">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-cassava-100 p-3">
                  <Leaf className="h-8 w-8 text-cassava-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">À propos de Cassava Olùṣọ́</h1>
              <p className="text-lg text-gray-600">
                Cassava Olùṣọ́ est une plateforme innovante dédiée à la classification automatique 
                et à la description des maladies du manioc à l'aide de l'intelligence artificielle.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container max-w-screen-xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Notre mission</h2>
                <p className="text-gray-600 mb-4">
                  Le manioc est une culture vivrière essentielle dans de nombreuses régions du monde, 
                  particulièrement en Afrique, en Amérique latine et en Asie. Cependant, cette plante 
                  est vulnérable à plusieurs maladies qui peuvent réduire significativement les rendements.
                </p>
                <p className="text-gray-600 mb-4">
                  Notre mission est de fournir aux agriculteurs et aux chercheurs un outil accessible 
                  et précis pour identifier rapidement les maladies du manioc, permettant ainsi une 
                  intervention précoce et efficace.
                </p>
                <p className="text-gray-600">
                  En combinant l'intelligence artificielle et l'expertise agricole, nous visons à 
                  contribuer à la sécurité alimentaire mondiale et à soutenir les communautés dépendantes 
                  du manioc comme source de nourriture et de revenus.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80" 
                  alt="Plant de manioc sain" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-cassava-50">
          <div className="container max-w-screen-xl">
            <h2 className="text-2xl font-semibold mb-8 text-center">Principales caractéristiques</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-cassava-100 p-3">
                      <Award className="h-6 w-6 text-cassava-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-center">Précision diagnostique</h3>
                  <p className="text-gray-600 text-center">
                    Notre modèle d'IA est formé sur des milliers d'images de maladies du manioc pour 
                    offrir un diagnostic précis et fiable.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-cassava-100 p-3">
                      <Users className="h-6 w-6 text-cassava-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-center">Accessibilité</h3>
                  <p className="text-gray-600 text-center">
                    Interface intuitive conçue pour être utilisable par des agriculteurs, des techniciens 
                    agricoles et des chercheurs.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-cassava-100 p-3">
                      <Code className="h-6 w-6 text-cassava-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-center">Technologie avancée</h3>
                  <p className="text-gray-600 text-center">
                    Utilisation de modèles d'apprentissage profond et de vision par ordinateur pour 
                    l'analyse des images de plantes malades.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container max-w-screen-xl">
            <h2 className="text-2xl font-semibold mb-8 text-center">L'équipe</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Cassava Olùṣọ́ est développé par une équipe passionnée d'agronomes, de développeurs et 
              de spécialistes en intelligence artificielle déterminés à améliorer la production du manioc 
              dans le monde entier.
            </p>
            
            <div className="flex justify-center">
              <Card className="max-w-3xl w-full">
                <CardContent className="pt-6">
                  <div className="italic text-gray-600 text-center">
                    "Le manioc est une culture résiliente qui nourrit des millions de personnes. Notre 
                    objectif est de protéger cette plante précieuse en mettant la technologie au service 
                    des agriculteurs du monde entier."
                  </div>
                  <div className="mt-4 text-center font-medium">
                    - L'équipe Cassava Olùṣọ́
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6 bg-white">
        <div className="container max-w-screen-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-cassava-500" />
              <span className="text-sm font-semibold">Cassava Olùṣọ́ © 2025</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-cassava-500">
                Confidentialité
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-cassava-500">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-cassava-500">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
