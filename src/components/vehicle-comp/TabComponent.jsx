import React, { Component } from "react";
import {httpClient} from "../../httpClient";
import VehiclePagePrint from "./VehiclePagePrint.jsx";

import ReactDOMServer from "react-dom/server";
import { RWebShare } from "react-web-share";

const log = console.log;

class TabComponent extends Component {
  constructor(props) {
    super(props);
  }

  PrintPage(e) {
    var print = document.getElementById("print-content");
    const content = ReactDOMServer.renderToString(
      <VehiclePagePrint data={this.props.data} />
    );

    document.getElementsByTagName("link").forEach((node) => {
      print.contentDocument.body.appendChild(node);
    });

    print.contentDocument.body.innerHTML += content;
    print.contentWindow.focus();
    print.contentWindow.print();

    print.contentDocument.body.innerHTML = "";
  }

  SharePage(e) {
    return <></>;
  }

  handleSaveVehicle(e, id) {
    const action = this.props.client.state.saved.includes(id)
      ? "Removed"
      : "Added";
    httpClient()
      .post("/@client_session/handle_saved/" + action, {
        stock: id,
      })

      .then((res) => {
        if (res.data.success) {
          this.props.client.setState(res.data.data);
          this.toastr.info(this.props.data.title + " " + action);
        } else {
          this.toastr.info("Failed to complete request");
        }
      })

      .catch((err) => {});
  }

  render() {
    return (
      <div className="tab-container">
        <div className="main-vehicle-option-tab">
          <RWebShare
            data={{
              text:
                "Great cars, with superior deals at Javvy's Autozone Ltd. \n this is a fantastic deal on the " +
                this.props.data.title,
              url: window.location.href,
              title:
                this.props.data.title.toUpperCase() +
                " - Javvy's Autozone Ltd.",
            }}
          >
            <button className="option-button">
              <span>
                <i className="fa fa-share"></i>
              </span>{" "}
              Share This
            </button>
          </RWebShare>

          <button onClick={this.PrintPage.bind(this)} className="option-button">
            <span>
              <i className="fa fa-print"></i>
            </span>{" "}
            Print Page
          </button>
          <button
            className="option-button"
            onClick={(e) => {
              this.handleSaveVehicle(e, this.props.id);
            }}
          >
            <span>
              <i className="fa fa-heart"></i>
            </span>
            {this.props.client.state.saved.includes(this.props.id)
              ? "  Remove from Saved"
              : "  Add to Saved"}
          </button>
        </div>
      </div>
    );
  }
}

export default TabComponent;
