import { useState, useEffect } from 'react'
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from '../auth/authConfig';
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import PowerAppEmbed from './components/PowerappsEmbed/PowerAppEmbed'
import { systemData } from './data/systemData'

const msalInstance = new PublicClientApplication(msalConfig);

function IntranetUI() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('page') || localStorage.getItem('currentPage') || 'Home';
  });
  
  const updateCurrentPage = (page: string) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page);
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url);
  };

  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const page = urlParams.get('page') || 'Home';
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    if (currentPage === 'Home') {
      return <MainContent setCurrentPage={updateCurrentPage} />;
    }

    const system = systemData.find(sys => sys.title === currentPage);
    if (system && system.status) {
      return <PowerAppEmbed embedUrl={system.weblink} title={system.title} />;
    }

    return <div className='p-3 font-bold'>System not implemented yet</div>;
  }

  return (
    <MsalProvider instance={msalInstance}>
      <div className="flex flex-col h-screen">
        <Header 
          currentPage={currentPage} 
          setCurrentPage={updateCurrentPage} 
          toggleSidebar={toggleSidebar}
        />

        <div className="flex flex-1">
          {isSidebarOpen && <Sidebar setCurrentPage={updateCurrentPage} currentPage={currentPage} />}
          {renderContent()}
        </div>
      </div>
    </MsalProvider>
  )
}

export default IntranetUI