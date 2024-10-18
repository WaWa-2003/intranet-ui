import React from 'react';

interface SystemCardProps {
  title: string;
  image: string;
  description: string;
  setCurrentPage: (page: string) => void;
  weblink: string;
  openInNewTab?: boolean;
  svgColor?: string;
  bgColor?: string;
}

const SystemCard: React.FC<SystemCardProps> = ({
  title,
  image,
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
      <div 
        className="w-32 h-32 mb-2 flex items-center justify-center" 
        style={{ backgroundColor: '#9dddff', borderRadius: '8px' }} // Set background color for the container.
      >
        <img
          src={image}
          alt={title}
          style={{ 
            filter: 'invert(100%) brightness(1000%)',
            width: '80%', 
            height: '80%',
          }}
        />
      </div>
      <h2 className="text-lg font-semibold mb-2 text-center w-full">{title}</h2>
    </div>
  );
};

export default SystemCard;
