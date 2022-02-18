import VehicleCardComponent from "../index-comp/VehicleCardComponent.jsx";

import React, { Component } from "react";
import { tns } from "tiny-slider/src/tiny-slider.js";
import {httpClient} from "../../httpClient";

class RelatedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };

    this.slider = null;
  }

  componentDidMount() {
    var url = new URL(window.location.href);
    this.stock = url.searchParams.get("stock");
    httpClient()
      .get("/server/public/inventory/search", {
        params: {
          body: url.searchParams.get("body"),
          yearMin: url.searchParams.get("year"),
        },
      })
      .then((res) => {
        console.log(res)
        this.setState(res.data);
        this.slider = tns({
          container: ".related-slider-container",
          navPosition: "bottom",
          items: 1,
          controls: false,
          responsive: {
            640: {
              edgePadding: 0,
              gutter: 20,
              items: 2,
            },
            700: {
              gutter: 20,
            },
            900: {
              items: 3,
            },
          },
        });
      })

      .catch( err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="container">
        <div className="component-header-title">
          <h2 className="header-title">Related Vehicle</h2>
        </div>

        <div className="related-slider-container">
          {this.state.content.map((vehicle) => {
            if (this.stock === vehicle.id) {
              return null;
            }
            return (
              <VehicleCardComponent
                key={vehicle.id}
                data={vehicle}
                client={this.props.client}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default RelatedComponent;
