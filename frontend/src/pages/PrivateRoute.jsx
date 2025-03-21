import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PrivateRoute = ({ children, roleRequired = null }) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);

  useEffect(() => {
    // Check if provider has completed their profile
    const checkProfileCompletion = async () => {
      try {
        if (user?.accountType === "Provider") {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/profile/getProfile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setHasCompletedProfile(data.success && data.profile);
          }
        } else {
          // Non-providers don't need profile completion
          setHasCompletedProfile(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking profile:", error);
        setIsLoading(false);
      }
    };

    if (token && user) {
      checkProfileCompletion();
    } else {
      setIsLoading(false);
    }
  }, [token, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    toast.error("Please login to continue");
    return <Navigate to="/login" />;
  }

  // Check for role requirement
  if (roleRequired && user?.accountType !== roleRequired) {
    toast.error(`Only ${roleRequired}s can access this page`);
    return <Navigate to="/dashboard" />;
  }

  // For providers: redirect to form if profile not completed
  if (user?.accountType === "Provider" && !hasCompletedProfile) {
    toast.error("Please complete your profile first");
    return <Navigate to="/form" />;
  }

  return children;
};

export default PrivateRoute;