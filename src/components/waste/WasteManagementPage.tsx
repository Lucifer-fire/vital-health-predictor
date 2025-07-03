
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Navigation, Phone, Clock, Recycle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const WasteManagementPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyWasteCenters, setNearbyWasteCenters] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showCenters, setShowCenters] = useState(false);

  const requestLocationAndFindCenters = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          findNearbyWasteCenters(location.lat, location.lng);
          setShowCenters(true);
          setIsLoadingLocation(false);
          toast({
            title: "Location Found",
            description: "Found nearby waste management centers based on your location.",
          });
        },
        (error) => {
          console.log('Location access denied:', error);
          setIsLoadingLocation(false);
          if (error.code === error.PERMISSION_DENIED) {
            toast({
              title: "Location Permission Denied",
              description: "Please enable location access to find nearby waste centers.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Location Error",
              description: "Unable to get your location. Showing sample waste centers.",
              variant: "destructive",
            });
            // Show mock centers even without location
            setMockWasteCenters();
            setShowCenters(true);
          }
        }
      );
    } else {
      setIsLoadingLocation(false);
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support location services. Showing sample waste centers.",
        variant: "destructive",
      });
      setMockWasteCenters();
      setShowCenters(true);
    }
  };

  const setMockWasteCenters = () => {
    const mockCenters = [
      {
        id: 1,
        name: "Green Earth Recycling Center",
        address: "123 Eco Street, Green District",
        phone: "(555) 123-4567",
        distance: "0.8 miles",
        type: "General Recycling",
        hours: "Mon-Sat: 8:00 AM - 6:00 PM",
        specialties: ["Electronics", "Paper", "Plastic", "Metal"],
        rating: 4.8
      },
      {
        id: 2,
        name: "City Waste Management Hub",
        address: "456 Clean Ave, Municipal Area",
        phone: "(555) 234-5678",
        distance: "1.5 miles",
        type: "Municipal Facility",
        hours: "Daily: 7:00 AM - 8:00 PM",
        specialties: ["Hazardous Waste", "Bulk Items", "Composting"],
        rating: 4.6
      },
      {
        id: 3,
        name: "EcoTech Processing Center",
        address: "789 Sustainable Blvd, Tech Park",
        phone: "(555) 345-6789",
        distance: "2.2 miles",
        type: "Specialized E-Waste",
        hours: "Mon-Fri: 9:00 AM - 5:00 PM",
        specialties: ["Electronics", "Batteries", "Mobile Phones"],
        rating: 4.9
      },
      {
        id: 4,
        name: "Community Recycle Point",
        address: "321 Neighborhood St, Suburb",
        phone: "(555) 456-7890",
        distance: "3.1 miles",
        type: "Community Center",
        hours: "Tue-Sun: 10:00 AM - 4:00 PM",
        specialties: ["Clothing", "Books", "Furniture"],
        rating: 4.4
      }
    ];
    setNearbyWasteCenters(mockCenters);
  };

  const findNearbyWasteCenters = (lat, lng) => {
    // In a real app, this would call a waste management facility API
    setTimeout(() => {
      setMockWasteCenters();
    }, 1000);
  };

  const getDirections = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

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
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Waste Management Centers
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">
              Find Waste Management Centers
            </CardTitle>
            <p className="text-lg text-gray-600 mt-2">
              Locate nearby facilities for proper waste disposal and recycling
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 mb-6">
              <p className="text-gray-700 mb-4">
                Help keep our environment clean by disposing of your waste responsibly. 
                Find the nearest waste management centers and recycling facilities in your area.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Electronics Recycling
                </span>
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Hazardous Waste
                </span>
                <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Bulk Items
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Composting
                </span>
              </div>
            </div>

            <Button
              onClick={requestLocationAndFindCenters}
              disabled={isLoadingLocation}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {isLoadingLocation ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Finding Centers...</span>
                </div>
              ) : (
                <>
                  <MapPin className="w-6 h-6 mr-2" />
                  Find Nearby Waste Centers
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {showCenters && nearbyWasteCenters.length > 0 && (
          <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <Recycle className="w-6 h-6 text-emerald-600" />
                <span>Nearby Waste Management Centers</span>
              </CardTitle>
              <p className="text-gray-600">
                Here are the closest waste management and recycling facilities:
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nearbyWasteCenters.map((center) => (
                  <Card key={center.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-emerald-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 mb-1">{center.name}</h3>
                          <p className="text-emerald-600 font-medium text-sm">{center.type}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${i < Math.floor(center.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                            <span className="text-sm text-gray-600 ml-2">({center.rating})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-semibold">
                            {center.distance} away
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                          <span>{center.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{center.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{center.hours}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {center.specialties.map((specialty, index) => (
                            <span key={index} className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300"
                          onClick={() => getDirections(center.address)}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              window.open(`tel:${center.phone}`, '_self');
                            }}
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call Center
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-emerald-600 hover:bg-emerald-50"
                          >
                            ℹ️ More Info
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="bg-gradient-to-r from-emerald-100 to-teal-100 border-0 shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Why Choose Proper Waste Management?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Recycle className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Environmental Protection</h4>
                <p className="text-gray-600 text-sm">Reduce pollution and conserve natural resources through proper disposal.</p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Community Health</h4>
                <p className="text-gray-600 text-sm">Keep our neighborhoods clean and safe for everyone.</p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Navigation className="w-8 h-8 text-cyan-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Easy Access</h4>
                <p className="text-gray-600 text-sm">Find convenient locations with clear directions and contact information.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WasteManagementPage;
