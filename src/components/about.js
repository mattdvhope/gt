import React from "react";
import Img from "gatsby-image";
// import Share from "../components/share";
import { Like } from 'react-facebook';

export default ({ data }) => (
  <div className="about section" id="About">
    <div className="container">
      <div className="about-main row">
        <div className="left col-md-5 col-lg-4 mb-3">
          <Img
            fluid={data.photo.fluid}
            objectFit="cover"
            objectPosition="top center"
          />
        </div>
        <div className="left col-md-7 col-lg-8">
          <div className="about-details">
            <span className="name">เราเป็น "{data.name}"</span>
            <h2 className="sub-position">
              {data.designation}
            </h2>
            
            <iframe
              src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Frelationshipsthailand%2F&width=50&layout=button&action=like&size=large&share=true&height=65&appId"
              width="200"
              height="65"
              style={{ border: `none`, overflow: `hidden`, height: `31px` }}
              scrolling="no"
              frameborder="0"
              allowTransparency="true"
              allow="encrypted-media"
            />
            <div
              dangerouslySetInnerHTML={{
                __html: data.description.childMarkdownRemark.html
              }}
            />
            <div className="socials">
              <ul>
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
      </div>
    </div>
  </div>
);