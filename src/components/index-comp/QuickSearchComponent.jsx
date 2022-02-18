import React, { Component } from "react";
import Select from "react-select";
import { Content } from "../../Content/content";
import "/src/assets/custom/typedjs/typedjs.bundle.js";

class QuickSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: {
        make: "",
        model: "",
        year: "",
      },

      year_options: [
        { value: "", label: "Year" },
        { value: 2010, label: "2010" },
        { value: 2011, label: "2011" },
        { value: 2012, label: "2012" },
        { value: 2013, label: "2013" },
        { value: 2014, label: "2014" },
        { value: 2015, label: "2015" },
        { value: 2016, label: "2016" },
        { value: 2017, label: "2017" },
        { value: 2018, label: "2018" },
        { value: 2019, label: "2019" },
        { value: 2020, label: "2020" },
        { value: 2021, label: "2021" },
        { value: 2022, label: "2022" },
      ],

      make_options: [{ value: "", label: "Make" }],

      model_options: [],
    };
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

  handleYearInput(e) {
    var dict = JSON.parse(JSON.stringify(this.state.search));
    dict.year = e.value;

    this.setState({
      search: dict,
    });
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

  componentDidMount() {
    const content = new Content();
    this.typedLst = content.header_type_animation;

    this.typed = new Typed("#header-type", {
      strings: this.typedLst,
      typeSpeed: 90,
      loop: true,
      smartBackspace: true,
    });
  }

  render() {
    return (
      <>
        <div>
          <h1>Search Our Inventory</h1>
          <div className="type-js">
            <span id="header-type" className="fs-1 fw-bolder"></span>
          </div>

          <div>
            <form className="search-form row">
              <div className="col-lg-3 col-md-4 col-sm-6 p-2">
                <Select
                  classNamePrefix="form-select-over"
                  placeholder="Year"
                  options={this.state.year_options}
                  onChange={this.handleYearInput.bind(this)}
                />
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 p-2">
                <Select
                  classNamePrefix="form-select-over"
                  placeholder="Make"
                  options={this.state.make_options}
                  onChange={this.handleMakeInput.bind(this)}
                />
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 p-2">
                <Select
                  classNamePrefix="form-select-over"
                  placeholder="Model"
                  options={this.state.model_options}
                  onChange={this.handleModelInput.bind(this)}
                />
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 p-2">
                <button
                  type="submit"
                  className="btn quick-search-btn"
                  onClick={this.handleSubmitChange.bind(this)}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default QuickSearch;
