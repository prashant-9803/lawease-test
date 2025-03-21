import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux';

const LawyerProfileForm = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: '',
    about: '',
    contactNumber: '',
    experience: '',
    age: '',
    district: '',
    taluka: '',
    state: '',
    university: '',
    category: '',
    enrollmentNumber: ''
  });

  const [profilePic, setProfilePic] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is provider and hasn't submitted form
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("Please login first");
          navigate('/login');
          return;
        }

        if (!user) {
          toast.error("User data not found");
          navigate('/login');
          return;
        }

        if (user.accountType !== 'Provider') {
          toast.error('Only providers can access this page');
          navigate('/dashboard');
          return;
        }

        // Check if provider has already submitted the form
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/profile/getProfile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();

        if (data.success && data.profile) {
          toast.error('You have already submitted the form');
          navigate('/dashboard');
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking access:', error);
        toast.error(error.message || 'Something went wrong');
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [user, navigate]);

  // Static categories
  const categories = [
    "Tax Lawyer",
    "Criminal Lawyer",
    "Family Lawyer",
    "Real Estate Lawyer",
    "Business Lawyer",
    "Labor & Employment Lawyer",
    "Intellectual Property Lawyer",
    "Human Rights Lawyer",
    "Personal Injury Lawyer",
    "Consumer Protection Lawyer"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      setProfilePic(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
  
      // Validate all fields
      const requiredFields = Object.entries(formData);
      for (const [key, value] of requiredFields) {
        if (!value) {
          throw new Error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
        }
      }
  
      if (!profilePic) {
        throw new Error('Profile picture is required');
      }
  
      // Validate enrollment number
      // You can add regex validation or other checks here
      if (formData.enrollmentNumber.length < 5) {
        throw new Error('Please enter a valid enrollment number');
      }
  
      // Create FormData instance
      const formDataToSend = new FormData();
      formDataToSend.append('image', profilePic);
      
      // Append all other form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
  
      // First verify enrollment number if needed
      const verifyResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/profile/verifyEnrollment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enrollmentNumber: formData.enrollmentNumber }),
      });
  
      const verifyData = await verifyResponse.json();
      
      if (!verifyData.success) {
        throw new Error(verifyData.message || 'Invalid enrollment number. You are not authorized to access the system.');
      }
  
      // If enrollment is valid, submit the form
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/profile/setProfile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
  
      const data = await response.json();
  
      if (!data.success) {
        throw new Error(data.message || 'Failed to update profile');
      }
  
      toast.success('Profile updated successfully!');
      navigate('/dashboard');
  
    } catch (err) {
      console.error('Profile submit error:', err);
      
      if (err.message.includes('token')) {
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again');
        navigate('/login');
      } else {
        toast.error(err.message || "Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div>Loading profile data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Taluka</label>
              <input
                type="text"
                name="taluka"
                value={formData.taluka}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Professional Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">University</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Experience (in years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Specialization</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2">Enrollment Number</label>
              <input
                type="text"
                name="enrollmentNumber"
                value={formData.enrollmentNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Profile'}
        </button>
      </form>
    </div>
  );
};

export default LawyerProfileForm;