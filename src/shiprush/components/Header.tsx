import { useEffect, useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";
import { loginRequest } from "../../auth/authConfig";
import { callMsGraph } from "../../auth/graph";

interface HeaderProps {
    toggleSidebar: () => void;
}

interface UserInfo {
    displayName: string;
    jobTitle: string;
    mail: string;
    id: string;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const handleLoggedIn = async () => {
            if (account) {
                try {
                    const response = await instance.acquireTokenSilent({
                        ...loginRequest,
                        account: account,
                    });
                    const graphData = await callMsGraph(response.accessToken);
                    setUserInfo(graphData);                    

                    localStorage.setItem("userInfo", JSON.stringify(graphData)); 
                    
                } catch (error) {
                    console.error("Error acquiring token:", error);
                }
            }
        };

        handleLoggedIn();

        const loginHandler = instance.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS) {
                handleLoggedIn();
            }
        });

        const logoutHandler = instance.addEventCallback((event) => {
            if (event.eventType === EventType.LOGOUT_SUCCESS) {
                setUserInfo(null);
                localStorage.removeItem("userInfo");
            }
        });

        const storedUserInfo = localStorage.getItem("userInfo");
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
        instance.loginPopup(loginRequest).catch((e) => console.error(e));
    };

    const handleLogout = () => {
        instance.logoutPopup();
    };

    return (
        <header className="bg-gray-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-xl mr-2">
                    ☰
                </button>
                <h1 className="text-lg font-bold">ShipRush</h1>
            </div>
            <div className="flex items-center">
                {accounts.length > 0 && userInfo ? (
                    <div className="flex items-center">
                        <div className="mr-4 text-right">
                            <div className="font-semibold">{userInfo.displayName}</div>
                            <div className="text-sm">{userInfo.jobTitle}</div>
                            <div className="text-sm">{userInfo.mail}</div>
                            {/* <div className="text-sm">id: {userInfo.id}</div> 
                            {userInfo && (
                                <pre className="bg-gray-200 text-black p-4 rounded">
                                    {JSON.stringify(userInfo, null, 2)}
                                </pre>
                            )} */}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="bg-green-600 px-3 py-1 rounded"
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
