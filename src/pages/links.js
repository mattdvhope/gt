import React, { Component } from 'react'
import Linkage from "../components/Linkage";
import { graphql } from "gatsby";

const Links = ({ data }) => {

  const linksToRender = data.allLink.nodes

  return (
    <div>
      <h3>Neat Links</h3>
      <div>
        {linksToRender.map(link => <Linkage key={link.id} description={link.description} url={link.url} />)}
      </div>
    </div>
  )

}

export default Links

export const linksQuery = graphql`
	query linksQuery {
	  allLink {
	    nodes {
	      id
	      description
	      url
	    }
	  }
	}
`;


