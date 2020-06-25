import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby";
import { youtubeEmbeddable } from "../utils/youtubeEmbeddable"
import FormYoutubeSurvey from "./formYoutubeSurvey"

const YoutubeHolder = () => {
	const oldWords = "Click here to share your thoughts about this video."
	const newWords = "Click here to hide questions."
	const [buttonPressed, setButtonState] = useState(false);

	useEffect(() => {
    const posY = window.scrollY + document.getElementById("YoutubeHolder").getBoundingClientRect().top
    const posY2 = window.scrollY + document.getElementById("FrameHolder").getBoundingClientRect().top
    document.documentElement.scrollTop = posY - 65;
		if (buttonPressed) {
	    document.documentElement.scrollTop = posY2 - 65;
		}
  });

	let buttonElement;
	if (buttonPressed === false) {
		buttonElement = ButtonTemplate(true, oldWords)
	} else {
		buttonElement = ButtonTemplate(false, newWords)
	}

	function ButtonTemplate(needToPressForSurvey, wordsType) {
		return (
		<button
			type="button"
			className="btn btn-outline-success"
			style={{ color: `brown`, borderColor: `#BF8F63`, backgroundColor: `#fff` }}
			onClick={() => setButtonState(needToPressForSurvey)}
		>
			{wordsType}
		</button>
	)}

	const formYT = buttonPressed ? <FormYoutubeSurvey/> : null;

	return (
	  <StaticQuery
	    query={detailsQuery}
	    render={data => {
				

	      return (
	        <div id="YoutubeHolder" className="container-fluid">
	          <h2 style={{ color: `#BF8F63` }}><i>{data.contentfulSurveys.furtherCta}</i></h2>
	          <p style={{ fontSize: `125%` }} >{data.contentfulSurveys.belowCta}</p>
	          <hr/>
						<div>
							<iframe // Youtube video 
								id="FrameHolder"
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
							{buttonElement}
							{formYT}
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
	        </div>
	      );
	    }}
	  />
	)
}

export default YoutubeHolder

const detailsQuery = graphql`
  query YoutubeHolderQuery {
    contentfulSurveys(slug: {}, belowVideo: {belowVideo: {}}) {
			furtherCta
      belowCta
      youtubeUrl
      belowVideo {
        belowVideo
      }
    }
  }
`;

