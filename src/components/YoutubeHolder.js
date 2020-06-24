import React from "react"
import { StaticQuery, graphql } from "gatsby";
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"

const YoutubeHolder = () => (
  <StaticQuery
    query={detailsQuery}
    render={data => {
      return (
				<div>
					<iframe // Youtube video 
			      style={{
						  marginLeft: `auto`,
						  marginRight: `auto`,
			        height: `49vw`,
			        width: `81vw`,
			      }}
			      src={youtubeEmbeddable(data.contentfulSurveys.youtubeUrl)}
			      frameBorder="0"
			      allowFullScreen
			    />
			    <p style={{ fontSize: `110%` }}>Click here to share your thoughts about this video.</p>

					<hr/>
			    <div>
			    	<p style={{ fontSize: `110%` }}>
							{data.contentfulSurveys.belowVideo.belowVideo}
			    	</p>
			    </div>
			    <div>
			    	<a href="https://www.youtube.com/watch?v=VrTko_k-X2M">Link to the video, "The Gospel of John"</a>
			    </div>
			  </div>
      );
    }}
  />
)

export default YoutubeHolder

const detailsQuery = graphql`
  query YoutubeHolderQuery {
    contentfulSurveys(slug: {}, belowVideo: {belowVideo: {}}) {
      youtubeUrl
      belowVideo {
        belowVideo
      }
    }
  }
`;

