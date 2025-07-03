
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from '@/components/home/HomePage';
import SellItemPage from '@/components/sell/SellItemPage';
import WasteManagementPage from '@/components/waste/WasteManagementPage';
import ItemListingsPage from '@/components/listings/ItemListingsPage';
import LoginPage from '@/components/auth/LoginPage';
import SignupPage from '@/components/auth/SignupPage';
import WasteManagementDashboard from '@/components/dashboard/WasteManagementDashboard';

const queryClient = new QueryClient();

const App = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const addItem = (newItem) => {
    setItems(prev => [...prev, { ...newItem, id: Date.now() }]);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={
                user ? <Navigate to={user.role === 'waste-management' ? '/waste-management-dashboard' : '/'} /> 
                : <LoginPage onLogin={handleLogin} />
              } />
              <Route path="/signup" element={
                user ? <Navigate to={user.role === 'waste-management' ? '/waste-management-dashboard' : '/'} /> 
                : <SignupPage onLogin={handleLogin} />
              } />
              
              {/* Protected Routes */}
              <Route path="/" element={
                user ? <HomePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
              } />
              <Route path="/sell" element={
                user && user.role === 'seller' ? <SellItemPage onAddItem={addItem} /> : <Navigate to="/login" />
              } />
              <Route path="/listings" element={
                user ? <ItemListingsPage items={items} /> : <Navigate to="/login" />
              } />
              <Route path="/waste-management" element={
                user && user.role === 'seller' ? <WasteManagementPage /> : <Navigate to="/login" />
              } />
              <Route path="/waste-management-dashboard" element={
                user && user.role === 'waste-management' ? <WasteManagementDashboard /> : <Navigate to="/login" />
              } />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
