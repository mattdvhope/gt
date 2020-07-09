import React, { Component } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { isLoggedIn } from "../utils/auth"
// import { linkVisit } from "../utils/railsVisits"
import { fbLoginURL } from "../utils/FBplatform"
import { lineLoginURL } from "../utils/linePlatform"
import { FacebookBrowser, LineBrowser } from "../utils/BrowserTypes"

export default class Banner extends Component {

  constructor(props) {
    super();
    this.state = { 
      window: undefined,
      linkColor: { color: `#DAC899` },
      is_FB_browser: false,
      is_LINE_browser: false,
      GatsbyLinkClicked: false,
    };
  }

  componentDidMount() {
    this.setState({ is_FB_browser: FacebookBrowser(), is_LINE_browser: LineBrowser(), window: window })
  }

  Linkage( ) {
    if (this.state.is_FB_browser) {
      return this.FbLink();
    }
    else if (this.state.is_LINE_browser) {
      return this.LineLink();
    } 
    else if (this.state.GatsbyLinkClicked) {
      return this.SocialLoginChoices();
    } 
    else {
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

  LineLink() {
    return (
      <a
        href={lineLoginURL()}
        style={this.state.linkColor} 
        // onClick={e => linkVisit()}
      >
        {this.props.socialLinkStatement}
      </a>
    )
  }

  GatsbyLink() {
    return (
      <a 
        href={`#`}
        onClick={e => this.setState({ GatsbyLinkClicked: true })}
        style={this.state.linkColor}
      >
        {this.props.socialLinkStatement}
      </a>
    )
  }

  SocialLoginChoices() {
    return (
      <div style={{ backgroundColor: `white` }}>
        <h4>In order to participate in this survey, please Login with FB or LINE</h4>
        <a href={lineLoginURL()}>LINE</a> | <a href={fbLoginURL()}>Facebook</a>
        <h4>We suggest logging in with LINE because it reveals less of your personal information: only your Line profile photo and your Line nickname. We will not have access to any other information in your LINE account.  And, if you feel that you no longer want to participate, you can easily 'block' มิตรภาพเคียงข้างคุณ and you will no longer be connected with us.</h4>
        <h4>The reason that we ask you to login with either Facebook or LINE is because we want to know who would be interested in learning more about how to grow in relationships.</h4>
        <button onClick={e => this.setState({ GatsbyLinkClicked: false })} >Cancel</button>
      </div>
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
