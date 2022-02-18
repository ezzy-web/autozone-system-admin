
import VehicleComponent from './VehicleComponent.jsx';
import '/src/assets/custom/typedjs/typedjs.bundle.js';

import React, { Component } from 'react'
import {httpClient} from '../../httpClient';

class RecentlyViewedContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recents: null
    }
  }

  componentDidMount() {

    httpClient().get('/@client_session/get_recent')
    .then( res => {
      console.log(res)
      if (res.data.success) {
        this.setState({
          recents: res.data.data
        })

        this.Slider = tns({
            container: '.recent-slider-container',
            navPosition: 'bottom',
            items: 1,
            controls: false,
            responsive: {
              640: {
                edgePadding: 0,
                gutter: 20,
                items: 2
              },
              700: {
                gutter: 20
              },
              900: {
                items: 3
              }
            }
          })
      }
    })

    .catch( err => {
      console.log(err)
    })

    

  }


  render() {
    if (this.state.recents === null) {
      return (<></>)
    }
    return (
      <div className='container'>
        <div className="header-container">
          <h2 className="header-sub-title">Recently Viewed</h2>
          <div className="underline"></div>
        </div>

        <div className='recent-slider-container'>
          { this.state.recents.map( vehicle => {
            return <VehicleComponent key={vehicle.id} data={vehicle} />
          }) }
        </div>

      </div>
    )
  }
}

export default RecentlyViewedContainer
