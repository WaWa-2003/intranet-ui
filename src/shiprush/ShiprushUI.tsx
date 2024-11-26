import { useState } from "react";
import UserCRUD from "./components/User/UserCRUD";
import ToCRUD from "./components/To/ToCRUD";
import FromCRUD from "./components/From/FromCRUD";
import PackageCRUD from "./components/Package/PackageCRUD";  // Import PackageCRUD

function ShipRushUI() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("User");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "User":
                return <UserCRUD />;
            case "To":
                return <ToCRUD />;
            case "From":
                return <FromCRUD />;    
            case "Package":
                return <PackageCRUD />;  // Add PackageCRUD to render
            default:
                return <div>Select a tab from the sidebar</div>;
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`transition-transform duration-300 ${
                    isSidebarOpen ? "w-64" : "w-16"
                } bg-gray-100 border-r border-gray-300`}
            >
                <div className="p-4 flex justify-between items-center">
                    <h3 className="font-bold text-lg">
                        {isSidebarOpen ? "ShipRush" : "SR"}
                    </h3>
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-600 hover:text-black"
                    >
                        {isSidebarOpen ? "<" : ">"}
                    </button>
                </div>
                <ul className="list-none p-0">
                    {["User", "To", "From", "Package"].map((tab) => ( 
                        <li
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`p-4 cursor-pointer ${
                                activeTab === tab
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-200"
                            }`}
                        >
                            {isSidebarOpen ? tab : tab[0]}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4">{renderContent()}</div>
        </div>
    );
}

export default ShipRushUI;
