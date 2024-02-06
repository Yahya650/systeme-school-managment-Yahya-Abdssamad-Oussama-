import React from "react";
import { Link } from "react-router-dom";

const CreateAdmin = () => {
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
                <form>
                  <div className="row">
                    <div className="col-12">
                      <h5 className="form-title student-info">
                        Informations sur l'étudiant
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
                          Prénom <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Entrez le prénom"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Nom de famille <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Entrez le nom de famille"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Sexe <span className="login-danger">*</span>
                        </label>
                        <select className="form-control select">
                          <option>Sélectionnez le genre</option>
                          <option>Féminin</option>
                          <option>Masculin</option>
                          <option>Autre</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms calendar-icon">
                        <label>
                          Date de naissance{" "}
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control datetimepicker"
                          type="text"
                          placeholder="JJ-MM-AAAA"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>Roll </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Entrez le numéro d'enregistrement"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Groupe sanguin <span className="login-danger">*</span>
                        </label>
                        <select className="form-control select">
                          <option>Veuillez sélectionner le groupe</option>
                          <option>B+</option>
                          <option>A+</option>
                          <option>O+</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Religion <span className="login-danger">*</span>
                        </label>
                        <select className="form-control select">
                          <option>Veuillez sélectionner la religion</option>
                          <option>Hindou</option>
                          <option>Chrétien</option>
                          <option>Autre</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          E-mail <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Entrez l'adresse e-mail"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Classe <span className="login-danger">*</span>
                        </label>
                        <select className="form-control select">
                          <option>Veuillez sélectionner la classe</option>
                          <option>12</option>
                          <option>11</option>
                          <option>10</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Section <span className="login-danger">*</span>
                        </label>
                        <select className="form-control select">
                          <option>Veuillez sélectionner la section</option>
                          <option>B</option>
                          <option>A</option>
                          <option>C</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>ID d'admission </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Entrez l'ID d'admission"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>Téléphone </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Entrez le numéro de téléphone"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group students-up-files">
                        <label>
                          Télécharger la photo de l'étudiant (150px X 150px)
                        </label>
                        <div className="uplod">
                          <label className="file-upload image-upbtn mb-0">
                            Choisir un fichier <input type="file" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="student-submit">
                        <button type="submit" className="btn btn-primary">
                          Ajouter
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
