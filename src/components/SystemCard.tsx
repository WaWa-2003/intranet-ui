import React from 'react';

interface SystemCardProps {
  title: string;
  image: string;
  description: string;
  setCurrentPage: (page: string) => void;
} 

const SystemCard: React.FC<SystemCardProps> = ({ title, image, description, setCurrentPage }) => {
  return (
    <div 
      className="border p-4 h-60 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
      onClick={() => setCurrentPage(title)}
    >
      <img src={image} alt={title} className="w-32 h-32 mb-2" />
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-center">{description}</p>
    </div>
  )
}

export default SystemCard;