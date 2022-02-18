


const INVENTORY_PATH = "/inventory";
const SAVED_PATH = "/inventory/saved";
const CONTACT_PATH = "/contact";
const ABOUT_PATH = "/about";

import React from "react";

function HeaderLogo() {
  return (
    <div className="header-logo me-5 me-md-10 flex-grow-1 flex-lg-grow-0">
      <a href="/">
        <img
          alt="Logo"
          src="/images/image.png"
          className="h-70px h-lg-70px logo-default"
        />
      </a>
    </div>
  );
}

function SavedBtn(props) {
  const client = props.client;
  return (
    <div className="d-flex align-items-center ms-1 ms-lg-3">
      <div
        className="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-kt-menu-trigger="{default:'click', 'lg': 'hover'}"
        data-kt-menu-placement="bottom-end"
      >
        <div className="symbol symbol-40px">
          <div className="symbol-label fs-2 fw-bold p-3">
            <span>
              <i className="lni lni-heart-filled"></i>
            </span>
            {client.state.saved.length === 0 ? (
              <></>
            ) : (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-zone">
                {client.state.saved.length}
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-danger fw-bold py-4 fs-6 w-275px"
        data-kt-menu="true"
      >
        <div className="menu-item px-3">
          <div className="menu-content d-flex align-items-center px-3">
            <div className="symbol symbol-50px me-5">
              <div className="symbol-label fs-2 fw-bold">
                {client.state.saved.length}
              </div>
            </div>
            <div className="d-flex flex-column">
              <a
                href={SAVED_PATH}
                className="fw-bolder text-hover-danger d-flex align-items-center fs-5 text-muted"
              >
                Saved Vehicles
              </a>
              <div className="fw-bold text-muted fs-7">
                Saved Vehicles expire after 15 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavContent(props) {
  const makes = props.makes;
  return (
    <div className="nav-items-container">
      <div className="nav-item-container">
        <a href="/" className="nav-item">
          Home
        </a>
      </div>

      <div
        className="nav-item-container"
        data-kt-menu-trigger="{default:'click', 'lg': 'hover'}"
        data-kt-menu-placement="bottom-start"
      >
        <a href="#" className="nav-item">
          Inventory
        </a>
      </div>
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-danger fw-bold py-4 fs-6 w-275px mt-5"
        data-kt-menu="true"
      >
        <div className="menu-item">
          <a className="menu-link" href={INVENTORY_PATH}>
            Show All
          </a>
          <div className="separator my-2"></div>
          {makes.map((make) => {
            var url = new URL(window.location.origin + "/inventory");
            url.searchParams.append("make", make.make);
            return (
              <a key={make.make} className="menu-link" href={url.href}>
                {make.make}
              </a>
            );
          })}
        </div>
      </div>

      <div className="nav-item-container">
        <a href={ABOUT_PATH} className="nav-item">
          About Us
        </a>
      </div>

      <div className="nav-item-container">
        <a href={CONTACT_PATH} className="nav-item">
          Contact Us
        </a>
      </div>
    </div>
  );
}

function HamBurgar() {
  return (
    <div className="d-flex d-lg-none align-items-center ms-1 ms-lg-3">
      <button
        href="#"
        className="btn btn-icon btn-custom btn-active-light position-relative w-30px h-30px w-md-40px h-md-40px"
        id="nav-drawer-toggle"
      >
        <span className="svg-icon svg-icon-2x">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
              fill="black"
            />
            <path
              opacity="0.3"
              d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
              fill="black"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

function Drawer() {
  return (
    <>
      <div
        id="drawer-nav-content"
        className="bg-white"
        data-kt-drawer="true"
        data-kt-drawer-activate="true"
        data-kt-drawer-toggle="#nav-drawer-toggle"
        data-kt-drawer-close="#close-btn"
        data-kt-drawer-name="docs"
        data-kt-drawer-overlay="true"
        data-kt-drawer-width="{default:'300px', 'md': '500px'}"
        data-kt-drawer-direction="start"
      >
        <div className="head-brand">
          <HeaderLogo />
          <button id="close-btn" className="btn">
            <span>
              <i className="lni lni-close"></i>
            </span>
          </button>
        </div>

        <NavContent />
      </div>
    </>
  );
}

export default function NavbarComponent(props) {
  const makes = props.makes ? props.makes : props.data;
  const client = props.client;

  // KTMenu.createInstances();
  // KTDrawer.createInstances();

  return (
    <>
      <header
        className="header main-nav-bar"
        id="header"
        data-kt-sticky="true"
        data-kt-sticky-name="header"
        data-kt-sticky-offset="{default: '200px', lg: '300px'}"
      >
        <div className="nav">
          <div className="nav-brand-container">
            <HamBurgar />
            <HeaderLogo />
          </div>

          <div className="nav-content-container" id="nav-content-container">
            <div className="d-none d-lg-flex">
              <NavContent makes={makes} />
            </div>
          </div>

          <div className="nav-toolbar-container">
            <SavedBtn client={client} />
          </div>
        </div>
        <Drawer />
      </header>

      <div className="nav-border"></div>
    </>
  );
}
