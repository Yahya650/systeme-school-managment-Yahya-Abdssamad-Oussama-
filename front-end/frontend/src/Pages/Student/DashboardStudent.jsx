import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import _footer from "../../Layouts/_footer";
import { useContextApi } from "../../config/Context/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const DashboardStudent = () => {
  const { user, calculateAge } = useContextApi();
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">
                  {new Date().getHours() >= 5 && new Date().getHours() < 18
                    ? "Bonjour "
                    : "Bonsoir "}
                  {user?.last_name + " " + user?.first_name}!
                </h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Accueil</Link>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">
                <div
                  className="db-widgets d-flex justify-content-between align-items-center"
                  style={{ height: "100%" }}
                >
                  <div className="db-info">
                    <h6>Classe</h6>
                    <h3>{user?.classe.code}</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      src="/assets/img/icons/dash-icon-01.svg"
                      alt="Icône du tableau de bord"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">
                <div
                  className="db-widgets d-flex justify-content-between align-items-center"
                  style={{ height: "100%" }}
                >
                  <div className="db-info">
                    <h6>Code Massar</h6>
                    <h3>{user?.code_massar}</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      width={58}
                      src="/assets/img/icons/lock-dynamic-premium.png"
                      alt="Icône du tableau de bord"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">
                <div
                  className="db-widgets d-flex justify-content-between align-items-center"
                  style={{ height: "100%" }}
                >
                  <div className="db-info">
                    <h6>Filiere</h6>
                    <h3>{user?.classe.filiere.name}</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      src="/assets/img/icons/dash-icon-03.svg"
                      alt="Icône du tableau de bord"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">
                <div
                  className="db-widgets d-flex justify-content-between align-items-center"
                  style={{ height: "100%" }}
                >
                  <div className="db-info">
                    <h6>Nombre des Absences</h6>
                    <h3>{user?.absences.length} Absence</h3>
                  </div>
                  <div className="db-icon">
                    <img
                      src="/assets/img/icons/dash-icon-04.svg"
                      alt="Icône du tableau de bord"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6 d-flex">
            <div className="card flex-fill student-space comman-shadow">
              <div className="card-header px-4 pt-4 d-flex justify-content-between align-items-center">
                <h5 className="card-title">Dernières notes</h5>
                <div className="">
                  <button className="btn btn-primary btn-sm py-0">
                    <FontAwesomeIcon icon={faEye} /> Voir Tous les Notes
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table star-student table-hover table-center table-borderless table-striped">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-start">Enseignant</th>
                        <th>Matières</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.exam_records.slice(0, 6).map((record, index) => (
                        <tr key={index}>
                          <td className="text-nowrap text-start">
                            <img
                              className="rounded-circle"
                              src={
                                record.exam.teacher.profile_picture
                                  ? BACKEND_URL +
                                    "/storage/" +
                                    record.exam.teacher.profile_picture
                                  : record.exam.teacher.gender === "female"
                                  ? "/assets/img/default-profile-picture-grey-female-icon.png"
                                  : "/assets/img/default-profile-picture-grey-male-icon.png"
                              }
                              width="25"
                              alt="Star Students"
                            />
                            {record.exam.teacher.last_name +
                              " " +
                              record.exam.teacher.first_name}
                          </td>
                          <td className="text-nowrap">
                            <div>{record.exam.course.name}</div>
                          </td>
                          <td>
                            {record.note > record.exam.passing_marks ? (
                              <span className="badge bg-success">
                                {record.note}
                              </span>
                            ) : (
                              <span className="badge bg-danger">
                                {record.note}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 d-flex">
            <div className="card flex-fill comman-shadow">
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
                              user?.parent.profile_picture
                                ? BACKEND_URL +
                                  "/storage/" +
                                  user?.parent.profile_picture
                                : user?.parent.gender == "male"
                                ? "/assets/img/default-profile-picture-grey-male-icon.png"
                                : "/assets/img/default-profile-picture-grey-female-icon.png"
                            }
                          />
                        </div>
                        <div className="col ms-md-n2 profile-user-info mt-2">
                          <h4 className="user-name mb-0">
                            {user?.parent.last_name +
                              " " +
                              user?.parent.first_name}
                          </h4>
                          <div className="user-Location">
                            {user?.parent.address && (
                              <>
                                <i className="fas fa-map-marker-alt me-2" />
                                {user?.parent.address}
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
                                <table className="w-100">
                                  <tbody>
                                    <tr>
                                      <td className={""}>
                                        <div className="d-flex justify-content-between">
                                          <p className="text-muted mb-0">
                                            CIN :
                                          </p>
                                          <p className="mb-0">
                                            {user?.parent.cin}
                                          </p>
                                        </div>
                                      </td>
                                      <td className={"ps-4"}>
                                        <div className="d-flex justify-content-between">
                                          <p className="text-muted mb-0">
                                            Name :
                                          </p>
                                          <p className="mb-0">
                                            {user?.parent.last_name +
                                              " " +
                                              user?.parent.first_name}
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
                                            {user?.parent.phone_number}
                                          </p>
                                        </div>
                                      </td>
                                      <td className={"ps-4"}>
                                        <div className="d-flex justify-content-between">
                                          <p className="text-muted mb-0">
                                            Address :
                                          </p>
                                          <p className="mb-0">
                                            {user?.parent.address
                                              ? user?.parent.address
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
                                            {user?.parent.gender}
                                          </p>
                                        </div>
                                      </td>
                                      <td className={"ps-4"}>
                                        <div className="d-flex justify-content-between">
                                          <p className="text-muted mb-0">
                                            Date of Birth :
                                          </p>
                                          <p className="mb-0">
                                            {user?.parent.date_of_birth} (
                                            {calculateAge(
                                              user?.parent.date_of_birth
                                            ) + " ans"}
                                            )
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <h5 className="card-title d-flex justify-content-between">
                                  <span>Personal Details</span>
                                </h5>
                                <div className="d-flex gap-3">
                                  <div className="d-flex">
                                    <p className="text-muted text-sm-end mb-0 mb-sm-3">
                                      CIN :
                                    </p>
                                    <p className="">{user?.parent.cin}</p>
                                  </div>
                                  <div className="d-flex">
                                    <p className="text-muted text-sm-end mb-0 mb-sm-3">
                                      Name
                                    </p>
                                    <p className="">
                                      {user?.parent.last_name +
                                        " " +
                                        user?.parent.first_name}
                                    </p>
                                  </div>
                                  <div className="d-flex">
                                    <p className="text-muted text-sm-end mb-0 mb-sm-3">
                                      Date of Birth
                                    </p>
                                    <p className="">
                                      {user?.parent.date_of_birth} (
                                      {calculateAge(
                                        user?.parent.date_of_birth
                                      ) + " ans"}
                                      )
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex gap-3">
                                  <div className="d-flex">
                                    <p className="text-muted text-sm-end mb-0 mb-sm-3">
                                      Mobile
                                    </p>
                                    <p className="">
                                      {user?.parent.phone_number}
                                    </p>
                                  </div>
                                  <div className="d-flex">
                                    <p className="text-muted text-sm-end mb-0">
                                      Address
                                    </p>
                                    <p className=" mb-0">
                                      {user?.parent.address
                                        ? user?.parent.address
                                        : "null"}
                                    </p>
                                  </div>
                                  <div className="d-flex">
                                    <p className="text-muted text-sm-end mb-0">
                                      gender
                                    </p>
                                    <p className=" mb-0">
                                      {user?.parent.gender}
                                    </p>
                                  </div>
                                </div> */}
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
      </div>
      <_footer />
    </div>
  );
};

export default DashboardStudent;
