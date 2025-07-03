
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from '@/components/auth/LoginPage';
import SignupPage from '@/components/auth/SignupPage';
import Dashboard from '@/components/dashboard/Dashboard';
import PredictionForm from '@/components/prediction/PredictionForm';
import ResultsPage from '@/components/results/ResultsPage';
import FieldDescriptions from '@/components/info/FieldDescriptions';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <BrowserRouter>
            <Routes>
              <Route 
                path="/login" 
                element={
                  !isAuthenticated ? 
                  <LoginPage onLogin={handleLogin} /> : 
                  <Navigate to="/dashboard" />
                } 
              />
              <Route 
                path="/signup" 
                element={
                  !isAuthenticated ? 
                  <SignupPage onLogin={handleLogin} /> : 
                  <Navigate to="/dashboard" />
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  isAuthenticated ? 
                  <Dashboard user={currentUser} onLogout={handleLogout} /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/predict" 
                element={
                  isAuthenticated ? 
                  <PredictionForm user={currentUser} onLogout={handleLogout} /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/results" 
                element={
                  isAuthenticated ? 
                  <ResultsPage user={currentUser} onLogout={handleLogout} /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/info" 
                element={
                  isAuthenticated ? 
                  <FieldDescriptions user={currentUser} onLogout={handleLogout} /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/" 
                element={
                  isAuthenticated ? 
                  <Navigate to="/dashboard" /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
