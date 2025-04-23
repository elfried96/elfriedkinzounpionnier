import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import History from "./pages/History";
import Diseases from "./pages/Diseases";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AnalysisProvider } from "@/lib/AnalysisContext";
import { AuthProvider } from "@/lib/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <AnalysisProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/history" element={<History />} />
              <Route path="/diseases" element={<Diseases />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AnalysisProvider>
  </AuthProvider>
);

export default App;
