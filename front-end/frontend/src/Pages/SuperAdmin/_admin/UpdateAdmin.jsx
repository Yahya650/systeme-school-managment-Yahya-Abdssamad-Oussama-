import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContextApi } from "../../../config/Context/ContextApi";
import { useAdminContext } from "../../../Functions/AdminContext";
import dcryptID from "../../../config/security/dcryptID";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import LoadingCircle from "../../../Components/LoadingCircle";
import { AxiosClient } from "../../../config/Api/AxiosClient";
import cryptID from "../../../config/security/cryptID";
const UpdateAdmin = () => {
  const { admin, errors, navigateTo, setErrors } = useContextApi();
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const { getAdmin, updateAdmin } = useAdminContext();
  const { id } = useParams();
  const [schoolLevels, setSchoolLevels] = useState(null);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (dcryptID(id) === null) {
        navigateTo("/error/404");
      }
      await getAdmin(dcryptID(id));
    };
    fetchData();
  }, []);

  useEffect(() => {
    setErrors(null);
    const fetchData = async () => {
      const { data } = await AxiosClient.get("/super-admin/school_levels");
      setSchoolLevels(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (admin && admin?.school_levels) {
      const updatedFormData = admin?.school_levels.map((level) => ({
        school_level_id: level.id,
        types: JSON.parse(level.pivot.types),
      }));
      setFormData(updatedFormData);
    }
  }, [admin]);

  const handleLevelCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedLevels([...selectedLevels, id]);
      setFormData([...formData, { school_level_id: id, types: [] }]);
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

  useEffect(() => {
    setErrors(null);
    const fetchData = async () => {
      const { data } = await AxiosClient.get("/super-admin/school_levels");
      setSchoolLevels(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (admin && admin?.school_levels) {
      const updatedFormData = admin?.school_levels.map((level) => ({
        school_level_id: level.id,
        types: JSON.parse(level.pivot.types),
      }));
      setFormData(updatedFormData);
    }
  }, [admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingForm(true);
    try {
      await updateAdmin(dcryptID(id), {
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
        responsibility: formData.length > 0 ? formData : null,
      });
    } catch (error) {
      console.error("Error updating admin:", error);
      setErrors(error.response.data.errors);
    }
    setLoadingForm(false);
  };

  return (
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
                          defaultValue={admin?.first_name}
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
                          defaultValue={admin?.last_name}
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
                          defaultValue={admin?.cin}
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
                          defaultValue={admin?.email}
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
                          defaultValue={admin?.gender}
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
                          defaultValue={admin?.date_of_birth}
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
                          defaultValue={admin?.address}
                        />
                        <span className="text-danger">{errors?.address}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>Blood Type</label>
                        <select
                          defaultValue={admin?.blood_type}
                          className="form-control select"
                          name="blood_type"
                        >
                          <option value={""}>
                            Veuillez sélectionner un blood type
                          </option>
                          <option value="A+" defaultValue={admin?.blood_type}>
                            A+
                          </option>
                          <option value="A-" defaultValue={admin?.blood_type}>
                            A-
                          </option>
                          <option value="B+" defaultValue={admin?.blood_type}>
                            B+
                          </option>
                          <option value="B-" defaultValue={admin?.blood_type}>
                            B-
                          </option>
                          <option value="AB+" defaultValue={admin?.blood_type}>
                            AB+
                          </option>
                          <option value="AB-" defaultValue={admin?.blood_type}>
                            AB-
                          </option>
                          <option value="O+" defaultValue={admin?.blood_type}>
                            O+
                          </option>
                          <option value="O-" defaultValue={admin?.blood_type}>
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
                          defaultValue={admin?.health_status}
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
                          defaultValue={admin?.phone_number}
                        />
                        <span className="text-danger">
                          {errors?.phone_number}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12">
                      <table className="table mb-2 table-bordered">
                        <thead>
                          <tr>
                            <th>Level Schools</th>
                            <th>Types</th>
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
                                  checked={formData.some(
                                    (school_level) =>
                                      school_level.school_level_id ===
                                      schoolLevel.id
                                  )}
                                />
                                <label htmlFor={"level" + schoolLevel.id}>
                                  {schoolLevel.name}
                                </label>
                              </td>
                              <td>
                                {formData.some(
                                  (sl) =>
                                    sl.school_level_id === schoolLevel.id ||
                                    selectedLevels.includes(schoolLevel.id)
                                ) && (
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
                                        checked={formData.some(
                                          (data) =>
                                            data.school_level_id ===
                                              schoolLevel.id &&
                                            data.types.includes("financial")
                                        )}
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
                                        checked={formData.some(
                                          (data) =>
                                            data.school_level_id ===
                                              schoolLevel.id &&
                                            data.types.includes("educational")
                                        )}
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
                      <span className="text-danger">
                        {errors?.responsibility}
                      </span>
                    </div>
                    <div className="col-12 mt-3">
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
  );
};

export default UpdateAdmin;
