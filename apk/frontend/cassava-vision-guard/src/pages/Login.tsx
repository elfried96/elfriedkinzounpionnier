import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Leaf, LogIn } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erreur de connexion");
      }

      const data = await response.json();
      login({ email }); // Mettre à jour l'état global de l'utilisateur
      toast({
        title: "Connexion réussie",
        description: data.message,
      });
      navigate("/"); // Rediriger vers la page d'accueil
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: (error as Error).message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cassava-50/50 to-white">
      <div className="container flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
          <div className="absolute inset-0 bg-cover" 
               style={{ 
                 backgroundImage: "url('https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?auto=format&fit=crop&q=80')",
                 backgroundSize: "cover",
                 backgroundPosition: "center",
               }}>
            <div className="absolute inset-0 bg-cassava-900/50" />
          </div>
          <div className="relative z-20 flex items-center gap-2">
            <Leaf className="h-6 w-6 text-white" />
            <span className="text-lg font-medium text-white">
              Cassava Olùṣọ́
            </span>
          </div>
          <div className="relative z-20 mt-auto">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Protection intelligente de vos cultures de manioc
            </h2>
            <p className="mt-4 text-white/90">
              Détectez et identifiez rapidement les maladies du manioc grâce à notre technologie d'intelligence artificielle avancée.
            </p>
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Connexion
              </h1>
              <p className="text-sm text-muted-foreground">
                Entrez vos identifiants pour accéder à votre compte
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                <LogIn className="mr-2 h-4 w-4" />
                Se connecter
              </Button>
            </form>
            <div className="text-center text-sm">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-cassava-600 hover:underline">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
