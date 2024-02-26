import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContextApi } from "../../../config/Context/ContextApi";
import { useAdminContext } from "../../../Functions/AdminContext";
import LoadingCircle from "../../../Components/LoadingCircle";
import { AxiosClient } from "../../../config/Api/AxiosClient";
import cryptID from "../../../config/security/cryptID";

const CreateAdmin = () => {
  const { errors, navigateTo } = useContextApi();
  const [schoolLevels, setSchoolLevels] = useState(null);
  const [loadingForm, setloadingForm] = useState(false);
  const { createAdmin } = useAdminContext();
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [formData, setFormData] = useState([]);

  const handleLevelCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedLevels([...selectedLevels, id]);
    } else {
      setSelectedLevels(selectedLevels.filter((levelId) => levelId !== id));
      setFormData(formData.filter((data) => data.school_level_id !== id));
    }
  };

  const handleTypeCheckboxChange = (e, type, levelId) => {
    const { checked } = e.target;
    const index = formData.findIndex(
      (data) => data.school_level_id === levelId
    );
    if (index !== -1) {
      if (checked) {
        const updatedTypes = [...formData[index].types, type];
        const updatedData = { ...formData[index], types: updatedTypes };
        setFormData([
          ...formData.slice(0, index),
          updatedData,
          ...formData.slice(index + 1),
        ]);
      } else {
        const updatedTypes = formData[index].types.filter((t) => t !== type);
        if (updatedTypes.length > 0) {
          const updatedData = { ...formData[index], types: updatedTypes };
          setFormData([
            ...formData.slice(0, index),
            updatedData,
            ...formData.slice(index + 1),
          ]);
        } else {
          setFormData([
            ...formData.slice(0, index),
            ...formData.slice(index + 1),
          ]);
        }
      }
    } else {
      if (checked) {
        setFormData([...formData, { school_level_id: levelId, types: [type] }]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloadingForm(true);
    createAdmin({
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
      responsibility: formData,
    }).then(() => {
      setloadingForm(false);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AxiosClient.get("/super-admin/school_levels");
      setSchoolLevels(data);
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

                    <div className="col-12 col-sm-12">
                      <table className="table mb-5 table-bordered">
                        <thead>
                          <tr>
                            <th>Level Schools</th>
                            <th>Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schoolLevels?.map((schoolLevel, i) => (
                            <tr key={i}>
                              <td>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name={schoolLevel.name}
                                  id={"level" + schoolLevel.id}
                                  value={cryptID(schoolLevel.id)}
                                  onChange={(e) =>
                                    handleLevelCheckboxChange(e, schoolLevel.id)
                                  }
                                />
                                <label htmlFor={"level" + schoolLevel.id}>
                                  {schoolLevel.name}
                                </label>
                              </td>
                              <td>
                                {selectedLevels.includes(schoolLevel.id) && (
                                  <div className="d-flex justify-content-evenly align-item-center gap-2">
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name={"type" + schoolLevel.id}
                                        id={"financial" + schoolLevel.id}
                                        value={"financial"}
                                        onChange={(e) =>
                                          handleTypeCheckboxChange(
                                            e,
                                            "financial",
                                            schoolLevel.id
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={"financial" + schoolLevel.id}
                                      >
                                        Financiel
                                      </label>
                                    </div>
                                    <div>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name={"type" + schoolLevel.id}
                                        id={"educational" + schoolLevel.id}
                                        value={"educational"}
                                        onChange={(e) =>
                                          handleTypeCheckboxChange(
                                            e,
                                            "educational",
                                            schoolLevel.id
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={"educational" + schoolLevel.id}
                                      >
                                        Educationel
                                      </label>
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
