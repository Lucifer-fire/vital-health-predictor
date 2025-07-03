
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

const queryClient = new QueryClient();

const App = () => {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems(prev => [...prev, { ...newItem, id: Date.now() }]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sell" element={<SellItemPage onAddItem={addItem} />} />
              <Route path="/listings" element={<ItemListingsPage items={items} />} />
              <Route path="/waste-management" element={<WasteManagementPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
