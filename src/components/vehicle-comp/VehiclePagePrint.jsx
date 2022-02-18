import React, { Component } from "react";

const log = console.log;

export class VehiclePagePrint extends Component {
  constructor(props) {
    super(props);

    log(props)
  }

  render() {
    return (
        <div className="container">
          <div className="row my-5">
            {this.props.data.images.map((image, index) => {
              return (
                <div key={image.id} className="col-3">
                  <img className="w-100" src={image.url} />
                </div>
              );
            })}
          </div>

          <div className="row my-3">
            <div className="col-6">
              <h2 className="header-sub-title"> {this.props.data.title} </h2>
              <div className="underline"></div>
              <b>History: </b>
              <b className="text-muted"> {this.props.data.history} </b>

              <h4 className="price-detail">
                {" "}
                {this.props.data.prive_visible
                  ? this.props.data.priceFormat
                  : "Contact Us"}{" "}
              </h4>
            </div>
          </div>

          <div className="my-3">
            <h5 className="header-sub-title">Vehicle Information</h5>
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

          <div className="my-2">
            <h5 className="header-sub-title">Features</h5>
            <div className="main-vehicle-attr-container">
              {this.props.data.features.map((feature) => {
                if (feature.features.length === 0) {
                  return null;
                }
                return (
                  <div key={feature.id}>
                    <div className="feature-container">
                      <div className="feature-head"> {feature.header} </div>
                      <ul className="features-list">
                        {feature.features.map((feat) => {
                          return <li key={feat.id}> {feat.val} </li>;
                        })}
                      </ul>
                    </div>
                    <div className="attr-div" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    );
  }
}

export default VehiclePagePrint;
