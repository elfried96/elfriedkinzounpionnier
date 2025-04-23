import React, { createContext, useContext, useState } from "react";

interface AnalysisResult {
  id: string;
  disease: {
    name: string;
    confidence: number;
  };
  imageUrl: string;
  description: string;
  date: string;
}

interface AnalysisContextType {
  results: AnalysisResult[];
  addResult: (result: AnalysisResult) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const addResult = (result: AnalysisResult) => {
    setResults((prevResults) => [result, ...prevResults]);
  };

  return (
    <AnalysisContext.Provider value={{ results, addResult }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};