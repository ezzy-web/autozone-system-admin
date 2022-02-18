import React from 'react';
import { Content } from '../../Content/content';


export default function FooterComponent() {
  const contentContainer = new Content();
  const content = contentContainer.footer_content;
  return (
    <>
    <div className="nav-border"></div>
    <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-5">
                <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6382.807201084353!2d-77.29562459912023!3d17.96757382928891!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x33279f4e51df2df2!2sJavvy&#39;s%20Autozone%20Ltd.!5e0!3m2!1sen!2sjm!4v1610814512485!5m2!1sen!2sjm"
                    width="100%" height="100%" frameBorder="0" style={ { border : 0 } } allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                </div>
            </div>
            <div className="col-sm-12 col-md-3">
                <div>
                    {content.address()}
                    {content.contacts.map( (contact, key) => {
                      return (
                        <div key={key} >
                        <a href="#" data-val={contact.tel} className="tel-icon"><span><i className="fa fa-phone mr-2"></i></span>{contact.view}</a><br />
                        </div>
                      )
                    })}
                    
                </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <h6>Menu</h6>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/inventory">Inventory</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/about">About Us</a></li>
              </ul>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-12">

              <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by Javvy's Autozone.</p>
            </div>
          </div>
          </div>
    </footer>
    </>
  );
}
