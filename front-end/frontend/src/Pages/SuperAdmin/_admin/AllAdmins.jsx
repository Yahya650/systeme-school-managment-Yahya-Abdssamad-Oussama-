import React, { useEffect, useState } from "react";
import _footer from "../../../Layouts/_footer";
import { Link, json, useParams } from "react-router-dom";
import { useCrudAdmins } from "../../../Functions/CRUD_Admins";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import { AxiosClient } from "../../../Api/AxiosClient";
import { useContextApi } from "../../../Context/ContextApi";
import cryptID from "./../../../security/cryptID";
import dcryptID from "./../../../security/dcryptID";

const AllAdmins = () => {
  const [loading, setLoading] = useState(true);
  const { admins } = useContextApi();
  const { getAdmins } = useCrudAdmins();

  const fetchData = async () => {
    await getAdmins();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  {!loading ? (
                    admins.length > 0 ? (
                      <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                        <thead className="student-thread">
                          <tr>
                            <th>CIN</th>
                            <th>Profile</th>
                            <th>Nom et Prenom</th>
                            <th>Gender</th>
                            <th>date de dernière connexion</th>
                            <th>Telephone</th>
                            <th>date de naissance</th>
                            <th className="text-end">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {admins.map((admin, index) => (
                            <tr key={index}>
                              <td>{admin.cin}</td>
                              <td>
                                <h2 className="table-avatar">
                                  <Link
                                    to="#"
                                    className="avatar avatar-sm me-2"
                                  >
                                    <img
                                      className="avatar-img rounded-circle"
                                      src={
                                        admin.profile
                                          ? admin.profile
                                          : admin.gender === "female"
                                          ? "/assets/img/default-profile-picture-grey-female-icon.png"
                                          : "/assets/img/default-profile-picture-grey-male-icon.png"
                                      }
                                      alt="Image de l'utilisateur"
                                    />
                                  </Link>
                                </h2>
                              </td>
                              <td>
                                {admin.last_name + " " + admin.first_name}
                              </td>
                              <td>{admin.gender}</td>
                              <td>
                                {admin.last_login_date
                                  ? admin.last_login_date
                                  : "Pas de connexion"}
                              </td>
                              <td>{admin.phone_number}</td>
                              <td>{admin.date_of_birth}</td>
                              <td className="text-end">
                                <div className="actions ">
                                  <Link
                                    to={
                                      "/super-admin/show-admin/" +
                                      cryptID(admin.id)
                                    }
                                    className="btn btn-sm bg-success-light me-2 "
                                  >
                                    <i className="feather-eye"></i>
                                  </Link>
                                  <Link
                                    to={
                                      "/super-admin/update-admin/" +
                                      cryptID(admin.id)
                                    }
                                    className="btn btn-sm bg-danger-light"
                                  >
                                    <i className="feather-edit"></i>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="alert alert-danger" role="alert">
                        A simple danger alert—check it out!
                      </div>
                    )
                  ) : (
                    <div className="w-100 d-flex justify-content-center align-items-center my-5">
                      <LoadingCircleContext />
                    </div>
                  )}
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
