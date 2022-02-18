
import React, { Component } from 'react'


function Crumb(crumb) {
    if (crumb.active) {
        return <li key={crumb.id} className="breadcrumb-item pe-3"><a href={crumb.link} className="pe-3">{crumb.title}</a></li>
    } else {
        return <li key={crumb.id} className="breadcrumb-item px-3 text-muted">{crumb.title}</li>
    }

}

class BreadCrumbComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            crumbs: [],
            bread: []
        }
    }

    updateBreadCrumb() {
        var lst = []
        var url = new URL(window.location.origin + "/inventory")
        var urlParam = new URL(window.location.href)


        lst.push({ id: "home", title: "Home", active: true, link: window.location.origin + "/" })
        lst.push({ id: "inventory", title: "Inventory", active: false, link: window.location.origin + "/inventory" })
        
        urlParam.searchParams.forEach( (param,key) => {
            
            if (key === "context") {
                url.searchParams.append(key, param)
                if (param == "featured") {
                    lst.push( { id: key, title: "Featured", active: false, link: url.href } )
                } else {
                    lst.push( { id: key, title: "New Arrival", active: false, link: url.href } )
                }
                this.state.bread.push(key)

                lst.forEach( crumb => {
                    if (crumb.id === "inventory") {
                        crumb.active = true
                    }
                })
            }

            if (key === "make") {
                url.searchParams.append(key, param)
                lst.push( { id: key, title: param, active: false, link: url.href } )
                this.state.bread.push(key)

                lst.forEach( crumb => {
                    if (crumb.id === "context" | crumb.id === "inventory") {
                        crumb.active = true
                    }
                })
            }

            if (key === "model") {
                url.searchParams.append(key, param)
                lst.push( { id: key, title: param, active: false, link: url.href } )
                this.state.bread.push(key)

                lst.forEach( crumb => {
                    if (crumb.id === "make" | crumb.id === "context" | crumb.id === "inventory") {
                        crumb.active = true
                    }
                })
            }

            if (key === "title") {
                url.searchParams.append(key, param)
                lst.push( { id: key, title: param, active: false, link: url.href } )
                this.state.bread.push(key)

                lst.forEach( crumb => {
                    if (crumb.id === "model" | crumb.id === "make" | crumb.id === "context" | crumb.id === "inventory") {
                        crumb.active = true
                    }
                })
            }
        })
        return lst
    }

    componentDidUpdate() {
        this.state.crumbs = this.updateBreadCrumb()
    }

    componentDidMount() {
        var lst = this.updateBreadCrumb()
        
        this.setState({
            crumbs: lst
        })
    }

    render() {
        if (this.props.specify) {
            var lst = []
            lst.push({ id: "home", title: "Home", active: true, link: window.location.origin + "/" })
            lst.push({ id: this.props.specify, title: this.props.specify, active: false, link: "#" })
            return (
                <>
                <div className="breadcrumb-container">
                    <ol className="breadcrumb breadcrumb-dot text-muted fs-6 fw-bold">
                        {lst.map( crumb => {
                            return Crumb(crumb)
                        })}
                    </ol>
                </div>
            </>
            )
        }
        return (
            <>
                <div className="breadcrumb-container">
                    <ol className="breadcrumb breadcrumb-dot text-muted fs-6 fw-bold">
                        {this.state.crumbs.map( crumb => {
                            return Crumb(crumb)
                        })}
                    </ol>
                </div>
            </>
        )
    }
}

export default BreadCrumbComponent
