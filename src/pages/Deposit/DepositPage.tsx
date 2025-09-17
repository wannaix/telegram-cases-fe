import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const DepositPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/profile?openDeposit=true');
  }, [navigate]);
  return null;
};
