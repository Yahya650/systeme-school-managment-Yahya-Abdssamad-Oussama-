import React, { useEffect, useState } from "react";
import _footer from "../../../Layouts/_footer";
import { Link, useParams } from "react-router-dom";
import { useContextApi } from "../../../Context/ContextApi";
import LoadingCircleContext from "../../../Components/LoadingCircleContext";
import dcryptID from "../../../security/dcryptID";
import { useCrudTeachers } from "../../../Functions/CRUD_Teachers";

const ShowTeacher = () => {
  const { teacher, navigateTo, calculateAge } = useContextApi();
  const [loading, setLoading] = useState(true);
  const { getTeacher } = useCrudTeachers();
  const { id } = useParams();

  const fetchData = async () => {
    if (dcryptID(id) === null) {
      navigateTo("/error/404");
    }
    await getTeacher(dcryptID(id));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      {!loading ? (
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-sub-header">
                  <h3 className="page-title">Détails de Enseignant</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="#">Enseignants</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Détails de l'enseignant
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
                              className="bg-white"
                              src={
                                teacher.profile
                                  ? teacher.profile
                                  : teacher.gender == "male"
                                  ? "/assets/img/default-profile-picture-grey-male-icon.png"
                                  : "/assets/img/default-profile-picture-grey-female-icon.png"
                              }
                              alt="Profil"
                            />
                            <div className="form-group students-up-files profile-edit-icon mb-0">
                              <div className="uplod d-flex">
                                <label className="file-upload profile-upbtn mb-0">
                                  <i className="feather-edit-3"></i>
                                  <input type="file" />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="names-profiles">
                            <h4>
                              {teacher.first_name + " " + teacher.last_name}
                            </h4>
                            <h5>Enseignant</h5>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-lg-4 col-md-4 d-flex align-items-center">
                        <div className="follow-group">
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
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 d-flex align-items-center">
                        <div className="follow-btn-group">
                          <button
                            type="submit"
                            className="btn btn-info follow-btns"
                          >
                            Suivre
                          </button>
                          <button
                            type="submit"
                            className="btn btn-info message-btns"
                          >
                            Message
                          </button>
                        </div>
                      </div> */}
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
                              {teacher.first_name + " " + teacher.last_name}
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
                            <h5>{teacher.blood_type}</h5>
                          </div>
                        </div>
                        <div className="personal-activity">
                          <div className="personal-icons">
                            <i className="feather-phone-call"></i>
                          </div>
                          <div className="views-personal">
                            <h4>Téléphone mobile</h4>
                            <h5>{teacher.phone_number}</h5>
                          </div>
                        </div>
                        <div className="personal-activity">
                          <div className="personal-icons">
                            <i className="feather-mail"></i>
                          </div>
                          <div className="views-personal">
                            <h4>E-mail</h4>
                            <h5>{teacher.email}</h5>
                          </div>
                        </div>
                        <div className="personal-activity">
                          <div className="personal-icons">
                            <i className="feather-user"></i>
                          </div>
                          <div className="views-personal">
                            <h4>Genre</h4>
                            <h5>
                              {teacher.gender == "male" ? "male" : "female"}
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
                              {teacher.date_of_birth} (
                              {calculateAge(teacher.date_of_birth) + " ans"})
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
                              {teacher.last_login_date
                                ? teacher.last_login_date
                                : "he is never LogIn"}
                            </h5>
                          </div>
                        </div>
                        <div className="personal-activity mb-0">
                          <div className="personal-icons">
                            <i className="feather-map-pin"></i>
                          </div>
                          <div className="views-personal">
                            <h4>Adresse</h4>
                            <h5>{teacher.address}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="student-personals-grp">
                    <div className="card mb-0">
                      <div className="card-body">
                        <div className="heading-detail">
                          <h4>Responsibles (Financial) :</h4>
                        </div>
                        <div className="table-responsive">
                          {/* {teacher.school_levels.filter(
                            (school_level) =>
                              school_level.pivot.type === "financial"
                          ).length > 0 ? (
                            <table className="datatable table table-stripped">
                              <thead>
                                <tr>
                                  <th>Type</th>
                                  <th>Name</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {teacher.school_levels
                                  .filter(
                                    (school_level) =>
                                      school_level.pivot.type === "financial"
                                  )
                                  .map((school_level, index) => (
                                    <tr key={index}>
                                      <td>
                                        <span className="badge rounded-pill bg-success">
                                          {school_level.pivot.type}
                                        </span>
                                      </td>
                                      <td>{school_level.name}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="alert alert-danger" role="alert">
                              <div className="flex-grow-1 me-2">
                                <b>
                                  This membre de la direction is not Responsible
                                  Financial to any school level
                                </b>
                                <br />
                                You can start by adding a Responsible
                              </div>
                            </div>
                          )} */}
                        </div>

                        <div className="heading-detail mt-5 ">
                          <h4>Responsibles (Educational) :</h4>
                        </div>
                        <div className="table-responsive">
                          {/* {teacher.school_levels.filter(
                            (school_level) =>
                              school_level.pivot.type === "educational"
                          ).length > 0 ? (
                            <table className="datatable table table-stripped">
                              <thead>
                                <tr>
                                  <th>Type</th>
                                  <th>Name</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {teacher.school_levels
                                  .filter(
                                    (school_level) =>
                                      school_level.pivot.type === "educational"
                                  )
                                  .map((school_level, index) => (
                                    <tr key={index}>
                                      <td>
                                        <span className="badge rounded-pill bg-info">
                                          {school_level.pivot.type}
                                        </span>
                                      </td>
                                      <td>{school_level.name}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="alert alert-danger" role="alert">
                              <div className="flex-grow-1 me-2">
                                <b>
                                  This membre de la direction is not Responsible
                                  Educational to any school level
                                </b>
                                <br />
                                You can start by adding a Responsible
                              </div>
                            </div>
                          )} */}
                        </div>
                      </div>
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
      <_footer />
    </div>
  );
};

export default ShowTeacher;
