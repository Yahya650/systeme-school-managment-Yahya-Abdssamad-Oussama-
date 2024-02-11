import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContextApi } from "../../../Context/ContextApi";
import LoadingCircle from "../../../Components/LoadingCircle";
import { useCrudTeachers } from "../../../Functions/CRUD_Teachers";

const CreateTeacher = () => {
  const { errors } = useContextApi();
  const [loadingForm, setloadingForm] = useState(false);
  const { createTeacher } = useCrudTeachers();

  const handleSubmit = (e) => {
    e.preventDefault();
    setloadingForm(true);
    createTeacher({
      cin: e.target.cin.value.toUpperCase(),
      email: e.target.email.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      phone_number: e.target.phone_number.value,
      address: e.target.address.value,
      gender: e.target.gender.value,
      date_of_birth: e.target.date_of_birth.value,
      blood_type: e.target.blood_type.value,
      health_status: e.target.health_status.value,
    }).then(() => {
      setloadingForm(false);
    });
  };

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">Ajouter des étudiants</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Étudiant</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Ajouter des étudiants
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
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <h5 className="form-title student-info">
                        Informations sur administrateur
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
                          placeholder="Veuillez saisir votre Prénom"
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
                          placeholder="Veuillez saisir votre Nom de famille"
                        />
                        <span className="text-danger">{errors?.last_name}</span>
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
                          placeholder="Veuillez saisir votre CIN"
                        />
                        <span className="text-danger">{errors?.cin}</span>
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
                          placeholder="Veuillez saisir votre E-mail"
                        />
                        <span className="text-danger">{errors?.email}</span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Genre <span className="login-danger">*</span>
                        </label>
                        <select className="form-control select" name="gender">
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
                        />
                        <span className="text-danger">{errors?.address}</span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>Blood Type</label>
                        <select
                          className="form-control select"
                          name="blood_type"
                        >
                          <option value={""}>
                            Veuillez sélectionner un blood type
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
                          placeholder="Veuillez entrer votre numéro de téléphone"
                        />
                        <span className="text-danger">
                          {errors?.phone_number}
                        </span>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="student-submit">
                        <button
                          type="submit"
                          disabled={loadingForm}
                          className="btn btn-primary"
                        >
                          {loadingForm ? <LoadingCircle /> : "Ajouter"}
                        </button>
                        <Link
                          to={"/super-admin/all-teachers"}
                          className="border border-2 btn ms-2 rounded-4 bg-danger-light"
                        >
                          Annuler
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacher;
