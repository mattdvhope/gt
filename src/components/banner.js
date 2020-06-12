import React, { Component, useState, useEffect } from "react";

import { Link } from "gatsby";
import Img from "gatsby-image";

export default class Banner extends Component {
  render() {
    const { data } = this.props;

    // const [count, setCount] = useState(0);
    // const [width, setWidth] = useState(600);

    return (
      <div className="banner">
        <Img
          fixed={data.bannerImage.fluid}
          objectFit="cover"
          objectPosition="50% 50%"
        />
        <div className="container">
          <div className="banner-details">
            <span style={{ fontSize: `${10}vw` }}>
              สายสัมพันธ์ ความสุข
            </span> {/* <h1>I'm {data.designation}.</h1> */} 
            <span style={{ fontSize: `${9}vw` }}>
              ด้วยความรัก...
            </span>
            <span style={{
              fontSize: `${7.5}vw`,
              // fontSize: `${window.screen.width > 600 ? 4 : 7.5}vw`,
              marginLeft: `auto`,
              marginRight: `auto`,
              width: `70%`,
            }}><Link to="" style={{ color: `#DAC899` }}>
              คลิกที่นี่เพื่อแบ่งปันความคิดเห็นของท่านเกี่ยวกับความสัมพันธ์ในกรุงเทพค่ะ 😊
            </Link></span>
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
  }
}
