import React from "react";
import { NavLink, Link } from "react-router-dom";

const _sidebar = () => {
  return (
    <aside className="sidebar" id="sidebar" style={{ zIndex: 9999 }}>
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main Menu</span>
            </li>
            <li className="active">
              <NavLink to="/admin/dashboard">
                <i className="feather-grid"></i> <span> Dashboard</span>
              </NavLink>
            </li>
            <li className="submenu">
              <NavLink to={"#"}>
                <i className="fas fa-graduation-cap"></i>
                <span> Étudiants</span>
                <span className="menu-arrow"></span>
              </NavLink>
              <ul>
                <li>
                  <NavLink to="/admin/all-students">Tous les étudiants</NavLink>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <NavLink to={"#"}>
                <i className="fa fa-star"></i> <span>Saisir notes</span>
                <span className="menu-arrow" />
              </NavLink>
              <ul style={{ display: "block" }}>
                <li>
                  <NavLink to={"/admin/saisir-marks-excel"}>
                    <span>Saisir Par Fichier Excel</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/admin/saisir-marks-manual"}>
                    <span>Saisir Manuellement</span>
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
