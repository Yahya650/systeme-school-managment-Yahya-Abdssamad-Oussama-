import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dcryptID from "../../../security/dcryptID";
import { useContextApi } from "../../../Context/ContextApi";
import { useStudentContext } from "../../../Functions/StudentContext";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import { AxiosClient } from "../../../Api/AxiosClient";
import cryptID from "../../../security/cryptID";
import Select from "react-select";

const UpdateStudent = () => {
  const { student, errors, navigateTo, setErrors } = useContextApi();
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [classes, setClasses] = useState(null);
  const [classeOptions, setClasseOptions] = useState([]);
  const { getStudent, updateStudent } = useStudentContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (dcryptID(id) === null) {
        navigateTo("/error/404");
      }
      const { data } = await AxiosClient.get("/admin/classes");
      await getStudent(dcryptID(id));
      setClasses(data);
      const options = data.map((classe) => ({
        value: cryptID(classe.id),
        label: `${classe.code} ${classe.classe_type.school_level.name}-${classe.classe_type.name} - (${classe.filiere.name})`,
      }));
      setClasseOptions(options);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">Modifier un étudiant</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Étudiants</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Modifier un étudiant
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="card comman-shadow">
              <div className="card-body">
                {!loading ? (
                  <form method="put">
                    <div className="row">
                      <div className="col-12">
                        <h5 className="form-title student-info">
                          Informations sur l'étudiant
                          <span>
                            <Link to="#">
                              <i className="feather-more-vertical"></i>
                            </Link>
                          </span>
                        </h5>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Prénom<span className="login-danger">*</span>
                          </label>
                          <input
                            name="first_name"
                            className="form-control"
                            type="text"
                            defaultValue={student?.first_name}
                          />
                          <span className="text-danger">
                            {errors?.first_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Nom de famille
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            name="last_name"
                            className="form-control"
                            type="text"
                            defaultValue={student?.last_name}
                          />
                          <span className="text-danger">
                            {errors?.last_name}
                          </span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            CIN <span className="login-danger">*</span>
                          </label>
                          <input
                            name="cin"
                            className="form-control"
                            type="text"
                            defaultValue={student?.cin}
                          />
                          <span className="text-danger">{errors?.cin}</span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Code Massar <span className="login-danger">*</span>
                          </label>
                          <input
                            name="code_massar"
                            className="form-control"
                            type="text"
                            defaultValue={student?.code_massar}
                          />
                          <span className="text-danger">
                            {errors?.code_massar}
                          </span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            E-mail <span className="login-danger">*</span>
                          </label>
                          <input
                            name="email"
                            className="form-control"
                            type="text"
                            defaultValue={student?.email}
                          />
                          <span className="text-danger">{errors?.email}</span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Genre <span className="login-danger">*</span>
                          </label>
                          <select
                            className="form-control select"
                            defaultValue={student?.gender}
                            name="gender"
                          >
                            <option value={""}>Sélectionnez le genre</option>
                            <option value={"male"}>Masculin</option>
                            <option value={"female"}>Féminin</option>
                          </select>
                          <span className="text-danger">{errors?.gender}</span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Date de naissance
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            name="date_of_birth"
                            className="form-control datetimepicker"
                            type="date"
                            placeholder="JJ-MM-AAAA"
                            defaultValue={student?.date_of_birth}
                          />
                          <span className="text-danger">
                            {errors?.date_of_birth}
                          </span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12">
                        <div className="form-group local-forms">
                          <label>Address</label>
                          <input
                            name="address"
                            className="form-control"
                            placeholder="Veuillez entrer votre adresse"
                            type="text"
                            defaultValue={student?.address}
                          />
                          <span className="text-danger">{errors?.address}</span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>Blood Type</label>
                          <select
                            defaultValue={student?.blood_type}
                            className="form-control select"
                            name="blood_type"
                          >
                            <option value={""}>
                              Veuillez sélectionner un blood type
                            </option>
                            <option
                              value="A+"
                              defaultValue={student?.blood_type}
                            >
                              A+
                            </option>
                            <option
                              value="A-"
                              defaultValue={student?.blood_type}
                            >
                              A-
                            </option>
                            <option
                              value="B+"
                              defaultValue={student?.blood_type}
                            >
                              B+
                            </option>
                            <option
                              value="B-"
                              defaultValue={student?.blood_type}
                            >
                              B-
                            </option>
                            <option
                              value="AB+"
                              defaultValue={student?.blood_type}
                            >
                              AB+
                            </option>
                            <option
                              value="AB-"
                              defaultValue={student?.blood_type}
                            >
                              AB-
                            </option>
                            <option
                              value="O+"
                              defaultValue={student?.blood_type}
                            >
                              O+
                            </option>
                            <option
                              value="O-"
                              defaultValue={student?.blood_type}
                            >
                              O-
                            </option>
                          </select>
                          <span className="text-danger">
                            {errors?.blood_type}
                          </span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>health status</label>
                          <select
                            defaultValue={student?.health_status}
                            name="health_status"
                            className="form-control select"
                          >
                            <option value={""}>
                              Veuillez sélectionner une health status
                            </option>
                            <option value={"good"}>good</option>
                            <option value={"middle"}>middle</option>
                            <option value={"bad"}>bad</option>
                          </select>
                          <span className="text-danger">
                            {errors?.health_status}
                          </span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Téléphone <span className="login-danger">*</span>
                          </label>

                          <input
                            name="phone_number"
                            className="form-control"
                            type="text"
                            defaultValue={student?.phone_number}
                          />
                          <span className="text-danger">
                            {errors?.phone_number}
                          </span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Classe <span className="login-danger">*</span>
                          </label>
                          <Select
                            options={classeOptions}
                            placeholder="Veuillez sélectionner une classe"
                            isSearchable={true}
                            value={classeOptions.find(
                              (option) =>
                                dcryptID(option.value) == student.classe.id
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="student-submit">
                          <button type="submit" className="btn btn-primary">
                            Modifier
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="w-100 d-flex justify-content-center align-items-center my-5 py-5">
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

export default UpdateStudent;
