
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, Camera, MapPin, Phone, DollarSign, Package, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SellItemPageProps {
  onAddItem: (item: any) => void;
}

const SellItemPage = ({ onAddItem }: SellItemPageProps) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: 'electronics',
    condition: 'good',
    location: '',
    phone: '',
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'electronics', label: 'Electronics', icon: '📱' },
    { value: 'furniture', label: 'Furniture', icon: '🪑' },
    { value: 'clothing', label: 'Clothing', icon: '👕' },
    { value: 'books', label: 'Books', icon: '📚' },
    { value: 'sports', label: 'Sports', icon: '⚽' },
    { value: 'other', label: 'Other', icon: '📦' }
  ];

  const conditions = [
    { value: 'excellent', label: 'Excellent', description: 'Like new, no signs of wear' },
    { value: 'good', label: 'Good', description: 'Minor signs of wear, fully functional' },
    { value: 'fair', label: 'Fair', description: 'Visible wear but works well' },
    { value: 'needs-repair', label: 'Needs Repair', description: 'Requires fixing or maintenance' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newItem = {
        ...formData,
        price: parseFloat(formData.price),
        image: imagePreview,
        id: Date.now()
      };
      
      onAddItem(newItem);
      
      toast({
        title: "Item Listed Successfully!",
        description: "Your item has been added to the marketplace.",
      });

      // Reset form
      setFormData({
        title: '',
        price: '',
        description: '',
        category: 'electronics',
        condition: 'good',
        location: '',
        phone: '',
        image: null
      });
      setImagePreview(null);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="hover:bg-emerald-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Sell Your Item
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-emerald-200">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-800 flex items-center">
                <Package className="w-6 h-6 mr-3" />
                Item Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-emerald-700 font-semibold">Item Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="What are you selling?"
                    required
                    className="mt-1 border-2 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-emerald-700 font-semibold">Price (₹)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0"
                        required
                        className="mt-1 pl-10 border-2 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-emerald-700 font-semibold">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:border-emerald-500 focus:outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="text-emerald-700 font-semibold">Condition</Label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {conditions.map(cond => (
                      <label key={cond.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="condition"
                          value={cond.value}
                          checked={formData.condition === cond.value}
                          onChange={handleInputChange}
                          className="text-emerald-500 focus:ring-emerald-500"
                        />
                        <div>
                          <div className="font-medium text-gray-700">{cond.label}</div>
                          <div className="text-xs text-gray-500">{cond.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-emerald-700 font-semibold">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your item in detail..."
                    rows={4}
                    required
                    className="mt-1 border-2 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-emerald-700 font-semibold">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, State"
                        required
                        className="mt-1 pl-10 border-2 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-emerald-700 font-semibold">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="mt-1 pl-10 border-2 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-emerald-700 font-semibold">Upload Photo</Label>
                  <div className="mt-2 border-2 border-dashed border-emerald-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                      ) : (
                        <div>
                          <Camera className="mx-auto h-12 w-12 text-emerald-400" />
                          <div className="mt-2 text-emerald-600 font-medium">Click to upload image</div>
                          <div className="text-sm text-gray-500">PNG, JPG up to 10MB</div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 h-12"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      List Item for Sale
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-teal-200">
            <CardHeader>
              <CardTitle className="text-2xl text-teal-800 flex items-center">
                <Star className="w-6 h-6 mr-3" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {formData.title || 'Item Title'}
                  </h3>
                  <div className="text-2xl font-bold text-teal-600 mt-1">
                    ₹{formData.price || '0'}
                  </div>
                </div>
                <p className="text-gray-600">
                  {formData.description || 'Item description will appear here...'}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                    {categories.find(cat => cat.value === formData.category)?.label}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {conditions.find(cond => cond.value === formData.condition)?.label}
                  </span>
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {formData.location || 'Location'}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {formData.phone || 'Phone Number'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellItemPage;
