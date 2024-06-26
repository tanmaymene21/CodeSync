import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HoverBorderGradient } from '../ui/HoverBorderGradient';
import { useAuth0 } from '@auth0/auth0-react';

export function GetStarted() {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      loginWithRedirect();
    }
  };

  return (
    <div className="mt-5 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="div"
        onClick={handleGetStartedClick}
        className="bg-black text-white flex items-center space-x-2 cursor-pointer"
      >
        <span>Get Started</span>
      </HoverBorderGradient>
    </div>
  );
}
