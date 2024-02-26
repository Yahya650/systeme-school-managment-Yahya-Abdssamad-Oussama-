import React, { useEffect, useState } from "react";
import _footer from "../../../Layouts/_footer";
import { Link } from "react-router-dom";
import { useAdminContext } from "../../../Functions/AdminContext";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import { useContextApi } from "../../../config/Context/ContextApi";
import cryptID from "./../../../config/security/cryptID";
import dcryptID from "./../../../config/security/dcryptID";
import ReactPaginate from "react-paginate";
import { BACKEND_URL } from "../../../config/Api/AxiosClient";

const AllAdmins = () => {
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { admins, pageCount, handlePageClick } = useContextApi();
  const { getAdmins, removeAdmin } = useAdminContext();

  const fetchData = async (val_currentPage) => {
    await getAdmins(val_currentPage);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    await removeAdmin(dcryptID(id));
    setLoadingDelete(false);
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
                <h3 className="page-title">Administrateurs</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Administrateurs</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Tous les administrateurs
                  </li>
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
                  placeholder="Rechercher par CIN ..."
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher par nom et prenom ..."
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
                      <h3 className="page-title">Tous les administrateurs</h3>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <Link to="#" className="btn btn-outline-primary me-2">
                        <i className="fas fa-download"></i> Télécharger
                      </Link>
                      <Link
                        to="/super-admin/create-admin"
                        className="btn btn-primary"
                      >
                        <i className="fas fa-plus"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  {!loading ? (
                    admins.length > 0 ? (
                      <>
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
                              <th className="text-center">Action</th>
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
                                          admin.profile_picture
                                            ? BACKEND_URL +
                                              "/storage/" +
                                              admin.profile_picture
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
                                    <button
                                      onClick={() =>
                                        handleDelete(cryptID(admin.id))
                                      }
                                      disabled={loadingDelete}
                                      id={"delete_button" + admin.id}
                                      className="btn btn-sm bg-danger-light ms-2"
                                    >
                                      <i className="feather-trash"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <ReactPaginate
                          previousLabel={"previous"}
                          nextLabel={"next"}
                          breakLabel={"..."}
                          pageCount={pageCount}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={3}
                          onPageChange={(page) =>
                            handlePageClick(page, fetchData)
                          }
                          containerClassName={
                            "pagination justify-content-center mt-2"
                          }
                          pageClassName={"page-item"}
                          pageLinkClassName={"page-link"}
                          previousClassName={"page-item"}
                          previousLinkClassName={"page-link"}
                          nextClassName={"page-item"}
                          nextLinkClassName={"page-link"}
                          breakClassName={"page-item"}
                          breakLinkClassName={"page-link"}
                          activeClassName={"active"}
                        />
                      </>
                    ) : (
                      <div className="alert alert-danger" role="alert">
                        <div className="flex-grow-1 me-2">
                          <b>
                            <i className="mdi mdi-alert"></i> Aucun
                            administrateur
                          </b>
                          <br />
                          You can start by adding a Admin
                        </div>
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
