import React from "react";

// Components
import HeaderComponent from "../components/index-comp/HeaderComponent.jsx";
import BodyStyleComponent from "../components/index-comp/BodyStyleComponent.jsx";
import RecentlyViewedContainer from "../components/index-comp/RecentlyViewedContainer.jsx";

import FeaturedListComponent from "../components/index-comp/FeaturedListComponent.jsx";
import AdvSearchComponent from "../components/index-comp/AdvSearchComponent.jsx";

import NewArrivalsComponent from "../components/index-comp/NewArrivalComponent.jsx";
import CompanyComponent from "../components/index-comp/CompanyComponent.jsx";

import FooterComponent from "../components/index-comp/FooterComponent.jsx";
import { httpClient } from "../httpClient";

export default function IndexPage(props) {
  const client = props.client;
  const [makes, setMakes] = React.useState([]);
  const UIComponents = props.UIComponents;

  const getMakes = () => {
    setMakes([]);
  };

  React.useEffect(() => {
    //   Implementation to get make and models
    getMakes();
  }, []);

  return (
    <>
      <HeaderComponent makes={makes} client={client} />

      <BodyStyleComponent />

      <div className="separator my-10"></div>

      <div className="container">
        <ul className="nav nav-tabs nav-line-tabs fs-6">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-bs-toggle="tab"
              href="#adv-search"
            >
              <span className="d-flex flex-column align-items-cente">
                <span className="fs-4">Search Inventory</span>
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#featured">
              <span className="d-flex flex-column align-items-center">
                <span className="fs-4 ">Featured</span>
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#coming-soon">
              <span className="d-flex flex-column align-items-center">
                <span className="fs-4">New Arrivals</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="adv-search"
          role="tabpanel"
        >
          <AdvSearchComponent data={makes} />
        </div>

        <div className="tab-pane fade" id="featured" role="tabpanel">
          <FeaturedListComponent client={client} UIComponents={UIComponents} />
        </div>

        <div className="tab-pane fade" id="coming-soon" role="tabpanel">
          <NewArrivalsComponent client={client} UIComponents={UIComponents} />
        </div>
      </div>

      <RecentlyViewedContainer client={client} />

      <CompanyComponent />
      <FooterComponent />
    </>
  );
}
