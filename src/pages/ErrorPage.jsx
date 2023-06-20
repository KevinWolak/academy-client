import React from "react";
import "./ErrorPage.css";
const ErrorPage = () => {
  return (
    <div className="errorContainer">
      <h2 className="statusError">404</h2>
      <p>Opps!This Page Could Not be Found. </p>
      <p>
        The page you are looking for might have been removed or is temporally
        unaviable.
      </p>
    </div>
  );
};

export default ErrorPage;
