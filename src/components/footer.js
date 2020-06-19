import React, { Component } from "react";
import { isLoggedIn } from "../utils/auth"
import Logout from "../components/Logout";

export default class footer extends Component {
  render() {

    const logout = (<span><Logout /></span>)

    const privacy = (
      <span>
        <a href="https://www.privacypolicies.com/privacy/view/b06683b5030f4b73f98811015534ea5f"
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