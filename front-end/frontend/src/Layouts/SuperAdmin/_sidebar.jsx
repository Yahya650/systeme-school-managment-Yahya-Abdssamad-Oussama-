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
              <Link to="/super-admin/dashboard">
                <i className="feather-grid"></i> <span> Dashboard</span>
              </Link>
            </li>
            <li className="">
              <Link to={"#"} className="subdrop">
                <i className="fas fa-graduation-cap"></i>
                <span> Administrateurs</span>
                <span className="menu-arrow"></span>
              </Link>
              <ul style={{ display: "block" }}>
                <li>
                  <NavLink to="/super-admin/all-admins">
                    Tous les administrateurs
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="">
              <NavLink to="#" className="subdrop">
                <i className="fas fa-chalkboard-teacher"></i>
                <span> Enseignants</span>
                <span className="menu-arrow"></span>
              </NavLink>
              <ul style={{ display: "block" }}>
                <li>
                  <NavLink to="/super-admin/all-teachers">
                    liste des enseignants
                  </NavLink>
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
