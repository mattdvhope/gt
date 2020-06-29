import React, { Component } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { isLoggedIn } from "../utils/auth"
// import { linkVisit } from "../utils/railsVisits"
import { fbLoginURL } from "../utils/FBplatform"
import { lineLoginURL } from "../utils/linePlatform"
import { FacebookBrowser } from "../utils/FacebookBrowser"

export default class Banner extends Component {

  constructor(props) {
    super();
    this.state = { 
      window: undefined,
      linkColor: { color: `#DAC899` },
      is_FB_browser: false,
    };
  }

  componentDidMount() {
    this.setState({ is_FB_browser: FacebookBrowser(), window: window })
  }

  Linkage( ) {
    if (this.state.is_FB_browser) {
      return this.FbLink();
    } else {
      return this.GatsbyLink();
    }
  }

  FbLink() {
    return (
      <a
        href={fbLoginURL()}
        style={this.state.linkColor} 
        // onClick={e => linkVisit()}
      >
        {this.props.socialLinkStatement}
      </a>
    )
  }

  GatsbyLink() {
    return (
      <Link 
        to={`survey-1`}
        style={this.state.linkColor}
        // onClick={e => linkVisit()}
      >
        {this.props.socialLinkStatement}
      </Link>
    )
  }

  render() {
    const { data } = this.props;

    if (this.state.window) {
    
        return (
          <div className="banner">
            <Img
              fluid={data.bannerImage.fluid}
              objectFit="cover"
              objectPosition="50% 50%"
            />
            <div className="container">
              <div className="banner-details">
                <span style={{ fontSize: `${window.screen.width > 600 ? 8 : 10}vw` }}>
                  {data.name}
                </span> {/* <h1>I'm {data.designation}.</h1> */} 
                <span style={{
                  fontSize: `${window.screen.width > 600 ? 4 : 7.5}vw`,
                  marginLeft: `auto`,
                  marginRight: `auto`,
                  width: `70%`,
                }}>
                  {this.Linkage()}
                </span>
                <br/>
                <ul className="social">
                  <li>
                    <a
                      className="fab fa-facebook-f"
                      href={data.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                  </li>
                  <li>
                    <a
                      className="fab fa-line"
                      href={data.line}
                      target="_blank"
                      style={{ fontSize: `200%` }}
                      rel="line app"
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
    } else {
      return <span/>
    }
  }
}
