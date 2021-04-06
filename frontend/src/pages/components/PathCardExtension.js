import React, { useEffect } from "react";
import ProgressBar from "./ProgressBar";
import DifficultyTag from "./DifficultyTag";
import GradTag from "./GradTag";
import MediaQuery from "react-responsive";
import Completiontik from "../images/tikcompleted.png";
import { Link } from "react-router-dom";
import Flash from "../images/flash.png";
import "./PathCardExtension.css";
import {
  coursecarddetails,
  userinprogresscoursesdata,
  userid,
} from "../../graphql/gql";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

function PathCardExtension({ courses }) {
  const { data } = useQuery(coursecarddetails);
  const { data: userid_data } = useQuery(userid);
  const [
    lazyuserinprogresscoursesdata,
    { data: inprogresscourses_data, loading: inprogresscourses_loading },
  ] = useLazyQuery(userinprogresscoursesdata);

  useEffect(() => {
    if (userid_data) {
      lazyuserinprogresscoursesdata({
        variables: { id: String(userid_data.me) },
      });
    }
  }, [userid_data]);

  return (
    <div className='pathCardExtension-parent-container'>
      <div className='pathCardExtension-Names'>
        <h1 className='pathCardExtension-header-text'>Name</h1>
        {courses.map((course) => (
          <div className='pathCardExtension-course-name-container'>
            <h1 className='pathCardExtension-course-name-text'>
              {course.course_name1}
            </h1>
          </div>
        ))}
      </div>
      <div className='pathCardExtension-Names'>
        <h1 className='pathCardExtension-header-text'>Progress</h1>
        {inprogresscourses_data && (
          <div>
            {courses.map((item) => {
              var temppercentage = null;
              var tempnumb = 0;
              for (
                var i = 0;
                i <
                inprogresscourses_data.userdata.courses.inprogress_courses
                  .length;
                i++
              ) {
                if (
                  inprogresscourses_data.userdata.courses.inprogress_courses[i]
                    .course_id === item.course_id
                ) {
                  for (
                    var k = 0;
                    k <
                    inprogresscourses_data.userdata.courses.inprogress_courses[
                      i
                    ].module.length;
                    k++
                  ) {
                    if (
                      inprogresscourses_data.userdata.courses
                        .inprogress_courses[i].module[k].flag === 2
                    ) {
                      tempnumb = tempnumb + 1;
                    }
                  }
                  temppercentage = Math.floor(
                    (tempnumb /
                      inprogresscourses_data.userdata.courses
                        .inprogress_courses[i].module.length) *
                      100
                  );
                }
              }
              if (temppercentage === 100) {
                return (
                  <div className='pathcardExtension-tik-image-container'>
                    <div
                      className='pathCardExtension-tik-image'
                      style={{ backgroundImage: `url(${Completiontik})` }}
                    />
                  </div>
                );
              } else if (temppercentage !== null) {
                return (
                  <div className='pathcardExtension-tik-image-container'>
                    <MediaQuery minWidth={650}>
                      <ProgressBar width={200} percent={temppercentage} />
                    </MediaQuery>
                    <MediaQuery maxWidth={650}>
                      <ProgressBar width={100} percent={temppercentage} />
                    </MediaQuery>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      <div className='pathCardExtension-Names'>
        <h1 className='pathCardExtension-header-text'>Difficulty</h1>
        {data &&
          courses.map((course) => {
            for (var i = 0; i < data.findall.length; i++) {
              if (course.course_id === data.findall[i].course_id) {
                return (
                  <div className='pathCardExtension-tag-container'>
                    <DifficultyTag tag={data.findall[i].difficulty} />
                  </div>
                );
              }
            }
          })}
      </div>
      <div className='pathCardExtension-Names'>
        <p className='pathCardExtension-hide'>.</p>

        {courses.map((course) =>
          course.percent === 0 ? (
            <div style={{ backgroundImage: `url(${Flash})` }} />
          ) : course.percent === 100 ? (
            <div className='pathCardExtension-tag-content'>
              <GradTag tag={course.tag} opacity={1} />
            </div>
          ) : (
            <div className='pathCardExtension-tag-content'>
              <GradTag tag={course.tag} opacity={0.4} />
            </div>
          )
        )}
      </div>
      <div className='pathCardExtension-Names'>
        <h1 className='pathCardExtension-header-text'>Difficulty</h1>
        {inprogresscourses_data &&
          courses.map((item) => {
            var mod = null;
            for (
              var i = 0;
              i <
              inprogresscourses_data.userdata.courses.inprogress_courses.length;
              i++
            ) {
              if (
                inprogresscourses_data.userdata.courses.inprogress_courses[i]
                  .course_id === item.course_id
              ) {
                for (
                  var k = 0;
                  k <
                  inprogresscourses_data.userdata.courses.inprogress_courses[i]
                    .module.length;
                  k++
                ) {
                  if (
                    inprogresscourses_data.userdata.courses.inprogress_courses[
                      i
                    ].module[k].flag === 1
                  ) {
                    mod =
                      inprogresscourses_data.userdata.courses
                        .inprogress_courses[i].module[k].module_id;
                  }
                }
                if (mod === null) {
                  mod =
                    inprogresscourses_data.userdata.courses.inprogress_courses[
                      i
                    ].module[0].module_id;
                }
              }
            }

            return (
              <Link
                to={`/videocourses/${item.course_id}/${mod}`}
                style={{ textDecoration: "none" }}
              >
                <div className='course-component-enroll'>
                  <p>Continue</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default PathCardExtension;

/*
course.percent === 100 ? (
            
            <div className='pathcardExtension-tik-image-container'>
              <div
                className='pathCardExtension-tik-image'
                style={{ backgroundImage: `url(${Completiontik})` }}
              />
            </div>
          ) : (
            <div className='pathcardExtension-tik-image-container'>
              <MediaQuery minWidth={650}>
                <ProgressBar width={200} percent={course.percent} />
              </MediaQuery>
              <MediaQuery maxWidth={650}>
                <ProgressBar width={100} percent={course.percent} />
              </MediaQuery>
            </div>
          )
          */
