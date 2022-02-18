import NavbarComponent from '../components/index-comp/NavbarComponent.jsx';
import BreadCrumbComponent from '../components/inventory-comp/BreadcrumbComponent.jsx';
import React, { Component } from 'react'
import Banner from '../components/index-comp/Banner.jsx';
import FooterComponent from '../components/index-comp/FooterComponent.jsx';

class AboutPage extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.client.setState({
      title: "Autozone - About Us"
    })
  }
  render() {
    return (
      <>
        <NavbarComponent client={this.props.client} />
        <Banner/>
        <BreadCrumbComponent specify="About Us" />
        <main>



          
        </main>


        <FooterComponent />
      </>
    )
  }
}

export default AboutPage

