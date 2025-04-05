import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import EditAppointment from "./pages/EditAppointment";
import AllAppointments from "./pages/AllAppointments";
import ViewAppointment from "./pages/ViewAppointment";
import BookAppointment from "./pages/BookAppointment";
import SignUpForm from "./pages/SignUpForm";
import AddPatient from "./pages/AddPatient";
import SignInForm from "./pages/SignInForm";
import ViewProfile from "./pages/ViewProfile";
import EditProfile from "./pages/EditProfile";
import AllPatients from "./pages/AllPatients";
import ViewPatient from "./pages/ViewPatient";
import EditPatient from "./pages/EditPatient";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Router basename="/hospital/">
        <div className="App__Form">
          <Route exact path="/" component={SignUpForm}></Route>
          <Route path="/sign-in" component={SignInForm}></Route>
          <Route path="/viewProfile" component={ViewProfile}></Route>
          <Route path="/editProfile" component={EditProfile}></Route>
          <Route
            path="/editAppointment/:appId"
            component={EditAppointment}
          ></Route>
          <Route path="/allAppointments" component={AllAppointments}></Route>
          <Route
            path="/viewAppointment/:appId"
            component={ViewAppointment}
          ></Route>
          <Route path="/addPatient" component={AddPatient}></Route>
          <Route path="/allPatients" component={AllPatients}></Route>
          <Route path="/viewPatient/:id" component={ViewPatient}></Route>
          <Route path="/editPatient/:id" component={EditPatient}></Route>
          <Route path="/bookAppointment" component={BookAppointment}></Route>
        </div>
      </Router>
    );
  }
}
