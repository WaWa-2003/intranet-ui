import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  toggleSidebar: () => void;
}

const Header = ({
  currentPage,
  setCurrentPage,
  toggleSidebar,
}: HeaderProps) => {
  const { instance, accounts } = useMsal();
  const [userInfo, setUserInfo] = useState<any>(null);

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logout();
  };

  useEffect(() => {
    if (accounts.length > 0) {
      getUserInfo();
    }
  }, [accounts]);

  const getUserInfo = async () => {
    const accessTokenRequest = {
      scopes: ["User.Read"],
      account: accounts[0],
    };

    try {
      const accessTokenResponse = await instance.acquireTokenSilent(
        accessTokenRequest
      );
      const accessToken = accessTokenResponse.accessToken;
      const response = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      }
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        instance
          .acquireTokenPopup(accessTokenRequest)
          .then((tokenResponse) => {
            // Handle the received token
          })
          .catch((error) => console.log(error));
      }
      console.error(error);
    }
  };

  return (
    <header className="flex justify-between items-center p-3 bg-gray-100">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-xl mr-2">
          <FaBars />
        </button>
        <span className="cursor-pointer" onClick={() => setCurrentPage("Home")}>
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
        {accounts.length > 0 && userInfo ? (
          <div>
            <span className="mr-2">{userInfo.displayName}</span>
            <span className="mr-2">{userInfo.mail}</span>
            {/* <span className="mr-2">{userInfo.jobTitle}</span> */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
