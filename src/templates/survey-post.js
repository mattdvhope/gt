import React, { Component } from "react";
import { graphql, Link } from "gatsby";
import SurveyPostPage from "./SurveyPostPage"
import { isLoggedIn, getUser } from "../utils/auth"
import { getAccessToken, inspectAccessToken, getUserProfile } from "../utils/FBLoginValidations"
// import { getIdToken, getPerson, validateIdToken, checkValidation } from "../utils/lineLoginValidations"

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

console.log("code", code)

    if (!isLoggedIn() && code) { // conduct FB Login validations
      const token = await getAccessToken(code)
      const objectFromDebug = await inspectAccessToken(token)
      const user_profile = await getUserProfile(objectFromDebug.data.user_id)
      console.log(user_profile);
    } else {
      this.setState({ person: getUser() })
    }

    // if (!isLoggedIn() && code) { // conduct LINE Login validations
    //   const json = await getIdToken(code)
    //   const person = await getPerson(json)
    //   const decodedData = validateIdToken(json)
    //   checkValidation(surveyPost, json, person, decodedData)
    // } else {
    //   this.setState({ person: getUser() })
    // }

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

    // if (isLoggedIn()) {
      return <SurveyPostPage data={data} siteurl={siteurl} socialConfigss={socialConfigss}/>
    // } else {
    //   return (<h5><br/>&nbsp;&nbsp;<Link to="/">คุณยังไม่ได้เข้าสู่ระบบค่ะ คลิกที่นี่เพื่อกลับไปที่หน้าแรกค่ะ</Link></h5>)
    // }

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
      createdAt
    }
    contentfulSiteInformation {
      siteUrl
      twiteerHandle
    }
  }
`;