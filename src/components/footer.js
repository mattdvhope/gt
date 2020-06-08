import React, { Component } from "react";

export default class footer extends Component {
  render() {
    return (
      <div className="site-footer" id="footer">
        <div className="container">
          <span>{this.props.siteName}</span>&nbsp; | &nbsp;
          <span>
            <a href="https://www.privacypolicies.com/privacy/view/eafea5993b7a8f48855e35cc251a9442"
               target="_blank"
               style={{ fontSize: `80%` }} >
              Privacy Policy
            </a>
          </span>
        </div>
      </div>
    );
  }
}
