import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.css";

import Header from "./header";
import Footer from "./footer";
// import { FBsdk } from "../utils/FBsdk";
import * as Facebook from 'fb-sdk-wrapper';

import "../css/style.css";
import "../css/font-awesome.css";

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]');
}

const Layout = ({ children, header }) => {

  Facebook.load()
    .then(() => {
      Facebook.init({
        appId: `1153251771692328`,
        status     : true,
        xfbml      : true,
        version    : `v2.7`
      });
    })
    .then((response) => {
      console.log(response)
    })

  // // Get current state
  // Facebook.getLoginStatus()
  //   .then((response) => {
  //     if (response.status === 'connected') {
  //       console.log("response: ", response)
  //     } else {
  //       console.log("other_response: ", response)
  //     }
  //   });



  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          contentfulSiteInformation {
            siteName
            siteDescription
            logo {
              file {
                url
              }
            }
            menus
          }
        }
      `}
      
      render={data => (
        <>
          <Header
            data={data.contentfulSiteInformation}
            siteTitle={data.contentfulSiteInformation.siteName}
            header={header}
          />
          <div>
            <main id="home">{children}</main>
          </div>
          <Footer siteName={data.contentfulSiteInformation.siteName} />
          <script>
            alert("Hello");
          </script>
        </>
      )}
    />
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
