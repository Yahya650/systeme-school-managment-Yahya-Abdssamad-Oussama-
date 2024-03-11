import React, { useEffect, useRef, useState } from "react";
import _footer from "../../../Layouts/_footer";
import { Link } from "react-router-dom";
import { useContextApi } from "../../../config/Context/ContextApi";
import { useStudentContext } from "../../../Functions/StudentContext";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import ReactPaginate from "react-paginate";
import { AxiosClient, BACKEND_URL } from "../../../config/Api/AxiosClient";
import cryptID from "../../../config/security/cryptID";
import dcryptID from "../../../config/security/dcryptID";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import {
  faTrashCan,
  faArrowLeft,
  faTrashCanArrowUp,
  faSearch,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import LoadingCircle from "../../../Components/LoadingCircle";
import { errorToast } from "../../../config/Toasts/toasts";

const AllStudents = () => {
  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [typeFetch, setTypeFetch] = useState("normal");
  const [loadingParents, setLoadingParents] = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingRestore, setloadingRestore] = useState(false);
  const [loadingRestoreSelected, setloadingRestoreSelected] = useState(false);
  const [loadingDeleteSelected, setloadingDeleteSelected] = useState(false);
  const [classeOptions, setClasseOptions] = useState([]);
  const [parentOptions, setParentOptions] = useState([]);
  const btnGrid1 = useRef(null);
  const classe_id = useRef(null);
  const parent_id = useRef(null);
  const code_massar = useRef(null);
  const {
    students,
    pageCount,
    handlePageClick,
    studentsTrash,
    setStudentsTrash,
    setStudents,
    setIds,
    ids,
    setCurrentPage,
    total,
  } = useContextApi();

  const {
    getStudents,
    removeStudent,
    getStudentsTrash,
    restoreStudent,
    restoreStudentSelected,
    deleteStudentSelected,
    getStudentsBySearch,
  } = useStudentContext();

  const fetchData = async (doLoading = true, val_currentPage) => {
    doLoading && setLoading(true);
    setIds([]);
    setStudentsTrash(null);
    setTypeFetch("normal");
    await getStudents(val_currentPage);
    setLoading(false);
  };

  const handleResetSearchForm = async (doFetch = true) => {
    btnGrid1.current.click();
    if (typeFetch === "deleted" && doFetch) handleGetTrash();
    else if (typeFetch === "normal" && doFetch) fetchData();
    classe_id.current?.setValue({
      value: "",
      label: "Rechercher par une classe...",
    });
    parent_id.current?.setValue({
      value: "",
      label: "Rechercher par une Parent...",
    });
  };

  const fetchParents = async () => {
    const parents = await AxiosClient.get("/admin/student-parents");
    const options1 = parents.data.map((parent) => ({
      value: cryptID(parent.id),
      label: `${parent.cin} - ${parent.last_name} ${parent.first_name}`,
    }));
    setParentOptions(options1);
    setLoadingParents(false);
  };

  const fetchClasses = async () => {
    const classes = await AxiosClient.get("/admin/classes");
    const options = classes.data.map((classe) => ({
      value: cryptID(classe.id),
      label:
        classe.filiere_id !== null
          ? `${classe.code} ${classe.classe_type.school_level.name}-${classe.classe_type.name} - (${classe.filiere.name})`
          : `${classe.code} ${classe.classe_type.school_level.name}-${classe.classe_type.name}`,
    }));
    setClasseOptions(options);
    setLoadingClasses(false);
  };

  const handleSubmit = async (e, doLoading = true, val_currentPage) => {
    e.preventDefault();
    if (
      e.target.code_massar.value === "" &&
      e.target.parent_id.value === "" &&
      e.target.classe_id.value === ""
    ) {
      errorToast("s'il vous plait choisir minimum une classe");
      return;
    }
    btnGrid1.current.click();
    if (doLoading) {
      setLoading(true);
      setLoadingSearch(true);
    }

    setIds([]);
    const formData = {
      code_massar: e.target.code_massar.value,
      parent_id: dcryptID(e.target.parent_id.value),
      classe_id: dcryptID(e.target.classe_id.value),
    };
    if (studentsTrash) {
      setStudents(null);
      await getStudentsBySearch(val_currentPage, formData, "deleted");
    } else if (students) {
      setStudentsTrash(null);
      await getStudentsBySearch(val_currentPage, formData, "normal");
    }
    setLoading(false);
    setLoadingSearch(false);
  };

  const handleGetTrash = async (doLoading = true, val_currentPage) => {
    doLoading && setLoading(true);
    setIds([]);
    setTypeFetch("deleted");
    setStudents(null);
    await getStudentsTrash(val_currentPage);
    setLoading(false);
  };

  const handleRestoreSelected = async () => {
    setloadingRestoreSelected(true);
    await restoreStudentSelected(ids);
    setloadingRestoreSelected(false);
  };
  const handleDeleteSelected = async () => {
    setloadingDeleteSelected(true);
    await deleteStudentSelected(ids);
    setloadingDeleteSelected(false);
  };
  const handleRestore = async (id) => {
    setloadingRestore(true);
    await restoreStudent(cryptID(id));
    setloadingRestore(false);
  };
  const handleDelete = async (id) => {
    setLoadingDelete(true);
    setIds([]);
    await removeStudent(dcryptID(id));
    setLoadingDelete(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchData();
    fetchParents();
    fetchClasses();
  }, []);

  // useEffect(() => {
  //   handleResetSearchForm(false);
  // }, [typeFetch]);

  return (
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
        <form onSubmit={handleSubmit} className="row d-flex align-item-center">
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <Select
                styles={{
                  menu: (base) => ({ ...base, zIndex: 9999 }),
                }}
                name="parent_id"
                ref={parent_id}
                isLoading={loadingParents}
                options={[
                  {
                    value: "",
                    label: "Rechercher par une Parent...",
                  },
                  ...parentOptions,
                ]}
                placeholder="Rechercher par une Parent..."
                isSearchable={true}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <Select
                styles={{
                  menu: (base) => ({ ...base, zIndex: 9999 }),
                }}
                name="classe_id"
                ref={classe_id}
                isLoading={loadingClasses}
                options={[
                  {
                    value: "",
                    label: "Rechercher par une classe...",
                  },
                  ...classeOptions,
                ]}
                placeholder="Rechercher par une classe..."
                isSearchable={true}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                name="code_massar"
                ref={code_massar}
                type="text"
                className="form-control"
                placeholder="Rechercher par Code massar ..."
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="search-student-btn d-flex justify-content-center">
              <button
                type="submit"
                disabled={loadingSearch || loading}
                className="btn btn-primary"
              >
                {!loadingSearch ? (
                  <>
                    <FontAwesomeIcon icon={faSearch} /> Rechercher
                  </>
                ) : (
                  <LoadingCircle />
                )}
              </button>
              <button
                type="reset"
                disabled={loadingSearch || loading}
                className="btn btn-primary ms-2"
                style={{ minWidth: 0 }}
                onClick={handleResetSearchForm}
              >
                <FontAwesomeIcon icon={faUndo} />
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table comman-shadow">
            <div className="card-body">
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    {studentsTrash && (
                      <button
                        to="#"
                        disabled={loading || loadingDelete || loadingRestore}
                        onClick={fetchData}
                        className="border border-2 btn bg-danger-light me-2"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                    )}
                    <h3 className="page-title">
                      Étudiants {studentsTrash && " (Corbeille)"}
                    </h3>
                  </div>

                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <ul className="nav">
                      {!studentsTrash && !loading && (
                        <>
                          <button
                            to="#"
                            disabled={
                              loading ||
                              loadingDelete ||
                              loadingDeleteSelected ||
                              ids.length === 0
                            }
                            onClick={handleDeleteSelected}
                            className="btn btn-danger me-2"
                          >
                            {loadingDeleteSelected ? (
                              <LoadingCircle />
                            ) : (
                              <>
                                <FontAwesomeIcon icon={faTrashCan} /> Supprimer
                                les élèves sélectionnés{" "}
                              </>
                            )}
                          </button>
                          <li className="nav-item">
                            <Link
                              ref={btnGrid1}
                              className="btn btn-outline-gray me-2 active btnGrid1"
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
                        </>
                      )}

                      {studentsTrash ? (
                        <>
                          {studentsTrash.length > 0 && (
                            <button
                              to="#"
                              disabled={
                                loading ||
                                loadingDelete ||
                                loadingRestoreSelected ||
                                ids.length === 0
                              }
                              onClick={handleRestoreSelected}
                              className="btn btn-success me-2"
                            >
                              {loadingRestoreSelected ? (
                                <LoadingCircle />
                              ) : (
                                <>
                                  <FontAwesomeIcon icon={faTrashCanArrowUp} />{" "}
                                  Restaurer les élèves sélectionnés{" "}
                                </>
                              )}
                            </button>
                          )}
                        </>
                      ) : (
                        students && (
                          <>
                            <button
                              type="button"
                              disabled={
                                loading ||
                                loadingDelete ||
                                loadingRestore ||
                                loadingDeleteSelected
                              }
                              onClick={() => {
                                handleGetTrash();
                                btnGrid1.current.click();
                              }}
                              className="btn btn-danger me-2"
                            >
                              <FontAwesomeIcon icon={faTrashCan} />{" "}
                              <span>Corbeille</span>
                            </button>
                          </>
                        )
                      )}

                      <Link to="#" className="btn btn-primary me-2 disabled">
                        <i className="fas fa-download"></i> Télécharger
                      </Link>
                      {!studentsTrash && !loading && (
                        <Link
                          to="/admin/create-student"
                          className="btn btn-primary"
                        >
                          <i className="fas fa-plus"></i>
                        </Link>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="tab-content profile-tab-cont mt-0 pt-0">
                <div className="tab-pane fade show active" id="grid1">
                  <div className="row">
                    <div className="table-responsive">
                      {!loading ? (
                        students ? (
                          students?.length > 0 ? (
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
                                          checked={
                                            ids.length === students.length
                                          }
                                          onChange={(e) =>
                                            e.target.checked
                                              ? setIds(
                                                  students.map(
                                                    (student) => student.id
                                                  )
                                                )
                                              : setIds([])
                                          }
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
                                            checked={ids.includes(student.id)}
                                            onChange={(e) =>
                                              e.target.checked
                                                ? setIds([...ids, student.id])
                                                : setIds(
                                                    ids.filter(
                                                      (id) => id !== student.id
                                                    )
                                                  )
                                            }
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
                            </>
                          ) : (
                            <div className="alert alert-danger" role="alert">
                              <div className="flex-grow-1 me-2">
                                <b>
                                  <i className="mdi mdi-alert"></i>
                                  Aucun etudiant
                                </b>
                                <br />
                                Vous pouvez commencer par ajouter un Student
                              </div>
                            </div>
                          )
                        ) : studentsTrash?.length > 0 ? (
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
                                        checked={
                                          ids.length === studentsTrash.length
                                        }
                                        onChange={(e) =>
                                          e.target.checked
                                            ? setIds(
                                                studentsTrash.map(
                                                  (student) => student.id
                                                )
                                              )
                                            : setIds([])
                                        }
                                      />
                                    </div>
                                  </th>
                                  <th>Code Massar</th>
                                  <th>Profile</th>
                                  <th>Nom et Prenom</th>
                                  <th>Gender</th>
                                  <th>Supprimé à</th>
                                  <th>Classe</th>
                                  <th>Le Nom de Parent</th>
                                  <th className="text-center">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {studentsTrash.map((student, i) => (
                                  <tr key={i}>
                                    <td>
                                      <div className="form-check check-tables">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={ids.includes(student.id)}
                                          onChange={(e) =>
                                            e.target.checked
                                              ? setIds([...ids, student.id])
                                              : setIds(
                                                  ids.filter(
                                                    (id) => id !== student.id
                                                  )
                                                )
                                          }
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
                                      {new Date(
                                        student.deleted_at
                                      ).toLocaleDateString()}
                                    </td>
                                    <td>{student.classe.code}</td>
                                    <td>
                                      {student.parent.last_name +
                                        " " +
                                        student.parent.first_name}
                                    </td>
                                    <td className="text-center">
                                      <div className="">
                                        <button
                                          onClick={() =>
                                            handleRestore(student.id)
                                          }
                                          disabled={loadingRestore}
                                          className="btn btn-success"
                                        >
                                          <FontAwesomeIcon
                                            icon={faTrashCanArrowUp}
                                          />{" "}
                                          Restore
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {total !== 0 && (
                              <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={(page) =>
                                  handlePageClick(page, handleGetTrash)
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
                            )}
                          </>
                        ) : (
                          <div className="alert alert-danger" role="alert">
                            <div className="flex-grow-1 me-2">
                              <b>
                                <i className="mdi mdi-alert"></i> Aucun etudiant
                                dans la corbeille
                              </b>
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
                      students?.length > 0 ? (
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
                                      <h6 className="mb-0">{student.gender}</h6>
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
                        </>
                      ) : (
                        <div className="alert alert-danger" role="alert">
                          <div className="flex-grow-1 me-2">
                            <b>
                              <i className="mdi mdi-alert"></i> Aucun etudiant
                            </b>
                            <br />
                            Vous pouvez commencer par ajouter un Student
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

                {!loading &&
                students?.length > 0 &&
                !studentsTrash &&
                total !== 0 ? (
                  <>
                    <ReactPaginate
                      previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={(page) => handlePageClick(page, fetchData)}
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
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
