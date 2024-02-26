import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import _footer from "../../Layouts/_footer";
import { useContextApi } from "../../config/Context/ContextApi";

const DashboardTeacher = () => {
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
                    <Link to="index.html">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Teacher</li>
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
                    <h6>Total Classes</h6>
                    <h3>04/06</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      src="/assets/img/icons/teacher-icon-01.svg"
                      alt="Dashboard Icon"
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
                    <h6>Total Students</h6>
                    <h3>40/60</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      src="/assets/img/icons/dash-icon-01.svg"
                      alt="Dashboard Icon"
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
                    <h6>Total Lessons</h6>
                    <h3>30/50</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      src="/assets/img/icons/teacher-icon-02.svg"
                      alt="Dashboard Icon"
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
                    <h6>Total Hours</h6>
                    <h3>15/20</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      src="/assets/img/icons/teacher-icon-03.svg"
                      alt="Dashboard Icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-12 col-xl-8">
            <div className="row">
              <div className="col-12 col-lg-8 col-xl-8 d-flex">
                <div className="card flex-fill comman-shadow">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <h5 className="card-title">Upcoming Lesson</h5>
                      </div>
                      <div className="col-6">
                        <span className="float-end view-link">
                          <Link to="#">View All Courses</Link>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 pb-3">
                    <div className="table-responsive lesson">
                      <table className="table table-center">
                        <tbody>
                          <tr>
                            <td>
                              <div className="date">
                                <b>Lessons 30</b>
                                <p>3.1 Ipsuum dolor</p>
                                <ul className="teacher-date-list">
                                  <li>
                                    <i className="fas fa-calendar-alt me-2" />
                                    Sep 5, 2022
                                  </li>
                                  <li>|</li>
                                  <li>
                                    <i className="fas fa-clock me-2" />
                                    09:00 - 10:00 am
                                  </li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <div className="lesson-confirm">
                                <Link to="#">Confirmed</Link>
                              </div>
                              <button type="submit" className="btn btn-info">
                                Reschedule
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="date">
                                <b>Lessons 30</b>
                                <p>3.1 Ipsuum dolor</p>
                                <ul className="teacher-date-list">
                                  <li>
                                    <i className="fas fa-calendar-alt me-2" />
                                    Sep 5, 2022
                                  </li>
                                  <li>|</li>
                                  <li>
                                    <i className="fas fa-clock me-2" />
                                    09:00 - 10:00 am
                                  </li>
                                </ul>
                              </div>
                            </td>
                            <td>
                              <div className="lesson-confirm">
                                <Link to="#">Confirmed</Link>
                              </div>
                              <button type="submit" className="btn btn-info">
                                Reschedule
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 col-xl-4 d-flex">
                <div className="card flex-fill comman-shadow">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-12">
                        <h5 className="card-title">Semester Progress</h5>
                      </div>
                    </div>
                  </div>
                  <div className="dash-widget">
                    <div className="circle-bar circle-bar1">
                      <div className="circle-graph1" data-percent={50}>
                        <div className="progress-less">
                          <b>55/60</b>
                          <p>Lesson Progressed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-12 col-xl-12 d-flex">
                <div className="card flex-fill comman-shadow">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <h5 className="card-title">Teaching Activity</h5>
                      </div>
                      <div className="col-6">
                        <ul className="chart-list-out">
                          <li>
                            <span className="circle-blue" />
                            Teacher
                          </li>
                          <li>
                            <span className="circle-green" />
                            Students
                          </li>
                          <li className="star-menus">
                            <Link to="">
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="school-area" />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-12 col-xl-12 d-flex">
                <div className="card flex-fill comman-shadow">
                  <div className="card-header d-flex align-items-center">
                    <h5 className="card-title">Teaching History</h5>
                    <ul className="chart-list-out student-ellips">
                      <li className="star-menus">
                        <Link to="">
                          <i className="fas fa-ellipsis-v" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="teaching-card">
                      <ul className="steps-history">
                        <li>Sep22</li>
                        <li>Sep23</li>
                        <li>Sep24</li>
                      </ul>
                      <ul className="activity-feed">
                        <li className="feed-item d-flex align-items-center">
                          <div className="dolor-activity">
                            <span className="feed-text1">
                              <Link>Mathematics</Link>
                            </span>
                            <ul className="teacher-date-list">
                              <li>
                                <i className="fas fa-calendar-alt me-2" />
                                September 5, 2022
                              </li>
                              <li>|</li>
                              <li>
                                <i className="fas fa-clock me-2" />
                                09:00 am - 10:00 am (60 Minutes)
                              </li>
                            </ul>
                          </div>
                          <div className="activity-btns ms-auto">
                            <button type="submit" className="btn btn-info">
                              In Progress
                            </button>
                          </div>
                        </li>
                        <li className="feed-item d-flex align-items-center">
                          <div className="dolor-activity">
                            <span className="feed-text1">
                              <Link>Geography </Link>
                            </span>
                            <ul className="teacher-date-list">
                              <li>
                                <i className="fas fa-calendar-alt me-2" />
                                September 5, 2022
                              </li>
                              <li>|</li>
                              <li>
                                <i className="fas fa-clock me-2" />
                                09:00 am - 10:00 am (60 Minutes)
                              </li>
                            </ul>
                          </div>
                          <div className="activity-btns ms-auto">
                            <button type="submit" className="btn btn-info">
                              Completed
                            </button>
                          </div>
                        </li>
                        <li className="feed-item d-flex align-items-center">
                          <div className="dolor-activity">
                            <span className="feed-text1">
                              <Link>Botony</Link>
                            </span>
                            <ul className="teacher-date-list">
                              <li>
                                <i className="fas fa-calendar-alt me-2" />
                                September 5, 2022
                              </li>
                              <li>|</li>
                              <li>
                                <i className="fas fa-clock me-2" />
                                09:00 am - 10:00 am (60 Minutes)
                              </li>
                            </ul>
                          </div>
                          <div className="activity-btns ms-auto">
                            <button type="submit" className="btn btn-info">
                              In Progress
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-12 col-xl-4 d-flex">
            <div className="card flex-fill comman-shadow">
              <div className="card-body">
                <div id="calendar-doctor" className="calendar-container" />
                <div className="calendar-info calendar-info1">
                  <div className="up-come-header">
                    <h2>Upcoming Events</h2>
                    <span>
                      <Link to="">
                        <i className="feather-plus" />
                      </Link>
                    </span>
                  </div>
                  <div className="upcome-event-date">
                    <h3>10 Jan</h3>
                    <span>
                      <i className="fas fa-ellipsis-h" />
                    </span>
                  </div>
                  <div className="calendar-details">
                    <p>08:00 am</p>
                    <div className="calendar-box normal-bg">
                      <div className="calandar-event-name">
                        <h4>Botony</h4>
                        <h5>Lorem ipsum sit amet</h5>
                      </div>
                      <span>08:00 - 09:00 am</span>
                    </div>
                  </div>
                  <div className="calendar-details">
                    <p>09:00 am</p>
                    <div className="calendar-box normal-bg">
                      <div className="calandar-event-name">
                        <h4>Botony</h4>
                        <h5>Lorem ipsum sit amet</h5>
                      </div>
                      <span>09:00 - 10:00 am</span>
                    </div>
                  </div>
                  <div className="calendar-details">
                    <p>10:00 am</p>
                    <div className="calendar-box normal-bg">
                      <div className="calandar-event-name">
                        <h4>Botony</h4>
                        <h5>Lorem ipsum sit amet</h5>
                      </div>
                      <span>10:00 - 11:00 am</span>
                    </div>
                  </div>
                  <div className="upcome-event-date">
                    <h3>10 Jan</h3>
                    <span>
                      <i className="fas fa-ellipsis-h" />
                    </span>
                  </div>
                  <div className="calendar-details">
                    <p>08:00 am</p>
                    <div className="calendar-box normal-bg">
                      <div className="calandar-event-name">
                        <h4>English</h4>
                        <h5>Lorem ipsum sit amet</h5>
                      </div>
                      <span>08:00 - 09:00 am</span>
                    </div>
                  </div>
                  <div className="calendar-details">
                    <p>09:00 am</p>
                    <div className="calendar-box normal-bg">
                      <div className="calandar-event-name">
                        <h4>Mathematics </h4>
                        <h5>Lorem ipsum sit amet</h5>
                      </div>
                      <span>09:00 - 10:00 am</span>
                    </div>
                  </div>
                  <div className="calendar-details">
                    <p>10:00 am</p>
                    <div className="calendar-box normal-bg">
                      <div className="calandar-event-name">
                        <h4>History</h4>
                        <h5>Lorem ipsum sit amet</h5>
                      </div>
                      <span>10:00 - 11:00 am</span>
                    </div>
                  </div>
                  <div className="calendar-details">
                    <p>11:00 am</p>
                    <div className="calendar-box break-bg">
                      <div className="calandar-event-name">
                        <h4>Break</h4>
                        <h5>Lorem ipsum sit amet</h5>
                      </div>
                      <span>11:00 - 12:00 am</span>
                    </div>
                  </div>
                  <div className="calendar-details">
                    <p>11:30 am</p>
                    <div className="calendar-box normal-bg">
                      <div className="calandar-event-name">
                        <h4>History</h4>
                        <h5>Lorem ipsum sit amet</h5>
                      </div>
                      <span>11:30 - 12:00 am</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <_footer />
    </div>
  );
};

export default DashboardTeacher;
