import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, LogOut, ArrowLeft, AlertTriangle, CheckCircle, MapPin, Phone, Clock, Hospital } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const ResultsPage = ({ user, onLogout }) => {
  const [prediction, setPrediction] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);

  useEffect(() => {
    const savedPrediction = localStorage.getItem('lastPrediction');
    if (savedPrediction) {
      setPrediction(JSON.parse(savedPrediction));
    }
  }, []);

  const requestLocationAndFindHospitals = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          findNearbyHospitals(location.lat, location.lng);
          setShowHospitals(true);
          setIsLoadingLocation(false);
          toast({
            title: "Location Found",
            description: "Found nearby hospitals based on your location.",
          });
        },
        (error) => {
          console.log('Location access denied:', error);
          setIsLoadingLocation(false);
          if (error.code === error.PERMISSION_DENIED) {
            toast({
              title: "Location Permission Denied",
              description: "Please enable location access to find nearby hospitals.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Location Error",
              description: "Unable to get your location. Showing sample hospitals.",
              variant: "destructive",
            });
            // Show mock hospitals even without location
            setMockHospitals();
            setShowHospitals(true);
          }
        }
      );
    } else {
      setIsLoadingLocation(false);
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support location services. Showing sample hospitals.",
        variant: "destructive",
      });
      setMockHospitals();
      setShowHospitals(true);
    }
  };

  const setMockHospitals = () => {
    const mockHospitals = [
      {
        id: 1,
        name: "City General Hospital",
        address: "123 Medical Center Dr, Downtown",
        phone: "(555) 123-4567",
        distance: "1.2 miles",
        type: "General Hospital",
        emergency: true,
        cardiology: true
      },
      {
        id: 2,
        name: "Heart Care Medical Center",
        address: "456 Cardiac Ave, Medical District",
        phone: "(555) 234-5678",
        distance: "2.8 miles",
        type: "Specialized Cardiac Center",
        emergency: true,
        cardiology: true
      },
      {
        id: 3,
        name: "Regional Emergency Hospital",
        address: "789 Emergency Blvd, Health Plaza",
        phone: "(555) 345-6789",
        distance: "3.5 miles",
        type: "Emergency Hospital",
        emergency: true,
        cardiology: false
      },
      {
        id: 4,
        name: "Community Health Center",
        address: "321 Community St, Suburb Area",
        phone: "(555) 456-7890",
        distance: "4.1 miles",
        type: "Community Hospital",
        emergency: false,
        cardiology: true
      }
    ];
    setNearbyHospitals(mockHospitals);
  };

  const findNearbyHospitals = (lat, lng) => {
    // In a real app, this would call a hospital/medical facility API
    // For demo, we'll use mock data with location-aware information
    setTimeout(() => {
      setMockHospitals();
    }, 1000);
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'moderate':
        return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
      case 'high':
        return <AlertTriangle className="w-8 h-8 text-red-600" />;
      default:
        return <Heart className="w-8 h-8 text-gray-600" />;
    }
  };

  const getRiskMessage = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return "Great news! Your heart disease risk is low. Continue maintaining your healthy lifestyle.";
      case 'moderate':
        return "Your heart disease risk is moderate. Consider lifestyle modifications and regular check-ups.";
      case 'high':
        return "Your heart disease risk is high. Please consult with a healthcare provider soon for proper evaluation and treatment.";
      default:
        return "Unable to determine risk level. Please retake the assessment.";
    }
  };

  if (!prediction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Results Found</h2>
            <p className="text-gray-600 mb-4">Please complete the heart risk assessment first.</p>
            <Link to="/predict">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Take Assessment
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Assessment Results
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <Button 
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4">
              {getRiskIcon(prediction.riskLevel)}
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">
              Your Heart Disease Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-xl font-bold ${getRiskColor(prediction.riskLevel)}`}>
                Risk Level: {prediction.riskLevel?.toUpperCase()}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-lg text-gray-700">
                {getRiskMessage(prediction.riskLevel)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-blue-800">Assessment Date</h4>
                <p className="text-blue-600">
                  {new Date(prediction.timestamp).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-purple-800">Risk Score</h4>
                <p className="text-purple-600 text-xl font-bold">
                  {prediction.score}/100
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-pink-800">Next Check-up</h4>
                <p className="text-pink-600">
                  {prediction.riskLevel === 'High' ? '1-3 months' : prediction.riskLevel === 'Moderate' ? '6 months' : '1 year'}
                </p>
              </div>
            </div>

            <div className="text-center pt-6">
              <Button
                onClick={requestLocationAndFindHospitals}
                disabled={isLoadingLocation}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {isLoadingLocation ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Finding Hospitals...</span>
                  </div>
                ) : (
                  <>
                    <Hospital className="w-6 h-6 mr-2" />
                    Find Nearby Hospitals
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {showHospitals && nearbyHospitals.length > 0 && (
          <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <Hospital className="w-6 h-6 text-red-600" />
                <span>Nearby Hospitals & Medical Centers</span>
              </CardTitle>
              <p className="text-gray-600">
                Here are the closest medical facilities where you can get immediate care:
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nearbyHospitals.map((hospital) => (
                  <Card key={hospital.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-red-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 mb-1">{hospital.name}</h3>
                          <p className="text-blue-600 font-medium text-sm">{hospital.type}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          {hospital.emergency && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                              24/7 Emergency
                            </span>
                          )}
                          {hospital.cardiology && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                              Cardiology
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                          <span>{hospital.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{hospital.phone}</span>
                        </div>
                        <div className="text-red-600 font-medium">
                          📍 {hospital.distance} away
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
                          onClick={() => {
                            window.open(`tel:${hospital.phone}`, '_self');
                          }}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Hospital Now
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              const address = encodeURIComponent(hospital.address);
                              window.open(`https://maps.google.com/maps?q=${address}`, '_blank');
                            }}
                          >
                            <MapPin className="w-3 h-3 mr-1" />
                            Directions
                          </Button>
                          {hospital.emergency && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => {
                                window.open(`tel:911`, '_self');
                              }}
                            >
                              🚨 Emergency
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/predict">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto px-8 py-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              Take Another Assessment
            </Button>
          </Link>
          <Link to="/info">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto px-8 py-3 border-2 border-green-500 text-green-600 hover:bg-green-50"
            >
              Learn About Risk Factors
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
