import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@apollo/react-hooks";
import GoogleLogin from "react-google-login";

import "./Login.css";
import AcademyNavbar from "./components/AcademyNavbar";
import Smallfooter from "./components/Smallfooter";
import Particlejsloginsignup from "./components/Particlejsloginsignup";
import { setAccessToken } from "../accessToke";
import { login, googlesign } from "../graphql/gql";

export default function Login({ history }) {
  const [userlogin] = useMutation(login);
  const [usergooglesign] = useMutation(googlesign);
  const responseGoogle = async (response) => {
    const res = await usergooglesign({
      variables: {
        email: response.profileObj.email,
        name: response.profileObj.name,
        googleId: response.profileObj.googleId,
      },
    });
    if (res) {
      console.log(res.data);
      setAccessToken(res.data.googlesign.accessToken);

      history.push("/dashboard");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const res = await userlogin({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      if (res) {
        console.log(res.data.login);
        setAccessToken(res.data.login.accessToken);
        if (!res.data.login.flag) {
          history.push("/dashboard");
        }
        history.push("/mycourses");
      }
    },
  });

  return (
    <>
      <AcademyNavbar />

      <div className="contact-section" id="contact">
        <div className="login-container-1">
          <div className="login-content-wrapper">
            <form onSubmit={formik.handleSubmit}>
              <div className="login-email-wrapper">
                <div className="login-label-container">Email</div>{" "}
                <input
                  id="abcdefg"
                  type="email"
                  name="email"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className="login-password-wrapper">
                <div className="login-label-container">Password</div>
                <input
                  id="abcdefg"
                  type="password"
                  name="password"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div>
                <div className="login-signup-link">
                  <p>
                    Forgot Password?
                    <span style={{ color: "#ff4d15", cursor: "pointer" }}>
                      {" "}
                      Click Here
                    </span>
                  </p>
                </div>
                <input
                  type="submit"
                  name="Login"
                  value="Login"
                  id="loginbutton"
                />
              </div>
            </form>
            <GoogleLogin
              clientId="323004842864-iqcot8usla2p8j86ee45bs4v9m86oojm.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
      <div style={{ opacity: 0.6 }}>
        <Particlejsloginsignup />
      </div>

      <Smallfooter />
    </>
  );
}
