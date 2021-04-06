import React, { Component } from "react";
import { useFormik } from "formik";
import { Link as OtherLink } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import "./Signup.css";
import AcademyNavbar from "./components/AcademyNavbar";
import Smallfooter from "./components/Smallfooter";
import Particlejsloginsignup from "./components/Particlejsloginsignup";
import { createUser } from "../graphql/gql";

export default function Signup({ history }) {
  const [usersignup] = useMutation(createUser);
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(JSON.stringify(values.name));

      const res = await usersignup({
        variables: {
          email: values.email,
          password: values.password,
          name: values.name,
          username: values.username,
        },
      });

      if (res) {
        history.push("/login");
      }
    },
  });

  return (
    <>
      <AcademyNavbar />

      <div className='contact-section' id='contact'>
        <div className='signup-container-1'>
          <div className='login-content-wrapper'>
            <form onSubmit={formik.handleSubmit}>
              <div className='login-email-wrapper'>
                <div className='login-label-container'>Name</div>{" "}
                <input
                  id='abcdefg'
                  type='name'
                  name='name'
                  required
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
              <div className='login-email-wrapper'>
                <div className='login-label-container'>Username</div>{" "}
                <input
                  id='abcdefg'
                  type='username'
                  name='username'
                  required
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </div>
              <div className='login-email-wrapper'>
                <div className='login-label-container'>Email</div>{" "}
                <input
                  id='abcdefg'
                  type='email'
                  name='email'
                  required
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className='login-password-wrapper'>
                <div className='login-label-container'>Password</div>
                <input
                  id='abcdefg'
                  type='password'
                  name='password'
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div>
                <div className='login-signup-link'>
                  <input type='checkbox' className='login-checkbox' />
                  <p>
                    I agree to the{" "}
                    <span style={{ color: "#ff4d15" }}>
                      terms and conditions
                    </span>
                  </p>
                </div>

                <input
                  type='submit'
                  name='Signup'
                  value='Signup'
                  id='loginbutton'
                />
              </div>
            </form>
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
