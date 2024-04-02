import React, { useEffect, useRef, useState } from "react";
import { AxiosClient } from "../../../config/Api/AxiosClient";
import { errorToast, successToast } from "../../../config/Toasts/toasts";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import LoadingCircle from "../../../Components/LoadingCircle";
import cryptID from "../../../config/security/cryptID";
import { Tooltip } from "react-tooltip";
import { useContextApi } from "../../../config/Context/ContextApi";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUndo } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import dcryptID from "../../../config/security/dcryptID";

const ManageListClasses = () => {
  const [classes, setClasses] = useState(null);
  const [classe, setClasse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schoolLevels, setSchoolLevels] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [schoolLevelLoading, setSchoolLevelLoading] = useState(true);
  const [classeTypes, setClasseTypes] = useState(null);
  const [ClasseTypeLoading, setclasseTypeLoading] = useState(false);
  const { errors, setErrors } = useContextApi();
  const [formLoading, setFormLoading] = useState(false);
  const [formLoading2, setFormLoading2] = useState(false);
  const close_uploadTimeTable_modal = useRef(null);
  const fileTimeTable = useRef(null);
  const startDate = useRef(null);
  const school_level_id = useRef(null);
  const classe_type_id = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await AxiosClient.get("/admin/classes");
      setClasses(data);
    } catch (error) {
      errorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await AxiosClient.get("/school_levels");
        setSchoolLevels(data);
      } catch (error) {
        errorToast(error.response.data.message);
      } finally {
        setSchoolLevelLoading(false);
      }
    };
    fetchData();
  }, []);

  const getClasseTypesBySchoolLevel = async (e) => {
    try {
      setclasseTypeLoading(true);
      const { data } = await AxiosClient.get(
        "/admin/get-classe-types-by-school-level/" + dcryptID(e.value)
      );
      setClasseTypes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setclasseTypeLoading(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoadingSearch(true);
    setLoading(true);
    try {
      const { data } = await AxiosClient.get("/admin/filter-classe", {
        params: {
          classe_type_id: dcryptID(e.target.classe_type_id.value),
        },
      });
      setClasses(data);
    } catch (error) {
      errorToast(error.response.data.message);
    } finally {
      setLoading(false);
      setLoadingSearch(false);
    }
  };

  const handleResetSearchForm = () => {
    fetchData();
    classe_type_id.current?.setValue({
      value: "",
      label: "Rechercher par une type de classe...",
    });
    school_level_id.current?.setValue({
      value: "",
      label: "Rechercher par une Année scolaire...",
    });
  };

  const handleUploadTimeTable = async (e) => {
    e.preventDefault();
    try {
      setFormLoading2(true);
      const formDataFile = new FormData();
      formDataFile.append("file", fileTimeTable.current.files[0]);
      const { data } = await AxiosClient.post(
        "/admin/upload-timetable/" + classe.id,
        formDataFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            start_date: startDate.current.value,
          },
        }
      );
      close_uploadTimeTable_modal.current.click();
      setErrors(null);
      successToast(data.message);
    } catch (error) {
      errorToast(error.response.data.message);
      setErrors(error.response.data.errors);
    } finally {
      setFormLoading2(false);
    }
  };

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Les Classes</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="event.html">Classes</a>
              </li>
              <li className="breadcrumb-item active">Management les classe</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="student-group-form">
        <form
          onSubmit={handleSearchSubmit}
          className="row d-flex align-item-center"
        >
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <Select
                styles={{
                  menu: (base) => ({ ...base, zIndex: 9999 }),
                }}
                name="school_level_id"
                id="school_level_id"
                ref={school_level_id}
                onChange={getClasseTypesBySchoolLevel}
                isLoading={schoolLevelLoading}
                options={[
                  ...(schoolLevels
                    ? schoolLevels.map((schoolLevel) => ({
                        value: cryptID(schoolLevel.id),
                        label: schoolLevel.name,
                      }))
                    : []),
                ]}
                placeholder="Rechercher par une Année scolaire..."
                isSearchable={true}
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="form-group">
              <Select
                styles={{
                  menu: (base) => ({ ...base, zIndex: 9999 }),
                }}
                name="classe_type_id"
                id="classe_type_id"
                ref={classe_type_id}
                isLoading={ClasseTypeLoading}
                options={[
                  ...(classeTypes
                    ? classeTypes?.map((classeType) => ({
                        value: cryptID(classeType.id),
                        label: classeType.name,
                      }))
                    : []),
                ]}
                placeholder="Rechercher par une type de classe..."
                isSearchable={true}
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
          <div className="card">
            <div className="card-body">
              <div className="col-12">
                <h5 className="form-title">
                  <span>Manage Classes</span>
                </h5>
              </div>
              {!loading ? (
                <div className="table-responsive">
                  <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                    <thead className="student-thread">
                      <tr>
                        <th>Code</th>
                        <th>Numero des Etudiants</th>
                        <th>Numero Maximal des Etudiants</th>
                        <th>Année Scolaire</th>
                        <th>Filiere</th>
                        <th>Emploi du temps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes ? (
                        <>
                          {classes.map((classe, i) => (
                            <tr key={i}>
                              <td>{classe.code}</td>
                              <td>{classe.number_etud}</td>
                              <td>
                                <input
                                  disabled
                                  type="number"
                                  className="form-control"
                                  id={"number_etud_max" + cryptID(classe.id)}
                                  value={classe.number_etud_max}
                                />
                              </td>
                              <td>
                                {classe.classe_type.name +
                                  " " +
                                  classe.classe_type.school_level.name}
                              </td>
                              <td>{classe.filiere?.name}</td>
                              <td className="text-center">
                                {/* {classe.time_table ? "oui" : "non"} */}
                                <button
                                  type="button"
                                  data-tooltip-id={
                                    "my-tooltip" + cryptID(classe.id)
                                  }
                                  data-tooltip-content={
                                    "upload Emploi du temps pour la classe : " +
                                    classe.code
                                  }
                                  onClick={() => {
                                    setClasse(classe);
                                  }}
                                  className="btn btn-sm bg-danger-light"
                                  data-bs-toggle="modal"
                                  data-bs-target={"#uploadTimeTable"}
                                >
                                  <i className="feather-upload"></i>
                                </button>
                                <Tooltip
                                  id={"my-tooltip" + cryptID(classe.id)}
                                />
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="w-100 d-flex justify-content-center align-items-center my-5">
                  <LoadingCircleContext />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal custom-modal fade bank-details"
        id="uploadTimeTable"
        ref={(modal) => {
          if (modal) {
            modal.addEventListener("hidden.bs.modal", () => {
              setErrors(null);
              setClasse(null);
              fileTimeTable.current.value = "";
              startDate.current.value = "";
            });
          }
        }}
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="form-header text-start mb-0">
                <h4 className="mb-0">
                  Upload Emploi du temps pour la classe : {classe?.code}
                </h4>
              </div>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUploadTimeTable}>
                <input type="hidden" name="classe_id" value={classe?.id} />
                <div className="mb-3">
                  <div className="form-group local-forms">
                    <label>
                      Date de Début <span className="login-danger">*</span>
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      ref={startDate}
                      className={
                        "form-control" +
                        (errors?.start_date ? " is-invalid" : "")
                      }
                    />
                    <span className="text text-danger">
                      {errors?.start_date}
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="">
                    <label htmlFor="validationTooltip01">
                      {" "}
                      Upload fichier de emploi du temps
                      <span className="login-danger">*</span>
                    </label>
                    <input
                      ref={fileTimeTable}
                      type="file"
                      accept="image/jpeg, image/png, image/jpg, application/pdf"
                      className={
                        "form-control" +
                        " " +
                        (errors?.file ? "is-invalid" : "")
                      }
                      name="file"
                    />
                    <span className="text text-danger">{errors?.file}</span>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="bank-details-btn">
                    <Link
                      to=""
                      ref={close_uploadTimeTable_modal}
                      data-bs-dismiss="modal"
                      className="btn bank-cancel-btn me-2"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="btn bank-save-btn"
                      disabled={formLoading2}
                    >
                      {!formLoading2 ? "Upload" : <LoadingCircle />}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageListClasses;
