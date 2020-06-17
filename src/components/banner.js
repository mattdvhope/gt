import React, { Component } from "react";
import { Link } from "gatsby";

import { FacebookProvider, LoginButton } from 'react-facebook';

import Img from "gatsby-image";
import { isLoggedIn } from "../utils/auth"
import { linkVisit } from "../utils/railsVisits"
import { lineLoginURL } from "../utils/linePlatform"
import { fbLoginURL } from "../utils/FBplatform"

export default class Banner extends Component {

  constructor(props) {
    super();
    this.state = { 
      window: undefined
    };
  }

  componentDidMount() {
    this.setState({ window: window })
  }

  Linkage( ) {
    return isLoggedIn() ? this.loggedInLink() : this.loggedOutLink()
  }

  loggedOutLink() {
    return (
      <FacebookProvider appId="1153251771692328">
        <LoginButton
          scope="email"
          onCompleted={this.handleResponse}
          onError={this.handleError}
        >
          <span>Login via Facebook</span>
        </LoginButton>
      </FacebookProvider>

    )
  }

  handleResponse() {
    this.state.window.location.replace(`${process.env.GATSBY_API_URL}`)
    console.log("handling response")
  }

  handleError() {
    console.log("handling error")
  }
  
  //     <a
  //       // href={lineLoginURL()}
  //       href={fbLoginURL()}
  //       onClick={e => linkVisit()}
  //       style={{ color: `#DAC899`, cursor: `pointer` }} 
  //     >
  //       คลิกที่นี่เพื่อแบ่งปันความคิดเห็นของท่านเกี่ยวกับความสัมพันธ์ในกรุงเทพค่ะ 😊
  //     </a>

  loggedInLink() {
    return (
      <Link to={`survey-1`} style={{ color: `#DAC899` }} onClick={e => linkVisit()} >
        คลิกที่นี่เพื่อแบ่งปันความคิดเห็นของท่านเกี่ยวกับความสัมพันธ์ในกรุงเทพค่ะ 😊
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
                  สายสัมพันธ์ ความสุข
                </span> {/* <h1>I'm {data.designation}.</h1> */} 
                <span style={{ fontSize: `${window.screen.width > 600 ? 7 : 9}vw` }}>
                  ด้วยความรัก...
                </span>
                <span style={{
                  fontSize: `${window.screen.width > 600 ? 4 : 7.5}vw`,
                  marginLeft: `auto`,
                  marginRight: `auto`,
                  width: `70%`,
                }}>
                  {this.Linkage()}
                </span>
                <br/>
            {/* <ul className="sub-data">
                  {data.bannerList.map((item, index) => {
                    return <li key={index} style={{ fontSize: `190%` }}>{item}</li>;
                  })}
                </ul> */}    
                <ul className="social">
                  <li>
                    <a
                      className="fab fa-facebook-f"
                      href={data.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                  </li>
              {/* <li>
                    <a
                      className="fab fa-twitter"
                      href={data.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                  </li>
                  <li>
                    <a
                      className="fab fa-instagram"
                      href={data.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                  </li>
                  <li>
                    <a
                      className="fab fa-linkedin-in"
                      href={data.linkdin}
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                  </li>
                  <li>
                    <a
                      className="fab fa-line"
                      href={data.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    ></a>
                  </li>  */}
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
