import React from "react";
import { Link, NavLink } from "react-router-dom";

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
            <li className="submenu">
              <NavLink to="#" className="subdrop">
                <i className="fa fa-star"></i>
                <span> Notes</span>
                <span className="menu-arrow"></span>
              </NavLink>
              <ul style={{ display: "block" }}>
                <li>
                  <NavLink to="/student/marks">Voir mes notes</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default _sidebar;
