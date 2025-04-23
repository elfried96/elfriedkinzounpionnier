import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Leaf, UserPlus, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/register", {
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
        throw new Error(errorData.detail || "Erreur d'inscription");
      }

      const data = await response.json();
      login({ email }); // Mettre à jour l'état global de l'utilisateur
      toast({
        title: "Inscription réussie",
        description: data.message,
      });
      navigate("/"); // Rediriger vers la page d'accueil
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: (error as Error).message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cassava-50 via-white to-soil-50">
      <div className="container flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?auto=format&fit=crop&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cassava-900/80 to-soil-900/80 backdrop-blur-sm" />
          </div>
          
          <div className="relative z-20 flex items-center gap-2">
            <Leaf className="h-8 w-8 animate-pulse" />
            <span className="text-xl font-bold tracking-tight">
              Cassava Olùṣọ́
            </span>
          </div>
          
          <div className="relative z-20 mt-auto">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight animate-in slide-in-from-left-5 duration-700">
                Protégez vos cultures de manioc intelligemment
              </h2>
              <p className="text-lg text-white/90 animate-in fade-in-50 duration-1000 delay-200">
                Rejoignez notre communauté d'agriculteurs et bénéficiez d'outils avancés pour optimiser votre production.
              </p>
              <ul className="space-y-4 text-white/80 animate-in fade-in-50 duration-1000 delay-500">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cassava-400" />
                  Détection rapide des maladies
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cassava-400" />
                  Conseils personnalisés
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cassava-400" />
                  Suivi de vos cultures
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center animate-in slide-in-from-right-5 duration-700">
              <h1 className="text-3xl font-bold tracking-tight text-cassava-900">
                Créer un compte
              </h1>
              <p className="text-sm text-muted-foreground">
                Commencez à protéger vos cultures dès aujourd'hui
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in-50 duration-1000 delay-200">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nom complet
                </Label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-white/50 backdrop-blur-sm border-cassava-100 focus:border-cassava-300 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/50 backdrop-blur-sm border-cassava-100 focus:border-cassava-300 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/50 backdrop-blur-sm border-cassava-100 focus:border-cassava-300 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-cassava-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cassava-600 to-soil-600 hover:from-cassava-700 hover:to-soil-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                size="lg"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                S'inscrire
              </Button>
            </form>

            <div className="text-center text-sm animate-in fade-in-50 duration-1000 delay-500">
              Déjà un compte ?{" "}
              <Link 
                to="/login" 
                className="text-cassava-600 hover:text-cassava-700 hover:underline transition-colors font-medium"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
