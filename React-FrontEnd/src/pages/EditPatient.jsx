import React, { Component } from "react";
import NavBar from "../components/NavBar.jsx";
import "../App.css";
import Header from "../components/Header.jsx";

class EditPatient extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;

    this.state = {
      user_name: "",
      user_email: "",
      user_mobile: "",
      user_dob: "",
      location: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    fetch(`/api/patients/view/${this.id}`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          user_name: data.user_name,
          user_email: data.user_email,
          user_dob: data.user_dob,
          location: data.location,
          user_mobile: data.user_mobile,
        })
      );
  };

  handleSubmit(e) {
    e.preventDefault();

    if (this.canBeSubmitted()) {
      fetch(`/api/patients/edit/${this.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: this.state.user_name,
          user_email: this.state.user_email,
          user_dob: this.state.user_dob,
          location: this.state.location,
          user_mobile: this.state.user_mobile,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Updated patient: " + data);
          alert("Patient details edited successfully!");
          this.props.history.push("/allPatients");
        });
    }
  }

  canBeSubmitted() {
    const { user_name, user_email, user_dob, location, user_mobile } =
      this.state;

    return (
      user_name.length > 0 &&
      user_email.length > 0 &&
      user_dob.length > 0 &&
      location.length > 0 &&
      user_mobile.length > 0
    );
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push("/allPatients");
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
    return (
      <div>
        <NavBar />
        <Header headerText="Edit Patient" />
        <div className="FormCenter">
          <form className="FormFields">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="user_name"
                className="FormField__Input"
                placeholder="Enter name"
                name="user_name"
                value={this.state.user_name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                E-mail
              </label>
              <input
                type="email"
                id="user_email"
                className="FormField__Input"
                placeholder="Enter email"
                name="user_email"
                value={this.state.user_email}
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
                id="user_dob"
                className="FormField__Input"
                placeholder="Enter date of birth"
                name="user_dob"
                value={this.state.user_dob}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Location
              </label>
              <input
                type="location"
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
                type="mobile"
                id="user_mobile"
                className="FormField__Input"
                placeholder="Enter mobile"
                name="user_mobile"
                value={this.state.user_mobile}
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
                type="button"
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

export default EditPatient;
