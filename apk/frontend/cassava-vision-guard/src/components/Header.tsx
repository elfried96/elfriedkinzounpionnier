import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-cassava-500" />
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-cassava-700">Cassava</span>
            <span className="text-xl font-semibold text-soil-600">Olùṣọ́</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-cassava-500">
            Accueil
          </Link>
          <Link to="/history" className="text-sm font-medium transition-colors hover:text-cassava-500">
            Historique
          </Link>
          <Link to="/diseases" className="text-sm font-medium transition-colors hover:text-cassava-500">
            Maladies
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-cassava-500">
            À propos
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm font-medium">Connecté : {user.email}</span>
              <Button variant="outline" onClick={logout}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Connexion</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Inscription</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
