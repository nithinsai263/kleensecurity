import React from "react";
import AcademyCourseLandingPage from "../AcademyCourseLandingPage";
import Coursedetails from "../Coursedetails";
import AcountDashboard from "../AccountDashboard";
import MyCourses from "../MyCourses";
import MyPaths from "../MyPaths";
import VideoCourses from "../VideoCourse";
import "./Landingrender.css";
import PageNotFound from "../PageNotFound";
import AcademyProfilePage from "../AcademyProfilePage";
import Login from "../Login";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AccountDashboard from "../AccountDashboard";
import Signup from "../Signup";
import ScrollToTop from "../components/ScrolltoTop";

function Landing() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={AcademyCourseLandingPage} />
        <Route path="/coursedetails/:id" exact component={Coursedetails} />
        <Route path="/mycourses" exact component={MyCourses} />
        <Route path="/mypaths" exact component={MyPaths} />
        <Route path="/profilesettings" exact component={AcademyProfilePage} />
        <Route path="/dashboard" exact component={AccountDashboard} />
        <Route
          path="/videocourses/:courseid/:moduleid"
          exact
          component={VideoCourses}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/joinnow" exact component={Signup} />
      </Switch>
    </Router>
  );
}

export default Landing;
