import React from 'react';

interface SystemCardProps {
  title: string;
  image: string;
  description: string;
  setCurrentPage: (page: string) => void;
  weblink: string;
  openInNewTab?: boolean;
}

const SystemCard: React.FC<SystemCardProps> = ({ 
  title, 
  image, 
  // description, 
  setCurrentPage, 
  weblink, 
  openInNewTab = false 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (openInNewTab) {
      e.preventDefault();
      window.open(weblink, '_blank', 'noopener,noreferrer');
    } else {
      setCurrentPage(title); 
    }
  };

  return (
    <div 
      className="border p-4 h-60 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      <img src={image} alt={title} className="w-32 h-32 mb-2" />
      <h2 className="text-lg font-semibold mb-2 text-center w-full">{title}</h2>
      {/* <p className="text-sm text-center">{description}</p> */}
    </div>
  );
};

export default SystemCard;