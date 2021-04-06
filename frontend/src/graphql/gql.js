import { gql } from "@apollo/client";

const coursecarddetails = gql`
  query {
    findall {
      course_id
      course_name1
      course_name2
      difficulty
      photo
      subtitle
      description
      flashes
    }
  }
`;

const pathcarddetails = gql`
  query {
    findallpaths {
      path_id
      path_title1
      path_title2
      difficulty
      description
      flashes
      courses {
        course_id
        course_name1
      }
    }
  }
`;

const courseoverviewcontent = gql`
  query($course_id: String) {
    findcourse(course_id: $course_id) {
      course_id
      course_name1
      course_name2
      photo
      subtitle
      description
      difficulty
      flashes
      overview {
        sections
        coursedetailscontent {
          title1
          title2
          content
        }
      }
      modules {
        module_id
        module_name
      }
    }
  }
`;

const findpathwithid = gql`
  query($id: String) {
    findpathid(id: $id) {
      path_id
      path_title1
      path_title2
      difficulty
      description
      flashes
      courses {
        course_id
        course_name1
      }
    }
  }
`;

const coursecontent = gql`
  query($course_id: String) {
    findcourse(course_id: $course_id) {
      course_id
      course_name1
      course_name2
      photo
      subtitle
      description
      difficulty
      flashes
      overview {
        sections
        coursedetailscontent {
          title1
          title2
          content
        }
      }
      modules {
        module_id
        module_name
        module_video
        module_content {
          title
          description
          image
        }
        module_questions {
          question
          answer
        }
      }
    }
  }
`;

const coursepath = gql`
  query($course_id: String) {
    findpath(course_id: $course_id) {
      path_id
      path_title1
      path_title2
      description
      difficulty
      flashes
      courses {
        course_id
        course_name1
      }
    }
  }
`;

const createUser = gql`
  mutation(
    $email: String!
    $password: String!
    $name: String!
    $username: String!
  ) {
    createUser(
      email: $email
      password: $password
      name: $name
      username: $username
    )
  }
`;
const login = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      userId
      flag
    }
  }
`;
const googlesign = gql`
  mutation($email: String!, $name: String!, $googleId: String!) {
    googlesign(email: $email, name: $name, googleId: $googleId) {
      accessToken
      userId
    }
  }
`;
const userid = gql`
  query {
    me
  }
`;

const dashboarduserdata = gql`
  query($id: ID) {
    userdata(id: $id) {
      flashes
      name
      paths {
        inprogress_paths {
          path_id
          path_title1
          path_title2
          courses {
            course_id
            course_name1
            flag
          }
        }
      }
      courses {
        inprogress_courses {
          course_id
          course_name1
          course_name2
          module {
            module_id
            module_name
            flag
          }
        }
      }
    }
  }
`;

const userinprogresscoursesdata = gql`
  query($id: ID) {
    userdata(id: $id) {
      courses {
        inprogress_courses {
          course_id
          course_name1
          course_name2
          course_completed
          module {
            module_id
            module_name
            flag
            question_flag
          }
        }
      }
    }
  }
`;

const mycoursedetails = gql`
  query {
    findall {
      course_id
      course_name1
      course_name2
      photo
      description
      difficulty
    }
  }
`;

const addcourseuser = gql`
  mutation(
    $id: ID
    $course_id: String
    $course_name1: String
    $course_name2: String
    $module: [usercoursemoduleinput]
    $flashes: String
  ) {
    addinprogresscourseuser(
      id: $id
      course_id: $course_id
      course_name1: $course_name1
      course_name2: $course_name2
      module: $module
      flashes: $flashes
    )
  }
`;

const addpathuser = gql`
  mutation(
    $id: ID
    $path_id: String
    $path_title1: String
    $path_title2: String
    $courses: [userpathcourseinput]
    $flashes: String
  ) {
    addinprogresspathuser(
      id: $id
      path_id: $path_id
      path_title1: $path_title1
      path_title2: $path_title2
      courses: $courses
      flashes: $flashes
    )
  }
`;

const pathuserdata = gql`
  query($id: ID) {
    userdata(id: $id) {
      flashes
      paths {
        inprogress_paths {
          path_id
          path_title1
          path_title2
          courses {
            course_id
            course_name1
          }
        }
      }
      courses {
        inprogress_courses {
          course_id
          course_name1
          course_name2
          course_completed
          module {
            module_id
            module_name
            flag
          }
        }
      }
    }
  }
`;

const profileupdate = gql`
  mutation($id: ID, $name: String, $profession: String, $username: String) {
    changeuserprofileinfo(
      id: $id
      name: $name
      profession: $profession
      username: $username
    )
  }
`;

const updatamoduleflag = gql`
  mutation($id: ID, $course_id: String, $module: [usercoursemoduleinput]) {
    usercoursemoduleupdate(id: $id, module: $module, course_id: $course_id)
  }
`;

const completedcourse = gql`
  mutation($id: ID, $course_id: String) {
    addcompletedcourseuser(id: $id, course_id: $course_id)
  }
`;

const questionreward = gql`
  mutation($id: ID, $flashes: String, $courseid: String, $moduleid: String) {
    modulequestion(
      id: $id
      flashes: $flashes
      courseid: $courseid
      moduleid: $moduleid
    )
  }
`;

export {
  coursecarddetails,
  pathcarddetails,
  courseoverviewcontent,
  coursepath,
  createUser,
  login,
  googlesign,
  userid,
  addcourseuser,
  userinprogresscoursesdata,
  mycoursedetails,
  addpathuser,
  pathuserdata,
  profileupdate,
  coursecontent,
  updatamoduleflag,
  completedcourse,
  dashboarduserdata,
  findpathwithid,
  questionreward,
};
