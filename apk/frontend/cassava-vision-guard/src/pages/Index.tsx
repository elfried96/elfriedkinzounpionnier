import { useState } from "react";
import { Leaf, Microscope, FileSpreadsheet, CheckCircle2, Target } from "lucide-react";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import DiseaseResult from "@/components/DiseaseResult";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Exemple de résultat de maladie (à remplacer par des données réelles de l'API)
const exampleResult = {
  disease: {
    name: "Mosaïque du manioc",
    confidence: 87,
  },
  imageUrl: "apk/frontend/cassava-vision-guard/public/image/camps3.jpg",
  description: "Feuilles présentant des motifs de mosaïque jaune-vert typiques de la mosaïque du manioc. L'infection semble modérée et affecte principalement les nouvelles pousses. Recommandation : éliminer les plantes infectées et utiliser des boutures saines pour les nouvelles plantations.",
};

// Fonctionnalités clés de l'application
const features = [
  {
    icon: <Microscope className="h-10 w-10 text-cassava-500" />,
    title: "Identification précise",
    description: "Identification des maladies du manioc avec une grande précision grâce à l'intelligence artificielle",
  },
  {
    icon: <FileSpreadsheet className="h-10 w-10 text-cassava-500" />,
    title: "Analyse détaillée",
    description: "Descriptions détaillées des maladies identifiées avec recommandations de traitement",
  },
  {
    icon: <CheckCircle2 className="h-10 w-10 text-cassava-500" />,
    title: "Facile à utiliser",
    description: "Interface intuitive permettant un diagnostic rapide des maladies du manioc",
  },
  {
    icon: <Target className="h-10 w-10 text-cassava-500" />,
    title: "Suivi de progression",
    description: "Gardez un historique de vos analyses pour suivre l'évolution des maladies",
  },
];

// Update the hero section image
export default function Index() {
  const [showDemoResult, setShowDemoResult] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Section Hero avec nouvelle image */}
        <section className="bg-gradient-to-b from-cassava-50 to-white py-16 md:py-24">
          <div className="container max-w-screen-xl">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-cassava-100 px-3 py-1">
                  <Leaf className="mr-1 h-3.5 w-3.5 text-cassava-500" />
                  <span className="text-xs font-medium text-cassava-700">
                    Intelligence artificielle pour les agriculteurs
                  </span>
                </div>
                <div className="space-y-2">
                  <h1 className="font-bold text-4xl md:text-5xl text-gray-900">
                    Détection de maladies du manioc par l'IA
                  </h1>
                  <p className="text-lg text-gray-600 md:text-xl">
                    Identifiez rapidement et précisément les maladies du manioc grâce à notre technologie d'intelligence artificielle avancée.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="gap-2" onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}>
                    Commencer l'analyse
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setShowDemoResult(!showDemoResult)}>
                    {showDemoResult ? "Masquer la démo" : "Voir un exemple"}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?auto=format&fit=crop&w=800&q=80"
                  alt="Champ de manioc en bonne santé"
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section de démonstration conditionnelle */}
        {showDemoResult && (
          <section className="py-12 bg-gradient-to-b from-white to-cassava-50/30">
            <div className="container max-w-screen-xl">
              <h2 className="text-center font-semibold text-2xl mb-8">Exemple de résultat d'analyse</h2>
              <div className="max-w-md mx-auto">
                <DiseaseResult {...exampleResult} />
              </div>
            </div>
          </section>
        )}

        {/* Section d'upload */}
        <section id="upload-section" className="py-16 bg-white">
          <div className="container max-w-screen-xl">
            <div className="text-center mb-10">
              <h2 className="font-semibold text-3xl mb-2">Analysez votre image</h2>
              <p className="text-muted-foreground">
                Téléchargez une image de plante de manioc pour l'analyser
              </p>
            </div>
            <ImageUpload />
          </div>
        </section>

        {/* Section fonctionnalités */}
        <section className="py-16 bg-cassava-50">
          <div className="container max-w-screen-xl">
            <div className="text-center mb-12">
              <h2 className="font-semibold text-3xl mb-2">Fonctionnalités clés</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cassava Olùṣọ́ offre une suite d'outils puissants pour vous aider à identifier et traiter les maladies du manioc
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-cassava-100">
                  <CardContent className="pt-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="font-medium text-xl mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
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
