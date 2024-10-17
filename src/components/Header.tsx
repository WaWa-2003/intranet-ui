import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";
import { callMsGraph } from "../auth/graph";
import { EventType } from "@azure/msal-browser";

interface HeaderProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
    toggleSidebar: () => void;
  }
  
  interface UserInfo {
    displayName: string;
    jobTitle: string;
    mail: string;
  }
  
const Header = ({ currentPage, setCurrentPage, toggleSidebar }: HeaderProps) => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const handleLoggedIn = async () => {
      if (account) {
        try {
          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: account
          });
          const graphData = await callMsGraph(response.accessToken);
          setUserInfo(graphData);
          localStorage.setItem('userInfo', JSON.stringify(graphData));
        } catch (error) {
          console.error("Error acquiring token:", error);
        }
      }
    };

    handleLoggedIn();

    // Add event listeners for login and logout
    const loginHandler = instance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        handleLoggedIn();
      }
    });

    const logoutHandler = instance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGOUT_SUCCESS) {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
      }
    });

    // Check for existing userInfo in localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    return () => {
      if (loginHandler) {
        instance.removeEventCallback(loginHandler);
      }
      if (logoutHandler) {
        instance.removeEventCallback(logoutHandler);
      }
    };
  }, [instance, account]);

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logout();
  };

  return (
    <header className="flex justify-between items-center p-3 bg-gray-100">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-xl mr-2">
          <FaBars />
        </button>
        <span
          className="cursor-pointer"
          onClick={() => setCurrentPage("Home")}
        >
          <img 
            src="/../images/xenoptics-logo.ico" 
            alt="XenOptics Intranet" 
            className="w-8 h-8" 
          />
        </span>
        <span className="text-xl font-semibold ml-2 truncate">
          {currentPage === "Home" ? "Intranet System" : currentPage}
        </span>
      </div>

      <div className="flex items-center">
        {accounts.length > 0 && userInfo ? (
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <div className="font-semibold">{userInfo.displayName}</div>
              <div className="text-sm text-gray-600">{userInfo.jobTitle}</div>
              <div className="text-sm text-gray-600">{userInfo.mail}</div>
            </div>
            <button onClick={handleLogout} className="bg-red-500 text-white px-2 py-1 rounded">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="bg-blue-500 text-white px-2 py-1 rounded">
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;