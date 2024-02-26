import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContextApi } from "../../../config/Context/ContextApi";
import LoadingCircle from "../../../Components/LoadingCircle";

const LoginStudent = () => {
  const [loading, setLoading] = useState(false);
  const { Login, errors } = useContextApi();
  const handelLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await Login("student", e.target.code_massar.value, e.target.password.value);
    setLoading(false);
  };

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
                <h1>Bienvenue sur Group Scolaire Ben Jelloun</h1>
                <p className="account-subtitle">
                  Besoin d'un compte ? <Link to="">S'inscrire</Link>
                </p>
                <h2>Se connecter</h2>
                <form onSubmit={handelLogin}>
                  <div className="form-group">
                    <label>
                      Code Massar
                      <span className="login-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="code_massar"
                    />
                    <span className="profile-views">
                      <i className="fas fa-user-circle"></i>
                    </span>
                    {errors && (
                      <span className="text text-danger">
                        {errors.code_massar}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      Mot de passe <span className="login-danger">*</span>
                    </label>
                    <input
                      className="form-control pass-input"
                      type="password"
                      name="password"
                    />
                    {errors && (
                      <span className="text text-danger">
                        {errors.password}
                      </span>
                    )}
                  </div>
                  <div className="forgotpass">
                    <Link to="/student/forgot-password">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-block"
                      disabled={loading}
                      type="submit"
                    >
                      {!loading ? "Connexion" : <LoadingCircle />}
                    </button>
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

export default LoginStudent;
