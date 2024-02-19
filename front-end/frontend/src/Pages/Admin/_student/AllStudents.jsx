import React, { useEffect, useState } from "react";
import _footer from "../../../Layouts/_footer";
import { Link } from "react-router-dom";
import { useContextApi } from "../../../Context/ContextApi";
import { useStudentContext } from "../../../Functions/StudentContext";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import ReactPaginate from "react-paginate";
import { BACKEND_URL } from "../../../Api/AxiosClient";
import cryptID from "../../../security/cryptID";
import dcryptID from "../../../security/dcryptID";

const AllStudents = () => {
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { students, pageCount, handlePageClick } = useContextApi();
  const { getStudents, removeStudent } = useStudentContext();

  const fetchData = async (val_currentPage) => {
    await getStudents(val_currentPage);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    await removeStudent(dcryptID(id));
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
                      <ul className="nav">
                        <li className="nav-item">
                          <Link
                            className="btn btn-outline-gray me-2 active"
                            data-bs-toggle="tab"
                            to="#grid1"
                          >
                            <i className="feather-list"></i>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="btn btn-outline-gray me-2"
                            data-bs-toggle="tab"
                            to="#grid2"
                          >
                            <i className="feather-grid"></i>
                          </Link>
                        </li>
                        <Link to="#" className="btn btn-outline-primary me-2">
                          <i className="fas fa-download"></i> Télécharger
                        </Link>
                        <Link
                          to="/admin/create-student"
                          className="btn btn-primary"
                        >
                          <i className="fas fa-plus"></i>
                        </Link>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="tab-content profile-tab-cont mt-0 pt-0">
                  <div className="tab-pane fade show active" id="grid1">
                    <div className="row">
                      <div className="table-responsive">
                        {!loading ? (
                          students.length > 0 ? (
                            <>
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
                                    <th>Code Massar</th>
                                    <th>Profile</th>
                                    <th>Nom et Prenom</th>
                                    <th>Gender</th>
                                    <th>Date de dernière connexion</th>
                                    <th>Classe</th>
                                    <th>Le Nom de Parent</th>
                                    <th className="text-end">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {students.map((student, i) => (
                                    <tr key={i}>
                                      <td>
                                        <div className="form-check check-tables">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="something"
                                          />
                                        </div>
                                      </td>
                                      <td>{student.code_massar}</td>
                                      <td>
                                        <h2 className="table-avatar">
                                          <Link
                                            to=""
                                            className="avatar avatar-sm me-2"
                                          >
                                            <img
                                              className="avatar-img rounded-circle"
                                              src={
                                                student.profile_picture
                                                  ? BACKEND_URL +
                                                    "/storage/" +
                                                    student.profile_picture
                                                  : student.gender === "female"
                                                  ? "/assets/img/default-profile-picture-grey-female-icon.png"
                                                  : "/assets/img/default-profile-picture-grey-male-icon.png"
                                              }
                                              alt="Image de l'utilisateur"
                                            />
                                          </Link>
                                        </h2>
                                      </td>
                                      <td>
                                        {student.last_name +
                                          " " +
                                          student.first_name}
                                      </td>
                                      <td>{student.gender}</td>
                                      <td>
                                        {student.last_login_date
                                          ? student.last_login_date
                                          : "Pas de connexion"}
                                      </td>
                                      <td>{student.classe.code}</td>
                                      <td>
                                        {student.parent.last_name +
                                          " " +
                                          student.parent.first_name}
                                      </td>
                                      <td className="text-end">
                                        <div className="actions">
                                          <Link
                                            to={
                                              "/admin/show-student/" +
                                              cryptID(student.id)
                                            }
                                            className="btn btn-sm bg-success-light me-2"
                                          >
                                            <i className="feather-eye"></i>
                                          </Link>
                                          <Link
                                            to={
                                              "/admin/update-student/" +
                                              cryptID(student.id)
                                            }
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="feather-edit"></i>
                                          </Link>
                                          <button
                                            onClick={() =>
                                              handleDelete(cryptID(student.id))
                                            }
                                            disabled={loadingDelete}
                                            id={"delete_button" + student.id}
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
                                  etudiant
                                </b>
                                <br />
                                You can start by adding a Student
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

                  <div id="grid2" className="tab-pane fade">
                    <div className="row">
                      {!loading ? (
                        students.length > 0 ? (
                          <>
                            {students.map((student, i) => (
                              <div
                                key={i}
                                className="col-sm-6 col-lg-4 col-xl-3 d-flex"
                              >
                                <div className="card invoices-grid-card w-100">
                                  <div className="card-header d-flex justify-content-between align-items-center">
                                    <Link to="" className="invoice-grid-link">
                                      {student.code_massar}
                                    </Link>
                                    <div className="dropdown dropdown-action">
                                      <Link
                                        to="#"
                                        className="action-icon dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="fas fa-ellipsis-v" />
                                      </Link>
                                      <div className="dropdown-menu dropdown-menu-end">
                                        <Link
                                          className="dropdown-item"
                                          to={
                                            "/admin/update-student/" +
                                            cryptID(student.id)
                                          }
                                        >
                                          <i className="far fa-edit me-2" />
                                          Edit
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to={
                                            "/admin/show-student/" +
                                            cryptID(student.id)
                                          }
                                        >
                                          <i className="far fa-eye me-2" />
                                          View
                                        </Link>
                                        <button
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleDelete(cryptID(student.id))
                                          }
                                          disabled={loadingDelete}
                                          id={"delete_button" + student.id}
                                        >
                                          <i className="text text-danger far fa-trash-alt me-2" />
                                          <span className="text text-danger">
                                            Delete
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-middle">
                                    <h2 className="card-middle-avatar">
                                      <Link to="">
                                        <div className="d-flex">
                                          <div>
                                            <img
                                              className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                              src={
                                                student.profile_picture
                                                  ? BACKEND_URL +
                                                    "/storage/" +
                                                    student.profile_picture
                                                  : student.gender === "female"
                                                  ? "/assets/img/default-profile-picture-grey-female-icon.png"
                                                  : "/assets/img/default-profile-picture-grey-male-icon.png"
                                              }
                                              alt="User Image"
                                            />
                                          </div>
                                          <div className="d-flex flex-column">
                                            <span>
                                              {student.last_name +
                                                " " +
                                                student.first_name}
                                            </span>
                                            <small className="text-secondary">
                                              {student.classe.code}
                                            </small>
                                          </div>
                                        </div>
                                      </Link>
                                    </h2>
                                  </div>
                                  <div className="card-body">
                                    <div className="row align-items-center">
                                      <div className="col">
                                        <span>
                                          <i className="far fa-money-bill-alt" />{" "}
                                          Numero Parent
                                        </span>
                                        <h6 className="mb-0">
                                          {student.parent.phone_number}
                                        </h6>
                                      </div>
                                      <div className="col-auto">
                                        <span>
                                          <i className="far fa-calendar-alt" />{" "}
                                          Gender
                                        </span>
                                        <h6 className="mb-0">
                                          {student.gender}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-footer">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <span className="badge bg-success-dark">
                                          Paid
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
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
                                <i className="mdi mdi-alert"></i> Aucun etudiant
                              </b>
                              <br />
                              You can start by adding a Student
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
        </div>
      </div>

      <_footer />
    </div>
  );
};

export default AllStudents;
