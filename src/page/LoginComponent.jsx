import React, { useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";


export default function LoginComponent(state) {
  const production = true;
  useEffect(() => {
    netlifyIdentity.init({});
  });

  return (
    <div id="authentication-component-container">
      <div className="container">
        <div className="header-container">
          <div className="image-container">
            <img src="/" alt="" />
          </div>
          <h2>Autozone System</h2>
        </div>
      </div>

      <div className="content-container">
        <div className="btn-container">
          <button
            className="btn"
            onClick={() => {
              netlifyIdentity.open("login");
            }}
          >
            Login
          </button>
          {production ? (
            <button
              className="btn"
              onClick={() => {
                netlifyIdentity.open("signup");
              }}
            >
              New User
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
