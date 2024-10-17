import React, { useEffect, useRef } from 'react';

interface PowerAppEmbedProps {
  embedUrl: string;
  title: string;
}

const PowerAppEmbed: React.FC<PowerAppEmbedProps> = ({ embedUrl, title }) => {

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.src = embedUrl;
    }
  }, [embedUrl]);

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        title={title}
        className="w-full h-full border-none"
        allow="geolocation; microphone; camera"
      />
    </div>
  );

  // return (
  //   <div style={{ height: 'calc(100vh - 50px)', width: 'calc(100vw)' }}>
  //     <iframe 
  //       src={embedUrl}
  //       frameBorder="0"
  //       width="100%"
  //       height="100%"
  //       title={title}
  //       style={{ border: 'none' }}           
  //     />
  //   </div>
  // );
};

export default PowerAppEmbed;
