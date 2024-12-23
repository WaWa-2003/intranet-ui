import React from "react";
import { systemData } from "../../intranet/data/systemData";

interface SidebarProps {
  setCurrentPage: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const handleClick = (title: string, weblink: string) => {
    if (title === "Ship Rush" || title === "xendb") {
      window.open(weblink, "_blank", "noopener,noreferrer");
    } else {
      setCurrentPage(title);
    }
  };

  return (
    <aside className="w-64 bg-gray-200 p-4">
      <nav>
        <ul>
          <li
            className={`mb-2 flex items-center cursor-pointer hover:text-blue-800 ${
              currentPage === "Home" ? "bg-gray-300" : ""
            }`}
            onClick={() => setCurrentPage("Home")}
          >
            <img
              src="/../images/xenoptics-logo.ico"
              alt="Home"
              className="w-6 h-6 mr-2"
            />
            Home
          </li>
          {systemData.map((item) => (
            <li
              key={item.id}
              className={`mb-2 flex items-center cursor-pointer hover:text-blue-800 ${
                currentPage === item.title ? "bg-blue-50" : ""
              }`}
              onClick={() => handleClick(item.title, item.weblink)}
            >
              <div
                className="w-6 h-6 mr-2 flex items-center justify-center"
                style={{ backgroundColor: "#9dddff", borderRadius: "1px" }}
              >
                <img
                  src={item.image}
                  alt={item.title}                             
                  style={{ filter: 'invert(100%) brightness(1000%)', width: '80%', height: '80%' }}
                />
              </div>

              {item.title}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
