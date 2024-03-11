import React, { useEffect, useState } from "react";
import { useContextApi } from "../../config/Context/ContextApi";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../config/Api/AxiosClient";
import LoadingCircle from "../../Components/LoadingCircle";
import _footer from "./../../Layouts/_footer";
import LoadingCircleContext from "../../Components/LoadingCircleContext";

const ProfileStudent = () => {
  const { user, calculateAge, changePassword, errors, getUserProfile } =
    useContextApi();
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [showFormUpdateProfile, setShowFormUpdateProfile] = useState(false);
  const [loading, setLoading] = useState(true);

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
                    {/* Edit */}
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
                    Mot de passe
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
                        <h5 className="card-title d-flex justify-content-between border-bottom pb-3">
                          <span>Personal Details</span>
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
                                    {user?.last_name + " " + user?.first_name}
                                  </p>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className={""}>
                                <div className="d-flex justify-content-between">
                                  <p className="text-muted mb-0">Mobile :</p>
                                  <p className="mb-0">{user?.phone_number}</p>
                                </div>
                              </td>
                              <td className={"ps-4"}>
                                <div className="d-flex justify-content-between">
                                  <p className="text-muted mb-0">Address :</p>
                                  <p className="mb-0">
                                    {user?.address ? user?.address : "null"}
                                  </p>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className={""}>
                                <div className="d-flex justify-content-between">
                                  <p className="text-muted mb-0">gender :</p>
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
                                    {calculateAge(user?.date_of_birth) + " ans"}
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
                      Change Mot de passe
                    </h5>
                    <div className="row mt-3">
                      <div className="col-md-10 col-lg-6">
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            setLoadingResetPassword(true);
                            await changePassword("student", {
                              old_password: e.target.old_password.value,
                              new_password: e.target.new_password.value,
                              new_password_confirmation:
                                e.target.new_password_confirmation.value,
                            });
                            setLoadingResetPassword(false);
                          }}
                        >
                          <div className="form-group">
                            <label>Ancien Mot de passe</label>
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
                            <label>Nouveau Mot de passe</label>
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
                            <label>Confirmez le Mot de passe</label>
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
                              "Enregistrer le Mot de passe"
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

export default ProfileStudent;
