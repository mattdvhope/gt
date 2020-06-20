import React, { useEffect } from "react";
import { FacebookProvider } from 'react-facebook';
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.css";

import Header from "./header";
import Footer from "./footer";
// import { FBsdk } from "../utils/FBsdk";
// import * as Facebook from 'fb-sdk-wrapper';

import "../css/style.css";
import "../css/font-awesome.css";

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]');
}

const Layout = ({ children, header }) => {
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
        <FacebookProvider appId="1153251771692328">
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
        </FacebookProvider>
      )}
    />
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
