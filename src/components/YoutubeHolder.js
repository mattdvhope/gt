import React from "react"

const YoutubeHolder = ({ youtubeUrl, belowVideo }) => (

	<div>
		<iframe // Youtube video 
      style={{
			  marginLeft: `auto`,
			  marginRight: `auto`,
        height: `49vw`,
        width: `81vw`,
      }}
      src={youtubeUrl}
      frameBorder="0"
      allowFullScreen
    />
		<hr/>
    <div>
    	<p style={{ fontSize: `110%` }}>
				{belowVideo}
    	</p>
    </div>
  </div>

)

export default YoutubeHolder
