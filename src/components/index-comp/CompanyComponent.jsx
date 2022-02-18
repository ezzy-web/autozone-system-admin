import React from "react";
import { Content } from "../../Content/content";

export default function CompanyComponent() {
  const contentContainer = new Content();
  const content = contentContainer.company_content;
  return (
    <>
      <div className="header-container container">
        <h2 className="header-sub-title">Why Choose Us</h2>
        <div className="underline"></div>
      </div>

      <div className="company-container">
        <div className="bg row no-gutters">
          <div className="col-md-4 col-sm-12 content">
            <div className="image-container">
              <img src={content[0].image} alt="" />
            </div>
            <h2>{content[0].header}</h2>
            <p>{content[0].content}</p>
          </div>
          <div className="col-md-4 col-sm-12 main-content">
            <div className="image-container">
              <img src={content[1].image} alt="" />
            </div>
            <h2>{content[1].header}</h2>
            <p>{content[1].content}</p>
          </div>
          <div className="col-md-4 col-sm-12 content">
            <div className="image-container">
              <img src={content[2].image} alt="" />
            </div>
            <h2>{content[2].header}</h2>
            <p>{content[2].content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
