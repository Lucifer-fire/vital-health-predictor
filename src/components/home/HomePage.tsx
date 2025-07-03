
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, MapPin, ShoppingBag, Recycle, Leaf, Heart } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-10 h-10 rounded-full flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                E-Sawctha
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/listings">
                <Button variant="ghost" className="hover:bg-emerald-50">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Listings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6 animate-fade-in">
            Welcome to E-Sawctha
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto animate-fade-in">
            Your one-stop platform for sustainable living. Sell your items, find waste management centers, and contribute to a cleaner environment.
          </p>
          <div className="flex items-center justify-center space-x-2 text-emerald-600 mb-8">
            <Heart className="w-6 h-6 animate-pulse" />
            <span className="text-lg font-semibold">Making the world cleaner, one item at a time</span>
            <Heart className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-emerald-50 border-emerald-200">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-emerald-800">Sell Your Items</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Upload photos and details of items you want to sell. Give them a new life instead of throwing them away.
              </p>
              <Link to="/sell">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300">
                  Start Selling
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-teal-50 border-teal-200">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-teal-800">Browse Listings</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Discover amazing pre-owned items from your community. Find treasures at great prices.
              </p>
              <Link to="/listings">
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300">
                  Browse Items
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-cyan-50 border-cyan-200 md:col-span-2 lg:col-span-1">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-cyan-800">Waste Management</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Find nearby waste management centers and get directions for proper disposal of items.
              </p>
              <Link to="/waste-management">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300">
                  Find Centers
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-emerald-600 mb-2">1000+</div>
              <div className="text-gray-700">Items Sold</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-teal-600 mb-2">500+</div>
              <div className="text-gray-700">Happy Users</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-cyan-600 mb-2">50+</div>
              <div className="text-gray-700">Waste Centers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
