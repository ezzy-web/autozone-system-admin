import VehicleCardComponent from '../index-comp/VehicleCardComponent.jsx';

import React, { Component } from 'react'

class InventoryListComponent extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.data
  }

  render() {
    return (
      <>
        <div className="row inventory-list-container">
          {this.props.data.data.content.map( data => {
            return <VehicleCardComponent key={data.id} data = {data} client={this.props.client} />
          })}
        </div>
      </>
    )
  }
}

export default InventoryListComponent

