
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, LogOut, ArrowLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FieldDescriptions = ({ user, onLogout }) => {
  const fieldData = [
    {
      category: "Basic Information",
      fields: [
        {
          name: "Age",
          description: "Your age in years. Heart disease risk increases with age, especially after 45 for men and 55 for women.",
          importance: "High"
        },
        {
          name: "Sex",
          description: "Your biological sex. Men typically have higher risk at younger ages, while women's risk increases after menopause.",
          importance: "High"
        },
        {
          name: "BMI (Body Mass Index)",
          description: "Calculated as weight in kg divided by height in meters squared. BMI over 25 indicates overweight, over 30 indicates obesity.",
          importance: "High"
        }
      ]
    },
    {
      category: "Vital Signs",
      fields: [
        {
          name: "Systolic Blood Pressure",
          description: "The pressure in your arteries when your heart beats. Normal is less than 120 mmHg. High blood pressure is a major risk factor.",
          importance: "Very High"
        },
        {
          name: "Diastolic Blood Pressure",
          description: "The pressure in your arteries when your heart rests between beats. Normal is less than 80 mmHg.",
          importance: "Very High"
        },
        {
          name: "Heart Rate",
          description: "Your resting heart rate in beats per minute. Normal range is 60-100 bpm. Very high or low rates may indicate problems.",
          importance: "Medium"
        }
      ]
    },
    {
      category: "Lab Results",
      fields: [
        {
          name: "Cholesterol",
          description: "Total cholesterol level in mg/dL. High cholesterol (over 240) significantly increases heart disease risk.",
          importance: "Very High"
        },
        {
          name: "Triglycerides",
          description: "A type of fat in your blood. High levels (over 150 mg/dL) can increase heart disease risk, especially with other factors.",
          importance: "Medium"
        }
      ]
    },
    {
      category: "Medical History",
      fields: [
        {
          name: "Diabetes",
          description: "Having diabetes significantly increases heart disease risk due to blood vessel damage from high blood sugar.",
          importance: "Very High"
        },
        {
          name: "Family History",
          description: "Having close relatives with heart disease increases your genetic risk, especially if they had early heart disease.",
          importance: "High"
        },
        {
          name: "Previous Heart Problems",
          description: "Any history of heart attack, angina, heart surgery, or other cardiovascular issues greatly increases future risk.",
          importance: "Very High"
        }
      ]
    },
    {
      category: "Lifestyle Factors",
      fields: [
        {
          name: "Smoking",
          description: "Smoking damages blood vessels and significantly increases heart disease risk. Even secondhand smoke is harmful.",
          importance: "Very High"
        },
        {
          name: "Alcohol Consumption",
          description: "Moderate alcohol may have some protective effects, but excessive drinking increases blood pressure and heart disease risk.",
          importance: "Medium"
        },
        {
          name: "Exercise Hours per Week",
          description: "Regular physical activity strengthens the heart and reduces risk. Aim for at least 150 minutes of moderate exercise weekly.",
          importance: "High"
        },
        {
          name: "Healthy Diet",
          description: "A diet rich in fruits, vegetables, whole grains, and lean proteins while limiting saturated fat and sodium.",
          importance: "High"
        },
        {
          name: "Stress Level",
          description: "Chronic stress can contribute to heart disease through various mechanisms including high blood pressure.",
          importance: "Medium"
        },
        {
          name: "Sleep Hours",
          description: "Poor sleep (less than 6 hours or more than 9 hours) is associated with increased heart disease risk.",
          importance: "Medium"
        }
      ]
    }
  ];

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'Very High':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
                  Back to Dashboard
                </Button>
              </Link>
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
                <Info className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Health Information Guide
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
        <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="mx-auto bg-gradient-to-r from-green-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Understanding Your Health Metrics
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Learn about the factors that influence your heart disease risk and how to improve your health
            </p>
          </CardHeader>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="space-y-4">
              {fieldData.map((category, categoryIndex) => (
                <AccordionItem 
                  key={categoryIndex} 
                  value={`category-${categoryIndex}`}
                  className="border border-gray-200 rounded-lg"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 rounded-t-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {categoryIndex + 1}
                      </div>
                      <span className="text-lg font-semibold text-gray-800">{category.category}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-4">
                      {category.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} className="border-l-4 border-blue-500 pl-4 py-2">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{field.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(field.importance)}`}>
                              {field.importance} Impact
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {field.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Important Notes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>This assessment is for educational purposes and should not replace professional medical advice.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Always consult with healthcare providers for accurate diagnosis and treatment plans.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Risk factors often interact with each other, so addressing multiple factors provides the best protection.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Many risk factors can be modified through lifestyle changes and medical treatment.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/predict">
            <Button className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105">
              Take Heart Risk Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FieldDescriptions;
