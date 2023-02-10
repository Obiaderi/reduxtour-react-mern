import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBValidationItem,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/features/authSlice";

// Custom Imports

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register(props) {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password, firstName, lastName, confirmPassword } = formValue;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   This will run once we have error
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //
    if (password !== confirmPassword) {
      return toast.error("Password should match");
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "500px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <MDBValidationItem feedback="Please provide a firstname." invalid>
                <MDBInput
                  style={{ padding: "10px" }}
                  value={firstName}
                  name="firstName"
                  type="text"
                  onChange={onInputChange}
                  id="validationCustom01"
                  required
                  label="First Name"
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-6">
              <MDBValidationItem feedback="Please provide a Last Name." invalid>
                <MDBInput
                  style={{ padding: "10px" }}
                  value={lastName}
                  name="lastName"
                  type="text"
                  onChange={onInputChange}
                  id="validationCustom01"
                  required
                  label="Last Name"
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem
                feedback="Please provide a valid Email."
                invalid
              >
                <MDBInput
                  style={{ padding: "10px" }}
                  value={email}
                  name="email"
                  type="email"
                  onChange={onInputChange}
                  id="validationCustom01"
                  required
                  label="Email"
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem
                feedback="Please provide a valid Password."
                invalid
              >
                <MDBInput
                  style={{ padding: "10px" }}
                  label="Password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem feedback="Please Confirm Password" invalid>
                <MDBInput
                  style={{ padding: "10px" }}
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
}

export default Register;
