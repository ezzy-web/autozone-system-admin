

import React, { Component } from 'react'

class PageNotFound extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  componentDidMount() {
    try {
      this.props.client.setState({
        title : "Page Not Found 404"
      })
    } catch (error) {
      document.title = "Page Not Found 404"
    }
    
  }


  render() {
    return (
      <div>
        <h1>404 Page Not Found</h1>
    </div>
    )
  }
}

export default PageNotFound


