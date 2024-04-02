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
  const {
    getStudent,
    updateStudentWithParent,
    updateStudent,
    updateStudentWithCreateParent,
  } = useStudentContext();
  const [parentOptions, setParentOptions] = useState([]);
  const [showFormParent, setShowFormParent] = useState(false);
  const { updateParent } = useParentContext();
  const [userNameStudent, setUserNameStudent] = useState(null);
  const [lastNameStudent, setLastNameStudent] = useState(null);
  const [showFormParentModifier, setLastNameStudentModifier] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (dcryptID(id) === null) {
        navigateTo("/error/404");
      }

      await getStudent(dcryptID(id));

      const parents = await AxiosClient.get("/admin/student-parents");
      const options1 = parents.data.map((parent) => ({
        value: cryptID(parent.id),
        label: `${parent.cin} - ${parent.last_name} ${parent.first_name}`,
      }));
      setParentOptions(options1);

      const classes = await AxiosClient.get("/admin/classes");
      const options = classes.data.map((classe) => ({
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

  useEffect(() => {
    if (student) {
      setUserNameStudent(student.code_massar);
      setLastNameStudent(student.last_name);
    }
  }, [student]);

  const hendleFormParent = (e) => {
    if (e.value === "Create nouveau Parent") {
      setLastNameStudentModifier(false);
      setShowFormParent(true);
    } else if (e.value === "Son Père") {
      setShowFormParent(false);
      setLastNameStudentModifier(true);
    } else {
      setShowFormParent(false);
      setLastNameStudentModifier(false);
    }
  };

  const handleSubmit = async (e) => {
    setLoadingForm(true);
    e.preventDefault();
    if (showFormParentModifier) {
      await updateStudentWithParent(student.id, {
        // student data
        cin: e.target.cin[0].value?.toUpperCase(),
        code_massar: e.target.code_massar.value.toUpperCase(),
        email: e.target.code_massar.value.toUpperCase() + "@taalim.ma",
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
    } else if (showFormParent) {
      await updateStudentWithCreateParent(student.id, {
        // student data
        cin: e.target.cin[0].value?.toUpperCase(),
        code_massar: e.target.code_massar.value.toUpperCase(),
        email: e.target.code_massar.value.toUpperCase() + "@taalim.ma",
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
    } else {
      updateStudent(student.id, {
        // student data
        cin: e.target.cin.value?.toUpperCase(),
        code_massar: e.target.code_massar.value.toUpperCase(),
        email: e.target.code_massar.value.toUpperCase() + "@taalim.ma",
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        phone_number: e.target.phone_number.value,
        address: e.target.address.value,
        gender: e.target.gender.value,
        date_of_birth: e.target.date_of_birth.value,
        blood_type: e.target.blood_type.value,
        health_status: e.target.health_status.value,
        classe_id: dcryptID(e.target.classe_id.value),
        student_parent_id: dcryptID(e.target.student_parent_id.value),
      });
    }
    setLoadingForm(false);
  };

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col-sm-12">
            <div className="page-sub-header">
              <h3 className="page-title">Modifier des étudiants</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin/students">Étudiant</Link>
                </li>
                <li className="breadcrumb-item active">
                  Modifier des étudiants
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
                    <div
                      className="col-12 col-sm-8"
                      styles={{
                        menu: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    >
                      <div className="form-group local-forms">
                        <label>
                          Classe <span className="login-danger">*</span>
                        </label>
                        <Select
                          name="classe_id"
                          isLoading={loading}
                          options={classeOptions}
                          placeholder="Rechercher la classe..."
                          defaultValue={classeOptions.find(
                            (option) =>
                              dcryptID(option.value) == student.classe.id
                          )}
                        />
                        <span className="text text-danger">
                          {errors?.classe_id}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Frais mensuels(DH) <span className="login-danger">*</span>
                        </label>
                        <input
                          name="monthly_fee"
                          className={
                            "form-control" +
                            (errors?.monthly_fee ? " is-invalid" : "")
                          }
                          type="text"
                          placeholder="Saisir le frais mensuels"
                          defaultValue={student?.monthlyFee.amount}
                        />
                        <span className="text-danger">
                          {errors?.monthly_fee}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Code Massar <span className="login-danger">*</span>
                        </label>
                        <input
                          name="code_massar"
                          className={
                            "form-control" +
                            (errors?.code_massar ? " is-invalid" : "")
                          }
                          type="text"
                          onChange={(e) => setUserNameStudent(e.target.value)}
                          placeholder="Saisir le code massar"
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
                          UserName<span className="login-danger">*</span>
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            name="email"
                            disabled
                            className={
                              "form-control" +
                              (errors?.email ? " is-invalid" : "")
                            }
                            placeholder="Saisir username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={userNameStudent}
                          />
                          <span className="input-group-text" id="basic-addon2">
                            @taalim.ma
                          </span>
                        </div>
                        <span className="text-danger">{errors?.email}</span>
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
                          className={
                            "form-control datetimepicker" +
                            (errors?.date_of_birth ? " is-invalid" : "")
                          }
                          type="date"
                          placeholder="Saisir la date de naissance"
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
                          Nom de famille
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          name="last_name"
                          className={
                            "form-control" +
                            (errors?.last_name ? " is-invalid" : "")
                          }
                          type="text"
                          onChange={(e) => setLastNameStudent(e.target.value)}
                          placeholder="Saisir le nom de famille"
                          defaultValue={student?.last_name}
                        />
                        <span className="text-danger">{errors?.last_name}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Prénom<span className="login-danger">*</span>
                        </label>
                        <input
                          name="first_name"
                          className={
                            "form-control" +
                            (errors?.first_name ? " is-invalid" : "")
                          }
                          type="text"
                          placeholder="Saisir le prénom"
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
                          Gender <span className="login-danger">*</span>
                        </label>
                        <select
                          className={
                            "form-control select" +
                            (errors?.gender ? " is-invalid" : "")
                          }
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
                    <div className="col-12 col-sm-12">
                      <div className="form-group local-forms">
                        <label>Address</label>
                        <input
                          name="address"
                          className={
                            "form-control" +
                            (errors?.address ? " is-invalid" : "")
                          }
                          placeholder="Veuillez entrer votre adresse (optionnel)"
                          type="text"
                          defaultValue={student?.address}
                        />
                        <span className="text-danger">{errors?.address}</span>
                      </div>
                    </div>
                    <div
                      className="col-8 col-sm-8"
                      styles={{
                        menu: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    >
                      <div className="form-group local-forms">
                        <label>
                          Parents <span className="login-danger">*</span>
                        </label>
                        <Select
                          onChange={hendleFormParent}
                          name="student_parent_id"
                          isLoading={loading}
                          options={[
                            {
                              value: "Create nouveau Parent",
                              label: "Create nouveau Parent",
                            },
                            {
                              value: "Son Père",
                              label: "Son Père",
                            },
                            ...parentOptions.filter(
                              (option) =>
                                dcryptID(option.value) !==
                                student?.student_parent_id
                            ),
                          ]}
                          defaultValue={{
                            value: "Son Père",
                            label: "Son Père",
                          }}
                          placeholder="Veuillez sélectionner une Parent"
                          isSearchable={true}
                        />
                        <span className="text text-danger">
                          {errors &&
                            !showFormParent &&
                            errors?.student_parent_id}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>Blood Type</label>
                        <select
                          placeholder=""
                          className={
                            "form-control select" +
                            (errors?.blood_type ? " is-invalid" : "")
                          }
                          name="blood_type"
                          defaultValue={student?.blood_type}
                        >
                          <option value="">
                            Selezionnez le blood type (optionnel)
                          </option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
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
                          placeholder=""
                          name="health_status"
                          className={
                            "form-control select" +
                            (errors?.health_status ? " is-invalid" : "")
                          }
                          defaultValue={student?.health_status}
                        >
                          <option value="">
                            Selezionnez le health status (optionnel)
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
                        <label>Téléphone</label>
                        <input
                          name="phone_number"
                          className={
                            "form-control" +
                            (errors?.phone_number ? " is-invalid" : "")
                          }
                          type="text"
                          placeholder="Saisir le numéro de téléphone (optionnel)"
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
                          className={
                            "form-control" + (errors?.cin ? " is-invalid" : "")
                          }
                          type="text"
                          placeholder="Saisir le CIN (optionnel)"
                          defaultValue={student?.cin}
                        />
                        <span className="text-danger">{errors?.cin}</span>
                      </div>
                    </div>
                  </div>

                  {showFormParent ? (
                    <div className="content container-fluid">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="card comman-shadow border bordered-2">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-12">
                                  <h5 className="form-title student-info">
                                    Create nouveau Parent
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
                                      className={
                                        "form-control" +
                                        (errors?.parent_cin
                                          ? " is-invalid"
                                          : "")
                                      }
                                      type="text"
                                      placeholder="Saisir le CIN"
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
                                      className={
                                        "form-control" +
                                        (errors?.parent_first_name
                                          ? " is-invalid"
                                          : "")
                                      }
                                      type="text"
                                      placeholder="Saisir le prénom"
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
                                      className={
                                        "form-control" +
                                        (errors?.parent_last_name
                                          ? " is-invalid"
                                          : "")
                                      }
                                      type="text"
                                      defaultValue={
                                        lastNameStudent ? lastNameStudent : null
                                      }
                                      placeholder="Saisir le nom de famille"
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
                                      className={
                                        "form-control" +
                                        (errors?.parent_email
                                          ? " is-invalid"
                                          : "")
                                      }
                                      type="text"
                                      placeholder="Saisir l'email"
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
                                      className={
                                        "form-control select" +
                                        (errors?.parent_gender
                                          ? " is-invalid"
                                          : "")
                                      }
                                      name="gender"
                                    >
                                      <option value={""}>
                                        Sélectionnez le Gender
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
                                      className={
                                        "form-control datetimepicker" +
                                        (errors?.parent_date_of_birth
                                          ? " is-invalid"
                                          : "")
                                      }
                                      type="date"
                                      placeholder="Saisir la date de naissance"
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
                                      className={
                                        "form-control" +
                                        (errors?.parent_phone_number
                                          ? " is-invalid"
                                          : "")
                                      }
                                      type="text"
                                      placeholder="Saisir le numéro de telephone"
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
                                      className={
                                        "form-control select" +
                                        (errors?.parent_blood_type
                                          ? " is-invalid"
                                          : "")
                                      }
                                      name="blood_type"
                                    >
                                      <option value={""}>
                                        Sélectionner un blood type (optionnel)
                                      </option>
                                      <option value="A+">A+</option>
                                      <option value="A-">A-</option>
                                      <option value="B+">B+</option>
                                      <option value="B-">B-</option>
                                      <option value="AB+">AB+</option>
                                      <option value="AB-">AB-</option>
                                      <option value="O+">O+</option>
                                      <option value="O-">O-</option>
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
                                      name="health_status"
                                      className={
                                        "form-control select" +
                                        (errors?.parent_health_status
                                          ? " is-invalid"
                                          : "")
                                      }
                                    >
                                      <option value={""}>
                                        Sélectionner une health status
                                        (optionnel)
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
                                      className={
                                        "form-control" +
                                        (errors?.parent_address
                                          ? " is-invalid"
                                          : "")
                                      }
                                      placeholder="Veuillez entrer votre adresse (optionnel)"
                                      type="text"
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
                  ) : (
                    showFormParentModifier && (
                      <div className="content container-fluid">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="card comman-shadow border bordered-2">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-12">
                                    <h5 className="form-title student-info">
                                      Modifier Parent
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
                                        className={
                                          "form-control" +
                                          (errors?.parent_cin
                                            ? " is-invalid"
                                            : "")
                                        }
                                        type="text"
                                        placeholder="Saisir le CIN"
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
                                        className={
                                          "form-control" +
                                          (errors?.parent_first_name
                                            ? " is-invalid"
                                            : "")
                                        }
                                        type="text"
                                        placeholder="Saisir le prénom"
                                        defaultValue={
                                          student?.parent.first_name
                                        }
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
                                        className={
                                          "form-control" +
                                          (errors?.parent_last_name
                                            ? " is-invalid"
                                            : "")
                                        }
                                        type="text"
                                        defaultValue={student?.parent.last_name}
                                        placeholder="Saisir le nom de famille"
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
                                        className={
                                          "form-control" +
                                          (errors?.parent_email
                                            ? " is-invalid"
                                            : "")
                                        }
                                        type="text"
                                        placeholder="Saisir l'email"
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
                                        className={
                                          "form-control select" +
                                          (errors?.parent_gender
                                            ? " is-invalid"
                                            : "")
                                        }
                                        name="gender"
                                        defaultValue={student?.parent.gender}
                                      >
                                        <option value={""}>
                                          Sélectionnez le Gender
                                        </option>
                                        <option value={"male"}>Masculin</option>
                                        <option value={"female"}>
                                          Féminin
                                        </option>
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
                                        className={
                                          "form-control datetimepicker" +
                                          (errors?.parent_date_of_birth
                                            ? " is-invalid"
                                            : "")
                                        }
                                        type="date"
                                        placeholder="Saisir la date de naissance"
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
                                        className={
                                          "form-control" +
                                          (errors?.parent_phone_number
                                            ? " is-invalid"
                                            : "")
                                        }
                                        type="text"
                                        placeholder="Saisissez le numéro de telephone"
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
                                        className={
                                          "form-control select" +
                                          (errors?.parent_blood_type
                                            ? " is-invalid"
                                            : "")
                                        }
                                        name="blood_type"
                                        defaultValue={
                                          student?.parent.blood_type
                                        }
                                      >
                                        <option value={""}>
                                          Sélectionner un blood type (optionnel)
                                        </option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
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
                                        name="health_status"
                                        className={
                                          "form-control select" +
                                          (errors?.parent_health_status
                                            ? " is-invalid"
                                            : "")
                                        }
                                        defaultValue={
                                          student?.parent.health_status
                                        }
                                      >
                                        <option value={""}>
                                          Sélectionner une health status
                                          (optionnel)
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
                                        className={
                                          "form-control" +
                                          (errors?.parent_address
                                            ? " is-invalid"
                                            : "")
                                        }
                                        placeholder="Veuillez entrer votre adresse (optionnel)"
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
                    )
                  )}

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
  );
};

export default UpdateStudent;
