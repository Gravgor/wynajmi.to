"use client";
import './css/loading.css'; 

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative">
        <div className="house"></div>
        <div className="roof"></div>
        <div className="chimney"></div>
        <div className="door"></div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Proszę czekać...</p>
    </div>
  );
};
