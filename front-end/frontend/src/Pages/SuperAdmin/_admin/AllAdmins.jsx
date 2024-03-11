import React, { useEffect, useRef, useState } from "react";
import _footer from "../../../Layouts/_footer";
import { Link } from "react-router-dom";
import { useAdminContext } from "../../../Functions/AdminContext";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import { useContextApi } from "../../../config/Context/ContextApi";
import cryptID from "./../../../config/security/cryptID";
import dcryptID from "./../../../config/security/dcryptID";
import ReactPaginate from "react-paginate";
import { BACKEND_URL } from "../../../config/Api/AxiosClient";
import LoadingCircle from "../../../Components/LoadingCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faTrashCan,
  faTrashCanArrowUp,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { errorToast } from "../../../config/Toasts/toasts";

const AllAdmins = () => {
  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [typeFetch, setTypeFetch] = useState("normal");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingRestore, setloadingRestore] = useState(false);
  const [loadingRestoreSelected, setloadingRestoreSelected] = useState(false);
  const [loadingDeleteSelected, setloadingDeleteSelected] = useState(false);
  const cin = useRef(null);
  const first_name = useRef(null);
  const phone_number = useRef(null);

  const {
    admins,
    pageCount,
    handlePageClick,
    setIds,
    ids,
    adminsTrash,
    setCurrentPage,
    setAdmins,
    setAdminsTrash,
    total,
  } = useContextApi();
  const {
    getAdmins,
    removeAdmin,
    restoreAdminSelected,
    deleteAdminSelected,
    restoreAdmin,
    getAdminsBySearch,
    getAdminsTrash,
  } = useAdminContext();

  const fetchData = async (doLoading = true, val_currentPage) => {
    doLoading && setLoading(true);
    setIds([]);
    setAdminsTrash(null);
    setTypeFetch("normal");
    await getAdmins(val_currentPage);
    setLoading(false);
  };

  const handleResetSearchForm = async (doFetch = true) => {
    if (typeFetch === "deleted" && doFetch) handleGetTrash();
    else if (typeFetch === "normal" && doFetch) fetchData();
  };

  const handleSubmit = async (e, doLoading = true, val_currentPage) => {
    e.preventDefault();
    if (
      e.target.cin.value === "" &&
      e.target.first_name.value === "" &&
      e.target.phone_number.value === ""
    ) {
      errorToast("s'il vous plait choisir minimum une cin");
      return;
    }
    if (doLoading) {
      setLoading(true);
      setLoadingSearch(true);
    }
    setIds([]);
    const formData = {
      cin: e.target.cin.value,
      first_name: e.target.first_name.value,
      phone_number: e.target.phone_number.value,
    };
    if (adminsTrash) {
      setAdmins(null);
      await getAdminsBySearch(val_currentPage, formData, "deleted");
    } else if (admins) {
      setAdminsTrash(null);
      await getAdminsBySearch(val_currentPage, formData, "normal");
    }
    setLoading(false);
    setLoadingSearch(false);
  };

  const handleGetTrash = async (doLoading = true, val_currentPage) => {
    doLoading && setLoading(true);
    setIds([]);
    setTypeFetch("deleted");
    setAdmins(null);
    await getAdminsTrash(val_currentPage);
    setLoading(false);
  };

  const handleRestoreSelected = async () => {
    setloadingRestoreSelected(true);
    await restoreAdminSelected(ids);
    setloadingRestoreSelected(false);
  };
  const handleDeleteSelected = async () => {
    setloadingDeleteSelected(true);
    await deleteAdminSelected(ids);
    setloadingDeleteSelected(false);
  };
  const handleRestore = async (id) => {
    setloadingRestore(true);
    await restoreAdmin(cryptID(id));
    setloadingRestore(false);
  };

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    await removeAdmin(dcryptID(id));
    setLoadingDelete(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchData();
  }, []);

  return (
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
        <form onSubmit={handleSubmit} className="row">
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                name="cin"
                ref={cin}
                className="form-control"
                placeholder="Rechercher par CIN ..."
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                name="first_name"
                ref={first_name}
                className="form-control"
                placeholder="Rechercher par Prenom ..."
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                name="phone_number"
                ref={phone_number}
                className="form-control"
                placeholder="Rechercher par Téléphone ..."
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
                    {adminsTrash && (
                      <button
                        to="#"
                        disabled={loading || loadingDelete || loadingRestore}
                        onClick={fetchData}
                        // style={{ minWidth: "120px" }}
                        className="border border-2 btn bg-danger-light me-2"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        {/* <span className="ms-1">Retour</span> */}
                      </button>
                    )}
                    <h3 className="page-title">
                      Administrateurs {adminsTrash && " (Corbeille)"}
                    </h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <ul className="nav">
                      {!adminsTrash && !loading && (
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
                                les administrateurs sélectionnés{" "}
                              </>
                            )}
                          </button>
                        </>
                      )}

                      {adminsTrash ? (
                        <>
                          {adminsTrash.length > 0 && (
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
                                  Restaurer les administrateurs sélectionnés{" "}
                                </>
                              )}
                            </button>
                          )}
                        </>
                      ) : (
                        admins && (
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
                      {!adminsTrash && !loading && (
                        <Link
                          to="/super-admin/create-admin"
                          className="btn btn-primary"
                        >
                          <i className="fas fa-plus"></i>
                        </Link>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                {!loading ? (
                  admins ? (
                    admins.length > 0 ? (
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
                                    checked={ids.length === admins.length}
                                    onChange={(e) =>
                                      e.target.checked
                                        ? setIds(
                                            admins.map((admin) => admin.id)
                                          )
                                        : setIds([])
                                    }
                                  />
                                </div>
                              </th>
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
                            {admins.map((admin, i) => (
                              <tr key={i}>
                                <td>
                                  <div className="form-check check-tables">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={ids.includes(admin.id)}
                                      onChange={(e) =>
                                        e.target.checked
                                          ? setIds([...ids, admin.id])
                                          : setIds(
                                              ids.filter(
                                                (id) => id !== admin.id
                                              )
                                            )
                                      }
                                    />
                                  </div>
                                </td>
                                <td>{admin.cin}</td>
                                <td>
                                  <h2 className="table-avatar">
                                    <Link
                                      to=""
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
                                  <div className="actions">
                                    <Link
                                      to={
                                        "/super-admin/show-admin/" +
                                        cryptID(admin.id)
                                      }
                                      className="btn btn-sm bg-success-light me-2"
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
                        {total !== 0 && (
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
                        )}
                      </>
                    ) : (
                      <div className="alert alert-danger" role="alert">
                        <div className="flex-grow-1 me-2">
                          <b>
                            <i className="mdi mdi-alert"></i>
                            Aucun administrateur
                          </b>
                          <br />
                          Vous pouvez commencer par ajouter un administrateur
                        </div>
                      </div>
                    )
                  ) : adminsTrash?.length > 0 ? (
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
                                  checked={ids.length === adminsTrash.length}
                                  onChange={(e) =>
                                    e.target.checked
                                      ? setIds(
                                          adminsTrash.map((admin) => admin.id)
                                        )
                                      : setIds([])
                                  }
                                />
                              </div>
                            </th>
                            <th>CIN</th>
                            <th>Profile</th>
                            <th>Nom et Prenom</th>
                            <th>Gender</th>
                            <th>Supprimé à</th>
                            <th>Telephone</th>
                            <th>date de naissance</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {adminsTrash.map((admin, i) => (
                            <tr key={i}>
                              <td>
                                <div className="form-check check-tables">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={ids.includes(admin.id)}
                                    onChange={(e) =>
                                      e.target.checked
                                        ? setIds([...ids, admin.id])
                                        : setIds(
                                            ids.filter((id) => id !== admin.id)
                                          )
                                    }
                                  />
                                </div>
                              </td>
                              <td>{admin.cin}</td>
                              <td>
                                <h2 className="table-avatar">
                                  <Link to="" className="avatar avatar-sm me-2">
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
                                {new Date(
                                  admin.deleted_at
                                ).toLocaleDateString()}
                              </td>
                              <td>{admin.phone_number}</td>
                              <td>{admin.date_of_birth}</td>
                              <td className="text-center">
                                <div className="">
                                  <button
                                    onClick={() => handleRestore(admin.id)}
                                    disabled={loadingRestore}
                                    className="btn btn-success"
                                  >
                                    <FontAwesomeIcon icon={faTrashCanArrowUp} />{" "}
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
                          <i className="mdi mdi-alert"></i> Aucun administrateur
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
        </div>
      </div>
    </div>
  );
};

export default AllAdmins;
