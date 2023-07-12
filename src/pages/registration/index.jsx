// import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useFormik } from "formik";
import "./style.css";
import { SingUp } from "../../validation/validation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const auth = getAuth();
  const navigate = useNavigate();

  // For Password show
  const [passShow, setPassShow] = useState("password");
  const handleShow = () => {
    if (passShow == "password") {
      setPassShow("text");
    } else {
      setPassShow("password");
    }
  };

  const initialvalues = {
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: SingUp,
    onSubmit: () => {
      setLoading(true);
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(() => {
          toast.success("Registration Successfull!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          formik.resetForm();
          setLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            toast.error("Email Already Used", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
            setLoading(false);
          }
        });
    },
  });

  return (
    <div>
      <Container fixed>
        <ToastContainer />
        <Grid container spacing={2} justifyContent="center">
          <Grid xs={6}>
            <div className="regi-main">
              <div className="regi-logo">
                <img src="./images/logo.png" alt="logo" />
              </div>
              <div className="regi-text">
                <h1>Get started with easily register</h1>
                <h2>Free register and you can enjoy it</h2>
              </div>
              <div className="regi-inputs">
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    className="input-all"
                    type="email"
                    onChange={formik.handleChange}
                    name="email"
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className="errors">{formik.errors.email}</p>
                  ) : null}
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    margin="normal"
                    className="input-all"
                    type="text"
                    onChange={formik.handleChange}
                    name="fullname"
                    value={formik.values.fullname}
                  />
                  {formik.errors.fullname && formik.touched.fullname ? (
                    <p className="errors">{formik.errors.fullname}</p>
                  ) : null}
                  <div className="pass-main">
                    <TextField
                      label="Password"
                      variant="outlined"
                      margin="normal"
                      className="input-all"
                      type={passShow}
                      onChange={formik.handleChange}
                      name="password"
                      value={formik.values.password}
                    />
                    <div className="pass-icon" onClick={handleShow}>
                      {passShow == "password" ? (
                        <AiFillEyeInvisible />
                      ) : (
                        <AiFillEye />
                      )}
                    </div>
                  </div>
                  {formik.errors.password && formik.touched.password ? (
                    <p className="errors">{formik.errors.password}</p>
                  ) : null}
                  <div className="pass-main">
                    <TextField
                      label="Confirm Password"
                      variant="outlined"
                      margin="normal"
                      className="input-all"
                      type={passShow}
                      onChange={formik.handleChange}
                      name="confirmpassword"
                      value={formik.values.confirmpassword}
                    />
                    <div className="pass-icon" onClick={handleShow}>
                      {passShow == "password" ? (
                        <AiFillEyeInvisible />
                      ) : (
                        <AiFillEye />
                      )}
                    </div>
                  </div>
                  {formik.errors.confirmpassword &&
                  formik.touched.confirmpassword ? (
                    <p className="errors">{formik.errors.confirmpassword}</p>
                  ) : null}
                  {loading ? (
                    <Button variant="contained" type="submit" disabled>
                      <BeatLoader color="#086fa4" />
                    </Button>
                  ) : (
                    <Button variant="contained" type="submit">
                      Sign In
                    </Button>
                  )}
                </form>
                <p>
                  Already have an Account?{" "}
                  <Link to="/login">
                    <span>LogIn</span>
                  </Link>
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Registration;
