import { FaBars } from "react-icons/fa";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  toggleSidebar: () => void;
}

const Header = ({ currentPage, setCurrentPage, toggleSidebar }: HeaderProps) => {
  const { instance, accounts } = useMsal();

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
          {currentPage}
        </span>
      </div>

      <div className="flex items-center">
        {accounts.length > 0 ? (
          <div>
            <span className="mr-2">{accounts[0].username}</span>
            {/* <span className="mr-2">{accounts[0].displayname}</span> */}
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