import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import "../App.css";

export default class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
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
      fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((resp) => resp.json())
        .then(({ user, token }) => {
          localStorage.setItem("token", token);
          alert("Login success!");
          this.props.history.push("/addPatient");
        })
        .catch((err) => {
          alert("Invalid Credentials");
        });
    }
  }

  canBeSubmitted() {
    const { email, password } = this.state;
    return email.length > 0 && password.length > 0;
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
              <label className="FormField__Label" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="FormField__Input"
                placeholder="Enter your email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="FormField">
              <label className="FormField__Label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="FormField__Input"
                placeholder="Enter your password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="FormField">
              <button
                id="loginbtn"
                className="FormField__Button mr-20"
                disabled={!isEnabled}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
