import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import moment from "moment";
import { DiscussionEmbed } from "disqus-react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";
import Form from "../components/form";

export default class surveyPost extends Component {
  render() {
    const data = this.props.data.contentfulSurveys;
    const disqusShortname = "สายสัมพันธ์";
    const disqusConfig = {
      identifier: data.id,
      title: data.title
    };

    const siteurl = this.props.data.contentfulSiteInformation.siteUrl + "/";
    const twiteerhandle = this.props.data.contentfulSiteInformation
      .twiteerHandle;
    const socialConfigss = {
      site: {
        siteMetadata: { siteurl, twiteerhandle }
      },
      title: data.title,
      slug: data.slug
    };

    return (
      <Layout>
        <SEO
          title={data.title}
          keywords={[
            `สายสัมพันธ์ ความสุข`,
            `Frontend Developer`,
            `Developer`,
            `${data.title}`
          ]}
        />
        <div className="site-container blog-post">
          <div className="container">
            {data.image ? (
              <Img
                className="feature-img"
                fluid={data.image.fluid}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            ) : (
              <div className="no-image"></div>
            )}

            <div className="details">
              <h1 className="title">{data.title}</h1>
              <span className="date">
                <i className="fas fa-calendar-alt"></i>{" "}
                {moment(data.createdAt).format("LL")}
              </span>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description.childMarkdownRemark.html
                }}
              />
            </div>
            <Form questions={data.questions} />
            <br/>
            <br/>
            <Share
              socialConfig={{
                ...socialConfigss.site.siteMetadata.twiteerhandletitle,
                config: {
                  url: `${siteurl}${socialConfigss.slug}`,
                  title: `${socialConfigss.title}`
                }
              }}
            />
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query SurveyPostQuery($slug: String!) {
    contentfulSurveys(slug: { eq: $slug }) {
      id
      title
      slug
      image {
        fluid(maxWidth: 1500) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      questions {
        id
        question
        questionChoices {
          id
          choice
        }
      }
      createdAt
    }
    contentfulSiteInformation {
      siteUrl
      twiteerHandle
    }
  }
`;
