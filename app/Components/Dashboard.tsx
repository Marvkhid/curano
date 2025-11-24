import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CardsSection from './cards/CardsSection';
import Chart from './chart/Chart';

const Dashboard = () => {
  return (
    <div>
      <div className="bg-white rounded-lg  pb-4 px-4 py-3 flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-800 flex-shrink-0">Dashboard</h1>
        <div className="flex items-center gap-6 ml-80 flex-grow">
          {/* Ask AI */}
          <Link href="/ask-ai" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
            <Image src="/ask-ai.png" alt="Ask AI" width={80} height={80} />
          </Link>

          <Link href="/add" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
            <Image src="/add.png" alt="Add" width={20} height={20} />
            <span className="text-gray-400 text-sm whitespace-nowrap">Add</span>
          </Link>

          <Link
            href="/remarks-history"
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <Image src="/remark.png" alt="Remarks & History" width={20} height={20} />
            <span className="text-gray-400 text-sm whitespace-nowrap">Remarks & History</span>
          </Link>

          <Link href="/ecm" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
            <Image src="/ECM.png" alt="ECM" width={20} height={20} />
            <span className="text-gray-400 text-sm whitespace-nowrap">ECM</span>
          </Link>

          <Link
            href="/assign-cases"
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <Image src="/assign.png" alt="Assign Cases" width={20} height={20} />
            <span className="text-gray-400 text-sm whitespace-nowrap">Assign Cases</span>
          </Link>

          <Link
            href="/request-log"
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <Image src="/request.png" alt="Request Log" width={20} height={20} />
            <span className="text-gray-400 text-sm whitespace-nowrap">Request Log</span>
          </Link>
        </div>
      </div>
      <div className="w-full">
        <CardsSection />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
