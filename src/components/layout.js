import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.css";

import Header from "./header";
import Footer from "./footer";

import "../css/style.css";
import "../css/font-awesome.css";

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]');
}

const Layout = ({ children, header }) => (
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
        <script
          dangerouslySetInnerHTML={{ __html: `
            window.fbAsyncInit = function() {
              FB.init({
                appId      : '2631589053776780',
                cookie     : true,
                xfbml      : true,
                version    : 'v7.0'
              });
                
              FB.AppEvents.logPageView();   
                
            };

            (function(d, s, id){
               var js, fjs = d.getElementsByTagName(s)[0];
               if (d.getElementById(id)) {return;}
               js = d.createElement(s); js.id = id;
               js.src = "https://connect.facebook.net/th_TH/sdk.js";
               fjs.parentNode.insertBefore(js, fjs);
             }(document, 'script', 'facebook-jssdk'));

             console.log("FB SDK LOADING!!!!!!!!!!!")
          `}}
        />
        <div id="fb-root"></div>
        <script async defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v7.0&appId=2631589053776780&autoLogAppEvents=1"
        />


        <Header
          data={data.contentfulSiteInformation}
          siteTitle={data.contentfulSiteInformation.siteName}
          header={header}
        />
        <div>
          <main id="home">{children}</main>
        </div>
        <Footer siteName={data.contentfulSiteInformation.siteName} />
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
