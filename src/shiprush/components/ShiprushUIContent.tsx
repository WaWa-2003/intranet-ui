import { useState } from "react";
import UserCRUD from "./User/UserCRUD";
import ToCRUD from "./To/ToCRUD";
import FromCRUD from "./From/FromCRUD";
import PackageCRUD from "./Package/PackageCRUD";
import RequestCRUD from "../business_steps/Requestor/RequestCRUD";

function ShipRushUIContent() {
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
        return <PackageCRUD />;
      case "Request":
        return <RequestCRUD />;
      default:
        return <div>Select a tab from the sidebar</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`transition-transform duration-300 ${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-gray-100 border-r border-gray-300`}
        >
          <ul className="list-none p-0 flex flex-col">
            {/* Toggle Button */}
            <li className="p-4 cursor-pointer hover:bg-gray-200">
              <button onClick={toggleSidebar} className="text-xl">
                ☰
              </button>
            </li>
            {/* Sidebar Items */}
            {["User", "To", "From", "Package", "Request"].map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`p-4 cursor-pointer ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {isSidebarOpen ? tab : tab[0]} {/* Show full name or just the first letter */}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4">{renderContent()}</div>
      </div>
    </div>
  );
}

export default ShipRushUIContent;
