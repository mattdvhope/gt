import React from "react"
import { Helmet } from 'react-helmet';

export default () => (
  <Helmet>
    <div id="fb-root"></div>
    <script async defer
      crossorigin="anonymous"
      src="https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v7.0&appId=1153251771692328&autoLogAppEvents=1"
      nonce="8n79q7Mj"
    />
  </Helmet>
)

