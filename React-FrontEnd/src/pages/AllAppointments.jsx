import React, { Component } from "react";
import Header from "../components/Header.jsx";
import NavBar from "../components/NavBar.jsx";
import "../App.css";

class AllAppointments extends Component {
  constructor() {
    super();

    this.state = {
      appointmentsList: [],
    };

    this.handleView = this.handleView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount = async () => {
    const response = await fetch("/api/appointment/list");
    const data = await response.json();
    this.setState({ appointmentsList: data });
  };

  handleView(appId) {
    this.props.history.push(`/viewAppointment/${appId}`);
  }

  handleEdit(appId) {
    this.props.history.push(`/editAppointment/${appId}`);
  }

  handleDelete(e, appId) {
    e.preventDefault();

    if (appId) {
      fetch("/api/appointment/delete/" + appId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(({ status }) => {
        if (status === 204) {
          alert("Appointment deleted successfully!");
        }
      });
    }
  }

  render() {
    const { appointmentsList } = this.state;

    return (
      <>
        <NavBar />

        <form style={{ display: "flex", height: "80%", alignItems: "center" }}>
          {appointmentsList.length === 0 ? (
            <h1 style={{ textAlign: "center", flexGrow: "1" }}>
              No Appoinments Found
            </h1>
          ) : (
            <div style={{ height: "100%", width: "100%" }}>
              <Header headerText="List - All Appointments" />
              {appointmentsList.map((appointment, index) => (
                <div
                  className="FormField"
                  text-align="right"
                  style={{ backgroundColor: "#D3D3D3" }}
                  expand="md"
                  fontSize="27px"
                  key={index}
                >
                  <span style={{ fontSize: "20px" }}>
                    {appointment.disease}, Slot: {appointment.timings}
                  </span>
                  <button
                    onClick={(e) => this.handleDelete(e, appointment.id)}
                    className="FormField__all__Button"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => this.handleEdit(appointment.id)}
                    className="FormField__all__Button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.handleView(appointment.id)}
                    className="FormField__all__Button"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </form>
      </>
    );
  }
}

export default AllAppointments;
