import React, { Component } from "react";

class VehicleInformationComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container section">
        <h2 className="header-sub-title">Basics</h2>
        <div className="underline"></div>
        <div className="main-vehicle-attr-container">
          <div className="attr-container">
            <div className="attr-title">Year</div>
            <div className="attr"> {this.props.data.year} </div>
          </div>
          <div className="attr-div" />

          <div className="attr-container">
            <div className="attr-title">Body Type</div>
            <div className="attr"> {this.props.data.body} </div>
          </div>
          <div className="attr-div" />

          <div className="attr-container">
            <div className="attr-title">Location</div>
            <div className="attr"> {this.props.data.location} </div>
          </div>
          <div className="attr-div" />

          <div className="attr-container">
            <div className="attr-title">Engine</div>
            <div className="attr"> {this.props.data.engine_size} cc</div>
          </div>
          <div className="attr-div" />

          <div className="attr-container">
            <div className="attr-title">Transmission</div>
            <div className="attr"> {this.props.data.trans} </div>
          </div>
          <div className="attr-div" />

          <div className="attr-container">
            <div className="attr-title">Mileage</div>
            <div className="attr"> {this.props.data.mileageFormat} mi.</div>
          </div>
          <div className="attr-div" />

          <div className="attr-container">
            <div className="attr-title">Exterior Colour</div>
            <div className="attr"> {this.props.data.color} </div>
          </div>
          <div className="attr-div" />
        </div>
      </div>
    );
  }
}

export default VehicleInformationComponent;
