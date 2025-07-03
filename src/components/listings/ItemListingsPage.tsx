
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Recycle, ShoppingBag, MapPin, Heart } from 'lucide-react';

const ItemListingsPage = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [likedItems, setLikedItems] = useState(new Set());

  const toggleLike = (itemId) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(itemId)) {
      newLikedItems.delete(itemId);
    } else {
      newLikedItems.add(itemId);
    }
    setLikedItems(newLikedItems);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(items.map(item => item.category))];

  // Mock items if no items exist
  const mockItems = items.length === 0 ? [
    {
      id: 1,
      title: "Vintage Laptop",
      description: "Well-maintained laptop, perfect for students",
      price: "15000",
      category: "electronics",
      condition: "good",
      location: "Mumbai, Maharashtra",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      datePosted: new Date().toISOString(),
      views: 45
    },
    {
      id: 2,
      title: "Office Chair",
      description: "Comfortable ergonomic office chair",
      price: "3500",
      category: "furniture",
      condition: "like-new",
      location: "Delhi, NCR",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      datePosted: new Date().toISOString(),
      views: 32
    },
    {
      id: 3,
      title: "Gaming Setup",
      description: "Complete gaming setup with monitor and accessories",
      price: "25000",
      category: "electronics",
      condition: "good",
      location: "Bangalore, Karnataka",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
      datePosted: new Date().toISOString(),
      views: 78
    }
  ] : filteredItems;

  const displayItems = items.length === 0 ? mockItems : filteredItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-10 h-10 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Item Listings
              </h1>
            </div>
            <Link to="/sell">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300">
                Sell Item
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg min-w-48"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Items Grid */}
        {displayItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Items Found</h2>
            <p className="text-gray-600 mb-8">Try adjusting your search or browse all categories</p>
            <Link to="/sell">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                List Your First Item
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayItems.map((item) => (
              <Card key={item.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                      <ShoppingBag className="w-16 h-16 text-emerald-400" />
                    </div>
                  )}
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        likedItems.has(item.id) 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-gray-600'
                      } transition-colors`} 
                    />
                  </button>
                  <div className="absolute top-3 left-3">
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {item.condition}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-gray-800 line-clamp-1">
                    {item.title}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">
                      ₹{parseInt(item.price).toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 capitalize">
                      {item.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.location}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{item.views} views</span>
                    <span>{new Date(item.datePosted).toLocaleDateString()}</span>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300">
                    Contact Seller
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemListingsPage;
