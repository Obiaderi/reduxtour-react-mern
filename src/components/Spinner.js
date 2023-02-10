import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <MDBSpinner
        style={{ height: "4rem", width: "4rem", marginTop: "150px" }}
        grow
      >
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
};

export default Spinner;
