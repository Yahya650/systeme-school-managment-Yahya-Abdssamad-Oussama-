import React from "react";

const Page404 = () => {
  return (
    <div className="main-wrapper">
      <div className="error-box">
        <h1>404</h1>
        <h3 className="h2 mb-3">
          <i className="fas fa-exclamation-triangle"></i> Oups! Page non
          trouvée !
        </h3>
        <p className="h4 font-weight-normal">
          La page que vous avez demandée n'a pas été trouvée.
        </p>
      </div>
    </div>
  );
};

export default Page404;
