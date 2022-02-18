import React, { Component, useState } from "react";
import yall from "yall-js";
import {httpClient} from "../../httpClient";


class VehicleCardComponent extends Component {
  constructor(props) {
    super(props);
    this.UIComponents = props.UIComponents
    this.state = props.data;
    this.numeral = require("numeral");
    this.handleSaveVehicle = this.handleSaveVehicle.bind(this)
  }

  componentDidUpdate() {}

  handleSaveVehicle(e, id) {
    const action = this.props.client.state.saved.includes(id) ? "Removed" : "Added"
    
    httpClient().post('/@client_session/handle_saved/'+action, {
      stock: id
    })

    .then( res => {
      if (res.data.success) {
        this.props.client.setState(res.data.data)
        this.UIComponents.openToast(this.props.data.title + " " + action)
      } else {
        this.UIComponents.openToast("Failed to complete request")
      }
    })

    .catch( err => {
    })
  }

  componentDidMount() {
    this.setState(this.props.data);

    var baseUrl = window.location.origin;
    var url = new URL(baseUrl + "/inventory/vehicle");
    url.searchParams.append("year", this.props.data.year);
    url.searchParams.append("body", this.props.data.body);
    url.searchParams.append("make", this.props.data.make);
    url.searchParams.append("model", this.props.data.model);
    url.searchParams.append("title", this.props.data.title);
    url.searchParams.append("stock", this.props.data.id);

    this.setState({
      priceFormat: this.numeral(this.props.data.price).format("$ 0, 0.00"),
      link: url.href,
    });

    yall({
      observeChanges: true,
    });
  }

  render() {
    return (
      <>
        <div className="col-lg-4 col-md-4 col-sm-6 py-2 px-5 vehicle-card-column">
          <div className="vehicle-card ">
            <div className="overlay overlay-block">
              <a
                href={this.state.link}
                className="vehicle-image overlay-wrapper"
              >
                <img
                  className="lazy mw-100"
                  src="/images/placeholder.gif"
                  data-src={
                    this.state.images.length == 0
                      ? this.state.imageDefault
                      : this.state.images[0].url
                  }
                  alt={this.state.title}
                />
              </a>
              {this.state.isAvailable ? (
                <div className="overlay-layer">
                <span className={this.props.client.state.saved.includes(this.state.id) ? "saved" : ""} onClick={ (e) =>  {
                    this.handleSaveVehicle(e, this.state.id)
                  } }>
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </span>
              </div>
              ) : (
                <div className="overlay-layer sold-overlay">
                  <h3>
                    <b>SOLD</b>
                  </h3>
                </div>
              )}
              
            </div>

            <div className="vehicle-content d-block">
              <div className="row justify-content-between">
                <a href={this.state.link} className="col-5">
                  <h6>
                    {this.state.title + " "}
                    <span>
                      <i className="bi bi-info-circle px-1"></i>
                    </span>
                  </h6>
                </a>
                <div className="col-7 d-flex justify-content-end">
                  <div className="price-box">
                    <div className="price">
                      
                      <h6>
                        { this.state.isAvailable ? (
                          this.state.price_visible
                            ? this.state.priceFormat
                            : "Contact Us"
                        ) : (
                          <b>SOLD</b>
                        ) }
                        
                      </h6>
                    </div>
                    <div className="price-status">
                      {this.state.price_status}
                    </div>
                  </div>
                </div>
              </div>
              <div className="separator my-1"></div>
              <div className="other-details d-flex justify-content-center">
                <span>
                  <b className="px-1">Stock:</b>
                  {this.state.id}
                </span>
                <span>
                  <i className="bi bi-geo-alt px-1"></i>
                  {this.state.location}
                </span>
                <span>{this.state.trans}</span>
              </div>

              <a href={this.state.link} className="btn more-btn">
                More Details
                <span>
                  <i className="bi bi-plus"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default VehicleCardComponent;
