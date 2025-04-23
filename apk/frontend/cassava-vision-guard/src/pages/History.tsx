import { useAnalysis } from "@/lib/AnalysisContext";
import Header from "@/components/Header";
import DiseaseResult from "@/components/DiseaseResult";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Search, SortAsc, SortDesc } from "lucide-react";
import { useState } from "react";

export default function History() {
  const { results } = useAnalysis();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filtrer et trier les résultats
  const filteredResults = results
    .filter((result) =>
      result.disease.name.toLowerCase().includes(search.toLowerCase()) ||
      result.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.date.localeCompare(b.date);
      } else {
        return b.date.localeCompare(a.date);
      }
    });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container max-w-screen-xl py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Historique des analyses</h1>
            <p className="text-muted-foreground mt-2">
              Consultez l'historique de vos analyses de maladies du manioc
            </p>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une maladie ou une description..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Date {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
            </div>
          </div>

          {/* Résultats */}
          {filteredResults.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResults.map((result) => (
                <div key={result.id} className="animate-in">
                  <DiseaseResult
                    disease={result.disease}
                    imageUrl={result.imageUrl}
                    description={result.description}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-white">
              <p className="text-lg text-muted-foreground">
                Aucun résultat trouvé pour votre recherche.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
