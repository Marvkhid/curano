import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CardsSection from './cards/CardsSection';
import Chart from './chart/Chart';

const Dashboard = () => {
  return (
    <div>
      <div className="bg-white rounded-lg px-3 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        {/* Title */}
        <h1 className="text-base sm:text-lg font-semibold text-gray-800">
          Dashboard
        </h1>

        {/* Actions */}
        <div className="
          flex 
          flex-wrap 
          items-center 
          gap-3 sm:gap-5 
          w-full sm:w-auto
        ">
          
          <Link href="/ask-ai" className="flex items-center gap-2">
            <Image src="/ask-ai.png" alt="Ask AI" width={60} height={60} className="sm:w-[80px] sm:h-[80px]" />
          </Link>

          <Link href="/add" className="flex items-center gap-1 sm:gap-2">
            <Image src="/add.png" alt="Add" width={18} height={18} />
            <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">Add</span>
          </Link>

          <Link href="/remarks-history" className="flex items-center gap-1 sm:gap-2">
            <Image src="/remark.png" alt="Remarks & History" width={18} height={18} />
            <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
              Remarks & History
            </span>
          </Link>

          <Link href="/ecm" className="flex items-center gap-1 sm:gap-2">
            <Image src="/ECM.png" alt="ECM" width={18} height={18} />
            <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">ECM</span>
          </Link>

          <Link href="/assign-cases" className="flex items-center gap-1 sm:gap-2">
            <Image src="/assign.png" alt="Assign Cases" width={18} height={18} />
            <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
              Assign Cases
            </span>
          </Link>

          <Link href="/request-log" className="flex items-center gap-1 sm:gap-2">
            <Image src="/request.png" alt="Request Log" width={18} height={18} />
            <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
              Request Log
            </span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="w-full mt-4 space-y-4">
        <CardsSection />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;