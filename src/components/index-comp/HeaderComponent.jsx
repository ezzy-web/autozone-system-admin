import React from "react";
import NavbarComponent from "./NavbarComponent.jsx";
import QuickSearchComponent from "./QuickSearchComponent.jsx";
import { Content } from "../../Content/content.js";

export default function HeaderComponent(props) {
  const makes = props.makes;
  const client = props.client;
  const content = new Content();

  return (
    <>
      <header>
        <div className="overlay overlay-block h-bg">
          <div
            className="header-bg overlay-wrapper carousel carousel-custom slide carousel-fade"
            data-bs-ride="carousel"
            data-bs-interval="8000"
          >
            <div className="carousel-inner">
              {content.header_images.map((image, key) => {
                return (
                  <div
                    key={key}
                    className={
                      key === 0 ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <div
                      className="img"
                      style={{
                        backgroundImage: "url(" + image + ")",
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="overlay-layer">
            <NavbarComponent client={client} makes={makes} />
            <div className="layer">
              <QuickSearchComponent makes={makes} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
