import React, { Component } from "react";
import { graphql, navigate } from "gatsby";
import Img from "gatsby-image";
import moment from "moment";
import { DiscussionEmbed } from "disqus-react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";
import Form from "../components/form";
import { rubyQuestions } from "../utils/rubyStyleObjs"
import { isLoggedIn, getUser } from "../utils/auth"
// import { addVisit } from "../utils/railsVisits"
import { getIdToken, getPerson, validateIdToken, checkValidation } from "../utils/lineLoginValidations"

export default class surveyPost extends Component {
  constructor(props) {
    super();
    this.state = { 
      id_token: undefined,
      person: undefined,
    };
  }

  async componentDidMount() {
    const url_with_code = window.location.search.match(/(code=)(.*)(?=&state)/)
    const code = url_with_code ? url_with_code[2] : null
    const surveyPost = this;

console.log(isLoggedIn())

    if (!isLoggedIn() && code) {
      // conduct LINE Login validations
      const json = await getIdToken(code)
      const person = await getPerson(json)
      const decodedData = validateIdToken(json)
      checkValidation(surveyPost, json, person, decodedData)
    } else {
      this.setState({ person: getUser() })
    }
  }

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

    const survey_post_page = (
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
            <Form questions={rubyQuestions(data.questions)} />
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
        {/* <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />  */}    
          </div>
        </div>
      </Layout>
    );

    // FIX THIS: Don't allow person to type in URL and arrive at survey page if not logged in.
    // if (isLoggedIn()) {

      console.log(isLoggedIn())

      return survey_post_page;
    // } else {
    //   navigate(`/`)
    //   alert("คุณยังไม่ได้เข้าสู่ระบบ!");
    //   return null 
    // }
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
