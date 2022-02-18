
import React from 'react'

export default function BodyStyleComponent() {
  const origin = window.location.origin + "/inventory"
  var url = new URL(origin)
  
  
  url.searchParams.set("body", "Sedan")
  const sedan = url.href

  url.searchParams.set("body", "Hatchback")
  const hatch = url.href

  url.searchParams.set("body", "SUV")
  const suv = url.href

  url.searchParams.set("body", "Pick-up")
  const pickup = url.href

  return (
    <div className="body-style-container">
      <div className="container body-styles row">
        <div className="component-header-title">
          <h2 className="header-sub-title">Shop by type</h2>
          <div className="underline"></div>
        </div>
        <a href={sedan} className="body-style-img col-md-3 col-sm-6">
          <img src="./images/sedan.png" alt="Sedan Vehicle" />
          Sedan
        </a>
        <a href={hatch} className="body-style-img col-md-3 col-sm-6">
          <img src="./images/hatch.png" alt="Sedan Vehicle" />
          Hatchback
        </a>
        <a href={suv} className="body-style-img col-md-3 col-sm-6">
          <img src="./images/suv.png" alt="Sedan Vehicle" />
          SUV
        </a>
        <a href={pickup} className="body-style-img col-md-3 col-sm-6">
          <img src="./images/pick-up.png" alt="Sedan Vehicle" />
          Pick-up
        </a>
      </div>
    </div>
  );
}