import React, { useEffect, useState } from "react";
import { useContextApi } from "../../Context/ContextApi";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../Api/AxiosClient";
import LoadingCircle from "../../Components/LoadingCircle";
import _footer from "./../../Layouts/_footer";

const ProfileSuperAdmin = () => {
  const { user, calculateAge, changePassword, errors } = useContextApi();
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);

  // async function updateProfilePicture(id, profile_picture) {
  //   setLoadingProfilePicture(true);
  //   try {
  //     const formDataFile = new FormData();
  //     formDataFile.append("profile_picture", profile_picture);

  //     const { data } = await AxiosClient.post(
  //       "/super-admin/professors/" + dcryptID(id) + "/update-profile-picture",
  //       formDataFile,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     await getTeacher(dcryptID(id));
  //     toast.success(data.message, {
  //       duration: 4000,
  //       position: "top-right",
  //     });
  //   } catch (error) {
  //     toast.error(error.response.data.message, {
  //       duration: 4000,
  //       position: "top-right",
  //     });
  //   } finally {
  //     setLoadingProfilePicture(false);
  //   }
  // }

  return (
    <div className="page-wrapper">
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
          <div className="col-md-12">
            <div className="profile-header">
              <div className="row align-items-center">
                <div className="col-auto profile-image">
                  <Link to="#">
                    <img
                      className="rounded-circle"
                      alt="User Image"
                      src={
                        user?.profile_picture
                          ? BACKEND_URL + "/storage/" + user?.profile_picture
                          : user?.gender == "male"
                          ? "/assets/img/default-profile-picture-grey-male-icon.png"
                          : "/assets/img/default-profile-picture-grey-female-icon.png"
                      }
                    />
                  </Link>
                </div>
                <div className="col ms-md-n2 profile-user-info">
                  <h4 className="user-name mb-0">
                    {user?.last_name + " " + user?.first_name}
                  </h4>
                  <h6 className="text-muted">UI/UX Design Team</h6>
                  <div className="user-Location">
                    <i className="fas fa-map-marker-alt" /> Florida, United
                    States
                  </div>
                  <div className="about-text">Lorem ipsum dolor sit amet.</div>
                </div>
                <div className="col-auto profile-btn">
                  <Link href className="btn btn-primary">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <div className="profile-menu">
              <ul className="nav nav-tabs nav-tabs-solid">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    data-bs-toggle="tab"
                    to="#per_details_tab"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
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
                  <div className="col-lg-9">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between">
                          <span>Personal Details</span>
                          <Link
                            className="edit-link"
                            data-bs-toggle="modal"
                            to="#edit_personal_details"
                          >
                            <i className="far fa-edit me-1" />
                            Edit
                          </Link>
                        </h5>
                        <div className="row">
                          <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                            CIN
                          </p>
                          <p className="col-sm-9">{user?.cin}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                            Name
                          </p>
                          <p className="col-sm-9">
                            {user?.last_name + " " + user?.first_name}
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                            Date of Birth
                          </p>
                          <p className="col-sm-9">
                            {user?.date_of_birth} (
                            {calculateAge(user?.date_of_birth) + " ans"})
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                            Email ID
                          </p>
                          <p className="col-sm-9">{user?.email}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                            Mobile
                          </p>
                          <p className="col-sm-9">{user?.phone_number}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-3 text-muted text-sm-end mb-0">
                            Address
                          </p>
                          <p className="col-sm-9 mb-0">
                            {user?.address ? user?.address : "null"}
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-3 text-muted text-sm-end mb-0">
                            Blood type
                          </p>
                          <p className="col-sm-9 mb-0">
                            {user?.blood_type ? user?.blood_type : "null"}
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-3 text-muted text-sm-end mb-0">
                            gender
                          </p>
                          <p className="col-sm-9 mb-0">{user?.gender}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-3 text-muted text-sm-end mb-0">
                            last_login_date
                          </p>
                          <p className="col-sm-9 mb-0">
                            {user?.last_login_date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
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
                  </div>
                </div>
              </div>
              <div id="password_tab" className="tab-pane fade">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Change Password</h5>
                    <div className="row">
                      <div className="col-md-10 col-lg-6">
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            setLoadingResetPassword(true);
                            await changePassword("super-admin", {
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
        </div>
      </div>
    </div>
  );
};

export default ProfileSuperAdmin;
