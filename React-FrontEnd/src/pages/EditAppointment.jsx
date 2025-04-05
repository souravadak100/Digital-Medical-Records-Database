import React, { Component } from "react";
import Header from "../components/Header.jsx";
import NavBar from "../components/NavBar.jsx";
import "../App.css";

class EditAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointmentId: props.match.params.appId,
      patients: "",
      disease: "",
      date: "",
      timings: "",
      description: "",
      patientName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount = async () => {
    const appointmentDetails = await fetch(
      `/api/appointment/view/${this.state.appointmentId}`
    );
    const data = await appointmentDetails.json();

    const patientDetails = await fetch(`/api/patients/view/${data.patients}`);
    const { user_name } = await patientDetails.json();

    this.setState({
      patientName: user_name,
      patients: data.patients,
      disease: data.disease,
      date: data.date,
      timings: data.timings,
      description: data.description,
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    if (this.canBeSubmitted()) {
      fetch(`/api/appointment/edit/${this.state.appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disease: this.state.disease,
          date: this.state.date,
          timings: this.state.timings,
          description: this.state.description,
          patients: this.state.patients,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Updated appointment: " + data);
          alert("Appointment edited successfully!");
          this.props.history.push("/allAppointments");
        });
    }
  }

  canBeSubmitted() {
    const { patientName, disease, date, timings, description } = this.state;
    return (
      patientName.length > 0 &&
      disease.length > 0 &&
      date.length > 0 &&
      timings.length > 0 &&
      description.length > 0
    );
  }

  handleCancel(e) {
    this.props.history.push("/allAppointments");
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { appointmentId } = this.state;

    if (!appointmentId) {
      return <h1>No appointments Found</h1>;
    }

    return (
      <div>
        <NavBar />
        <Header headerText="Edit Appointment" />
        <div className="FormCenter">
          <form className="FormFields">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="patients"
                className="FormField__Input"
                placeholder="Enter name"
                name="patients"
                value={this.state.patientName}
                disabled
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Enter your disease :
              </label>
              <input
                type="disease"
                id="disease"
                className="FormField__Input"
                placeholder="Enter disease"
                name="disease"
                value={this.state.disease}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="FormField__Input"
                placeholder="Enter date in format of dd/mm/yyyy"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Slots
              </label>
              <input
                type="slot"
                id="timings"
                className="FormField__Input"
                placeholder="Enter timings"
                name="timings"
                value={this.state.timings}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Description
              </label>
              <input
                type="description"
                id="description"
                className="FormField__Input"
                placeholder="Enter description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="SideRow">
              <button
                onClick={this.handleSubmit}
                type="submit"
                className="FormField__Button mr-20"
              >
                Submit
              </button>
            </div>
            <div className="SideRow">
              <button
                onClick={this.handleCancel}
                className="FormField__Button mr-20"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditAppointment;
