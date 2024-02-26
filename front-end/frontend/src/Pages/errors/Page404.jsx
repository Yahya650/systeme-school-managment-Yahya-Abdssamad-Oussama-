import React from "react";
import { useContextApi } from "../../config/Context/ContextApi";

const Page404 = () => {
  const { navigateTo } = useContextApi();
  return (
    <div className="main-wrapper">
      <div className="error-box">
        <h1>404</h1>
        <h3 className="h2 mb-3">
          <i className="fas fa-exclamation-triangle"></i> Oups! Page non trouvée
          !
        </h3>
        <p className="h4 font-weight-normal">
          La page que vous avez demandée n'a pas été trouvée.
        </p>
        <button
          type="button"
          onClick={() => navigateTo(-2)}
          className="border border-2 btn ms-2 rounded-4 bg-danger-light"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default Page404;
