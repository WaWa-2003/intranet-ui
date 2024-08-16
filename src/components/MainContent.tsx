import React from "react";
import SystemCard from './SystemCard';
import { systemData } from "../data/systemData";

interface MainContentProps {
  setCurrentPage: (page: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ setCurrentPage }) => {
  return (
    <main className="flex-1 p-4">
      <h1 className="text-2xl mb-4">Intranet Systems</h1>
      <div className="grid grid-cols-3 gap-4">
        {systemData.map((system) => (
          <SystemCard
            key={system.id}
            title={system.title}
            image={system.image}
            description={system.description}
            setCurrentPage={setCurrentPage}
          />
        ))} 
      </div>
    </main>
  );
};

export default MainContent;