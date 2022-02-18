
import NavbarComponent from '../components/index-comp/NavbarComponent.jsx';
import FooterComponent from '../components/index-comp/FooterComponent.jsx';
import FilterComponent from '../components/inventory-comp/FilterComponent.jsx';
import FilterSortComponent from '../components/inventory-comp/FilterSortComponent.jsx';
import InventoryListComponent from '../components/inventory-comp/InventoryListComponent.jsx';
import BreadcrumbComponent from '../components/inventory-comp/BreadcrumbComponent.jsx';
import PaginationComponent from '../components/inventory-comp/PaginationComponent.jsx';
import {httpClient} from '..httpClient';
import Banner from '../components/index-comp/Banner.jsx';

import React, { Component } from 'react'

const $ = require('jquery')

class InventoryPage extends Component {
  constructor(props) {
    super(props)

    this.UIComponents = props.UIComponents

    this.queryURL = new URL(httpClient().defaults.baseURL + "/server/public/inventory/search")
    this.state = {
      params: [],
      data: {
        current: 0,
        pageCount: 0,
        resultsCount: 0,
        content: []
      }
    }

    this.handleParamUpdate = this.handleParamUpdate.bind(this)
  }


  loadState(isLoading) {
    if (! isLoading) {
      $("#loading-spinner").addClass("d-none")
      this.contentLoad.release()
    } else {
      $("#loading-spinner").removeClass("d-none")
      this.contentLoad.block()
    }
  }


  handleParamUpdate(prm) {
    const history = this.props.history
    const location = this.props.history.location

    this.loadState(true)

    var params = new URLSearchParams()
    
    prm.forEach( param => {
      params.set(param.id, param.value)
    })

    history.push({
      pathname: location.pathname,
      search: "?" + params.toString()
    }, this.state)

    this.queryURL = new URL(this.queryURL.origin + this.queryURL.pathname + "?" + params.toString())
    

    fetch(this.queryURL.href, {
      method : "GET"
    })

    .then( res => {
      
      res.json() .then( json => {
        this.setState({
          data: json
        })

        this.loadState(false)
      })

      .catch( err => {
        this.loadState(false)
      })
    })

    .catch( err => {
      this.loadState(false)
    })
  }



  componentDidMount(){
    var $content =  $(".inventory-list-container")
    var Block = require("/src/assets/vendor/js/components/blockui.js");  
    this.contentLoad = new Block($content.toArray()[0], {
        message: '<span class="spinner-border text-danger"></span>'
    });

    this.props.client.setState({
      title: "Autozone | Inventory"
    })


    this.loadState(true)
    var url = new URLSearchParams(this.props.location.search)
    var params = []

    url.forEach( (value, key )=> {
      params.push({ id: key, value: value })
    })

    this.setState({
      params: params
    })

    params.forEach(param => {
      this.queryURL.searchParams.set(param.id, param.value)
    })

    fetch(this.queryURL.href, {
      method : "GET"
    })

    .then( res => {
      
      res.json() .then( json => {
        this.setState({
          data: json
        })

        this.loadState(false)
      })

      .catch( err => {
        this.loadState(false)
      })
    })

    .catch( err => {
      this.loadState(false)
    })
  }


  render() {
    return (
      <>
        <NavbarComponent client={this.props.client} />
        <Banner />
        <BreadcrumbComponent/>

        <main className="row no-gutter">

            <div className="col-lg-3 col-md-12 side-menu-container">
              <div className="sticky-top">
                <FilterSortComponent data={this.state} parent={this} />
                <FilterComponent data={this.state} parent={this} />
              </div>
            </div>

            <div className="col-lg-9 col-md-12 content">
              <InventoryListComponent data={this.state} client={this.props.client} UIComponents={this.UIComponents} />
              <PaginationComponent data={this.state} />
            </div>

        </main>

        
        <FooterComponent/>
      </>
    )
  }
}

export default InventoryPage
