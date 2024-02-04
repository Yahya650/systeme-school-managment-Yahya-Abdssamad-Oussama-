import React from "react";
import { Link, NavLink } from "react-router-dom";

const _sidebar = () => {
  return (
    <main className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main Menu</span>
            </li>
            <li className="active">
              <Link to="/admin/dashboard">
                <i className="feather-grid"></i> <span> Dashboard</span>
              </Link>
            </li>
            <li className="submenu">
              <Link to={"#"} className="subdrop">
                <i className="fas fa-graduation-cap"></i>
                <span> Étudiants</span>
                <span className="menu-arrow"></span>
              </Link>
              <ul style={{ display: "block" }}>
                <li>
                  <NavLink to="/admin/all-students">Tous les étudiants</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/show-student">Voir un Étudiant</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/create-student">
                    Ajouter un Étudiant
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/update-student">
                    Modifier un Étudiant
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* <li className="submenu">
              <NavLink to="#">
                <i class="fas fa-chalkboard-teacher"></i>
                <span> Parents</span>
                <span class="menu-arrow"></span>
              </NavLink>
              <ul>
                <li>
                  <NavLink to="#">liste Parente</NavLink>
                </li>
                <li>
                  <NavLink to="#">vue Parente</NavLink>
                </li>
                <li>
                  <NavLink to="#">Ajouter un Parente</NavLink>
                </li>
                <li>
                  <NavLink to="#">Modifier un Parente</NavLink>
                </li>
              </ul>
            </li>
            <li class="submenu">
              <NavLink to="#">
                <i className="fas fa-building"></i> <span> Departments</span>
                <span className="menu-arrow"></span>
              </NavLink>
              <ul>
                <li>
                  <Link to="#">Department List</Link>
                </li>
                <li>
                  <Link to="#">Department Add</Link>
                </li>
                <li>
                  <Link to="#">Department Edit</Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <Link to="#">
                <i className="fas fa-book-reader"></i> <span> Subjects</span>
                <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li>
                  <Link to="#">Subject List</Link>
                </li>
                <li>
                  <Link to="#">Subject Add</Link>
                </li>
                <li>
                  <Link to="#">Subject Edit</Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <Link to="#">
                <i className="fas fa-clipboard"></i> <span> Invoices</span>
                <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li>
                  <Link to="#">Invoices List</Link>
                </li>
                <li>
                  <Link to="#">Invoices Grid</Link>
                </li>
                <li>
                  <Link to="#">Add Invoices</Link>
                </li>
                <li>
                  <Link to="#">Edit Invoices</Link>
                </li>
                <li>
                  <Link to="#">Invoices Details</Link>
                </li>
                <li>
                  <Link to="#">Invoices Settings</Link>
                </li>
              </ul>
            </li>
            <li className="menu-title">
              <span>Management</span>
            </li>
            <li className="submenu">
              <Link to="#">
                <i className="fas fa-file-invoice-dollar"></i>
                <span> Accounts</span> <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li>
                  <Link to="#">Fees Collection</Link>
                </li>
                <li>
                  <Link to="#">Expenses</Link>
                </li>
                <li>
                  #<Link to="#">Salary</Link>
                </li>
                <li>
                  <Link to="#">Add Fees</Link>
                </li>
                <li>
                  <Link to="#">Add Expenses</Link>
                </li>
                <li>
                  <Link to="#">Add Salary</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-holly-berry"></i> <span>Holiday</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-comment-dollar"></i> <span>Fees</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-clipboard-list"></i> <span>Exam list</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-calendar-day"></i> <span>Events</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-table"></i> <span>Time Table</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-book"></i> <span>Library</span>
              </Link>
            </li>
            <li className="submenu">
              <Link to="#">
                <i className="fa fa-newspaper"></i> <span> Blogs</span>
                <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li>
                  <Link to="#">All Blogs</Link>
                </li>
                <li>
                  <Link to="#">Add Blog</Link>
                </li>
                <li>
                  <Link to="#">Edit Blog</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-cog"></i> <span>Settings</span>
              </Link>
            </li>
            <li className="menu-title">
              <span>Pages</span>
            </li>
            <li className="submenu">
              <Link to="#">
                <i className="fas fa-shield-alt"></i>
                <span> Authentication </span>
                <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li>
                  <Link to="#">Login</Link>
                </li>
                <li>
                  <Link to="#">Register</Link>
                </li>
                <li>
                  <Link to="#">Forgot Password</Link>
                </li>
                <li>
                  <Link to="#">Error Page</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-file"></i> <span>Blank Page</span>
              </Link>
            </li>
            <li className="menu-title">
              <span>Others</span>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-baseball-ball"></i> <span>Sports</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-hotel"></i> <span>Hostel</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-bus"></i> <span>Transport</span>
              </Link>
            </li>
            <li className="menu-title">
              <span>UI Interface</span>
            </li>
            <li className="submenu">
              <Link to="#">
                <i className="fab fa-get-pocket"></i> <span>Base UI </span>
                <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li>
                  <Link to="#">Alerts</Link>
                </li>
                <li>
                  <Link to="#">Accordions</Link>
                </li>
                <li>
                  <Link to="#">Avatar</Link>
                </li>
                <li>
                  <Link to="#">Badges</Link>
                </li>
                <li>
                  <Link to="#">Buttons</Link>
                </li>
                <li>
                  <Link to="#">Button Group</Link>
                </li>
                <li>
                  <Link to="#">Breadcrumb</Link>
                </li>
                <li>
                  <Link to="#">Cards</Link>
                </li>
                <li>
                  <Link to="#">Carousel</Link>
                </li>
                <li>
                  <Link to="#">Dropdowns</Link>
                </li>
                <li>
                  <Link to="#">Grid</Link>
                </li>
                <li>
                  <Link to="#">Images</Link>
                </li>
                <li>
                  <Link to="#">Lightbox</Link>
                </li>
                <li>
                  <Link to="#">Media</Link>
                </li>
                <li>
                  <Link to="#">Modals</Link>
                </li>
                <li>
                  <Link to="#">Offcanvas</Link>
                </li>
                <li>
                  <Link to="#">Pagination</Link>
                </li>
                <li>
                  <Link to="#">Popover</Link>
                </li>
                <li>
                  <Link to="#">Progress Bars</Link>
                </li>
                <li>
                  <Link to="#">Placeholders</Link>
                </li>
                <li>
                  <Link to="#">Range Slider</Link>
                </li>
                <li>
                  <Link to="#">Spinner</Link>
                </li>
                <li>
                  <Link to="#">Sweet Alerts</Link>
                </li>
                <li>
                  <Link to="#">Tabs</Link>
                </li>
                <li>
                  <Link to="#">Toasts</Link>
                </li>
                <li>
                  <Link to="#">Tooltip</Link>
                </li>
                <li>
                  <Link to="#">Typography</Link>
                </li>
                <li>
                  <Link to="#">Video</Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <Link to="#">
                <i data-feather="box"></i> <span>Elements </span>
                <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li>
                  <Link to="#">Ribbon</Link>
                </li>
                <li>
                  <Link to="#">Clipboard</Link>
                </li>
                <li>
                  <Link to="#">Drag & Drop</Link>
                </li>
                <li>
                  <Link to="#">Rating</Link>
                </li>
                <li>
                  <Link to="#">Text Editor</Link>
                </li>
                <li>
                  <Link to="#">Counter</Link>
                </li>
                <li>
                  <Link to="#">Scrollbar</Link>
                </li>
                <li>
                  <Link to="#">Notification</Link>
                </li>
                <li>
                  <Link to="#">Sticky Note</Link>
                </li>
                <li>
                  <Link to="#">Timeline</Link>
                </li>
                <li>
                  <Link to="#">Horizontal Timeline</Link>
                </li>
                <li>
                  <Link to="#">Form Wizard</Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <Link to="#">
                <i data-feather="bar-chart-2"></i> <span> Charts </span>
                <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li>
                  <Link to="#">Apex Charts</Link>
                </li>
                <li>
                  <Link to="#">Chart Js</Link>
                </li>
                <li>
                  <Link to="#">Morris Charts</Link>
                </li>
                <li>
                  <Link to="#">Flot Charts</Link>
                </li>
                <li>
                  <Link to="#">Peity Charts</Link>
                </li>
                <li>
                  <Link to="#">C3 Charts</Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <Link to="#">
                <i data-feather="award"></i> <span> Icons </span>
                <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li>
                  <Link to="#">Fontawesome Icons</Link>
                </li>
                <li>
                  <Link to="#">Feather Icons</Link>
                </li>
                <li>
                  <Link to="#">Ionic Icons</Link>
                </li>
                <li>
                  <Link to="#">Material Icons</Link>
                </li>
                <li>
                  <Link to="#">Pe7 Icons</Link>
                </li>
                <li>
                  <Link to="#">Simpleline Icons</Link>
                </li>
                <li>
                  <Link to="#">Themify Icons</Link>
                </li>
                <li>
                  <Link to="#">Weather Icons</Link>
                </li>
                <li>
                  <Link to="#">Typicon Icons</Link>
                </li>
                <li>
                  <Link to="#">Flag Icons</Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <Link to="#">
                <i className="fas fa-columns"></i> <span> Forms </span>
                <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li>
                  <Link to="form-#">Basic Inputs </Link>
                </li>
                <li>
                  <Link to="form-#">Input Groups </Link>
                </li>
                <li>
                  <Link to="#">Horizontal Form </Link>
                </li>
                <li>
                  <Link to="#"> Vertical Form </Link>
                </li>
                <li>
                  <Link to="#"> Form Mask </Link>
                </li>
                <li>
                  <Link to="#"> Form Validation </Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <Link to="#">
                <i className="fas fa-table"></i> <span> Tables </span>
                <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li>
                  <Link to="#">Basic Tables </Link>
                </li>
                <li>
                  <Link to="#">Data Table </Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <Link to="#">
                <i className="fas fa-code"></i> <span>Multi Level</span>
                <span className="menu-arrow"></span>
              </Link>
              <ul>
                <li className="submenu">
                  <Link to="#">
                    <span>Level 1</span> <span className="menu-arrow"></span>
                  </Link>
                  <ul>
                    <li>
                      <Link to="#">
                        <span>Level 2</span>
                      </Link>
                    </li>
                    <li className="submenu">
                      <Link to="#">
                        <span> Level 2</span>
                        <span className="menu-arrow"></span>
                      </Link>
                      <ul>
                        <li>
                          <Link to="#">Level 3</Link>
                        </li>
                        <li>
                          <Link to="#">Level 3</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="#">
                        <span>Level 2</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="#">
                    <span>Level 1</span>
                  </Link>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default _sidebar;
