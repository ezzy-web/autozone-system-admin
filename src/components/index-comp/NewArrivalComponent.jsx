import React, { Component } from "react";
import {httpClient} from "../../httpClient";
import VehicleCardComponent from "./VehicleCardComponent.jsx";

class NewArrivalsComponent extends Component {
  constructor(props) {
    super(props);

    var baseUrl = window.location.origin;
    var url = new URL(baseUrl + "/inventory");
    url.searchParams.append("context", "new#arrival");

    this.state = {
      results: null,
      link: url.href,
    };
  }

  loadingState() {
    return (
      <>
      <div className="header-container container">
            <h2 className="header-sub-title">New Arrivals</h2>
            <div className="underline"></div>
          </div>
        <div id="load-state"  onLoad={(e) => {
            var Block = require("/src/assets/vendor/js/components/blockui.js");  
            var load = new Block(e.target, {
              message:
                '<div class="blockui-message">No New Arrivals</div>',
            });

            load.block()
        }}>
          <div className="hidden-content"></div>
        </div>


        
      </>
    );
  }

  NoContent() {
    return (
      <>
      <div className="header-container container">
            <h2 className="header-sub-title">New Arrivals</h2>
            <div className="underline"></div>
          </div>
        <div id="no-content" onLoad={(e) => {

            var Block = require("/src/assets/vendor/js/components/blockui.js");  
            var load = new Block(e.target, {
              message:
                '<div class="blockui-message">No New Arrivals</div>',
            });

            load.block()
            
        }}>
          <div className="hidden-content"></div>
        </div>
      </>
    );
  }

  componentDidMount() {
    httpClient().get('/server/public/new-arrival')
    .then( res => {
      this.setState({
        results: res.data
      })
    })
    .catch( err => {
      console.log(err)
    })
  }

  render() {
    if (this.state.results == null) {
      return <this.loadingState />;
    } else if (this.state.results.length == 0) {
      return <this.NoContent />;
    } else {
      return (
        <>
          <div className="header-container container">
            <h2 className="header-sub-title">New Arrivals</h2>
            <div className="underline"></div>
          </div>
          <div className="row new-arrivals-container">
            {this.state.results.map((vehicle) => {
              return <VehicleCardComponent key={vehicle.id} data={vehicle} client={this.props.client} />;
            })}
          </div>
          <div className="btn-container">
            <a href={this.state.link} className="btn see-more-btn">
              See More
            </a>
          </div>
        </>
      );
    }

    
  }
}

export default NewArrivalsComponent;
