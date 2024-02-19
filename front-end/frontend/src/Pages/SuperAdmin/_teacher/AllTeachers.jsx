import React, { useEffect, useState } from "react";
import _footer from "../../../Layouts/_footer";
import { Link } from "react-router-dom";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import { useContextApi } from "../../../Context/ContextApi";
import cryptID from "../../../security/cryptID";
import dcryptID from "../../../security/dcryptID";
import { useTeachersContext } from "../../../Functions/TeacherContext";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { BACKEND_URL } from "../../../Api/AxiosClient";

const AllTeachers = () => {
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { teachers, pageCount, handlePageClick } = useContextApi();
  const { getTeachers, removeTeacher } = useTeachersContext();

  const fetchData = async (val_currentPage) => {
    await getTeachers(val_currentPage);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    await removeTeacher(dcryptID(id));
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
                <h3 className="page-title">Enseignants</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Enseignants</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Tous les enseignants
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
                      <h3 className="page-title">Tous les enseignants</h3>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <Link to="#" className="btn btn-outline-primary me-2">
                        <i className="fas fa-download"></i> Télécharger
                      </Link>
                      <Link
                        to="/super-admin/create-teacher"
                        className="btn btn-primary"
                      >
                        <i className="fas fa-plus"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  {!loading ? (
                    teachers.length > 0 ? (
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
                            {teachers.map((teacher, index) => (
                              <tr key={index}>
                                <td>{teacher.cin}</td>
                                <td>
                                  <h2 className="table-avatar">
                                    <Link
                                      to="#"
                                      className="avatar avatar-sm me-2"
                                    >
                                      <img
                                        className="avatar-img rounded-circle"
                                        src={
                                          teacher.profile
                                            ? BACKEND_URL +
                                              "/storage/" +
                                              teacher.profile
                                            : teacher.gender === "female"
                                            ? "/assets/img/default-profile-picture-grey-female-icon.png"
                                            : "/assets/img/default-profile-picture-grey-male-icon.png"
                                        }
                                        alt="Image de l'utilisateur"
                                      />
                                    </Link>
                                  </h2>
                                </td>
                                <td>
                                  {teacher.last_name + " " + teacher.first_name}
                                </td>
                                <td>{teacher.gender}</td>
                                <td>
                                  {teacher.last_login_date
                                    ? teacher.last_login_date
                                    : "Pas de connexion"}
                                </td>
                                <td>{teacher.phone_number}</td>
                                <td>{teacher.date_of_birth}</td>
                                <td className="text-end">
                                  <div className="actions">
                                    <Link
                                      to={
                                        "/super-admin/show-teacher/" +
                                        cryptID(teacher.id)
                                      }
                                      className="btn btn-sm bg-success-light me-2 "
                                    >
                                      <i className="feather-eye"></i>
                                    </Link>
                                    <Link
                                      to={
                                        "/super-admin/update-teacher/" +
                                        cryptID(teacher.id)
                                      }
                                      className="btn btn-sm bg-danger-light"
                                    >
                                      <i className="feather-edit"></i>
                                    </Link>
                                    <button
                                      onClick={() =>
                                        handleDelete(cryptID(teacher.id))
                                      }
                                      disabled={loadingDelete}
                                      id={"delete_button" + teacher.id}
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
                            <i className="mdi mdi-alert"></i> Aucun enseignant
                          </b>
                          <br />
                          You can start by adding a new teacher.
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

export default AllTeachers;
