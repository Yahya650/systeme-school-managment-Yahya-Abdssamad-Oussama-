import React from "react";
import { Link } from "react-router-dom";

const ForgotPasswordTeacher = () => {
  return (
    <div className="main-wrapper login-body">
      <div className="login-wrapper">
        <div className="container">
          <div className="loginbox">
            <div className="login-left">
              <img
                className="img-fluid"
                src="/assets/img/login.png"
                alt="Logo"
              />
            </div>
            <div className="login-right">
              <div className="login-right-wrap">
                <h1>Réinitialiser le mot de passe</h1>
                <p className="account-subtitle">Laissez-nous vous aider</p>
                <form action="">
                  <div className="form-group">
                    <label>
                      Entrez votre adresse e-mail enregistrée
                      <span className="login-danger">*</span>
                    </label>
                    <input className="form-control" type="text" />
                    <span className="profile-views">
                      <i className="fas fa-envelope" />
                    </span>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">
                      Réinitialiser mon mot de passe
                    </button>
                  </div>
                  <div className="form-group mb-0">
                    <Link
                      to="/teacher/login"
                      className="btn btn-primary primary-reset btn-block"
                    >
                      Connexion
                    </Link>
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

export default ForgotPasswordTeacher;
