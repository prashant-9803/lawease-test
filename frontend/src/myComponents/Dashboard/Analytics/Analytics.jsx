import React, { useEffect } from 'react'
import LawyerDashboard from './LawyerDashboard'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Analytics = () => {
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.accountType !== "Provider") {
      navigate("/dashboard/your-case");
    }
  }, [user, navigate]);

  if (user?.accountType === "Provider") {
    return <LawyerDashboard/>;
  }
  
  return null;
}

export default Analytics