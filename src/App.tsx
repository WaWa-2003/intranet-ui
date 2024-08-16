import { useState } from 'react'
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth/authConfig";
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import PowerAppEmbed from './components/PowerappsEmbed/PowerAppEmbed'
import { systemData } from './data/systemData'

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    if (currentPage === 'Home') {
      return <MainContent setCurrentPage={setCurrentPage} />;
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
          setCurrentPage={setCurrentPage} 
          toggleSidebar={toggleSidebar}
        />

        <div className="flex flex-1">
          {isSidebarOpen && <Sidebar setCurrentPage={setCurrentPage} />}
          {renderContent()}
        </div>
      </div>
    </MsalProvider>
  )
}

export default App