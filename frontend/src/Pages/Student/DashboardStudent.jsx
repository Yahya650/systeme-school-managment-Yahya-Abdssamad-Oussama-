import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _footer from "../../Layouts/_footer";
import { useContextApi } from "../../config/Context/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { AxiosClient, BACKEND_URL } from "../../config/Api/AxiosClient";
import { format } from "date-fns";
import LoadingCircleContext from "../../Components/LoadingCircleContext";

const DashboardStudent = () => {
  const { user, calculateAge } = useContextApi();
  const [latestMarksLoading, setLatestMarksLoading] = useState(true);
  const [latestMarks, setLatestMarks] = useState(null);
  const [ParentLoading, setParentLoading] = useState(true);
  const [parent, setParent] = useState(null);

  useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await AxiosClient.get("/student/get-latest-marks");
        setLatestMarks(
          data?.filter((record) => record.exam.course.modules.length === 0)
        );
      } catch (error) {
      } finally {
        setLatestMarksLoading(false);
      }
    };
    fetching();
    const fetching2 = async () => {
      try {
        const { data } = await AxiosClient.get("/student/get-parent");
        setParent(data);
      } catch (error) {
      } finally {
        setParentLoading(false);
      }
    };
    fetching2();
  }, []);

  return (
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
                  <h3>
                    {!user?.classe?.filiere
                      ? "Cette Classe n'a pas de Filiere"
                      : user?.classe?.filiere.name}
                  </h3>
                </div>
                <div className="db-icon p-2">
                  <img
                    src="/assets/img/icons/teacher-icon-02.svg"
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
                {!latestMarks && (
                  <Link
                    to="/student/marks"
                    className="btn btn-primary btn-sm py-0"
                  >
                    <FontAwesomeIcon icon={faEye} /> Voir Tous les Notes
                  </Link>
                )}
              </div>
            </div>
            <div className="card-body pt-3">
              {!latestMarksLoading ? (
                latestMarks?.length > 0 ? (
                  latestMarks
                    ?.filter(
                      (record) => record.exam.course.modules.length === 0
                    )
                    .slice(0, 5)
                    .map((record, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between border-bottom py-2 mb-0"
                      >
                        <div className="d-flex flex-column">
                          <figure className="pb-0 mb-0">
                            <blockquote className="">
                              <p className="pb-0 mb-0 text-secondary-emphasis">
                                {record.exam.course.name}
                              </p>
                            </blockquote>
                            <figcaption
                              className="blockquote-footer pb-0 mb-0"
                              style={{ color: "#abb5ce" }}
                            >
                              {record.exam.type.name}
                            </figcaption>
                          </figure>
                        </div>
                        <div className="d-flex flex-column text-end">
                          {record.note >
                          user?.classe.classe_type.school_level.passing_mark ? (
                            <span className=" text-end text-success">
                              <b>{record.note}</b>
                            </span>
                          ) : record.note <
                            user?.classe.classe_type.school_level
                              .passing_mark ? (
                            <span className="text-end text-danger">
                              <b>{record.note}</b>
                            </span>
                          ) : (
                            <span className="text-end text-warning ">
                              <b>{record.note}</b>
                            </span>
                          )}
                          <span style={{ color: "#abb5ce" }}>
                            {format(new Date(record.created_at), "dd/MM")}
                          </span>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <p className="text-center">Aucune note pour le moment</p>
                  </div>
                )
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <LoadingCircleContext />
                </div>
              )}
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
            {!ParentLoading ? (
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
                              parent?.profile_picture
                                ? BACKEND_URL +
                                  "/storage/" +
                                  parent?.profile_picture
                                : parent?.gender == "male"
                                ? "/assets/img/default-profile-picture-grey-male-icon.png"
                                : "/assets/img/default-profile-picture-grey-female-icon.png"
                            }
                          />
                        </div>
                        <div className="col ms-md-n2 profile-user-info mt-2">
                          <h4 className="user-name mb-0">
                            {parent?.last_name + " " + parent?.first_name}
                          </h4>
                          <div className="user-Location">
                            {parent?.address && (
                              <>
                                <i className="fas fa-map-marker-alt me-2" />
                                {parent?.address}
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
                                              {parent?.cin}
                                            </p>
                                          </div>
                                        </td>
                                        <td className={"ps-4"}>
                                          <div className="d-flex justify-content-between">
                                            <p className="text-muted mb-0">
                                              Name :
                                            </p>
                                            <p className="mb-0">
                                              {parent?.last_name +
                                                " " +
                                                parent?.first_name}
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
                                              {parent?.phone_number}
                                            </p>
                                          </div>
                                        </td>
                                        <td className={"ps-4"}>
                                          <div className="d-flex justify-content-between">
                                            <p className="text-muted mb-0">
                                              Address :
                                            </p>
                                            <p className="mb-0">
                                              {parent?.address
                                                ? parent?.address
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
                                              {parent?.gender}
                                            </p>
                                          </div>
                                        </td>
                                        <td className={"ps-4"}>
                                          <div className="d-flex justify-content-between">
                                            <p className="text-muted mb-0">
                                              Date of Birth :
                                            </p>
                                            <p className="mb-0">
                                              {parent?.date_of_birth} (
                                              {calculateAge(
                                                parent?.date_of_birth
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
            ) : (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <LoadingCircleContext />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
