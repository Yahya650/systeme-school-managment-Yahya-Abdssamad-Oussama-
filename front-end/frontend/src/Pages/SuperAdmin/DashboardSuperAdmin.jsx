import React from "react";
import { Link } from "react-router-dom";
import _footer from "../../Layouts/_footer";
import { useContextApi } from "../../config/Context/ContextApi";

const DashboardSuperAdmin = () => {
  const { user } = useContextApi();
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">
                  {new Date().getHours() >= 5 && new Date().getHours() < 18
                    ? "Bonjour "
                    : "Bonsoir "}
                  {user?.last_name + " " + user?.first_name}!
                </h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Accueil</Link>
                  </li>
                  <li className="breadcrumb-item active">Directeur</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">
                <div className="db-widgets d-flex justify-content-between align-items-center">
                  <div className="db-info">
                    <h6>Étudiants</h6>
                    <h3>50055</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      src="/assets/img/icons/dash-icon-01.svg"
                      alt="Icône du tableau de bord"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">
                <div className="db-widgets d-flex justify-content-between align-items-center">
                  <div className="db-info">
                    <h6>Récompenses</h6>
                    <h3>50+</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      src="/assets/img/icons/dash-icon-02.svg"
                      alt="Icône du tableau de bord"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">
                <div className="db-widgets d-flex justify-content-between align-items-center">
                  <div className="db-info">
                    <h6>Département</h6>
                    <h3>30+</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      src="/assets/img/icons/dash-icon-03.svg"
                      alt="Icône du tableau de bord"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">
                <div className="db-widgets d-flex justify-content-between align-items-center">
                  <div className="db-info">
                    <h6>Revenu</h6>
                    <h3>505$</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      src="/assets/img/icons/dash-icon-04.svg"
                      alt="Icône du tableau de bord"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6 d-flex">
            <div className="card flex-fill student-space comman-shadow">
              <div className="card-header d-flex align-items-center">
                <h5 className="card-title">Étudiants Stars</h5>
                <ul className="chart-list-out student-ellips">
                  <li className="star-menus">
                    <Link to="#">
                      <i className="fas fa-ellipsis-v"></i>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table star-student table-hover table-center table-borderless table-striped">
                    <thead className="thead-light">
                      <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th className="text-center">Notes</th>
                        <th className="text-center">Pourcentage</th>
                        <th className="text-end">Année</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-nowrap">
                          <div>PRE2209</div>
                        </td>
                        <td className="text-nowrap">
                          <Link to="#">
                            <img
                              className="rounded-circle"
                              src="/assets/img/profiles/avatar-02.jpg"
                              width="25"
                              alt="Star Students"
                            />
                            John Smith
                          </Link>
                        </td>
                        <td className="text-center">1185</td>
                        <td className="text-center">98%</td>
                        <td className="text-end">
                          <div>2019</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <div>PRE1245</div>
                        </td>
                        <td className="text-nowrap">
                          <Link to="#">
                            <img
                              className="rounded-circle"
                              src="/assets/img/profiles/avatar-01.jpg"
                              width="25"
                              alt="Star Students"
                            />
                            Jolie Hoskins
                          </Link>
                        </td>
                        <td className="text-center">1195</td>
                        <td className="text-center">99.5%</td>
                        <td className="text-end">
                          <div>2018</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <div>PRE1625</div>
                        </td>
                        <td className="text-nowrap">
                          <Link to="#">
                            <img
                              className="rounded-circle"
                              src="/assets/img/profiles/avatar-03.jpg"
                              width="25"
                              alt="Star Students"
                            />
                            Pennington Joy
                          </Link>
                        </td>
                        <td className="text-center">1196</td>
                        <td className="text-center">99.6%</td>
                        <td className="text-end">
                          <div>2017</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <div>PRE2516</div>
                        </td>
                        <td className="text-nowrap">
                          <Link to="#">
                            <img
                              className="rounded-circle"
                              src="/assets/img/profiles/avatar-04.jpg"
                              width="25"
                              alt="Star Students"
                            />
                            Millie Marsden
                          </Link>
                        </td>
                        <td className="text-center">1187</td>
                        <td className="text-center">98.2%</td>
                        <td className="text-end">
                          <div>2016</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-nowrap">
                          <div>PRE2209</div>
                        </td>
                        <td className="text-nowrap">
                          <Link to="#">
                            <img
                              className="rounded-circle"
                              src="/assets/img/profiles/avatar-05.jpg"
                              width="25"
                              alt="Star Students"
                            />
                            John Smith
                          </Link>
                        </td>
                        <td className="text-center">1185</td>
                        <td className="text-center">98%</td>
                        <td className="text-end">
                          <div>2015</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 d-flex">
            <div className="card flex-fill comman-shadow">
              <div className="card-header d-flex align-items-center">
                <h5 className="card-title">Activité des Étudiants</h5>
                <ul className="chart-list-out student-ellips">
                  <li className="star-menus">
                    <Link to="#">
                      <i className="fas fa-ellipsis-v"></i>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="activity-groups">
                  <div className="activity-awards">
                    <div className="award-boxs">
                      <img
                        src="/assets/img/icons/award-icon-01.svg"
                        alt="Award"
                      />
                    </div>
                    <div className="award-list-outs">
                      <h4>1st place in "Chess”</h4>
                      <h5>John Doe won 1st place in "Chess"</h5>
                    </div>
                    <div className="award-time-list">
                      <span>1 Day ago</span>
                    </div>
                  </div>
                  <div className="activity-awards">
                    <div className="award-boxs">
                      <img
                        src="/assets/img/icons/award-icon-02.svg"
                        alt="Award"
                      />
                    </div>
                    <div className="award-list-outs">
                      <h4>Participated in "Carrom"</h4>
                      <h5>Justin Lee participated in "Carrom"</h5>
                    </div>
                    <div className="award-time-list">
                      <span>2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-awards">
                    <div className="award-boxs">
                      <img
                        src="/assets/img/icons/award-icon-03.svg"
                        alt="Award"
                      />
                    </div>
                    <div className="award-list-outs">
                      <h4>Internation conference in "St.John School"</h4>
                      <h5>
                        Justin Leeattended internation conference in "St.John
                        School"
                      </h5>
                    </div>
                    <div className="award-time-list">
                      <span>2 Week ago</span>
                    </div>
                  </div>
                  <div className="activity-awards mb-0">
                    <div className="award-boxs">
                      <img
                        src="/assets/img/icons/award-icon-04.svg"
                        alt="Award"
                      />
                    </div>
                    <div className="award-list-outs">
                      <h4>Won 1st place in "Chess"</h4>
                      <h5>John Doe won 1st place in "Chess"</h5>
                    </div>
                    <div className="award-time-list">
                      <span>3 Day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-md-12 col-lg-6">
            <div className="card card-chart">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-6">
                    <h5 className="card-title">Overview</h5>
                  </div>
                  <div className="col-6">
                    <ul className="chart-list-out">
                      <li>
                        <span className="circle-blue"></span>Teacher
                      </li>
                      <li>
                        <span className="circle-green"></span>Student
                      </li>
                      <li className="star-menus">
                        <Link to="#">
                          <i className="fas fa-ellipsis-v"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div id="apexcharts-area"></div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="card card-chart">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-6">
                    <h5 className="card-title">Number of Students</h5>
                  </div>
                  <div className="col-6">
                    <ul className="chart-list-out">
                      <li>
                        <span className="circle-blue"></span>Girls
                      </li>
                      <li>
                        <span className="circle-green"></span>Boys
                      </li>
                      <li className="star-menus">
                        <Link to="#">
                          <i className="fas fa-ellipsis-v"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div id="bar"></div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="row">
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card flex-fill fb sm-box">
              <div className="social-likes">
                <p>Like us on facebook</p>
                <h6>50,095</h6>
              </div>
              <div className="social-boxs">
                <img
                  src="/assets/img/icons/social-icon-01.svg"
                  alt="Social Icon"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card flex-fill twitter sm-box">
              <div className="social-likes">
                <p>Follow us on twitter</p>
                <h6>48,596</h6>
              </div>
              <div className="social-boxs">
                <img
                  src="/assets/img/icons/social-icon-02.svg"
                  alt="Social Icon"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card flex-fill insta sm-box">
              <div className="social-likes">
                <p>Follow us on instagram</p>
                <h6>52,085</h6>
              </div>
              <div className="social-boxs">
                <img
                  src="/assets/img/icons/social-icon-03.svg"
                  alt="Social Icon"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card flex-fill linkedin sm-box">
              <div className="social-likes">
                <p>Follow us on linkedin</p>
                <h6>69,050</h6>
              </div>
              <div className="social-boxs">
                <img
                  src="/assets/img/icons/social-icon-04.svg"
                  alt="Social Icon"
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <_footer />
    </div>
  );
};

export default DashboardSuperAdmin;
