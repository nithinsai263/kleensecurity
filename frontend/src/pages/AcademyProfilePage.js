import React, { useState } from "react";
import "./AcademyProfilePage.css";
import AcademyNavbar from "./components/AcademyNavbar";
import Smallfooter from "./components/Smallfooter";
import { profileupdate, userid } from "../graphql/gql";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useFormik } from "formik";

function AcademyProfilePage({ history }) {
  const [profile, setProfile] = useState(false);
  const { data: userid_data } = useQuery(userid);
  const [userprofileupdate] = useMutation(profileupdate);

  const formik = useFormik({
    initialValues: {
      name: "",
      profession: "",
      username: "",
    },
    onSubmit: async (values) => {
      if (userid_data) {
        const res = await userprofileupdate({
          variables: {
            id: userid_data.me,
            name: values.name,
            profession: values.profession,
            username: values.username,
          },
        });

        if (res) {
          history.push("/dashboard");
        }
      }
    },
  });

  return (
    <>
      <AcademyNavbar />
      <div className='academy-profile-main-container'>
        <div className='academy-profile-container'>
          <div className='academy-profile-menu-container'>
            <div className='academy-profile-menu-container2'>
              <div className='academy-profile-menu-profile'></div>
              <div className='academy-profile-menu-name'>
                <p>YOYO</p>
              </div>

              <div className='academy-profile-menu-list-container'>
                <div
                  className='academy-profile-menu-list'
                  onClick={() => setProfile(true)}
                  style={{
                    backgroundColor: profile === true ? "#2d2d2d" : "#121212",
                  }}
                >
                  <p>Profile</p>
                </div>
                <div
                  className='academy-profile-menu-list'
                  onClick={() => setProfile(false)}
                  style={{
                    backgroundColor: profile === false ? "#2d2d2d" : "#121212",
                  }}
                >
                  <p>Account</p>
                </div>
                <div className='academy-profile-menu-list'>
                  <p className='academy-profile-menu-logout'>Logout</p>
                </div>
              </div>
            </div>
          </div>
          <div className='academy-profile-information-container'>
            {profile === true && (
              <div>
                <div className='academy-profile-information-header'>
                  <p className='academy-profile-information-header1'>Profile</p>
                  <p className='academy-profile-information-header2'>
                    Add information about youself
                  </p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className='academy-profile-information-inputmain-container'>
                    <div className='academy-profile-information-inputmain-wrapper'>
                      <div className='academy-profile-information-inputcontainer'>
                        <p>Name:</p>
                        <input
                          type='text'
                          name='lastname'
                          onChange={formik.handleChange}
                          value={formik.values.name}
                        />
                      </div>
                      <div className='academy-profile-information-inputcontainer'>
                        <p>User Name:</p>
                        <input
                          type='text'
                          name='username'
                          onChange={formik.handleChange}
                          value={formik.values.username}
                        />
                      </div>
                      <div className='academy-profile-information-inputcontainer'>
                        <p>Profession:</p>
                        <input
                          type='text'
                          name='profession'
                          onChange={formik.handleChange}
                          value={formik.values.profession}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='academy-profile-information-submit'>
                    <div>
                      <input
                        type='submit'
                        name='Save'
                        value='Save'
                        className='academy-profile-information-save'
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {profile === false && (
              <div>
                <div className='academy-profile-information-header'>
                  <p className='academy-profile-information-header1'>Account</p>
                  <p className='academy-profile-information-header2'>
                    Edit account and password here
                  </p>
                </div>
                <div className='academy-profile-information-inputmain-container'>
                  <div className='academy-profile-information-inputmain-wrapper'>
                    <div className='academy-profile-information-inputcontainer'>
                      <p>Email:</p>
                      <input type='text' />
                    </div>

                    <div className='academy-profile-information-inputcontainer'>
                      <p>Password:</p>
                      <input type='text' />
                    </div>
                    <div className='academy-profile-information-inputcontainer'>
                      <p>Confirm Password:</p>
                      <input type='text' />
                    </div>
                  </div>
                </div>
                <div className='academy-profile-information-submit'>
                  <div className='academy-profile-information-save'>
                    <p>Save</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Smallfooter />
    </>
  );
}

export default AcademyProfilePage;
