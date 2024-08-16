import React from 'react';

interface PowerAppEmbedProps {
  embedUrl: string;
  title: string;
}

const PowerAppEmbed: React.FC<PowerAppEmbedProps> = ({ embedUrl, title }) => {
  return (
    <div style={{ height: 'calc(100vh - 50px)', width: 'calc(100vw)' }}>
      <iframe 
        src={embedUrl}
        frameBorder="0"
        width="100%"
        height="100%"
        title={title}
        style={{ border: 'none' }}           
      />
    </div>
  );
};

export default PowerAppEmbed;
