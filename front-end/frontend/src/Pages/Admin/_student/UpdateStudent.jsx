import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dcryptID from "../../../config/security/dcryptID";
import { useContextApi } from "../../../config/Context/ContextApi";
import { useStudentContext } from "../../../Functions/StudentContext";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import { AxiosClient } from "../../../config/Api/AxiosClient";
import cryptID from "../../../config/security/cryptID";
import Select from "react-select";
import LoadingCircle from "./../../../Components/LoadingCircle";
import { useParentContext } from "../../../Functions/ParentContext";

const UpdateStudent = () => {
  const { student, errors, navigateTo } = useContextApi();
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [classeOptions, setClasseOptions] = useState([]);
  const { getStudent, updateStudentWithParent } = useStudentContext();
  const { updateParent } = useParentContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (dcryptID(id) === null) {
        navigateTo("/error/404");
      }

      const { data } = await AxiosClient.get("/admin/classes");

      await getStudent(dcryptID(id));
      const options = data.map((classe) => ({
        value: cryptID(classe.id),
        label:
          classe.filiere_id !== null
            ? `${classe.code} ${classe.classe_type.school_level.name}-${classe.classe_type.name} - (${classe.filiere.name})`
            : `${classe.code} ${classe.classe_type.school_level.name}-${classe.classe_type.name}`,
      }));

      setClasseOptions(options);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingForm(true);
    await updateStudentWithParent(student.id, {
      // student data
      cin: e.target.cin[0].value?.toUpperCase(),
      code_massar: e.target.code_massar.value.toUpperCase(),
      email: e.target.email[0].value,
      first_name: e.target.first_name[0].value,
      last_name: e.target.last_name[0].value,
      phone_number: e.target.phone_number[0].value,
      address: e.target.address[0].value,
      gender: e.target.gender[0].value,
      date_of_birth: e.target.date_of_birth[0].value,
      blood_type: e.target.blood_type[0].value,
      health_status: e.target.health_status[0].value,
      classe_id: dcryptID(e.target.classe_id.value),

      // parent data
      parent_cin: e.target.cin[1].value?.toUpperCase(),
      parent_email: e.target.email[1].value,
      parent_first_name: e.target.first_name[1].value,
      parent_last_name: e.target.last_name[1].value,
      parent_phone_number: e.target.phone_number[1].value,
      parent_address: e.target.address[1].value,
      parent_gender: e.target.gender[1].value,
      parent_date_of_birth: e.target.date_of_birth[1].value,
      parent_blood_type: e.target.blood_type[1].value,
      parent_health_status: e.target.health_status[1].value,
    });
    setLoadingForm(false);
  };

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
                  <form onSubmit={(e) => handleSubmit(e)}>
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
                      <div className="col-12 col-sm-8" style={{ zIndex: 999 }}>
                        <div className="form-group local-forms">
                          <label>
                            Classe <span className="login-danger">*</span>
                          </label>
                          <Select
                            name="classe_id"
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
                            Gender <span className="login-danger">*</span>
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
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Téléphone
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
                          <label>CIN</label>
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
                            E-mail{" "}
                            {/* <span className="login-danger">*</span> */}
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
                      <div className="col-12 col-sm-8">
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

                      <div className="col-12 col-sm-8">
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
                    </div>

                    <div className="content container-fluid">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="card comman-shadow border bordered-2">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-12">
                                  <h5 className="form-title student-info">
                                    Modifier les renseignements sur le Parent
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
                                      CIN{" "}
                                      <span className="login-danger">*</span>
                                    </label>
                                    <input
                                      name="cin"
                                      className="form-control"
                                      type="text"
                                      defaultValue={student?.parent.cin}
                                    />
                                    <span className="text-danger">
                                      {errors?.parent_cin}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                  <div className="form-group local-forms">
                                    <label>
                                      Prénom
                                      <span className="login-danger">*</span>
                                    </label>
                                    <input
                                      name="first_name"
                                      className="form-control"
                                      type="text"
                                      defaultValue={student?.parent.first_name}
                                    />
                                    <span className="text-danger">
                                      {errors?.parent_first_name}
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
                                      defaultValue={student?.parent.last_name}
                                    />
                                    <span className="text-danger">
                                      {errors?.parent_last_name}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                  <div className="form-group local-forms">
                                    <label>
                                      E-mail{" "}
                                      <span className="login-danger">*</span>
                                    </label>
                                    <input
                                      name="email"
                                      className="form-control"
                                      type="text"
                                      defaultValue={student?.parent.email}
                                    />
                                    <span className="text-danger">
                                      {errors?.parent_email}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                  <div className="form-group local-forms">
                                    <label>
                                      Gender{" "}
                                      <span className="login-danger">*</span>
                                    </label>
                                    <select
                                      className="form-control select"
                                      defaultValue={student?.parent.gender}
                                      name="gender"
                                    >
                                      <option value={""}>
                                        Sélectionnez le genre
                                      </option>
                                      <option value={"male"}>Masculin</option>
                                      <option value={"female"}>Féminin</option>
                                    </select>
                                    <span className="text-danger">
                                      {errors?.parent_gender}
                                    </span>
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
                                      defaultValue={
                                        student?.parent.date_of_birth
                                      }
                                    />
                                    <span className="text-danger">
                                      {errors?.parent_date_of_birth}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                  <div className="form-group local-forms">
                                    <label>
                                      Téléphone{" "}
                                      <span className="login-danger">*</span>
                                    </label>

                                    <input
                                      name="phone_number"
                                      className="form-control"
                                      type="text"
                                      defaultValue={
                                        student?.parent.phone_number
                                      }
                                    />
                                    <span className="text-danger">
                                      {errors?.parent_phone_number}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                  <div className="form-group local-forms">
                                    <label>Blood Type</label>
                                    <select
                                      defaultValue={student?.parent.blood_type}
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
                                      {errors?.parent_blood_type}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                  <div className="form-group local-forms">
                                    <label>health status</label>
                                    <select
                                      defaultValue={
                                        student?.parent.health_status
                                      }
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
                                      {errors?.parent_health_status}
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
                                      defaultValue={student?.parent.address}
                                    />
                                    <span className="text-danger">
                                      {errors?.parent_address}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="student-submit d-flex justify-content-center gap-2">
                        <button
                          type="submit"
                          disabled={loadingForm}
                          className="btn btn-primary"
                        >
                          {loadingForm ? <LoadingCircle /> : "Modifier"}
                        </button>
                        <button
                          type="button"
                          onClick={() => navigateTo(-1)}
                          className="border border-2 btn bg-danger-light"
                          style={{
                            minWidth: "160px",
                            borderRadius: "10px",
                          }}
                        >
                          Annuler
                        </button>
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
