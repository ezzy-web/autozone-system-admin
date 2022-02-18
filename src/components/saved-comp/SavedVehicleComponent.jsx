import React, { Component } from "react";
import yall from "yall-js";

import {httpClient} from "../../httpClient";

export class SavedVehicleComponent extends Component {
  constructor(props) {
    super(props);
    this.numeral = require("numeral");

    this.state = {
      price_format: this.numeral(this.props.data.price).format("$ 0, 0.00"),
      mil_format: this.numeral(this.props.data.mileage).format("0,0"),
    };

    console.log(this.props.data)
  }

  onRemoveSaved() {
    httpClient()
      .post("/@client_session/handle_saved/" + "Removed", {
        stock: this.props.data.id,
      })

      .then((res) => {
        if (res.data.success) {
          this.props.client.setState(res.data.data);
          var lst = this.props.parent.state.saved.slice();

          lst.splice(this.props.index, 1);

          this.props.parent.setState({
            saved: lst,
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    yall({
      observeChanges: true,
    });
  }

  render() {
    var baseUrl = window.location.origin;
    var url = new URL(baseUrl + "/inventory/vehicle");
    url.searchParams.append("year", this.props.data.year);
    url.searchParams.append("body", this.props.data.body);
    url.searchParams.append("make", this.props.data.make);
    url.searchParams.append("model", this.props.data.model);
    url.searchParams.append("title", this.props.data.title);
    url.searchParams.append("stock", this.props.data.id);

    return (
      <div>
        <div className="saved-vehicle-card">
          <div className="row no-gutters">
            <div className="col-lg-3 col-4-md col-4">
              <div className="saved-img-container">
                <a href={url.href}>
                  <img
                    className="lazy"
                    src="/images/placeholder.gif"
                    data-src={
                      this.props.data.images.length == 0
                        ? "/images/placeholder.gif"
                        : this.props.data.images[0].url
                    }
                    alt={this.props.data.title}
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-9 col-8-md col-8 content-saved">
              <div className="vehicle-content">
                <a href={url.href}>
                  <p>
                    {this.props.data.title}{" "}
                    <span className="text-muted">
                      {" "}
                      {this.props.data.submodel}{" "}
                    </span>{" "}
                  </p>
                </a>

                <div className="price-container">
                  <p>
                    <b>
                      {this.props.data.price_visible
                        ? this.state.price_format
                        : "Contact Us"}
                    </b>{" "}
                    <span className="text-muted">
                      {this.props.data.price_status}
                    </span>{" "}
                  </p>
                </div>

                <div className="vehicle-info-container">
                  <span> {this.props.data.body} </span>
                  <span> {this.state.mil_format} mi</span>
                  <span> {this.props.data.location} </span>
                </div>
              </div>
              <button
                className="btn btn-icon"
                onClick={this.onRemoveSaved.bind(this)}
              >
                <span>
                  <i className="lni lni-close"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SavedVehicleComponent;
