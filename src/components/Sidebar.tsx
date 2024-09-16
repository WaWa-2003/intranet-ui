import React from 'react';
import { systemData } from "../data/systemData";

interface SidebarProps {
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setCurrentPage }) => {
  const handleClick = (title: string, weblink: string) => {
    if (title === "Ship Rush" || title === "xendb") {
      window.open(weblink, '_blank', 'noopener,noreferrer');
    } else {
      setCurrentPage(title);
    }
  };

  return (
    <aside className="w-64 bg-gray-200 p-4">
      <nav>
        <ul>
          <li
            className="mb-2 cursor-pointer hover:text-blue-800 bg-gray-300"
            onClick={() => setCurrentPage('Home')}
          >
            Home
          </li>
          {
            systemData.map((item, index) => (
              <li
                key={item.id}
                className={`mb-2 cursor-pointer hover:text-blue-800 ${index % 2 === 0 ? '' : 'bg-gray-300'}`}
                onClick={() => handleClick(item.title, item.weblink)}
              >
                {item.title}
              </li>
            ))
          }
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;