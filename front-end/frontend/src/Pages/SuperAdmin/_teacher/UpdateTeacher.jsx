import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContextApi } from "../../../config/Context/ContextApi";
import dcryptID from "../../../config/security/dcryptID";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import LoadingCircle from "../../../Components/LoadingCircle";
import { useTeachersContext } from "../../../Functions/TeacherContext";

const UpdateTeacher = () => {
  const { teacher, errors, navigateTo, setErrors } = useContextApi();
  const [loading, setLoading] = useState(true);
  const [loadingForm, setloadingForm] = useState(false);
  const { getTeacher, updateTeacher } = useTeachersContext();
  const { id } = useParams();

  const fetchData = async () => {
    if (dcryptID(id) === null) {
      navigateTo("/error/404");
    }
    await getTeacher(dcryptID(id));
    setLoading(false);
  };

  useEffect(() => {
    setErrors(null);
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setloadingForm(true);
    updateTeacher(dcryptID(id), {
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
                <h3 className="page-title">Modifier un administrateur</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">administrateurs</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Modifier un administrateur
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
                            defaultValue={teacher.first_name}
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
                            defaultValue={teacher.last_name}
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
                            defaultValue={teacher.cin}
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
                            defaultValue={teacher.email}
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
                            defaultValue={teacher.gender}
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
                            defaultValue={teacher.date_of_birth}
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
                            defaultValue={teacher.address}
                          />
                          <span className="text-danger">{errors?.address}</span>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>Blood Type</label>
                          <select
                            defaultValue={teacher.blood_type}
                            className="form-control select"
                            name="blood_type"
                          >
                            <option value={""}>
                              Veuillez sélectionner un blood type
                            </option>
                            <option
                              value="A+"
                              defaultValue={teacher.blood_type}
                            >
                              A+
                            </option>
                            <option
                              value="A-"
                              defaultValue={teacher.blood_type}
                            >
                              A-
                            </option>
                            <option
                              value="B+"
                              defaultValue={teacher.blood_type}
                            >
                              B+
                            </option>
                            <option
                              value="B-"
                              defaultValue={teacher.blood_type}
                            >
                              B-
                            </option>
                            <option
                              value="AB+"
                              defaultValue={teacher.blood_type}
                            >
                              AB+
                            </option>
                            <option
                              value="AB-"
                              defaultValue={teacher.blood_type}
                            >
                              AB-
                            </option>
                            <option
                              value="O+"
                              defaultValue={teacher.blood_type}
                            >
                              O+
                            </option>
                            <option
                              value="O-"
                              defaultValue={teacher.blood_type}
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
                            defaultValue={teacher.health_status}
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
                            defaultValue={teacher.phone_number}
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

export default UpdateTeacher;
