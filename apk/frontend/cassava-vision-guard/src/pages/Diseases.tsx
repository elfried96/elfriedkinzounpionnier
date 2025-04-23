
import { useState } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Exemples de maladies (à remplacer par des données réelles de l'API)
const diseasesData = [
  {
    id: "1",
    name: "Mosaïque du manioc",
    scientificName: "Cassava mosaic virus (CMD)",
    description: "La mosaïque du manioc est une maladie virale majeure qui affecte les feuilles de la plante. Elle se caractérise par des taches jaunes irrégulières sur les feuilles, réduisant significativement la photosynthèse et le rendement.",
    symptoms: "Jaunissement des feuilles, déformation du feuillage, motifs de mosaïque, réduction de la taille des feuilles, retard de croissance.",
    management: "Utiliser des boutures saines, éliminer les plantes infectées, contrôler les aleurodes (vecteurs), planter des variétés résistantes, pratiquer la rotation des cultures.",
    severity: "Élevée",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Bactériose du manioc",
    scientificName: "Xanthomonas axonopodis pv. manihotis",
    description: "La bactériose du manioc est une grave maladie bactérienne qui affecte toutes les parties aériennes de la plante. Elle peut causer d'importantes pertes de rendement, particulièrement dans les zones humides.",
    symptoms: "Taches angulaires sur les feuilles, brûlures foliaires, flétrissement, exsudat sur les tiges, défoliation, mort des rameaux.",
    management: "Désinfection des outils de coupe, élimination des débris végétaux infectés, utilisation de boutures saines, traitement à base de cuivre.",
    severity: "Élevée",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Pourriture des racines",
    scientificName: "Phytophthora spp., Fusarium spp.",
    description: "La pourriture des racines est causée par divers champignons pathogènes qui infectent le système racinaire du manioc, entraînant une décomposition des tissus et une réduction significative de la production.",
    symptoms: "Jaunissement du feuillage, flétrissement des plantes, pourriture molle ou sèche des racines, odeur nauséabonde, retard de croissance.",
    management: "Rotation des cultures, drainage adéquat des sols, éviter les blessures lors de la récolte, utilisation de fongicides, variétés résistantes.",
    severity: "Modérée à élevée",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Anthracnose du manioc",
    scientificName: "Colletotrichum gloeosporioides",
    description: "L'anthracnose est une maladie fongique qui affecte principalement les tiges et les feuilles du manioc. Elle peut causer des dégâts importants dans les régions à forte humidité.",
    symptoms: "Lésions nécrotiques sur les tiges, défoliation, dessèchement des apex, chancres sur les tiges, mort régressive des rameaux.",
    management: "Application de fongicides, élimination des débris végétaux, amélioration de la circulation d'air, utilisation de boutures saines.",
    severity: "Modérée",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Diseases() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filtrer les maladies en fonction de la recherche et de l'onglet actif
  const filteredDiseases = diseasesData.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(search.toLowerCase()) || 
                         disease.description.toLowerCase().includes(search.toLowerCase()) ||
                         disease.symptoms.toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "severe") return matchesSearch && disease.severity.includes("Élevée");
    if (activeTab === "moderate") return matchesSearch && disease.severity.includes("Modérée");
    
    return matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container max-w-screen-xl py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Catalogue des maladies</h1>
            <p className="text-muted-foreground mt-2">
              Découvrez les principales maladies affectant les plants de manioc
            </p>
          </div>

          {/* Recherche et filtres */}
          <div className="mb-8">
            <div className="relative max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une maladie..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="severe">Gravité élevée</TabsTrigger>
                <TabsTrigger value="moderate">Gravité modérée</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Liste des maladies */}
          {filteredDiseases.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDiseases.map((disease) => (
                <Card key={disease.id} className="overflow-hidden border-cassava-100 animate-in">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={disease.imageUrl}
                      alt={disease.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{disease.name}</CardTitle>
                    <CardDescription className="italic">{disease.scientificName}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Description</h4>
                      <p className="text-sm text-muted-foreground">{disease.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Symptômes</h4>
                      <p className="text-sm text-muted-foreground">{disease.symptoms}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Gestion</h4>
                      <p className="text-sm text-muted-foreground">{disease.management}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/20">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm">Gravité: <span className={disease.severity.includes("Élevée") ? "text-red-500 font-medium" : "text-yellow-500 font-medium"}>{disease.severity}</span></span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-white">
              <p className="text-lg text-muted-foreground">
                Aucune maladie trouvée pour votre recherche.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 bg-white">
        <div className="container max-w-screen-xl">
          <div className="text-center text-sm text-muted-foreground">
            Cassava Olùṣọ́ © 2025 - Tous droits réservés
          </div>
        </div>
      </footer>
    </div>
  );
}
