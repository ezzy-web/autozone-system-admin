import NavbarComponent from "../components/index-comp/NavbarComponent.jsx";
import BreadcrumbComponent from "../components/inventory-comp/BreadcrumbComponent.jsx";
import ImageSliderComponent from "../components/vehicle-comp/ImageSliderComponent.jsx";
import ContactFormComponent from "../components/vehicle-comp/ContactFormComponent.jsx";
import VehicleDetailsComponent from "../components/vehicle-comp/VehicleDetailsComponent.jsx";
import AdsComponent from "../components/index-comp/AdsComponent.jsx";
import VehicleInformationComponent from "../components/vehicle-comp/VehicleInformationComponent.jsx";
import RelatedComponent from "../components/vehicle-comp/RelatedComponent.jsx";
import FeaturesComponent from "../components/vehicle-comp/FeaturesComponent.jsx";
import VehicleDescriptionComponent from "../components/vehicle-comp/VehicleDescriptionComponent.jsx";
import FooterComponent from "../components/index-comp/FooterComponent.jsx";
import TabComponent from "../components/vehicle-comp/TabComponent.jsx";
import Banner from "../components/index-comp/Banner.jsx";
import React, { Component } from "react";
import {httpClient} from "../httpClient";


const $ = require('jquery')

class VehiclePage extends Component {
  constructor(props) {
    super(props);

    this.UIComponents = props.UIComponents

    this.url = new URL(window.location.href);
    this.numeral = require("numeral");

    this.state = {
      id: null,
    };

    this.make_recent = this.make_recent.bind(this);
  }

  make_recent() {
    httpClient()
      .get("@client_session/add_recent/" + this.state.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    var stck = this.url.searchParams.get("stock");

    var $content = $("#vehicle-content-container")
    var Block = require("/src/assets/vendor/js/components/blockui.js");  
    this.load = new Block($content.toArray()[0], {
      message: '<span class="spinner-border text-danger"></span>'
    })

    this.load.block()
    httpClient()
      .get("/server/admin/get_vehicle", {
        params: {
          stck: stck,
        },
      })
      .then((res) => {
        if (res.data.success) {
          this.setState(res.data.data);
          var mil = this.numeral(res.data.data.mileage);
          var price = this.numeral(res.data.data.price);

          this.setState({
            mileageFormat: mil.format("0,0"),
            priceFormat: price.format("$0,0.00"),
          });

          this.make_recent();
          this.props.client.setState({
            title: this.state.title.toUpperCase() + " - Javvy's Autozone",
          });
        }
        this.load.release()
      })
      .catch((err) => {
        this.load.release()
      });
  }

  render() {
    return (
      <>
        <NavbarComponent client={this.props.client} />
        <Banner/>
        <BreadcrumbComponent />

        <div id="vehicle-content-container" className="container">
          {this.state.id === null ? (
            <></>
          ) : (
            <>
              <div className="row">
                <div className="col-md-7 col-sm-12">
                  <TabComponent
                    data={this.state}
                    client={this.props.client}
                    id={this.state.id}
                  />
                  <ImageSliderComponent
                    title={this.state.title}
                    images={
                      this.state.images.length === 0
                        ? [{ id: "default", url: this.state.imageDefault }]
                        : this.state.images
                    }
                  />
                  <VehicleDetailsComponent data={this.state} />
                </div>
                <div className="col-md-5 col-sm-12">
                  <ContactFormComponent parent={this} vehicle_id={this.state.id} />
                  <AdsComponent />
                </div>
              </div>

              <div className="row">
                <div className="col-md-7 col-sm-12">
                  <VehicleInformationComponent data={this.state} />
                  <FeaturesComponent features={this.state.features} />
                </div>
                <div className="col-md-5 col-sm-12">
                  <VehicleDescriptionComponent />
                  <div className="call-container">
                    <h2>Have a question?</h2>
                    <div className="underline"></div>
                    <p>
                      Get answers, see the car, or find a good time for a test
                      drive. Take the next step contact us.
                    </p>
                    <button className="btn call-us-btn">Contact Us</button>
                  </div>
                  <AdsComponent />
                </div>
              </div>

              <RelatedComponent client={this.props.client} />
            </>
          )}
        </div>
        
        <iframe id="print-content"></iframe>
        <FooterComponent />
      </>
    );
  }
}

export default VehiclePage;
