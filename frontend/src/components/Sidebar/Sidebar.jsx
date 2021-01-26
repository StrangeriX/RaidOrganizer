import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import SidebarData from './SidebarData';
import './Sidebar.css';
import { useIsAuthenticated } from '../../api/AuthenticationProvider';

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const { logout, isAdmin } = useIsAuthenticated();
  return (
    <>
      <div className="nav-item">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
          {isAdmin && (
            <li className="nav-text">
              <a href="http://127.0.0.1:8000/admin/login/?next=/admin/">
                <span>Admin Site</span>
              </a>
            </li>
          )}
          <button
            type="button"
            onClick={logout}
            className="nav-link btn btn-info btn-sm text-light"
          >
            logout
          </button>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
