
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogOut, ArrowLeft, Activity, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const PredictionForm = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cholesterol: '',
    systolic_bp: '',
    diastolic_bp: '',
    heart_rate: '',
    diabetes: '',
    family_history: '',
    smoking: '',
    obesity: '',
    alcohol: '',
    exercise: '',
    diet: '',
    previous_heart_problems: '',
    medication_use: '',
    stress: '',
    sedentary_hours: '',
    income: '',
    bmi: '',
    triglycerides: '',
    physical_activity: '',
    sleep_hours: '',
    country: '',
    continent: '',
    hemisphere: ''
  });

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const predictHeartRisk = (data) => {
    // Simplified risk calculation based on key factors
    let riskScore = 0;
    
    // Age factor
    if (data.age > 65) riskScore += 3;
    else if (data.age > 45) riskScore += 2;
    else if (data.age > 35) riskScore += 1;
    
    // High cholesterol
    if (data.cholesterol > 240) riskScore += 3;
    else if (data.cholesterol > 200) riskScore += 2;
    
    // Blood pressure
    if (data.systolic_bp > 140 || data.diastolic_bp > 90) riskScore += 3;
    else if (data.systolic_bp > 120 || data.diastolic_bp > 80) riskScore += 1;
    
    // Risk factors
    if (data.diabetes === 'Yes') riskScore += 3;
    if (data.family_history === 'Yes') riskScore += 2;
    if (data.smoking === 'Yes') riskScore += 3;
    if (data.obesity === 'Yes') riskScore += 2;
    if (data.previous_heart_problems === 'Yes') riskScore += 4;
    if (data.stress === 'High') riskScore += 2;
    
    // BMI
    if (data.bmi > 30) riskScore += 2;
    else if (data.bmi > 25) riskScore += 1;
    
    // Protective factors
    if (data.exercise > 3) riskScore -= 1;
    if (data.diet === 'Yes') riskScore -= 1;
    if (data.physical_activity > 4) riskScore -= 1;
    
    return riskScore > 8 ? 'High' : riskScore > 4 ? 'Moderate' : 'Low';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate prediction processing
    setTimeout(() => {
      const riskLevel = predictHeartRisk(formData);
      const predictionResult = {
        riskLevel,
        score: Math.floor(Math.random() * 100) + 1,
        timestamp: new Date().toISOString(),
        userData: formData
      };

      localStorage.setItem('lastPrediction', JSON.stringify(predictionResult));
      setIsLoading(false);
      
      toast({
        title: "Assessment Complete",
        description: `Your heart disease risk level: ${riskLevel}`,
      });

      navigate('/results');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Heart Risk Assessment
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="mx-auto bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Complete Your Health Assessment
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Please fill out all fields accurately for the most precise risk evaluation
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
                  
                  <div>
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      min="18"
                      max="120"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="sex">Sex</Label>
                    <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bmi">BMI</Label>
                    <Input
                      id="bmi"
                      type="number"
                      step="0.1"
                      min="10"
                      max="50"
                      value={formData.bmi}
                      onChange={(e) => handleInputChange('bmi', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                {/* Vital Signs */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Vital Signs</h3>
                  
                  <div>
                    <Label htmlFor="systolic_bp">Systolic Blood Pressure (mmHg)</Label>
                    <Input
                      id="systolic_bp"
                      type="number"
                      min="80"
                      max="200"
                      value={formData.systolic_bp}
                      onChange={(e) => handleInputChange('systolic_bp', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="diastolic_bp">Diastolic Blood Pressure (mmHg)</Label>
                    <Input
                      id="diastolic_bp"
                      type="number"
                      min="50"
                      max="120"
                      value={formData.diastolic_bp}
                      onChange={(e) => handleInputChange('diastolic_bp', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="heart_rate">Heart Rate (bpm)</Label>
                    <Input
                      id="heart_rate"
                      type="number"
                      min="40"
                      max="200"
                      value={formData.heart_rate}
                      onChange={(e) => handleInputChange('heart_rate', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                {/* Lab Results */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Lab Results</h3>
                  
                  <div>
                    <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                    <Input
                      id="cholesterol"
                      type="number"
                      min="0"
                      max="500"
                      value={formData.cholesterol}
                      onChange={(e) => handleInputChange('cholesterol', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="triglycerides">Triglycerides (mg/dL)</Label>
                    <Input
                      id="triglycerides"
                      type="number"
                      min="0"
                      max="1000"
                      value={formData.triglycerides}
                      onChange={(e) => handleInputChange('triglycerides', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                {/* Medical History */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Medical History</h3>
                  
                  <div>
                    <Label>Diabetes</Label>
                    <Select value={formData.diabetes} onValueChange={(value) => handleInputChange('diabetes', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Family History of Heart Disease</Label>
                    <Select value={formData.family_history} onValueChange={(value) => handleInputChange('family_history', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Previous Heart Problems</Label>
                    <Select value={formData.previous_heart_problems} onValueChange={(value) => handleInputChange('previous_heart_problems', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Lifestyle Factors */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Lifestyle</h3>
                  
                  <div>
                    <Label>Smoking</Label>
                    <Select value={formData.smoking} onValueChange={(value) => handleInputChange('smoking', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Alcohol Consumption</Label>
                    <Select value={formData.alcohol} onValueChange={(value) => handleInputChange('alcohol', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="exercise">Exercise Hours per Week</Label>
                    <Input
                      id="exercise"
                      type="number"
                      min="0"
                      max="168"
                      step="0.5"
                      value={formData.exercise}
                      onChange={(e) => handleInputChange('exercise', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label>Healthy Diet</Label>
                    <Select value={formData.diet} onValueChange={(value) => handleInputChange('diet', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Info</h3>
                  
                  <div>
                    <Label>Stress Level</Label>
                    <Select value={formData.stress} onValueChange={(value) => handleInputChange('stress', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select stress level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sleep_hours">Sleep Hours per Day</Label>
                    <Input
                      id="sleep_hours"
                      type="number"
                      min="4"
                      max="12"
                      value={formData.sleep_hours}
                      onChange={(e) => handleInputChange('sleep_hours', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="physical_activity">Physical Activity Days per Week</Label>
                    <Input
                      id="physical_activity"
                      type="number"
                      min="0"
                      max="7"
                      value={formData.physical_activity}
                      onChange={(e) => handleInputChange('physical_activity', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="sedentary_hours">Sedentary Hours per Day</Label>
                    <Input
                      id="sedentary_hours"
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      value={formData.sedentary_hours}
                      onChange={(e) => handleInputChange('sedentary_hours', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Your Health Data...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Get My Heart Risk Assessment</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionForm;
