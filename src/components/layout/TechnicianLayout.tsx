
import React from 'react';
import { Outlet } from 'react-router-dom';
import TechnicianNavbar from './TechnicianNavbar';
import TechnicianBottomNav from './TechnicianBottomNav';

const TechnicianLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-benin-offwhite">
      <TechnicianNavbar />
      <main className="flex-1 container max-w-md mx-auto px-4 pt-16 pb-20 relative overflow-hidden">
        {/* Mobile screen frame effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-benin-green via-benin-blue to-benin-green opacity-30"></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <TechnicianBottomNav />
    </div>
  );
};

export default TechnicianLayout;
