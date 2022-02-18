import NavbarComponent from '../components/index-comp/NavbarComponent.jsx';


import React, { Component } from 'react'

class ContactPage extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.client.setState({
      title: "Autozone | Contact Us"
    })
  }
  render() {
    return (
      <>
        <NavbarComponent client={this.props.client} />
        <h1>Contact Page</h1>
    </>
    )
  }
}

export default ContactPage
