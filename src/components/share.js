import React from "react";
import PropTypes from "prop-types";
import {
  FacebookShareButton,
  LineShareButton,
  FacebookIcon,
  LineIcon
} from "react-share";

const Share = ({ socialConfig }) => {
  return (
    <div className="post-social">
      <h6 className="title is-6">Share:</h6>
      <FacebookShareButton
        url={socialConfig.config.url}
        className="button is-outlined is-rounded facebook"
      >
        <FacebookIcon size={35} round={true} />
        <span className="text" style={{ fontSize: `130%` }}> เฟซบุ๊ก</span>
      </FacebookShareButton>
      <LineShareButton
        url={socialConfig.config.url}
        className="button is-outlined is-rounded line"
        title={socialConfig.config.title}
      >
        <LineIcon size={35} round={true} />
        <span className="text" style={{ fontSize: `130%` }}> ไลน์</span>
      </LineShareButton>
    </div>
  );
};

Share.propTypes = {
  socialConfig: PropTypes.shape({
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
};
Share.defaultProps = {
  tags: []
};

export default Share;
