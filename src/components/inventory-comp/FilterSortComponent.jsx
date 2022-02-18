import FilterButton from "./FilterButton.jsx";

import React, { Component } from "react";

class FilterSortComponent extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(e) {
    const id = e.currentTarget.id;
    var params = this.props.parent.state.params.slice();
    var ind;
    params.map((param, index) => {
      if (param.id === id) {
        ind = index;
      }
    });
    params.splice(ind, 1);

    this.props.parent.setState({
      params: params,
    });

    this.props.parent.handleParamUpdate(params);
  }

  render() {
    return (
      <div>
        <div className="result-detail-container">
          <p>
            {this.props.data.data.resultsCount == 1
              ? this.props.data.data.resultsCount + " Result Found"
              : this.props.data.data.resultsCount + " Results Found"}
          </p>
          <span
            className="spinner-border text-danger"
            id="loading-spinner"
          ></span>
        </div>
        <div className="filter-container">
          <h2>Sort & Filter</h2>
          <div className="filter-btns d-flex">
            {this.props.data.params.map((param) => {
              if (param.id == "make") {
                return (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"Make: " + param.value}
                  />
                );
              } else if (param.id == "model") {
                return (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"Model: " + param.value}
                  />
                );
              } else if (param.id == "yearMin") {
                return (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"Year Min: " + param.value}
                  />
                );
              } else if (param.id == "yearMax") {
                return (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"Year Max: " + param.value}
                  />
                );
              } else if (param.id == "year") {
                return (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"Year: " + param.value}
                  />
                );
              } else if (param.id == "body") {
                return (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"Body: " + param.value}
                  />
                );
              } else if (param.id == "trans") {
                return (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"Transmission: " + param.value}
                  />
                );
              } else if (param.id == "context") {
                return param.value === "featured" ? (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"Featured"}
                  />
                ) : (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"New Arrivals"}
                  />
                );
              } else if (param.id == "location") {
                return (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"Location: " + param.value}
                  />
                );
              } else if (param.id == "price") {
                return (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"Price: " + param.value}
                  />
                );
              } else if (param.id == "mil") {
                return (
                  <FilterButton
                    key={param.id}
                    parent={this}
                    id={param.id}
                    param={"Mileage: " + param.value}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default FilterSortComponent;
