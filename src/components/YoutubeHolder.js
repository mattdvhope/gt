import React from "react"

const YoutubeHolder = ({ youtubeUrl }) => (

	<div>
		<iframe // Youtube video 
      style={{
			  marginLeft: `auto`,
			  marginRight: `auto`,
        height: `49vw`,
        width: `84vw`,
      }}
      src={youtubeUrl}
      frameBorder="0"
      allowFullScreen
    />

    <div>
    	<p style={{ fontSize: `110%` }}>
				This is a short clip from this video, “The Gospel of John.” What you will see in this video happened about 2000 years ago in the country of Israel.  Jesus Christ, a Jew, meets a Samaritan woman who had lived a very troubled life.  At that time the Jews did not like to have any relationships with Samaritans.  But Jesus—the Son God and the Savior of the world—decided to relate to her in a very kind-hearted way.  Some of the words in this video (like, for example, “Messiah” / “พระเมสสิยาห์”) might be confusing, but hopefully you will be able to see how Jesus related in a kind-hearted way toward this woman.
    	</p>
    </div>
  </div>

)

export default YoutubeHolder
