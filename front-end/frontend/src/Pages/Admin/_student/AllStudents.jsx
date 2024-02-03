import React from "react";
import _footer from "./../../../Layouts/Admin/_footer";
import { Link } from "react-router-dom";

const AllStudents = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">Students</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Student</Link>
                  </li>
                  <li className="breadcrumb-item active">All Students</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="student-group-form">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by ID ..."
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name ..."
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Phone ..."
                />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="search-student-btn">
                <button type="btn" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table comman-shadow">
              <div className="card-body">
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Students</h3>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <Link to="#" className="btn btn-outline-gray me-2 active">
                        <i className="feather-list"></i>
                      </Link>
                      <Link
                        to="students-grid.html"
                        className="btn btn-outline-gray me-2"
                      >
                        <i className="feather-grid"></i>
                      </Link>
                      <Link to="#" className="btn btn-outline-primary me-2">
                        <i className="fas fa-download"></i> Download
                      </Link>
                      <Link to="#" className="btn btn-primary">
                        <i className="fas fa-plus"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>
                          <div className="form-check check-tables">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="something"
                            />
                          </div>
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>DOB</th>
                        <th>Parent Name</th>
                        <th>Mobile Number</th>
                        <th>Address</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check check-tables">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="something"
                            />
                          </div>
                        </td>
                        <td>PRE2209</td>
                        <td>
                          <h2 className="table-avatar">
                            <Link
                              to="student-details.html"
                              className="avatar avatar-sm me-2"
                            >
                              <img
                                className="avatar-img rounded-circle"
                                src="/assets/img/profiles/avatar-01.jpg"
                                alt="User Image"
                              />
                            </Link>
                            <Link to="student-details.html">Aaliyah</Link>
                          </h2>
                        </td>
                        <td>10 A</td>
                        <td>2 Feb 2002</td>
                        <td>Jeffrey Wong</td>
                        <td>097 3584 5870</td>
                        <td>911 Deer Ridge Drive,USA</td>
                        <td className="text-end">
                          <div className="actions ">
                            <Link
                              to=""
                              className="btn btn-sm bg-success-light me-2 "
                            >
                              <i className="feather-eye"></i>
                            </Link>
                            <Link
                              to=""
                              className="btn btn-sm bg-danger-light"
                            >
                              <i className="feather-edit"></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default AllStudents;
