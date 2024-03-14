import React, { useEffect, useRef, useState } from "react";
import dcryptID from "../../../config/security/dcryptID";
import LoadingCircle from "../../../Components/LoadingCircle";
import { errorToast, successToast } from "../../../config/Toasts/toasts";
import { AxiosClient } from "../../../config/Api/AxiosClient";
import cryptID from "../../../config/security/cryptID";
import Select from "react-select";
import { useContextApi } from "../../../config/Context/ContextApi";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";

const ClassesManager = () => {
  const [formLoading, setFormLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentFilieres, setCurrentFilieres] = useState([]);
  const [classeTypeId, setClasseTypeId] = useState(null);
  const [allClasseTypes, setAllClasseTypes] = useState(null);
  const close_createClasse_modal = useRef(null);
  const filiereId = useRef(null);
  const numberEtudMax = useRef(null);
  const { errors, setErrors } = useContextApi();

  const fetchClasses = async () => {
    try {
      const { data } = await AxiosClient.get("/super-admin/classe-types");
      setAllClasseTypes(data);
    } catch (error) {
      console.log(error);
      errorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const { data } = await AxiosClient.post("/super-admin/add-classes", {
        classe_type_id: dcryptID(e.target.classe_type_id.value),
        filiere_id: dcryptID(e.target.filiere_id.value),
        number_etud_max: e.target.number_etud_max.value,
      });
      await fetchClasses();
      successToast(data.message);
      setErrors(null);
      close_createClasse_modal.current.click();
    } catch (error) {
      setErrors(error.response.data.errors);
      errorToast(error.response.data.message);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Add Event</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="event.html">Events</a>
              </li>
              <li className="breadcrumb-item active">Add Event</li>
            </ul>
          </div>
        </div>
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
                        <th>Année Scholaire</th>
                        <th>Niveau Scholaire</th>
                        <th>Nombre de Classes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allClasseTypes
                        ? allClasseTypes.map((classeType, i) => (
                            <tr key={i}>
                              <td>{classeType.name}</td>
                              <td>{classeType.school_level.name}</td>
                              <td>
                                <div className="d-flex flex-nowrap gap-2 align-items-center">
                                  <input
                                    id={"classeCount" + cryptID(classeType.id)}
                                    type="text"
                                    disabled
                                    value={classeType.classes.length}
                                    className="form-control"
                                  />
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target={"#addClasse"}
                                      onClick={() => {
                                        setCurrentFilieres(classeType.filieres);
                                        setClasseTypeId(cryptID(classeType.id));
                                      }}
                                    >
                                      <i className="fas fa-plus"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        : null}
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
        className="modal fade"
        id="addClasse"
        tabIndex={-1}
        aria-labelledby="addClasseArea"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClasseArea">
                Ajouter un Classe
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="classe_type_id"
                  value={classeTypeId}
                />
                <div className="mb-3">
                  <div className="form-group local-forms">
                    <label>
                      Filière <span className="login-danger">*</span>
                    </label>
                    <Select
                      ref={filiereId}
                      styles={{
                        menu: (base) => ({
                          ...base,
                          zIndex: 9999,
                        }),
                      }}
                      name="filiere_id"
                      options={currentFilieres.map((filiere) => ({
                        value: cryptID(filiere.id),
                        label: filiere.name + " - " + filiere.code,
                      }))}
                      placeholder="Selectionner un filière..."
                    />
                    <span className="text text-danger">
                      {errors?.filiere_id}
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-group local-forms">
                    <label>
                      Numero maximale des etudiants{" "}
                      <span className="login-danger">*</span>
                    </label>
                    <input
                      ref={numberEtudMax}
                      type="text"
                      className={
                        "form-control" +
                        " " +
                        (errors?.number_etud_max ? "is-invalid" : "")
                      }
                      name="number_etud_max"
                    />
                    <span className="text text-danger">
                      {errors?.number_etud_max}
                    </span>
                  </div>
                </div>
                <div className="modal-footer pb-0">
                  <button
                    ref={close_createClasse_modal}
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setErrors(null);
                      numberEtudMax.current.value = "";
                      filiereId.current?.setValue({
                        value: "",
                        label: "Selectionner un filière...",
                      });
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className={"btn btn-primary"}
                    disabled={formLoading}
                  >
                    {!formLoading ? "Save changes" : <LoadingCircle />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesManager;
