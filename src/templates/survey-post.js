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
import { handleLogin, isLoggedIn, getUser } from "../utils/auth"
import { addVisit } from "../utils/railsVisits"

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

    if (!isLoggedIn() && code) {
      // 1. getting id_token
      // const slug = window.localStorage.getItem("Node Slug");
      const params = `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.GATSBY_API_URL}&client_id=1654318519&client_secret=26e02bf88250345262e5d0cf7aab03f8`;
      const response = await fetch(`https://api.line.me/oauth2/v2.1/token`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: params
      })
      // 'json' contains the various tokens provided by 'api.line.me/oauth2...'
      const json = await response.json();

      // 2. getting user info with id_token
      const personal_data = await fetch(`https://api.line.me/oauth2/v2.1/verify`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `id_token=${json.id_token}&client_id=1654318519`
      });
      const person = await personal_data.json()

      // 3. validate ID token
      let base64Url = json.id_token.split('.')[1]; // json.id_token you get
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));

      // 4. If person validated, then login & go to blog page
      if (JSON.stringify(person) === JSON.stringify(decodedData)) {
        handleLogin(person)
        addVisit(person.name, person.picture) // Save new user in Rails
        this.setState({ person: person, id_token: json.id_token });
      }
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

    // if (isLoggedIn()) {
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
