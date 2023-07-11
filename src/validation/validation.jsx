/* eslint-disable no-unused-vars */
import * as Yup from "yup";

export const SingUp = Yup.object({
  fullname: Yup.string().min(2).required("Please Enter Your Name"),
  email: Yup.string().email().required("Please Enter A Valid Email"),
  password: Yup.string().min(5).required("Enter A Password"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password Must Match")
    .required("Please Enter Confirm Password"),
});

export const SignIn = Yup.object({
  email: Yup.string().required("Please Enter Your Email"),
  password: Yup.string().min(5).required("Enter A Password"),
});
