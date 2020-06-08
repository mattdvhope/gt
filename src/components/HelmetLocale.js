import React from "react"
import { Helmet } from 'react-helmet'

export default () => (
	
	<Helmet>

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

       `}}
    />
    <div id="fb-root"></div>
    <script async defer
      crossOrigin="anonymous"
      src="https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v7.0&appId=2631589053776780&autoLogAppEvents=1"
    />

  </Helmet>

)
