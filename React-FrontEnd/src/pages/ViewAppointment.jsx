import React, { Component } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

class ViewAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointmentId: props.match.params.appId,
      appointmentDetails: {},
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount = () => {
    const { appointmentId } = this.state;
    fetch(`/api/appointment/view/${appointmentId}`)
      .then((response) => response.json())
      .then((data) => this.setState({ appointmentDetails: data }));
  };

  handleClose(e) {
    e.preventDefault();
    this.props.history.push("/allAppointments");
  }

  render() {
    const { appointmentDetails } = this.state;

    if (!appointmentDetails) {
      return <h1>No appointments found</h1>;
    }

    return (
      <div>
        <NavBar />
        <Header headerText="View Appointment" />
        <div className="FormCenter">
          <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="FormField">
              <span id="name" className="FormField__ViewLabel" htmlFor="name">
                Patient Id - {this.state.appointmentDetails.patients}
              </span>
            </div>
            <div className="FormField">
              <span
                id="disease"
                className="FormField__ViewLabel"
                htmlFor="name"
              >
                Disease - {appointmentDetails.disease}
              </span>
            </div>
            <div className="FormField">
              <span
                id="appdate"
                className="FormField__ViewLabel"
                htmlFor="name"
              >
                Date - {appointmentDetails.date}
              </span>
            </div>
            <div className="FormField">
              <span id="slot" className="FormField__ViewLabel" htmlFor="name">
                Slot - {appointmentDetails.timings}
              </span>
            </div>
            <div className="FormField">
              <span
                id="description"
                className="FormField__ViewLabel"
                htmlFor="name"
              >
                Description - {appointmentDetails.description}{" "}
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

export default ViewAppointment;
