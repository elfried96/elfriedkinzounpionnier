import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAnalysis } from "@/lib/AnalysisContext";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null); // Ajouter un état pour stocker les résultats
  const { toast } = useToast();
  const { addResult } = useAnalysis();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = useCallback((file: File) => {
    // Vérifier que c'est une image
    if (!file.type.match('image.*')) {
      toast({
        variant: "destructive",
        title: "Format non supporté",
        description: "Veuillez télécharger une image (JPG, PNG, etc.)"
      });
      return;
    }
    
    setFile(file);
    
    // Créer un aperçu
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  const handleAnalyzeClick = useCallback(async () => {
    if (!file) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'analyse de l'image.");
      }

      const data = await response.json();
      setResult(data); // Stocker les résultats

      // Ajouter le résultat dans le contexte
      addResult({
        id: Date.now().toString(), // Générer un ID unique
        disease: {
          name: data.prediction_summary.classe,
          confidence: parseFloat(data.prediction_summary.confiance),
        },
        imageUrl: preview!, // Utilisez l'aperçu de l'image téléchargée
        description: data.analyse_detaillee,
        date: new Date().toISOString().split("T")[0], // Date au format YYYY-MM-DD
      });

      toast({
        title: "Analyse réussie",
        description: `Classe : ${data.prediction_summary.classe}, Confiance : ${data.prediction_summary.confiance}`,
      });

      console.log("Données reçues du backend :", data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'analyse",
        description: "Une erreur s'est produite lors de l'analyse de l'image.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [file, toast, addResult, preview]);

  const resetUpload = useCallback(() => {
    setFile(null);
    setPreview(null);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto animate-in">
      <Card className="border-2 border-dashed border-cassava-200 bg-cassava-50/50">
        <CardContent className="p-6">
          {!preview ? (
            <div
              className={`flex flex-col items-center justify-center gap-4 py-10 text-center ${
                isDragging ? "drop-zone-active" : ""
              } drop-zone`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="rounded-full bg-cassava-100 p-3">
                <Upload className="h-6 w-6 text-cassava-600" />
              </div>
              <div>
                <p className="text-lg font-medium">Déposez votre image ici</p>
                <p className="text-sm text-muted-foreground">
                  ou cliquez pour parcourir
                </p>
              </div>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Parcourir
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={preview}
                  alt="Aperçu"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm truncate flex-1">
                  {file?.name}
                </p>
                <Button variant="outline" size="sm" onClick={resetUpload}>
                  Changer
                </Button>
                <Button 
                  onClick={handleAnalyzeClick} 
                  disabled={isLoading}
                  className="relative"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyse...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Analyser
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
