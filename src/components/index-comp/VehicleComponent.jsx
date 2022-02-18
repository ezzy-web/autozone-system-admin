
import React, { Component } from 'react'
import yall from "yall-js";
import TimeAgo from 'react-timeago'

class VehicleComponent extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      url: new URL(window.location.origin + "/inventory/vehicle")
    }
  }

  componentDidMount() {
    var baseUrl = window.location.origin;
    var url = new URL(baseUrl + "/inventory/vehicle");
    url.searchParams.append("year", this.props.data.year);
    url.searchParams.append("body", this.props.data.body);
    url.searchParams.append("make", this.props.data.make);
    url.searchParams.append("model", this.props.data.model);
    url.searchParams.append("title", this.props.data.title);
    url.searchParams.append("stock", this.props.data.id);


    this.setState({
      url: url
    })

    yall({
      observeChanges: true,
    });
  }

  render() {
    return (
      <a href={this.state.url.href} className='recent'>
        <div className="overlay overlay-block">
          <div className='overlay-wrapper'>
              <img className="lazy mw-100"
                  src="/images/placeholder.gif"
                  data-src={
                    this.props.data.images.length == 0
                      ? this.props.data.imageDefault
                      : this.props.data.images[0].url
                  }
                  alt={this.props.data.title} />
          </div>
          <div className='overlay-layer'>
              <div>
                  <h2>{this.props.data.title}</h2>
                  <p><b>{this.props.data.body}</b> {this.props.data.location} <br />
                  <span> 
                    <TimeAgo 
                    date={this.props.data.last_visited}
                  /> 
                  </span></p>
              </div>
          </div>
        </div>
    </a>
    )
  }
}

export default VehicleComponent
