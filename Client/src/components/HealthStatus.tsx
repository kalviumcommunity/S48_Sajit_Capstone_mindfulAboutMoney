"use client";
import React, { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon, PauseCircleIcon } from "lucide-react";

type Monitor = {
  name: string;
  status: number;
  uptime: string;
};

const HealthStatus: React.FC = () => {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/health`)
      .then((res) => res.json())
      .then((data) => setMonitors(data.monitors))
      .catch(() => setError("Failed to load status"));
  }, []);

  const getStatusIcon = (status: number) => {
    if (status === 2)
      return <CheckCircleIcon className='h-6 w-6 text-emerald-600' />;
    if (status === 9)
      return <PauseCircleIcon className='h-6 w-6 text-yellow-500' />;
    return <XCircleIcon className='h-6 w-6 text-red-600' />;
  };

  return (
    <div className='bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 max-w-2xl w-full mx-auto space-y-6'>
      <h1 className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-center'>
        Server Health Status
      </h1>
      {error ? (
        <p className='text-red-600 text-center'>{error}</p>
      ) : (
        <div className='grid md:grid-cols-2 gap-4'>
          {monitors.map((monitor) => (
            <div
              key={monitor.name}
              className='bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 space-y-2 text-center'
            >
              <h2 className='text-lg font-semibold text-slate-800'>
                {monitor.name}
              </h2>
              <div className='flex items-center justify-center space-x-2'>
                {getStatusIcon(monitor.status)}
                <span className='text-slate-700'>
                  {monitor.status === 2
                    ? "Online"
                    : monitor.status === 9
                    ? "Paused"
                    : "Offline"}
                </span>
              </div>
              <div className='text-slate-800'>Uptime: {monitor.uptime}%</div>
            </div>
          ))}
        </div>
      )}
      <div className='text-xs text-slate-400 text-center'>
        Powered by UptimeRobot API
      </div>
    </div>
  );
};

export default HealthStatus;
