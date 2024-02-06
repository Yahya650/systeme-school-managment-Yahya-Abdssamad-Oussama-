import React from "react";
import _footer from "../../../Layouts/_footer";
import { Link } from "react-router-dom";

const AllAdmins = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">Étudiants</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Étudiants</Link>
                  </li>
                  <li className="breadcrumb-item active">Tous les étudiants</li>
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
                  placeholder="Rechercher par ID ..."
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher par nom ..."
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher par téléphone ..."
                />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="search-student-btn">
                <button type="btn" className="btn btn-primary">
                  Rechercher
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
                      <h3 className="page-title">Étudiants</h3>
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
                        <i className="fas fa-download"></i> Télécharger
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
                        <th>Nom</th>
                        <th>Classe</th>
                        <th>DOB</th>
                        <th>Nom du Parent</th>
                        <th>Numéro de téléphone</th>
                        <th>Adresse</th>
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
                                alt="Image de l'utilisateur"
                              />
                            </Link>
                            <Link to="student-details.html">Aaliyah</Link>
                          </h2>
                        </td>
                        <td>10 A</td>
                        <td>2 Fév 2002</td>
                        <td>Jeffrey Wong</td>
                        <td>097 3584 5870</td>
                        <td>911 Deer Ridge Drive, USA</td>
                        <td className="text-end">
                          <div className="actions ">
                            <Link
                              to=""
                              className="btn btn-sm bg-success-light me-2 "
                            >
                              <i className="feather-eye"></i>
                            </Link>
                            <Link to="" className="btn btn-sm bg-danger-light">
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

export default AllAdmins;
