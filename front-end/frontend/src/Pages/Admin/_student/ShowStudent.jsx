import React from "react";
import _footer from "../../../Layouts/_footer";
import { Link } from "react-router-dom";

const ShowStudent = () => {
  return (
    <div className="page-wrapper">
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
                            src="/assets/img/profile-user.jpg"
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
                          <h4>Bruce Willis</h4>
                          <h5>Informatique</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 d-flex align-items-center">
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
                          <h5>Bruce Willis</h5>
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
                          <h4>Département</h4>
                          <h5>Informatique</h5>
                        </div>
                      </div>
                      <div className="personal-activity">
                        <div className="personal-icons">
                          <i className="feather-phone-call"></i>
                        </div>
                        <div className="views-personal">
                          <h4>Téléphone mobile</h4>
                          <h5>+91 89657 48512</h5>
                        </div>
                      </div>
                      <div className="personal-activity">
                        <div className="personal-icons">
                          <i className="feather-mail"></i>
                        </div>
                        <div className="views-personal">
                          <h4>E-mail</h4>
                          <h5>
                            <Link
                              to="#"
                              className="__cf_email__"
                              data-cfemail="81e5e0e8f2f8c1e6ece0e8edafe2eeec"
                            >
                              [email&#160;protected]
                            </Link>
                          </h5>
                        </div>
                      </div>
                      <div className="personal-activity">
                        <div className="personal-icons">
                          <i className="feather-user"></i>
                        </div>
                        <div className="views-personal">
                          <h4>Genre</h4>
                          <h5>Homme</h5>
                        </div>
                      </div>
                      <div className="personal-activity">
                        <div className="personal-icons">
                          <i className="feather-calendar"></i>
                        </div>
                        <div className="views-personal">
                          <h4>Date de naissance</h4>
                          <h5>22 avril 1995</h5>
                        </div>
                      </div>
                      <div className="personal-activity">
                        <div className="personal-icons">
                          <i className="feather-italic"></i>
                        </div>
                        <div className="views-personal">
                          <h4>Langue</h4>
                          <h5>Anglais, Français, Bangla</h5>
                        </div>
                      </div>
                      <div className="personal-activity mb-0">
                        <div className="personal-icons">
                          <i className="feather-map-pin"></i>
                        </div>
                        <div className="views-personal">
                          <h4>Adresse</h4>
                          <h5>480, avenue Estern, New York</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="student-personals-grp">
                  <div className="card mb-0">
                    <div className="card-body">
                      <div className="heading-detail">
                        <h4>Compétences :</h4>
                      </div>
                      <div className="skill-blk">
                        <div className="skill-statistics">
                          <div className="skills-head">
                            <h5>Photoshop</h5>
                            <p>90%</p>
                          </div>
                          <div className="progress mb-0">
                            <div
                              className="progress-bar bg-photoshop"
                              role="progressbar"
                              style={{ width: "90%" }}
                              aria-valuenow="90"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                        <div className="skill-statistics">
                          <div className="skills-head">
                            <h5>Éditeur de code</h5>
                            <p>75%</p>
                          </div>
                          <div className="progress mb-0">
                            <div
                              className="progress-bar bg-editor"
                              role="progressbar"
                              style={{ width: "75%" }}
                              aria-valuenow="75"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                        <div className="skill-statistics mb-0">
                          <div className="skills-head">
                            <h5>Illustrator</h5>
                            <p>95%</p>
                          </div>
                          <div className="progress mb-0">
                            <div
                              className="progress-bar bg-illustrator"
                              role="progressbar"
                              style={{ width: "95%" }}
                              aria-valuenow="95"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
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
                        <h4>À propos de moi</h4>
                      </div>
                      <div className="hello-park">
                        <h5>Bonjour, je suis Daisy Parks</h5>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur officia deserunt
                          mollit anim id est laborum.
                        </p>
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          inventore veritatis et quasi architecto beatae vitae
                          dicta sunt explicabo.
                        </p>
                      </div>
                      <div className="hello-park">
                        <h5>Éducation</h5>
                        <div className="educate-year">
                          <h6>2008 - 2009</h6>
                          <p>
                            Scolarité secondaire à l'école secondaire xyz,
                            Mumbai.
                          </p>
                        </div>
                        <div className="educate-year">
                          <h6>2011 - 2012</h6>
                          <p>
                            Scolarité secondaire supérieure à l'école supérieure
                            xyz, Mumbai.
                          </p>
                        </div>
                        <div className="educate-year">
                          <h6>2012 - 2015</h6>
                          <p>
                            Licence en sciences à l'Abc College of Art and
                            Science, Chennai.
                          </p>
                        </div>
                        <div className="educate-year">
                          <h6>2015 - 2017</h6>
                          <p className="mb-0">
                            Master en sciences à Cdm College of Engineering and
                            Technology, Pune.
                          </p>
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

export default ShowStudent;
