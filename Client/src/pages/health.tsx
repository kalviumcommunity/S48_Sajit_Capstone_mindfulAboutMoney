import React from "react";
import HealthStatus from "../components/HealthStatus";

const HealthPage: React.FC = () => {
  return (
    <div className='bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen flex items-center justify-center p-6'>
      <HealthStatus />
    </div>
  );
};

export default HealthPage;
