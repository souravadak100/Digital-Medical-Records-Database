import React, { Component } from "react";
import Header from "../components/Header.jsx";
import NavBar from "../components/NavBar.jsx";
import "../App.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      user_email: "",
      user_dob: "",
      user_mobile: "",
      location: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount = () => {
    fetch(`/api/viewprofile/1`)
      .then((response) => response.json())
      .then((data) => this.setState(data));
  };

  handleSubmit(e) {
    e.preventDefault();

    if (this.canBeSubmitted()) {
      fetch(`/api/editprofile/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: this.state.user_name,
          user_email: this.state.user_email,
          password: this.state.password,
          user_dob: this.state.user_dob,
          location: this.state.location,
          user_mobile: this.state.user_mobile,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Updated profile: " + data);
          alert("User profile edited successfully!");
          this.props.history.push("/addPatient");
        });
    }
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  canBeSubmitted() {
    const { user_name, user_email, user_dob } = this.state;
    return user_name.length > 0 && user_email.length > 0 && user_dob.length > 0;
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push("/allPatients");
  }

  render() {
    const isEnabled = this.canBeSubmitted();

    return (
      <div>
        <NavBar />
        <Header headerText="Would you like to edit Profile?" />
        <div className="FormCenter">
          <form className="FormFields">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Username
              </label>
              <input
                type="text"
                id="user_name"
                className="FormField__Input"
                placeholder="Enter your name"
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
                placeholder="Enter date in fomat of dd/mm/yyyy"
                name="user_dob"
                value={this.state.user_dob}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Mobileno
              </label>
              <input
                type="text"
                id="user_mobile"
                className="FormField__Input"
                placeholder="Enter mobileno"
                name="user_mobile"
                value={this.state.user_mobile}
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
                name="location"
                className="FormField__Input"
                placeholder="Enter location"
                value={this.state.location}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="SideRow">
              <button
                type="submit"
                disabled={!isEnabled}
                onClick={this.handleSubmit}
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

export default EditProfile;
