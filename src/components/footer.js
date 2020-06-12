import React, { Component } from "react";
import { isLoggedIn } from "../utils/auth"
import Logout from "../components/Logout";

export default class footer extends Component {
  render() {

    const logout = (<span><Logout /></span>)

    const privacy = (
      <span>
        <a href="https://www.privacypolicies.com/privacy/view/eafea5993b7a8f48855e35cc251a9442"
           target="_blank"
           style={{ fontSize: `80%` }} >
          Privacy Policy
        </a>
      </span>
    )

    return (
      <div className="site-footer" id="footer">
        <div className="container">
          <span>{this.props.siteName}</span>&nbsp; | &nbsp;
          {isLoggedIn() ? logout : privacy}
        </div>
      </div>
    );
  }
}



// export default class footer extends Component {
//   render() {
  
//     const logout = isLoggedIn() ? (<Logout />) : privacy

//     console.log("in footer, isLoggedIn? ..", isLoggedIn())


//     const privacy = (
//       <span>
//         <a href="https://www.privacypolicies.com/privacy/view/eafea5993b7a8f48855e35cc251a9442"
//            target="_blank"
//            style={{ fontSize: `80%` }} >
//           Privacy Policy
//         </a>
//       </span>
//     )

//     return (
//       <div className="site-footer" id="footer">
//         <div className="container">
//           <span>{this.props.siteName}</span>&nbsp; | &nbsp;
//         </div>
//         {logout}
//       </div>
//     );
//   }
// }
