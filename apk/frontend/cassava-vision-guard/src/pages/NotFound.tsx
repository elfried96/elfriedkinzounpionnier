
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Leaf, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Page non trouvée:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cassava-50/50 p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-cassava-100 p-4">
            <AlertTriangle className="h-12 w-12 text-cassava-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 text-cassava-800">Page non trouvée</h1>
        <p className="text-xl text-gray-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button asChild size="lg">
          <Link to="/" className="inline-flex items-center gap-2">
            <Leaf className="h-5 w-5" /> 
            Retourner à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
