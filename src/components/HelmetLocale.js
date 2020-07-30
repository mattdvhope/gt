import React from "react"
import { Helmet } from 'react-helmet';

const fb_app = `https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v7.0&appId=${process.env.GATSBY_FB_APP_CLIENT_ID}&autoLogAppEvents=1`

export default () => (
  <Helmet>
    <div id="fb-root"></div>
    <script async defer
      crossorigin="anonymous"
      src={fb_app}
      nonce="8n79q7Mj"
    />


    {/* Facebook Pixel Code */}

    <script
      dangerouslySetInnerHTML={{ __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '222946198915072'); 
        fbq('track', 'PageView');
      `}}
    />
    
    <noscript>{`
      <img 
        height="1"
        width="1"
        style="display:none"
        src="https://www.facebook.com/tr?id=222946198915072&ev=PageView&noscript=1"
      />
    `}</noscript>

    {/* End Facebook Pixel Code */}

  </Helmet>
)

