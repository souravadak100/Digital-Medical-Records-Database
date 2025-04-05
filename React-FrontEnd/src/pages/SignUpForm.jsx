import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import "../App.css";

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uname: "",
      email: "",
      password: "",
      dob: "",
      mobileno: "",
      location: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: this.state.uname,
          user_email: this.state.email,
          password: this.state.password,
          user_dob: this.state.dob,
          location: this.state.location,
          user_mobile: this.state.mobileno,
        }),
      })
        .then((resp) => resp.json())
        .then(({ user, token }) => {
          localStorage.setItem("token", token);
          alert("Registered successfully!");
          this.props.history.push("/allPatients");
        })
        .catch((err) => {
          alert("Registration failed!");
        });
    }
  }

  canBeSubmitted() {
    const { uname, email, password, dob, mobileno, location } = this.state;

    return (
      uname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      dob.length > 0 &&
      mobileno.length > 0 &&
      location.length > 0
    );
  }

  render() {
    const isEnabled = this.canBeSubmitted();

    return (
      <div>
        <Header headerText="Digital Medical Record Database" />
        <div className="FormCenter">
          <div className="FormTitle">
            <NavLink to="/sign-in" className="FormTitle__Link">
              Login
            </NavLink>{" "}
            or
            <NavLink exact to="/" className="FormTitle__Link">
              Register
            </NavLink>
          </div>
          <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="uname"
                className="FormField__Input"
                placeholder="Enter your name"
                name="uname"
                value={this.state.uname}
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
                Password
              </label>
              <input
                type="password"
                id="password"
                className="FormField__Input"
                placeholder="Enter password"
                name="password"
                value={this.state.password}
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
                id="dob"
                className="FormField__Input"
                placeholder="Enter date in fomat of dd/mm/yyyy"
                name="dob"
                value={this.state.dob}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Mobile No
              </label>
              <input
                type="number"
                id="mobileno"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
                className="FormField__Input"
                placeholder="Enter Mobile Number"
                name="mobileno"
                value={this.state.mobileno}
                onChange={this.handleChange}
                required={true}
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
                placeholder="Please enter the location"
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="FormField">
              <button
                id="registerbtn"
                onClick={this.handleSubmit}
                className="FormField__Button mr-20"
                disabled={!isEnabled}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
