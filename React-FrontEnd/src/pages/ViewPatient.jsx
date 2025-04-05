import React, { Component } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

class ViewPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patient: {},
      id: props.match.params.id,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount = () => {
    fetch(`/api/patients/view/${this.state.id}`)
      .then((response) => response.json())
      .then((data) => this.setState({ patient: data }));
  };

  handleClose(e) {
    e.preventDefault();
    this.props.history.push("/allPatients");
  }

  render() {
    const { patient } = this.state;

    if (!patient) {
      return <h1>No patients found</h1>;
    }

    return (
      <div>
        <NavBar />
        <Header headerText="View Patient details" />
        <div className="FormCenter">
          <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="FormField">
              <span
                id="name"
                type="name"
                className="FormField__ViewLabel"
                htmlFor="name"
              >
                Name - {patient.user_name}
              </span>
            </div>
            <div className="FormField">
              <span
                id="email"
                type="email"
                className="FormField__ViewLabel"
                htmlFor="name"
              >
                E-mail - {patient.user_email}
              </span>
            </div>
            <div className="FormField">
              <span
                id="dob"
                type="dob"
                className="FormField__ViewLabel"
                htmlFor="name"
              >
                Date of Birth - {patient.user_dob}
              </span>
            </div>
            <div className="FormField">
              <span
                id="location"
                type="location"
                className="FormField__ViewLabel"
                htmlFor="name"
              >
                Location - {patient.location}
              </span>
            </div>
            <div className="FormField">
              <span
                id="mobile"
                type="mobile"
                className="FormField__ViewLabel"
                htmlFor="name"
              >
                Mobile - {patient.user_mobile}{" "}
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

export default ViewPatient;
