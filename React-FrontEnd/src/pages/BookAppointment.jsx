import React, { Component } from "react";
import NavBar from "../components/NavBar.jsx";
import "../App.css";
import Header from "../components/Header.jsx";

class BookAppointment extends Component {
  constructor() {
    super();

    this.state = {
      namesList: [],
      namesIdsDic: {},
      name: "",
      disease: "",
      date: "",
      slot: "",
      description: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleDropdownNameChange = this.handleDropdownNameChange.bind(this);
  }

  componentDidMount = async () => {
    const response = await fetch("/api/patients/list");
    const data = await response.json();
    const dict = data.map(({ id, user_name }) => ({ id, user_name }));
    this.setState({ namesList: data });
    this.setState({ namesIdsDic: dict });
  };

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleDropdownChange(e) {
    if (e.target.value === "N/A") {
      alert("please select slot other than N/A");
    }

    this.setState({ slot: e.target.value });
  }

  handleDropdownNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.canBeSubmitted()) {
      fetch("/api/appointment/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disease: this.state.disease,
          date: this.state.date,
          timings: this.state.slot,
          description: this.state.description,
          patients: this.state.namesList.filter(
            (e) => e.user_name === this.state.name
          )[0].id,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          alert("Appointment booked successfully!");
          this.props.history.push("/allAppointments");
        });
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push("/allAppointments");
  }

  canBeSubmitted() {
    const { name, disease, date, description } = this.state;
    return (
      name.length > 4 &&
      disease.length > 0 &&
      date.length > 0 &&
      description.length > 0
    );
  }

  render() {
    const names = this.state.namesList;
    const isEnabled = this.canBeSubmitted();
    const date = new Date();

    return (
      <div>
        <NavBar />
        <Header headerText="Book an Appointment" />
        <div className="FormCenter">
          <form className="FormFields">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Name of the Patient
              </label>
              <select
                id="dropdown"
                onChange={this.handleDropdownNameChange}
                className="DropDowns"
              >
                <option value="N/A">N/A</option>
                {names.map((name, index) => (
                  <option key={index} value={name.user_name}>
                    {name.user_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Disease
              </label>
              <input
                type="disease"
                id="disease"
                className="FormField__Input"
                placeholder="Enter Disease"
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
                min={`${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`}
                id="date"
                className="FormField__Input"
                placeholder="Enter date in the form of dd/mm/yyyy"
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
              <select
                id="dropdown"
                className="DropDowns"
                onChange={this.handleDropdownChange}
                ref={(input) => (this.state.timing = input)}
              >
                <option value="N/A">N/A</option>
                <option value="10-11 AM">10-11 AM</option>
                <option value="1-2 PM">1-2 PM</option>
                <option value="3-4 PM">3-4 PM</option>
                <option value="6-8 PM">6-8 PM</option>
              </select>
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Description
              </label>
              <input
                type="description"
                id="description"
                className="FormField__Input"
                placeholder="Enter Description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div className="SideRow">
              <button
                id="bookbtn"
                onClick={this.handleSubmit}
                className="FormField__Button mr-20"
                type="submit"
                disabled={!isEnabled}
              >
                Book Now
              </button>
            </div>
            <div className="SideRow">
              <button
                onClick={this.handleCancel}
                className="FormField__Button mr-20"
                type="btn"
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

export default BookAppointment;
