import React, { useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

export default function LoginComponent(state) {
  useEffect(() => {
    netlifyIdentity.init({});
  });

  return (
    <div id="authentication-component-container">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="header-container">
              <div className="image-container">
                <img src="/" alt="" />
              </div>
              <h4>System Control</h4>
            </div>
            <div className="separator my-10"></div>
            <div className="content-container">
              <div className="btn-container">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    netlifyIdentity.open("login");
                  }}
                >
                  Login
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                      netlifyIdentity.open("signup");
                    }}
                  >
                    Sign Up
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
