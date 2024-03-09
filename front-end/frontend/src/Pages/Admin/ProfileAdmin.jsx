import React, { useEffect, useState } from "react";
import { useContextApi } from "../../config/Context/ContextApi";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../config/Api/AxiosClient";
import LoadingCircle from "../../Components/LoadingCircle";
import _footer from "./../../Layouts/_footer";
import LoadingCircleContext from "../../Components/LoadingCircleContext";

const ProfileAdmin = () => {
  const {
    user,
    calculateAge,
    changePassword,
    errors,
    updateProfilePictureAuth,
    loadingProfilePictureAuth,
    updateProfile,
    getUserProfile,
  } = useContextApi();
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [showFormUpdateProfile, setShowFormUpdateProfile] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FormData = {
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
    };
    setLoadingForm(true);
    const state = await updateProfile("admin", FormData);
    if (state) setShowFormUpdateProfile(false);
    setLoadingForm(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      await getUserProfile(false);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Profile</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Profile</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        {!loading ? (
          <div className="col-md-12">
            <div className="profile-header rounded-top">
              <div className="row align-items-center">
                <div
                  className="col-auto profile-image profile-user-img"
                  style={{ top: "0px" }}
                >
                  <img
                    style={{
                      border: "0px",
                      height: "120px",
                    }}
                    width={"120px"}
                    src={
                      user?.profile_picture
                        ? BACKEND_URL + "/storage/" + user?.profile_picture
                        : user?.gender == "male"
                        ? "/assets/img/default-profile-picture-grey-male-icon.png"
                        : "/assets/img/default-profile-picture-grey-female-icon.png"
                    }
                    alt="Profile"
                  />
                  <div
                    className="form-group students-up-files profile-edit-icon mb-0"
                    style={{ bottom: "-8px" }}
                  >
                    <div className="uplod d-flex">
                      <label className="file-upload profile-upbtn mb-0">
                        <i className="feather-edit-3"></i>
                        {loadingProfilePictureAuth && <LoadingCircle />}
                        <input
                          disabled={loadingProfilePictureAuth}
                          className="upload"
                          type="file"
                          accept="image/jpeg, image/png, image/jpg"
                          onChange={async (e) => {
                            await updateProfilePictureAuth(
                              "admin",
                              e.target.files[0]
                            );
                          }}
                          name="profile_picture"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col ms-md-n2 profile-user-info">
                  <h4 className="user-name mb-0">
                    {user?.last_name + " " + user?.first_name}
                  </h4>
                  <h6 className="text-muted">Membre de la direction</h6>
                  <div className="user-Location">
                    <i className="fas fa-map-marker-alt" /> {user?.address}
                  </div>
                </div>
                <div className="col-auto profile-btn">
                  <Link href className="btn btn-primary">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <div className="profile-menu rounded-bottom">
              <ul className="nav nav-tabs nav-tabs-solid">
                <li className="nav-item">
                  <Link
                    className="nav-link active rounded"
                    data-bs-toggle="tab"
                    to="#per_details_tab"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link rounded"
                    data-bs-toggle="tab"
                    to="#password_tab"
                  >
                    Password
                  </Link>
                </li>
              </ul>
            </div>
            <div className="tab-content profile-tab-cont">
              <div className="tab-pane fade show active" id="per_details_tab">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        {!showFormUpdateProfile ? (
                          <>
                            <h5 className="card-title d-flex justify-content-between border-bottom pb-3">
                              <span>Personal Details</span>
                              <Link
                                className="edit-link"
                                onClick={() => setShowFormUpdateProfile(true)}
                              >
                                <i className="far fa-edit me-1" />
                                Edit
                              </Link>
                            </h5>
                            <table
                              className="w-100 mt-3"
                              style={{ height: "200px" }}
                            >
                              <tbody>
                                <tr className="">
                                  <td className={""}>
                                    <div className="d-flex justify-content-between">
                                      <p className="text-muted mb-0">CIN :</p>
                                      <p className="mb-0">{user?.cin}</p>
                                    </div>
                                  </td>
                                  <td className={"ps-4"}>
                                    <div className="d-flex justify-content-between">
                                      <p className="text-muted mb-0">Name :</p>
                                      <p className="mb-0">
                                        {user?.last_name +
                                          " " +
                                          user?.first_name}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={""}>
                                    <div className="d-flex justify-content-between">
                                      <p className="text-muted mb-0">
                                        Mobile :
                                      </p>
                                      <p className="mb-0">
                                        {user?.phone_number}
                                      </p>
                                    </div>
                                  </td>
                                  <td className={"ps-4"}>
                                    <div className="d-flex justify-content-between">
                                      <p className="text-muted mb-0">
                                        Address :
                                      </p>
                                      <p className="mb-0">
                                        {user?.address ? user?.address : "null"}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={""}>
                                    <div className="d-flex justify-content-between">
                                      <p className="text-muted mb-0">
                                        gender :
                                      </p>
                                      <p className="mb-0">{user?.gender}</p>
                                    </div>
                                  </td>
                                  <td className={"ps-4"}>
                                    <div className="d-flex justify-content-between">
                                      <p className="text-muted mb-0">
                                        Date of Birth :
                                      </p>
                                      <p className="mb-0">
                                        {user?.date_of_birth} (
                                        {calculateAge(user?.date_of_birth) +
                                          " ans"}
                                        )
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={""}>
                                    <div className="d-flex justify-content-between">
                                      <p className="text-muted mb-0">
                                        Blood type :
                                      </p>
                                      <p className="mb-0">{user?.blood_type}</p>
                                    </div>
                                  </td>
                                  <td className={"ps-4"}>
                                    <div className="d-flex justify-content-between">
                                      <p className="text-muted mb-0">
                                        Email Address :
                                      </p>
                                      <p className="mb-0">{user?.email}</p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        ) : (
                          <>
                            <h5 className="card-title d-flex justify-content-between border-bottom pb-3">
                              <span>Edit Personal Details</span>
                              <Link
                                className="edit-link"
                                onClick={() => setShowFormUpdateProfile(false)}
                              >
                                Retour
                              </Link>
                            </h5>
                            <form onSubmit={handleSubmit}>
                              <div className="row mt-5">
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
                                      defaultValue={user?.first_name}
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
                                      defaultValue={user?.last_name}
                                    />
                                    <span className="text-danger">
                                      {errors?.last_name}
                                    </span>
                                  </div>
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
                                      defaultValue={user?.cin}
                                    />
                                    <span className="text-danger">
                                      {errors?.cin}
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
                                      defaultValue={user?.email}
                                    />
                                    <span className="text-danger">
                                      {errors?.email}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                  <div className="form-group local-forms">
                                    <label>
                                      Genre{" "}
                                      <span className="login-danger">*</span>
                                    </label>
                                    <select
                                      className="form-control select"
                                      defaultValue={user?.gender}
                                      name="gender"
                                    >
                                      <option value={""}>
                                        Sélectionnez le genre
                                      </option>
                                      <option value={"male"}>Masculin</option>
                                      <option value={"female"}>Féminin</option>
                                    </select>
                                    <span className="text-danger">
                                      {errors?.gender}
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
                                      defaultValue={user?.date_of_birth}
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
                                      defaultValue={user?.address}
                                    />
                                    <span className="text-danger">
                                      {errors?.address}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                  <div className="form-group local-forms">
                                    <label>Blood Type</label>
                                    <select
                                      defaultValue={user?.blood_type}
                                      className="form-control select"
                                      name="blood_type"
                                    >
                                      <option value={""}>
                                        Veuillez sélectionner un blood type
                                      </option>
                                      <option
                                        value="A+"
                                        defaultValue={user?.blood_type}
                                      >
                                        A+
                                      </option>
                                      <option
                                        value="A-"
                                        defaultValue={user?.blood_type}
                                      >
                                        A-
                                      </option>
                                      <option
                                        value="B+"
                                        defaultValue={user?.blood_type}
                                      >
                                        B+
                                      </option>
                                      <option
                                        value="B-"
                                        defaultValue={user?.blood_type}
                                      >
                                        B-
                                      </option>
                                      <option
                                        value="AB+"
                                        defaultValue={user?.blood_type}
                                      >
                                        AB+
                                      </option>
                                      <option
                                        value="AB-"
                                        defaultValue={user?.blood_type}
                                      >
                                        AB-
                                      </option>
                                      <option
                                        value="O+"
                                        defaultValue={user?.blood_type}
                                      >
                                        O+
                                      </option>
                                      <option
                                        value="O-"
                                        defaultValue={user?.blood_type}
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
                                      defaultValue={user?.health_status}
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
                                      Téléphone{" "}
                                      <span className="login-danger">*</span>
                                    </label>
                                    <input
                                      name="phone_number"
                                      className="form-control"
                                      type="text"
                                      defaultValue={user?.phone_number}
                                    />
                                    <span className="text-danger">
                                      {errors?.phone_number}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-12 mt-3">
                                  <div className="student-submit">
                                    <button
                                      type="submit"
                                      disabled={loadingForm}
                                      className="btn btn-primary"
                                    >
                                      {loadingForm ? (
                                        <LoadingCircle />
                                      ) : (
                                        "Modifier"
                                      )}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setShowFormUpdateProfile(false)
                                      }
                                      className="border ms-2 border-2 btn bg-danger-light"
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
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-3">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title d-flex justify-content-between">
                                <span>Account Status</span>
                                <Link className="edit-link" to="#">
                                  <i className="far fa-edit me-1" />
                                  Edit
                                </Link>
                              </h5>
                              <button className="btn btn-success" type="button">
                                <i className="fe fe-check-verified" /> Active
                              </button>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title d-flex justify-content-between">
                                <span>Skills </span>
                                <Link className="edit-link" to="#">
                                  <i className="far fa-edit me-1" />
                                  Edit
                                </Link>
                              </h5>
                              <div className="skill-tags">
                                <span>Html5</span>
                                <span>CSS3</span>
                                <span>WordPress</span>
                                <span>Javascript</span>
                                <span>Android</span>
                                <span>iOS</span>
                                <span>Angular</span>
                                <span>PHP</span>
                              </div>
                            </div>
                          </div>
                        </div> */}
                </div>
              </div>
              <div id="password_tab" className="tab-pane fade">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title border-bottom pb-3">
                      Change Password
                    </h5>
                    <div className="row mt-3">
                      <div className="col-md-10 col-lg-6">
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            setLoadingResetPassword(true);
                            await changePassword("admin", {
                              old_password: e.target.old_password.value,
                              new_password: e.target.new_password.value,
                              new_password_confirmation:
                                e.target.new_password_confirmation.value,
                            });
                            setLoadingResetPassword(false);
                          }}
                        >
                          <div className="form-group">
                            <label>Old Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="old_password"
                            />
                            <span className="text text-danger">
                              {errors?.old_password}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>New Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="new_password"
                            />
                            <span className="text text-danger">
                              {errors?.new_password}
                            </span>
                          </div>
                          <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="new_password_confirmation"
                            />
                            <span className="text text-danger">
                              {errors?.new_password_confirmation}
                            </span>
                          </div>
                          <button
                            className="btn btn-primary"
                            disabled={loadingResetPassword}
                            type="submit"
                          >
                            {loadingResetPassword ? (
                              <LoadingCircle />
                            ) : (
                              "Save Changes"
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-100 d-flex justify-content-center align-items-center my-5 py-5">
            <LoadingCircleContext />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAdmin;
