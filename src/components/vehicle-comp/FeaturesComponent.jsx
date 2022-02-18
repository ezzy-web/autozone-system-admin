import React, { Component } from "react";

class FeaturesComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container section">
        <h2 className="header-sub-title">Features</h2>
        <div className="underline"></div>

        <div className="main-vehicle-attr-container">
          {this.props.features.map((feature) => {
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
    );
  }
}

export default FeaturesComponent;
