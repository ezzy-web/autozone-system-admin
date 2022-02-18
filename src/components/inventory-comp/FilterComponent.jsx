import Select from "react-select";

import React, { Component } from "react";
import { httpClient } from "../..httpClient";
import { Content } from "../../Content/content.js";

const $ = require('jquery')

const content = new Content();
const years = content.year_options;

class FilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      make_options: [{ value: "", label: "Any" }],
      model_options: [{ value: "", label: "Any" }],
      min_year_options: years,
      max_year_options: years,
      body_options: content.body_options,
      mileage_options: content.mileage_options,
      price_options: content.price_options,
      sort_options: content.sort_options,
    };

    this.updateFilterComponent = this.updateFilterComponent.bind(this);
  }

  OpenContainer(e) {
    this.filterContainer.collapse("toggle");
    if ($("#filter-icon-toggle").hasClass("rotate")) {
      $("#filter-icon-toggle").removeClass("rotate");
    } else {
      $("#filter-icon-toggle").addClass("rotate");
    }
  }

  updateFilterComponent() {
    var url = new URL(window.location.href);

    url.searchParams.forEach((param, key) => {
      if (key === "make") {
        var model_opt = [{ value: "", label: "Any" }];
        this.makes.map((make) => {
          if (make.make === param) {
            make.models.map((model) => {
              model_opt.push({ value: model, label: model });
            });
          }
        });

        this.setState({
          model_options: model_opt,
        });
      }
    });
  }

  componentDidMount() {
    this.filterContainer = $("#filter-container");
    httpClient()
      .get("/server/get_makes")
      .then((res) => {
        this.makes = res.data;
        var lst = [{ value: "", label: "Any" }];
        this.makes.map((make) => {
          lst.push({ value: make.make, label: make.make });
        });

        this.setState({
          make_options: lst,
        });

        this.updateFilterComponent();
      })
      .catch((err) => {});
  }

  handleMakeChange(e) {
    const id = "make";
    var model_opt = [{ value: "", label: "Any" }];
    this.makes.map((make) => {
      if (make.make === e.value) {
        make.models.map((model) => {
          model_opt.push({ value: model, label: model });
        });
      }
    });

    this.setState({
      model_options: model_opt,
    });

    var params = this.props.parent.state.params.slice();
    var ind = -1;

    params.map((param, index) => {
      if (param.id === id) {
        ind = index;
      }
    });

    if (ind < 0) {
      if (e.value != "") {
        params.push({ id: id, value: e.value });
      }
    } else {
      if (e.value === "") {
        params.splice(ind, 1);
      } else {
        params[ind].value = e.value;
      }
    }

    this.props.parent.setState({
      params: params,
    });

    this.props.parent.handleParamUpdate(params);
  }

  handleModelChange(e) {
    const id = "model";
    var params = this.props.parent.state.params.slice();

    var ind = -1;

    params.map((param, index) => {
      if (param.id === id) {
        ind = index;
      }
    });

    if (ind < 0) {
      if (e.value != "") {
        params.push({ id: id, value: e.value });
      }
    } else {
      if (e.value === "") {
        params.splice(ind, 1);
      } else {
        params[ind].value = e.value;
      }
    }

    this.props.parent.setState({
      params: params,
    });

    this.props.parent.handleParamUpdate(params);
  }

  handleYearMinChange(e) {
    const id = "yearMin";
    var params = this.props.parent.state.params.slice();

    var max_years = [{ value: "", label: "Any" }];
    years.map((year) => {
      if (year.value >= e.value) {
        max_years.push(year);
      }
    });

    this.setState({
      max_year_options: max_years,
    });

    var ind = -1;

    params.map((param, index) => {
      if (param.id === id) {
        ind = index;
      }
    });

    if (ind < 0) {
      if (e.value != "") {
        params.push({ id: id, value: e.value });
      }
    } else {
      if (e.value === "") {
        params.splice(ind, 1);
      } else {
        params[ind].value = e.value;
      }
    }

    this.props.parent.setState({
      params: params,
    });

    this.props.parent.handleParamUpdate(params);
  }

  handleYearMaxChange(e) {
    const id = "yearMax";
    var params = this.props.parent.state.params.slice();
    var min_years = [];
    years.map((year) => {
      if (year.value <= e.value) {
        min_years.push(year);
      }
    });

    this.setState({
      min_year_options: min_years,
    });

    var ind = -1;

    params.map((param, index) => {
      if (param.id === id) {
        ind = index;
      }
    });

    if (ind < 0) {
      if (e.value != "") {
        params.push({ id: id, value: e.value });
      }
    } else {
      if (e.value === "") {
        params.splice(ind, 1);
      } else {
        params[ind].value = e.value;
      }
    }

    this.props.parent.setState({
      params: params,
    });

    this.props.parent.handleParamUpdate(params);
  }

  handleBodyChange(e) {
    const id = "body";
    var params = this.props.parent.state.params.slice();

    var ind = -1;

    params.map((param, index) => {
      if (param.id === id) {
        ind = index;
      }
    });

    if (ind < 0) {
      if (e.value != "") {
        params.push({ id: id, value: e.value });
      }
    } else {
      if (e.value === "") {
        params.splice(ind, 1);
      } else {
        params[ind].value = e.value;
      }
    }

    this.props.parent.setState({
      params: params,
    });

    this.props.parent.handleParamUpdate(params);
  }

  handlePriceChange(e) {
    const id = "price";
    var params = this.props.parent.state.params.slice();

    var ind = -1;

    params.map((param, index) => {
      if (param.id === id) {
        ind = index;
      }
    });

    if (ind < 0) {
      if (e.value != "") {
        params.push({ id: id, value: e.value });
      }
    } else {
      if (e.value === "") {
        params.splice(ind, 1);
      } else {
        params[ind].value = e.value;
      }
    }

    this.props.parent.setState({
      params: params,
    });

    this.props.parent.handleParamUpdate(params);
  }

  handleMileageChange(e) {
    const id = "mileage";
    var params = this.props.parent.state.params.slice();

    var ind = -1;

    params.map((param, index) => {
      if (param.id === id) {
        ind = index;
      }
    });

    if (ind < 0) {
      if (e.value != "") {
        params.push({ id: id, value: e.value });
      }
    } else {
      if (e.value === "") {
        params.splice(ind, 1);
      } else {
        params[ind].value = e.value;
      }
    }

    this.props.parent.setState({
      params: params,
    });

    this.props.parent.handleParamUpdate(params);
  }

  handleSortChange(e) {}

  render() {
    return (
      <>
        <div className="filter-toggle">
          <button
            className="fs-4 fw-bold"
            onClick={this.OpenContainer.bind(this)}
            type="button"
          >
            <div>
              <span>
                <i className="lni lni-search-alt mx-2"></i>
              </span>
              Filter Inventory
            </div>
            <span>
              <i id="filter-icon-toggle" className="lni lni-chevron-down"></i>
            </span>
          </button>
        </div>
        <div id="filter-container" className="collapse">
          <form>
            <div className="accordion" id="filter-component">
              <div className="accordion-item">
                <h2 className="accordion-header sort" id="make">
                  <button
                    className="accordion-button fs-4 fw-bold collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sort-filter"
                  >
                    <span>
                      <i className="fa fa-sort px-3"></i>Sort By
                    </span>
                  </button>
                </h2>
                <div
                  id="sort-filter"
                  className="accordion-collapse collapse"
                  data-bs-parent="#filter-component"
                >
                  <div className="accordion-body px-3">
                    <div>
                      <Select
                        classNamePrefix="form-select-index"
                        options={this.state.sort_options}
                        onChange={this.handleSortChange.bind(this)}
                        placeholder="Sort By"
                      ></Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="make">
                  <button
                    className="accordion-button fs-4 fw-bold collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#make-filter"
                  >
                    Filter Options
                  </button>
                </h2>
                <div
                  id="make-filter"
                  className="accordion-collapse collapse"
                  data-bs-parent="#filter-component"
                >
                  <div className="accordion-body px-3">
                    <div className="py-3">
                      <label>
                        <small>Make</small>
                      </label>
                      <Select
                        options={this.state.make_options}
                        classNamePrefix="form-select-index"
                        onChange={this.handleMakeChange.bind(this)}
                        placeholder="Any"
                      ></Select>
                    </div>

                    <div className="py-3">
                      <label>
                        <small>Model</small>
                      </label>
                      <Select
                        classNamePrefix="form-select-index"
                        options={this.state.model_options}
                        onChange={this.handleModelChange.bind(this)}
                        placeholder="Any"
                      ></Select>
                    </div>

                    <div className="row">
                      <div className="col-6 py-2">
                        <label>
                          <small>From</small>
                        </label>
                        <Select
                          classNamePrefix="form-select-index"
                          placeholder="From"
                          options={this.state.min_year_options}
                          onChange={this.handleYearMinChange.bind(this)}
                          id="year-from"
                        ></Select>
                      </div>
                      <div className="col-6 py-2">
                        <label>
                          <small>To</small>
                        </label>
                        <Select
                          classNamePrefix="form-select-index"
                          placeholder="To"
                          options={this.state.max_year_options}
                          onChange={this.handleYearMaxChange.bind(this)}
                          id="year-to"
                        ></Select>
                      </div>
                    </div>

                    <div className="py-3">
                      <label>
                        <small>Body Type</small>
                      </label>
                      <Select
                        classNamePrefix="form-select-index"
                        placeholder="Any"
                        options={this.state.body_options}
                        onChange={this.handleBodyChange.bind(this)}
                      ></Select>
                    </div>

                    <div className="py-3">
                      <label>
                        <small>Price Range</small>
                      </label>
                      <Select
                        classNamePrefix="form-select-index"
                        options={this.state.price_options}
                        placeholder="Price Range"
                        onChange={this.handlePriceChange.bind(this)}
                      ></Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default FilterComponent;
