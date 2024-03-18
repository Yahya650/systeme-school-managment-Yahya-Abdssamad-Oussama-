import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _footer from "../../Layouts/_footer";
import { useContextApi } from "../../config/Context/ContextApi";
import { AxiosClient } from "../../config/Api/AxiosClient";
import LoadingCircleContext from "../../Components/LoadingCircleContext";

const DashboardAdmin = () => {
  const { user, calculateAge } = useContextApi();
  const [lastMarks, setLastMarks] = useState(null);
  const [lastMarksLoading, setLastMarksLoading] = useState(true);
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const { data } = await AxiosClient.get("/admin/etudiants/last-marks");
        setLastMarks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLastMarksLoading(false);
      }
    };
    fetchMarks();
  }, []);
  return (
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
                <li className="breadcrumb-item active">Administrateur</li>
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
                  <h6>CIN</h6>
                  <h3>{user?.cin}</h3>
                </div>
                <div className="db-icon">
                  <img
                    width={54}
                    src="/assets/img/icons/5808095.webp"
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
                  <h6>L'age</h6>
                  <h3>{calculateAge(user.date_of_birth)}</h3>
                </div>
                <div className="db-icon">
                  <img
                    width={65}
                    src="/assets/img/icons/birthday-cake-3d-rendering-icon-illustration-free-png.webp"
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
        <div className="col-xl-12 d-flex">
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
            {!lastMarksLoading ? (
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table star-student table-hover table-center table-borderless table-striped">
                    <thead className="thead-light">
                      <tr>
                        <th>Code Massar</th>
                        <th>Matiére</th>
                        <th className="text-center">Les Etudentes</th>
                        <th className="text-center">Notes</th>
                        <th className="text-end">Année</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lastMarks?.map((mark, i) => (
                        <tr key={i}>
                          <td>{mark.student.code_massar}</td>
                          <td className="text-nowrap">
                            <div>{mark.exam.course.name}</div>
                          </td>
                          <td className="text-nowrap text-center">
                            <Link to="#">
                              <img
                                className="rounded-circle"
                                src={
                                  mark.student.profile_picture
                                    ? BACKEND_URL +
                                      "/storage/" +
                                      mark.student.profile_picture
                                    : mark.student.gender == "male"
                                    ? "/assets/img/default-profile-picture-grey-male-icon.png"
                                    : "/assets/img/default-profile-picture-grey-female-icon.png"
                                }
                                width="25"
                                alt="Star Students"
                              />
                              {mark.student.first_name} {mark.student.last_name}
                            </Link>
                          </td>
                          <td className="text-center">
                            {mark.note >
                            mark?.student.classe.classe_type.school_level
                              .passing_mark ? (
                              <span className=" text-end text-success">
                                <b>{mark.note}</b>
                              </span>
                            ) : mark.note <
                              mark?.student.classe.classe_type.school_level
                                .passing_mark ? (
                              <span className="text-end text-danger">
                                <b>{mark.note}</b>
                              </span>
                            ) : (
                              <span className="text-end text-warning">
                                <b>{mark.note}</b>
                              </span>
                            )}
                          </td>
                          <td className="text-end">
                            <div>2019</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="w-100 d-flex justify-content-center align-items-center my-5 py-5">
                <LoadingCircleContext />
              </div>
            )}
          </div>
        </div>
        {/* <div className="col-xl-6 d-flex">
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
        </div> */}
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
  );
};

export default DashboardAdmin;
