import React from "react";
import { Link } from "react-router-dom";

const _sidebar = () => {
  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main Menu</span>
            </li>
            <li className="active">
              <Link to="/student/dashboard">
                <i className="feather-grid"></i> <span> Dashboard</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default _sidebar;
