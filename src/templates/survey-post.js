import React, { Component } from "react";
import { graphql, Link } from "gatsby";
import SurveyPostPage from "./SurveyPostPage"
import { isLoggedIn, getUser, handleLogin } from "../utils/auth"
import { getAccessToken, inspectAccessToken, getUserProfile } from "../utils/FBLoginValidations"
import { getIdToken, getPerson, validateIdToken, checkValidation } from "../utils/lineLoginValidations"
import { fbLoginURL } from "../utils/FBplatform"
import { lineLoginURL } from "../utils/linePlatform"
import { persistFbUser, persistLineUser } from "../utils/railsVisits"

export default class surveyPost extends Component {
  constructor(props) {
    super();
    this.state = { 
      id_token: undefined,
      person: undefined,
      profile: undefined,
    };
  }

  async componentDidMount() {
    const url_with_code = window.location.search.match(/(code=)(.*)(?=&state)/)
    const code = url_with_code ? url_with_code[2] : null
    const surveyPost = this;

    if (!isLoggedIn() && code) {
      if (localStorage.getItem("loginLink") === "LineLink") {  // LINE Login validations
        const json = await getIdToken(code)
        const person = await getPerson(json)
        const decodedData = validateIdToken(json)
        checkValidation(surveyPost, json, person, decodedData)
        persistLineUser(person) // in Rails
      } else { // FB Login validations
        const token = await getAccessToken(code)
        const stringFromDebug = await inspectAccessToken(token)
        const objectFromDebug = JSON.parse(stringFromDebug)
  alert(objectFromDebug)
        const profile_of_person = await getUserProfile(objectFromDebug.data.user_id, token)
        handleLogin(profile_of_person)
        persistFbUser(profile_of_person) // in Rails
        this. setState({ profile: profile_of_person })
      }
    } else if (!isLoggedIn()) {
      window.location.replace(lineLoginURL()) // LATER!!! ...make FB login capability here too....
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

    if (isLoggedIn()) {
      return (
        <SurveyPostPage
          data={data}
          siteurl={siteurl}
          socialConfigss={socialConfigss}
          profile={this.state.profile}
        />
      )
    } else {
      return <span/>
    }

  } // render()
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
      thankYouNote
      furtherCta
      belowCta
      createdAt
    }
    contentfulSiteInformation {
      siteUrl
      twiteerHandle
    }
  }
`;