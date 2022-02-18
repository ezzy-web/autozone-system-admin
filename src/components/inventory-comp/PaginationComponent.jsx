import React, { Component } from "react";

function range(size, startAt = 1) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prev: () => {
        var url = new URL(window.location.href);
        var prev = parseInt(this.props.data.data.current) - 1;
        if (prev > 0) {
          url.searchParams.set("page", prev.toString());
          return url.href
        }
        return "#"
      },
      next: () => {
        var url = new URL(window.location.href);
        var next = parseInt(this.props.data.data.current) + 1;
        if (next <= parseInt(this.props.data.data.pageCount)) {
          url.searchParams.set("page", next.toString());
          return url.href
        }
        return "#"
      },
    };
  }

  PageButton(page, isActive) {
    var url = new URL(window.location.href);
    url.searchParams.set("page", page);

    if (isActive) {
      return (
        <li key={page} className="page-item active">
          <a href={url.href} className="page-link">
            {page}
          </a>
        </li>
      );
    } else {
      return (
        <li key={page} className="page-item ">
          <a href={url.href} className="page-link">
            {page}
          </a>
        </li>
      );
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <>
        <div>
          <ul className="pagination pagination-circle">
            <li className="page-item previous">
              <a href={this.state.prev()} className="page-link">
                <i className="previous"></i>
              </a>
            </li>
            {range(this.props.data.data.pageCount).map((index) => {
              if (this.props.data.data.current === index) {
                return this.PageButton(index, true);
              } else {
                return this.PageButton(index, false);
              }
            })}
            <li className="page-item next">
              <a href={this.state.next()} className="page-link">
                <i className="next"></i>
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default PaginationComponent;
