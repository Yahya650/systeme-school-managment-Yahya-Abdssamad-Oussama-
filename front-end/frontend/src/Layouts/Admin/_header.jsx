import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContextApi } from "../../config/Context/ContextApi";
import LoadingCircle from "../../Components/LoadingCircle";

const _header = () => {
  const { logout, setLoadingContaxt, user } = useContextApi();
  // const [loading, setLoading] = useState(false);

  return (
    <header className="header" style={{ zIndex: 9999 }}>
      <div className="header-left">
        <Link to="/admin/dashboard" className="logo">
          <img
            src="/assets/img/gsb-logo.png"
            style={{ maxHeight: "55px" }}
            className="ms-lg-5"
            alt="Logo"
          />
        </Link>
        <Link to="#" className="logo logo-small">
          <img
            src="/assets/img/gsb-logo-small.png"
            alt="Logo"
            width="30"
            height="30"
          />
        </Link>
      </div>
      <div className="menu-toggle">
        <Link to="#" id="toggle_btn">
          <i className="fas fa-bars"></i>
        </Link>
      </div>

      <div className="top-nav-search">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Search here"
          />
          <button className="btn" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <Link to="#" className="mobile_btn" id="mobile_btn">
        <i className="fas fa-bars"></i>
      </Link>

      <ul className="nav user-menu">
        <li className="nav-item dropdown noti-dropdown me-2">
          <Link
            to="#"
            className="dropdown-toggle nav-link header-nav-list"
            data-bs-toggle="dropdown"
          >
            <img src="/assets/img/icons/header-icon-05.svg" alt="" />
          </Link>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <Link to="#" className="clear-noti">
                Clear All
              </Link>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                <li className="notification-message">
                  <Link to="#">
                    <div className="media d-flex">
                      <span className="avatar avatar-sm flex-shrink-0">
                        <img
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src="/assets/img/profiles/avatar-02.jpg"
                        />
                      </span>
                      <div className="media-body flex-grow-1">
                        <p className="noti-details">
                          <span className="noti-title">Carlson Tech</span> has
                          approved
                          <span className="noti-title">your estimate</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">4 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="notification-message">
                  <Link to="#">
                    <div className="media d-flex">
                      <span className="avatar avatar-sm flex-shrink-0">
                        <img
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src="/assets/img/profiles/avatar-11.jpg"
                        />
                      </span>
                      <div className="media-body flex-grow-1">
                        <p className="noti-details">
                          <span className="noti-title">
                            International Software Inc
                          </span>
                          has sent you a invoice in the amount of
                          <span className="noti-title">$218</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">6 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="notification-message">
                  <Link to="#">
                    <div className="media d-flex">
                      <span className="avatar avatar-sm flex-shrink-0">
                        <img
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src="/assets/img/profiles/avatar-17.jpg"
                        />
                      </span>
                      <div className="media-body flex-grow-1">
                        <p className="noti-details">
                          <span className="noti-title">John Hendry</span> sent a
                          cancellation request
                          <span className="noti-title">Apple iPhone XR</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">8 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="notification-message">
                  <Link to="#">
                    <div className="media d-flex">
                      <span className="avatar avatar-sm flex-shrink-0">
                        <img
                          className="avatar-img rounded-circle"
                          alt="User Image"
                          src="/assets/img/profiles/avatar-13.jpg"
                        />
                      </span>
                      <div className="media-body flex-grow-1">
                        <p className="noti-details">
                          <span className="noti-title">
                            Mercury Software Inc
                          </span>
                          added a new product
                          <span className="noti-title">Apple MacBook Pro</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">12 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <Link to="#">View all Notifications</Link>
            </div>
          </div>
        </li>

        <li onClick={toggleFullscreen} className="zoom-screen nav-item me-2">
          <Link to="#" className="nav-link header-nav-list win-maximize">
            <img src="/assets/img/icons/header-icon-04.svg" />
          </Link>
        </li>

        <li className="nav-item dropdown has-arrow new-user-menus">
          <Link
            to="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <span className="user-img">
              <img
                className="rounded-circle"
                src="/assets/img/profiles/avatar-01.jpg"
                width="31"
                alt="Soeng Souy"
              />
              <div className="user-text">
                <h6>{user?.last_name + " " + user?.first_name}</h6>
                <p className="text-muted mb-0">Administrator</p>
              </div>
            </span>
          </Link>
          <div className="dropdown-menu">
            <div className="user-header">
              <div className="avatar avatar-sm">
                <img
                  src="/assets/img/profiles/avatar-01.jpg"
                  alt="User Image"
                  className="avatar-img rounded-circle"
                />
              </div>
              <div className="user-text">
                <h6>{user?.last_name + " " + user?.first_name}</h6>
                <p className="text-muted mb-0">Administrator</p>
              </div>
            </div>
            <Link className="dropdown-item" to="#">
              My Profile
            </Link>
            <button
              className="dropdown-item"
              onClick={async () => {
                setLoadingContaxt(true);
                await logout("admin");
                setLoadingContaxt(false);
              }}
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default _header;
