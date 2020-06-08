import React from "react"
import { Helmet } from 'react-helmet'

export default () => (
	<Helmet>

		{/* FB SDK */}
		
  	<script
      dangerouslySetInnerHTML={{ __html: `
        window.fbAsyncInit = function() {
			    FB.init({
			      appId      : '2631589053776780',
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

			   console.log("loading SDK!!!!!!!!!!!!!!!!!!!!")

       `}}
    />

  </Helmet>

)
