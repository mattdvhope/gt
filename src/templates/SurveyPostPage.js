import React from "react"
import Img from "gatsby-image";
import { Comments } from 'react-facebook';
import moment from "moment";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";
import Form from "../components/form";
import { rubyQuestions } from "../utils/rubyStyleObjs"

const SurveyPostPage = ({ data, siteurl, socialConfigss, fb_name, fb_picture }) => (
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
          <Comments href="https://www.facebook.com/relationshipsthailand" />
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
      </div>
    </div>
  </Layout>
)

export default SurveyPostPage
