import FsLightbox from "fslightbox-react";

import React, { Component } from "react";
import { tns } from "tiny-slider/src/tiny-slider.js";
import yall from "yall-js";

class ImageSliderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggler: {
        toggler: false,
        srcIndex: 0,
      },
    };
    this.ImageSlider = null;
    this.thumbnails = null;
    this.openLightBox = this.openLightBox.bind(this);
  }

  openLightBox(index) {
    this.setState({
      toggler: { toggler: !this.state.toggler.toggler, srcIndex: index },
    });
  }

  nextSlide(evt) {
    const indexToGoTo =
      evt.index > this.ImageSlider.getInfo().slideCount ? 0 : evt.index - 1;
    this.thumbnails.goTo(indexToGoTo);
  }

  componentDidUpdate() {
    if (this.ImageSlider === null) {
      this.ImageSlider = tns({
        container: ".image-slider",
        items: 1,
        autoHeight: true,
        lazyload: false,
        mode: "gallery",

        prevButton: ".controls_prev",
        nextButton: ".controls_next",
        slideBy: "page",
        loop: true,
        navContainer: ".gallery_thumbnails",
      });

      this.thumbnails = tns({
        container: ".gallery_thumbnails",
        items: 4,
        gutter: 5,
        lazyload: false,

        prevButton: ".nav_prev",
        nextButton: ".nav_next",
        loop: false,
        slideBy: "page",
        nav: false,
      });
    }

    yall({
      observeChanges: true,
    });

    this.ImageSlider.events.on("indexChanged", this.nextSlide.bind(this));

  }

  render() {
    return (
      <div className="image-slider-container">
        <div className="main-slider">
          <div className="image-slider">
            {this.props.images.map((image, index) => {
              return (
                <div
                  key={image.id}
                  className="slider-img-item"
                  onClick={() => this.openLightBox(index)}
                >
                  <img className="lazy" src="/images/placeholder.gif" data-src={image.url} alt={this.props.title} />
                </div>
              );
            })}
          </div>
          <button className="controls_prev">
            <span>
              <i className="fa fa-chevron-left"></i>
            </span>
          </button>
          <button className="controls_next">
            <span>
              <i className="fa fa-chevron-right"></i>
            </span>
          </button>
        </div>

        <div className="thumbnail-slider">
          <div className="gallery_thumbnails">
            {this.props.images.map((image) => {
              return (
                <div key={image.id} className="thumbnail-container">
                  <img src={image.url} alt={this.props.title} />
                </div>
              );
            })}
          </div>
          <button className="nav_prev">
            <span>
              <i className="fa fa-chevron-left"></i>
            </span>
          </button>
          <button className="nav_next">
            <span>
              <i className="fa fa-chevron-right"></i>
            </span>
          </button>
        </div>

        <FsLightbox
          toggler={this.state.toggler.toggler}
          sources={this.props.images.map((img) => {
            return img.url;
          })}
          sourceIndex={this.state.toggler.srcIndex}
          type="image"
        />
      </div>
    );
  }
}
export default ImageSliderComponent;
