import { Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { SignIn } from "../../validation/validation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Grid from "@mui/material/Unstable_Grid2";
import "./style.css";

const Login = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
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
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: SignIn,
    onSubmit: () => {
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(() => {
          console.log("milse");
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
  });

  return (
    <div>
      <Container fixed>
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
                  {loading ? (
                    <Button variant="contained" type="submit" disabled>
                      <BeatLoader size="22" color="#086fa4" />
                    </Button>
                  ) : (
                    <Button variant="contained" type="submit">
                      Sign In
                    </Button>
                  )}
                </form>
                <div className="returns">
                  <p>
                    Don't Have any account?
                    <Link to="/registration">
                      <span>Sign In</span>
                    </Link>
                  </p>
                  <p>
                    Forget Password?{" "}
                    <Link to="/login">
                      <span>Click Here</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
