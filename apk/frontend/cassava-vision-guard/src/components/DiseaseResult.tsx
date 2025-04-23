import { AlertCircle, CheckCircle2, Leaf } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DiseaseResultProps {
  disease: {
    name: string;
    confidence: number;
  };
  imageUrl: string;
  description: string;
}

export default function DiseaseResult({ disease, imageUrl, description }: DiseaseResultProps) {

  // Déterminer la couleur en fonction du niveau de confiance
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-500";
    if (confidence >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Déterminer l'icône et le message en fonction du niveau de confiance
  const getStatusInfo = (confidence: number) => {
    if (confidence >= 80) {
      return {
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        message: "Identification fiable",
      };
    }
    return {
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      message: "Identification possible, vérification recommandée",
    };
  };

  const statusInfo = getStatusInfo(disease.confidence);
  const confidenceColorClass = getConfidenceColor(disease.confidence);

  return (
    <Card className="overflow-hidden border-cassava-100 shadow-md transition-all hover:shadow-lg">
      <div className="relative">
        <img
          src={imageUrl}
          alt={`Image de ${disease.name}`}
          className="h-56 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <CardHeader className="-mt-12 relative z-10 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rounded-full bg-white px-3 py-1 shadow-md">
            <Leaf className="h-4 w-4 text-cassava-500" />
            <span className="text-sm font-medium">{disease.name}</span>
          </div>
          <div className="flex items-center space-x-2 rounded-full bg-white px-3 py-1 shadow-md">
            <span className="text-xs font-medium">Confiance</span>
            <span className="text-sm font-bold">{disease.confidence}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {statusInfo.icon}
              <span className="text-sm">{statusInfo.message}</span>
            </div>
          </div>
          <Progress
            value={disease.confidence}
            className={cn("h-2", confidenceColorClass)}
          />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Description de la scène</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 py-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-muted-foreground">Analysé le {new Date().toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

// Example initialization of the result variable
const result = {
  prediction_summary: {
    classe: "Maladie exemple",
    confiance: "75",
  },
  analyse_detaillee: "Description détaillée de l'analyse.",
};

{result && (
  <DiseaseResult
    disease={{
      name: result.prediction_summary.classe,
      confidence: parseFloat(result.prediction_summary.confiance),
    }}
    imageUrl={"https://via.placeholder.com/150"} // Remplacez par une URL d'image valide ou une variable définie
    description={result.analyse_detaillee}
  />
)}
