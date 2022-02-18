
import React, { Component } from 'react'

class FilterButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='filter-btn'>
      <button className='btn' id={this.props.id} onClick={this.props.parent.handleRemove} ><div>{this.props.param}</div><span><i className="lni lni-close"></i></span></button>
    </div>
    )
  }
}

export default FilterButton
