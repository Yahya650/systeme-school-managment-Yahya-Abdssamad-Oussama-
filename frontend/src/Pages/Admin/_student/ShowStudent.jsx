import React, { useEffect, useState } from "react";
import _footer from "../../../Layouts/_footer";
import { Link, useParams } from "react-router-dom";
import { useContextApi } from "../../../config/Context/ContextApi";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import dcryptID from "../../../config/security/dcryptID";
import cryptID from "../../../config/security/cryptID";
import LoadingCircle from "../../../Components/LoadingCircle";
import { BACKEND_URL } from "../../../config/Api/AxiosClient";
import { useStudentContext } from "./../../../Functions/StudentContext";

const ShowStudent = () => {
  const { student, navigateTo, calculateAge, loadingProfilePicture } =
    useContextApi();
  const [loading, setLoading] = useState(true);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const { getStudent, updateProfilePicture, renewPassword } =
    useStudentContext();
  const { id } = useParams();

  const fetchData = async () => {
    if (dcryptID(id) === null) {
      navigateTo("/error/404");
    }
    await getStudent(dcryptID(id));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-sub-header">
                  <h3 className="page-title">Détails de l'étudiant</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="#">Étudiants</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Détails de l'étudiant
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="about-info">
                    <h4>
                      Profile
                      <span>
                        <Link to="#">
                          <i className="feather-more-vertical"></i>
                        </Link>
                      </span>
                    </h4>
                  </div>
                  <div className="student-profile-head">
                    <div className="profile-bg-img">
                      <img src="/assets/img/profile-bg.jpg" alt="Profil" />
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-4">
                        <div className="profile-user-box">
                          <div className="profile-user-img">
                            <img
                              className="bg-white avatar-img rounded-circle"
                              width={"141px"}
                              height={"141px"}
                              src={
                                student.profile_picture
                                  ? BACKEND_URL +
                                    "/storage/" +
                                    student.profile_picture
                                  : student.gender == "male"
                                  ? "/assets/img/default-profile-picture-grey-male-icon.png"
                                  : "/assets/img/default-profile-picture-grey-female-icon.png"
                              }
                              alt="Profile"
                            />
                            <div className="form-group students-up-files profile-edit-icon mb-0">
                              <div className="uplod d-flex">
                                <label className="file-upload profile-upbtn mb-0">
                                  <i className="feather-edit-3"></i>
                                  {loadingProfilePicture && <LoadingCircle />}
                                  <input
                                    disabled={loadingProfilePicture}
                                    className="upload"
                                    type="file"
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={async (e) => {
                                      await updateProfilePicture(
                                        id,
                                        e.target.files[0]
                                      );
                                    }}
                                    name="profile_picture"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="names-profiles">
                            <h4>
                              {student.first_name + " " + student.last_name}
                            </h4>
                            <h5>Etudiant</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 d-flex align-items-center">
                        {/* <div className="follow-group">
                          <div className="students-follows">
                            <h5>Abonnés</h5>
                            <h4>2850</h4>
                          </div>
                          <div className="students-follows">
                            <h5>Abonnés</h5>
                            <h4>2850</h4>
                          </div>
                          <div className="students-follows">
                            <h5>Abonnés</h5>
                            <h4>2850</h4>
                          </div>
                        </div> */}
                      </div>
                      <div className="col-lg-4 col-md-4 d-flex align-items-center">
                        <div className="follow-btn-group">
                          <Link
                            to={"/admin/update-student/" + cryptID(student.id)}
                            className="btn btn-primary"
                          >
                            <i className="feather-edit-3"></i>
                          </Link>

                          <button
                            disabled={resetPasswordLoading}
                            onClick={async () => {
                              setResetPasswordLoading(true);
                              await renewPassword(cryptID(student.id));
                              setResetPasswordLoading(false);
                            }}
                            type="submit"
                            className="btn btn-primary mx-3"
                          >
                            {resetPasswordLoading ? (
                              <LoadingCircle />
                            ) : (
                              "Reset Password"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="student-personals-grp">
                    <div className="card">
                      <div className="card-body">
                        <div className="heading-detail">
                          <h4>Détails personnels :</h4>
                        </div>
                        <div className="personal-activity">
                          <div className="personal-icons">
                            <i className="feather-user"></i>
                          </div>
                          <div className="views-personal">
                            <h4>Nom</h4>
                            <h5>
                              {student.first_name + " " + student.last_name}
                            </h5>
                          </div>
                        </div>
                        <div className="personal-activity">
                          <div className="personal-icons">
                            <img
                              src="/assets/img/icons/buliding-icon.svg"
                              alt=""
                            />
                          </div>
                          <div className="views-personal">
                            <h4>Blood type</h4>
                            <h5>{student.blood_type}</h5>
                          </div>
                        </div>
                        <div className="personal-activity">
                          <div className="personal-icons">
                            <i className="feather-phone-call"></i>
                          </div>
                          <div className="views-personal">
                            <h4>Téléphone mobile</h4>
                            <h5>{student.phone_number}</h5>
                          </div>
                        </div>
                        <div className="personal-activity">
                          <div className="personal-icons">
                            <i className="feather-mail"></i>
                          </div>
                          <div className="views-personal">
                            <h4>E-mail</h4>
                            <h5>{student.email}</h5>
                          </div>
                        </div>
                        <div className="personal-activity">
                          <div className="personal-icons">
                            <i className="feather-user"></i>
                          </div>
                          <div className="views-personal">
                            <h4>Genre</h4>
                            <h5>
                              {student.gender == "male" ? "male" : "female"}
                            </h5>
                          </div>
                        </div>
                        <div className="personal-activity">
                          <div className="personal-icons">
                            <i className="feather-calendar"></i>
                          </div>
                          <div className="views-personal">
                            <h4>Date de naissance</h4>
                            <h5>
                              {student.date_of_birth} (
                              {calculateAge(student.date_of_birth) + " ans"})
                            </h5>
                          </div>
                        </div>
                        <div className="personal-activity">
                          <div className="personal-icons">
                            <i className="feather-italic"></i>
                          </div>
                          <div className="views-personal">
                            <h4>Last Date Login</h4>
                            <h5>
                              {student.last_login_date
                                ? student.last_login_date
                                : "Pas de connexion"}
                            </h5>
                          </div>
                        </div>
                        <div className="personal-activity mb-0">
                          <div className="personal-icons">
                            <i className="feather-map-pin"></i>
                          </div>
                          <div className="views-personal">
                            <h4>Adresse</h4>
                            <h5>{student.address}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 d-flex">
                  <div
                    className="card flex-fill comman-shadow"
                    style={{
                      boxShadow: "0 0 31px rgb(0 0 0 / 4%)",
                    }}
                  >
                    <div className="card-header d-flex align-items-center">
                      <h5 className="card-title">Votre Père</h5>
                      <ul className="chart-list-out student-ellips">
                        <li className="star-menus">
                          <Link to="#">
                            <i className="fas fa-ellipsis-v"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div
                            className="profile-header m-0 py-2"
                            style={{ backgroundColor: "white" }}
                          >
                            <div className="row d-flex flex-column text text-center">
                              <div className="col-auto profile-image">
                                <img
                                  className="rounded-circle"
                                  alt="User Image"
                                  width={"20px"}
                                  src={
                                    student?.parent.profile_picture
                                      ? BACKEND_URL +
                                        "/storage/" +
                                        student?.parent.profile_picture
                                      : student?.parent.gender == "male"
                                      ? "/assets/img/default-profile-picture-grey-male-icon.png"
                                      : "/assets/img/default-profile-picture-grey-female-icon.png"
                                  }
                                />
                              </div>
                              <div className="col ms-md-n2 profile-user-info mt-2">
                                <h4 className="user-name mb-0">
                                  {student?.parent.last_name +
                                    " " +
                                    student?.parent.first_name}
                                </h4>
                                <div className="user-Location">
                                  {student?.parent.address && (
                                    <>
                                      <i className="fas fa-map-marker-alt me-2" />
                                      {student?.parent.address}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tab-content profile-tab-cont">
                            <div
                              className="tab-pane fade show active"
                              id="per_details_tab"
                            >
                              <div className="row">
                                <div className="col-12">
                                  <div className="card">
                                    <div
                                      className="card-body rounded"
                                      style={{
                                        boxShadow:
                                          "0 0 31px 3px rgb(200 200 200 / 23%)",
                                      }}
                                    >
                                      <h5 className="card-title d-flex justify-content-between mb-4">
                                        <span>Personal Details :</span>
                                      </h5>
                                      <div className="table-responsive">
                                        <table className="w-100">
                                          <tbody>
                                            <tr>
                                              <td className={""}>
                                                <div className="d-flex justify-content-between">
                                                  <p className="text-muted mb-0">
                                                    CIN :
                                                  </p>
                                                  <p className="mb-0">
                                                    {student?.parent.cin}
                                                  </p>
                                                </div>
                                              </td>
                                              <td className={"ps-4"}>
                                                <div className="d-flex justify-content-between">
                                                  <p className="text-muted mb-0">
                                                    Name :
                                                  </p>
                                                  <p className="mb-0">
                                                    {student?.parent.last_name +
                                                      " " +
                                                      student?.parent
                                                        .first_name}
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
                                                    {
                                                      student?.parent
                                                        .phone_number
                                                    }
                                                  </p>
                                                </div>
                                              </td>
                                              <td className={"ps-4"}>
                                                <div className="d-flex justify-content-between">
                                                  <p className="text-muted mb-0">
                                                    Address :
                                                  </p>
                                                  <p className="mb-0">
                                                    {student?.parent.address
                                                      ? student?.parent.address
                                                      : "null"}
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
                                                  <p className="mb-0">
                                                    {student?.parent.gender}
                                                  </p>
                                                </div>
                                              </td>
                                              <td className={"ps-4"}>
                                                <div className="d-flex justify-content-between">
                                                  <p className="text-muted mb-0">
                                                    Date of Birth :
                                                  </p>
                                                  <p className="mb-0">
                                                    {
                                                      student?.parent
                                                        .date_of_birth
                                                    }{" "}
                                                    (
                                                    {calculateAge(
                                                      student?.parent
                                                        .date_of_birth
                                                    ) + " ans"}
                                                    )
                                                  </p>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
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
                  </div>
                </div>

                {/* <div className="col-lg-8">
                  <div className="student-personals-grp">
                    <div className="card mb-0">
                      <div className="card-body">
                        <div className="heading-detail">
                          <h4>Responsibles :</h4>
                        </div>
                        <div className="table-responsive">
                          {student.school_levels.length > 0 ? (
                            <table className="datatable table table-stripped table-responsive">
                              <thead>
                                <tr>
                                  <th>Type</th>
                                  <th className="text text-center">Name</th>
                                </tr>
                              </thead>
                              <tbody>
                                {student.reports.map((report, index) => (
                                  <tr key={index}>
                                    <td>{report.title}</td>
                                    <td className="text text-center">
                                      {report.content}
                                    </td>
                                    <td className="text text-center">
                                      {report.student.first_name}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="alert alert-danger" role="alert">
                              <div className="flex-grow-1 me-2">
                                <b>
                                  Ce membre de la direction n'est pas
                                  responsable de l'éducation à tout niveau
                                  scolaire
                                </b>
                                <br />
                                Vous pouvez commencer par ajouter un Responsible
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100 d-flex justify-content-center align-items-center my-5 py-5">
          <LoadingCircleContext />
        </div>
      )}
    </>
  );
};

export default ShowStudent;
