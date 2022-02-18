import React, { Component } from "react";

class VehicleDetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mileage: 0,
      price: 0,
    };

    this.numeral = require("numeral");
  }

  componentDidUpdate() {
    var mil = this.numeral(this.props.data.mileage);
    var price = this.numeral(this.props.data.price);

    this.numeral.defaultFormat("0,0");
    this.state.mileageFormat = mil.format();

    this.numeral.defaultFormat("$ 0,0.00");
    this.state.priceFormat = price.format();
  }

  render() {
    return (
      <div className="row vehicle-details space-between">
        <div className="col-md-10 col-sm-12">
          <div> {this.props.data.history} </div>
          <h2> {this.props.data.title} </h2>
          <div className="mileage-detail">
            {" "}
            {this.props.data.mileageFormat} mi.
          </div>

          <div className="price-detail">
            {" "}
            {this.props.data.prive_visible
              ? this.props.data.priceFormat
              : "Contact Us"}{" "}
            <span> {this.props.data.price_status} </span>
          </div>
        </div>
        <div className="col-md-2 col-sm-12">
          <div className="no-saved">
            <div className="number"> {this.props.data.saves.length} </div>
            <div className="saved">Saved</div>
          </div>
        </div>
      </div>
    );
  }
}

export default VehicleDetailsComponent;
