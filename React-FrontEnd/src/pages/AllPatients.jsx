import React, { Component } from "react";
import Header from "../components/Header.jsx";
import NavBar from "../components/NavBar.jsx";
import "../App.css";

class AllPatients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientsList: [],
    };
    this.handleView = this.handleView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount = async () => {
    const response = await fetch("/api/patients/list");
    const data = await response.json();
    this.setState({ patientsList: data });
  };

  handleView(id) {
    this.props.history.push(`/viewPatient/${id}`);
  }

  handleEdit(id) {
    this.props.history.push(`/editPatient/${id}`);
  }

  render() {
    return (
      <>
        <NavBar />

        <form style={{ display: "flex", height: "80%", alignItems: "center" }}>
          {this.state.patientsList.length === 0 ? (
            <h1 style={{ textAlign: "center", flexGrow: "1" }}>
              No Patients Found
            </h1>
          ) : (
            <div style={{ width: "100%", height: "100%" }}>
              <Header headerText="List - All Patients" />

              {this.state.patientsList.map((patient, index) => (
                <div
                  className="FormField"
                  style={{ backgroundColor: "#D3D3D3" }}
                  expand="md"
                  fontSize="20px"
                  key={index}
                >
                  <span style={{ fontSize: "20px" }} value={patient.user_email}>
                    {patient.user_name}
                  </span>
                  <button
                    onClick={() => this.handleView(patient.id)}
                    className="FormField__all__Button"
                    data-id={patient.id}
                  >
                    View
                  </button>
                  <button
                    onClick={() => this.handleEdit(patient.id)}
                    className="FormField__all__Button"
                    data-action="edit-patient"
                  >
                    Edit
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

export default AllPatients;
