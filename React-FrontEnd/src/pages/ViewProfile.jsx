import React, { Component } from "react";
import Header from "../components/Header.jsx";
import NavBar from "../components/NavBar.jsx";
import "../App.css";

class ViewProfile extends Component {
  constructor() {
    super();

    this.state = {
      admin: {},
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount = () => {
    fetch(`/api/viewprofile/1`)
      .then((response) => response.json())
      .then((data) => this.setState({ admin: data }));
  };

  handleClose(e) {
    e.preventDefault();
    this.props.history.push("/addPatient");
  }

  render() {
    const { admin } = this.state;

    return (
      <div>
        <NavBar />

        <Header headerText="Your Profile - Details" />

        <div className="FormCenter">
          <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="FormField">
              <span id="name" className="FormField__Label" htmlFor="name">
                Username - {admin.user_name}
              </span>
            </div>
            <div className="FormField">
              <span id="email" className="FormField__Label" htmlFor="name">
                E-mail - {admin.user_email}
              </span>
            </div>
            <div className="FormField">
              <span id="dob" className="FormField__Label" htmlFor="name">
                DOB - {admin.user_dob}
              </span>
            </div>
            <div className="FormField">
              <span id="mobileno" className="FormField__Label" htmlFor="name">
                Mobile No. - {admin.user_mobile}
              </span>
            </div>
            <div className="FormField">
              <span id="location" className="FormField__Label" htmlFor="name">
                Location - {admin.location}
              </span>
            </div>
            <div className="FormField">
              <button
                onClick={this.handleClose}
                className="FormField__Button mr-20"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ViewProfile;
