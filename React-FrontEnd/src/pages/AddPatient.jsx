import React, { Component } from "react";
import Header from "../components/Header.jsx";
import NavBar from "../components/NavBar.jsx";
import "../App.css";

class AddPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      dob: "",
      location: "",
      mobile: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.canBeSubmitted()) {
      fetch("/api/patients/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: this.state.name,
          user_email: this.state.email,
          user_dob: this.state.dob,
          location: this.state.location,
          user_mobile: this.state.mobile,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          alert("Patient registered successfully!");
          this.props.history.push("/allPatients");
        });
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push("/allPatients");
  }

  canBeSubmitted() {
    const { name, email, dob, location, mobile } = this.state;
    return (
      name.length > 0 &&
      email.length > 0 &&
      dob.length > 0 &&
      location.length > 0 &&
      mobile.length > 0
    );
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    const date = new Date();

    return (
      <div>
        <NavBar />
        <Header headerText="Add a Patient" />
        <div className="FormCenter">
          <form className="FormFields">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="FormField__Input"
                placeholder="Enter Full name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                E-mail ID
              </label>
              <input
                type="email"
                id="email"
                className="FormField__Input"
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Date of Birth
              </label>
              <input
                type="date"
                max={`${
                  date.getFullYear() +
                  "-" +
                  (date.getMonth() + 1) +
                  "-" +
                  date.getDate()
                }`}
                id="dob"
                className="FormField__Input"
                placeholder="Enter date of birth in dd/mm/yyyy format"
                name="dob"
                value={this.state.dob}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Location
              </label>
              <input
                type="text"
                id="location"
                className="FormField__Input"
                placeholder="Enter location"
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                className="FormField__Input"
                placeholder="Enter mobile"
                name="mobile"
                value={this.state.mobile}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="SideRow">
              <button
                id="registerbtn"
                className="FormField__Button mr-20"
                data-action="add-patient"
                onClick={this.handleSubmit}
                disabled={!isEnabled}
              >
                Register
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

export default AddPatient;
