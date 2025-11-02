import React from 'react';
import DashboardCard from './DashboardCard';

const CardsSection = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard
        icon="/red-cross.png"
        total="120"
        label="Total cancer cases"
        growthIcon="/arrow-up.png"
        growthRate="4.8%"
        growthColor="text-green-500"
        growthNote="from last week"
      />

      <DashboardCard
        icon="/blue-heart.png"
        total="72"
        label="AI-Usage rate"
        growthIcon="/arrow-up.png"
        growthRate="1.2%"
        growthColor="text-green-500"
        growthNote="from last week"
      />

      <DashboardCard
        icon="/blue-white.png"
        total="18"
        label="Decision concordance score"
        growthIcon="/arrow-down.png"
        growthRate="2.3%"
        growthColor="text-red-500"
        growthNote="from last week"
      />

      <DashboardCard
        icon="/blue-shield.png"
        total="82"
        label="Total reviewed cases"
        growthIcon="/arrow-up.png"
        growthRate="3.1%"
        growthColor="text-green-500"
        growthNote="from last week"
      />
    </div>
  );
};

export default CardsSection;
