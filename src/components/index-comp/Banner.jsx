import React from 'react';
import { Content } from '../../Content/content';

export default function Banner() {
    const content = new Content()
  return (
    <div id='site-banner' style={{
        backgroundImage: "url(" + window.location.origin + "/images/banner.jpg",
        backgroundSize: "cover"
    }}>
        <div className="container">
        <div
              className="carousel carousel-custom slide"
              data-bs-ride="carousel"
              data-bs-interval="10000"
            >
              <div className="carousel-inner">
                {content.banner.map((text, key) => {
                  return (
                    <div key={key} className={ key === 0 ? "carousel-item active" : "carousel-item"}>
                      <h2>{text}</h2>
                    </div>
                  );
                })}
              </div>
            </div>
        </div>
    </div>
  );
}
