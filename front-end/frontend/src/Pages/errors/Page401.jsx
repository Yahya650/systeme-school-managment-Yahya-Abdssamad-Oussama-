import React from "react";
import { Link } from "react-router-dom";

const Page401 = () => {
  return (
    <div className="main-wrapper">
      <div className="error-box">
        <h1>401</h1>
        <h3 className="h2 mb-3">
          <i className="fas fa-exclamation-triangle"></i> Accès non autorisé !
        </h3>
        <p className="h4 font-weight-normal">
          Vous n'êtes pas autorisé à accéder à cette page.
        </p>
        <Link to="/" className="btn btn-primary">
          Retour à la page principale
        </Link>
      </div>
    </div>
  );
};

export default Page401;
