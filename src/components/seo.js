import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, keywords, title, data }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={title}
            titleTemplate={`${data.contentfulSiteInformation.siteName}`}
            // titleTemplate={`%s | ${data.contentfulSiteInformation.siteName}`}
            meta={[
              {
                name: `description`,
                content: data.contentfulSiteInformation.siteDescription
              },
              {
                property: `og:title`,
                content: title
              },
              {
                property: `og:description`,
                content: data.contentfulSiteInformation.siteDescription
              },
              {
                property: `og:image`,
                content: `https://relate.s3-ap-southeast-1.amazonaws.com/sheep-flock-mountain.gif`
              },
              {
                property: `og:url`,
                content: `https://www.สายสัมพันธ์.com/`
              },
              {
                property: `og:type`,
                content: `website`
              },
              {
                name: `twitter:card`,
                content: `summary`
              },
              {
                name: `twitter:creator`,
                content: data.contentfulSiteInformation.twiteerHandle
              },
              {
                name: `twitter:title`,
                content: title
              },
              {
                name: `twitter:description`,
                content: data.contentfulSiteInformation.siteDescription
              }
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `)
                    }
                  : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: `th`,
  meta: [],
  keywords: []
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    contentfulSiteInformation {
      siteName
      siteDescription
      twiteerHandle
    }
  }
`;
