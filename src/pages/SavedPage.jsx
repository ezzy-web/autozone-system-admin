import NavbarComponent from "../components/index-comp/NavbarComponent.jsx";
import React, { Component } from "react";
import { SavedVehicleComponent } from "../components/saved-comp/SavedVehicleComponent.jsx";
import BreadcrumbComponent from "../components/inventory-comp/BreadcrumbComponent.jsx";
import FooterComponent from "../components/index-comp/FooterComponent.jsx";
import "../components/saved-comp/saved.scss";
import {httpClient} from "../httpClient";
import Banner from "../components/index-comp/Banner.jsx";



class SavedPage extends Component {
  constructor(props) {
    super(props);
    this.SAVED_PAGE_ID = "saved-page-style-tag";

    this.state = {
      saved : null
    }
  }

  componentDidMount() {
    httpClient().get('/@client_session/get_saved')
    .then( res => {
      this.setState({
        saved: res.data.data
      })
    })
    .catch( err => {
    })
  }

  render() {
    if (this.state.saved === null) {
      return <></>
    }
    return (
      <>
        <NavbarComponent client={this.props.client} />
      <Banner/>
        <BreadcrumbComponent specify="Saved" />

        {this.props.client.state.saved.length === 0 ? (
          <div className="saved-vehicle no-vehicle" id={this.SAVED_PAGE_ID}>
            <div className="row">
              <div className="col-md-7 no-saved-details">
                <div className="saved-heading">Saved Cars</div>
                <p className="save-memo">
                  Keep track of all the vehicles you like, all in one place
                </p>
                <ul>
                  <li className="d-flex align-items-center py-2">
                    <span className="bullet bullet-vertical me-5"></span> Lorem,
                    ipsum dolor sit amet consectetur adipisicing elit. Quod
                    autem aut doloribus?
                  </li>
                  <li className="d-flex align-items-center py-2">
                    <span className="bullet bullet-vertical me-5"></span> Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Est.
                  </li>
                </ul>
                <a href="/inventory" className="btn">
                  FIND YOUR RIDE
                </a>
              </div>
              <div className="col-md-5 w-img">
                <img src="/images/saved-bg.png" alt="" />
              </div>
            </div>
          </div>
        ) : (
          <div className="saved-vehicle" id={this.SAVED_PAGE_ID}>
            <div className="row">
              <div className="col-md-7 no-saved-details">
                <div className="saved-heading">Saved Cars</div>
                <p className="save-memo">
                  Keep track of all the vehicles you like, all in one place
                </p>
                <small className="text-center text-muted">
                    Vehicles saved here will be automatically removed after 15
                    days.
                  </small>
                  <div className="seperator my-5"></div>
                { this.state.saved.map( (save, index) => {
                  return <SavedVehicleComponent key={save.id} data={save} client={this.props.client} parent={this} index={index} />
                })}

                  
                  
                <></>
              </div>
              <div className="col-md-5 w-img">
              </div>
            </div>
          </div>
        )}

        <FooterComponent />
      </>
    );
  }
}

export default SavedPage;
