import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./header";
import Footer from "./footer";
import "../css/style.css";
import "../css/font-awesome.css";
import HelmetLocale from "./HelmetLocale"

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]');
}


const Layout = ({ children, header }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          contentfulHomePage {
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
          <HelmetLocale/>
          <Header
            data={data.contentfulHomePage}
            siteTitle={data.contentfulHomePage.siteName}
            header={header}
          />
          <div>
            <main id="home">{children}</main>
          </div>
          <Footer siteName={data.contentfulHomePage.siteName} />
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
