
import React from 'react';
import { Outlet } from 'react-router-dom';
import DriverNavbar from './DriverNavbar';
import DriverBottomNav from './DriverBottomNav';

const DriverLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-benin-offwhite">
      <DriverNavbar />
      <main className="flex-1 container max-w-md mx-auto px-4 pt-16 pb-20 relative overflow-hidden">
        {/* Mobile screen frame effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-benin-blue via-benin-green to-benin-blue opacity-30"></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <DriverBottomNav />
    </div>
  );
};

export default DriverLayout;
