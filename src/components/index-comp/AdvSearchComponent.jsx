import React, { Component } from "react";
import Select from "react-select";
import { httpClient } from "../../httpClient.jsx";
import { Content } from "../../Content/content.js";

const content = new Content()
const years = content.year_options

class AdvSearchComponent extends Component {
  constructor(props) {
    super(props);
    
    this.BASE_URL = httpClient().defaults.baseURL
    this.state = {
      search: {
        make: "",
        model: "",
        body: "",
        trans: "",
        location: "",
        yearMin: "",
        yearMax: "",
        count: 0,
      },

      make_options: [{ value: "", label: "Any" }],
      model_options: [{ value: "", label: "Any" }],
      year_min_options: years,
      year_max_options: years,
      location_options: content.location_options,
      body_options: content.body_options,
      trans_options: content.trans_options,
      count: 0,
    };

    this.queryURL = new URL(this.BASE_URL + "/server/public/search/count");

    this.queryURL.searchParams.set("make", "");
    this.queryURL.searchParams.set("model", "");
    this.queryURL.searchParams.set("body", "");
    this.queryURL.searchParams.set("trans", "");
    this.queryURL.searchParams.set("location", "");
    this.queryURL.searchParams.set("yearMin", "");
    this.queryURL.searchParams.set("yearMax", "");
  }

  handleMakeInput(e) {
    var dict = JSON.parse(JSON.stringify(this.state.search));
    dict.make = e.value;

    var model_opt = [{ value: "", label: "Any" }];

    this.props.data.map((make) => {
      if (make.make === e.value) {
        make.models.map((model) => {
          model_opt.push({ value: model, label: model });
        });
      }
    });

    this.setState({
      model_options: model_opt,
      search: dict,
    });
  }

  handleModelInput(e) {
    var dict = JSON.parse(JSON.stringify(this.state.search));
    dict.model = e.value;

    this.setState({
      search: dict,
    });
  }

  handleLocationChange(e) {
    var dict = JSON.parse(JSON.stringify(this.state.search));
    dict.location = e.value;

    this.setState({
      search: dict,
    });
  }

  handleTransChange(e) {
    var dict = JSON.parse(JSON.stringify(this.state.search));
    dict.trans = e.value;

    this.setState({
      search: dict,
    });
  }

  handleBodyChange(e) {
    var dict = JSON.parse(JSON.stringify(this.state.search));
    dict.body = e.value;

    this.setState({
      search: dict,
    });
  }

  handleYearMinChange(e) {
    var dict = JSON.parse(JSON.stringify(this.state.search));
    dict.yearMin = e.value;

    var max_years = [{ value: "", label: "Any" }] 
    years.map( year => {
      if (year.value >= e.value) {
        max_years.push(year)
      }
    })

    this.setState({
      search: dict,
      year_max_options: max_years
    });
  }

  handleYearMaxChange(e) {
    var dict = JSON.parse(JSON.stringify(this.state.search));
    dict.yearMax = e.value;

    var min_years = [] 
    years.map( year => {
      if (year.value <= e.value) {
        min_years.push(year)
      }
    })

    this.setState({
      search: dict,
      year_min_options: min_years
    });
  }

  handleResetChange(e) {
  }

  handleSubmitChange(e) {
    var url = new URL(window.location.origin + "/inventory");
    for (const [key, value] of Object.entries(this.state.search)) {
      if ((value === "") | (key === "count")) {
        continue;
      } else {
        url.searchParams.set(key, value);
      }
    }

    window.location.href = url.href;
    e.preventDefault();
  }

  componentDidUpdate() {
    if (this.state.make_options.length === 1) {
      this.props.data.forEach((make) => {
        this.state.make_options.push({ value: make.make, label: make.make });
      });
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="component-header-title">
            <h2 className="header-sub-title">Search Inventory</h2>
            <div className="underline"></div>
          </div>
          <form className="search-container">
            <div className="row py-5 px-3">
              <div className="col-md-4 col-sm-12 py-2">
                <Select
                  classNamePrefix="form-select-index"
                  options={this.state.make_options}
                  placeholder="Make"
                  onChange={this.handleMakeInput.bind(this)}
                />
              </div>
              <div className="col-md-4 col-sm-12 py-2">
                <Select
                  classNamePrefix="form-select-index"
                  options={this.state.model_options}
                  placeholder="Model"
                  onChange={this.handleModelInput.bind(this)}
                />
              </div>
              <div className="col-md-4 col-sm-12 py-2">
                <Select
                  classNamePrefix="form-select-index"
                  options={this.state.body_options}
                  placeholder="Body Type"
                  onChange={this.handleBodyChange.bind(this)}
                />
              </div>
            </div>
            <div className="row py-5 px-3">
              <div className="col-md-3 col-sm-6 py-2">
                <Select
                  classNamePrefix="form-select-index"
                  options={this.state.trans_options}
                  placeholder="Transmission"
                  onChange={this.handleTransChange.bind(this)}
                />
              </div>
              <div className="col-md-3 col-sm-6 py-2">
                <Select
                  classNamePrefix="form-select-index"
                  options={this.state.location_options}
                  placeholder="Location"
                  onChange={this.handleLocationChange.bind(this)}
                />
              </div>
              <div className="col-md-3 col-sm-6 py-2">
                <Select
                  classNamePrefix="form-select-index"
                  options={this.state.year_min_options}
                  placeholder="Year From"
                  onChange={this.handleYearMinChange.bind(this)}
                />
              </div>
              <div className="col-md-3 col-sm-6 py-2">
                <Select
                  classNamePrefix="form-select-index"
                  options={this.state.year_max_options}
                  placeholder="Year To"
                  onChange={this.handleYearMaxChange.bind(this)}
                />
              </div>
            </div>
            <div className="separator my-10"></div>
            <div className="d-flex justify-content-end mt-5">
              <button
                className="btn adv-search-btn mx-2"
                onClick={this.handleSubmitChange.bind(this)}
              >
                Search Inventory
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default AdvSearchComponent;
