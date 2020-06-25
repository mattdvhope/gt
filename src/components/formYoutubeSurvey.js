import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby";
import FormChoices from "./formChoices";
import LineIcon from "../images/LINE_APP.png"

const FormYoutubeSurvey = () => {

	const [submitted, setSubmittedState] = useState(false);

	useEffect(() => {
    const posY = window.scrollY + document.getElementById("YoutubeHolder").getBoundingClientRect().top
		if (submitted) {document.documentElement.scrollTop = posY}
  });

	function handleSubmit(e) {
    e.preventDefault();
		setSubmittedState(true)
		document.getElementById("button-for-youtube-survey").remove();
	}

	function handleChange() {
		console.log("in handleChange")
	}

	return (
	  <StaticQuery
	    query={detailsQuery}
	    render={data => {

				console.log(data)
				
				const { questions } = data.contentfulSurveysWithinPage

	      const youTubeSurveyForm = (
					<div className="container-fluid">
						<hr/>
						<form onSubmit={handleSubmit} >
	  					{questions.map((item) => {
	  						return (
	  							<div key={item.id}>
	  							  <h3>
	  							    {item.question}
	  							    <br/>
	  							    <FormChoices
	  							    	choices={item.questionChoices}
	  							    	question={JSON.stringify(item)}
	  							    	handleChange={handleChange}
	  							    />
	  							  </h3>
	  							  <br/>
	  							</div>
	  						);
	  					})}
	  				  <button type="submit" className="btn btn-success">"ส่ง"</button>
							
	  				</form>
	  			</div>
	      );

				if (!submitted) {
		      return youTubeSurveyForm;
		    } else {
		    	return (
		    		<div>
		    			<hr/>
		    			<div>
		    				<a href="https://line.me/R/ti/p/%40000ombos" >
									<img src={LineIcon} width="45px" alt="LINE"/>
		    					<span style={{ fontSize: `26px`, color: `#BF8F63` }} >&nbsp;
		    					เชิญเป็นเพื่อนไลน์ </span>
		    				</a>
		    			</div>
		    			<hr/>
			    		<h2>
			    			{data.contentfulSurveysWithinPage.comment.comment}
			    		</h2>
		    		</div>
		    	)
		    }

	    }}
	  />
	)
}

const handleSubmit = () => console.log("in handleSubmit")

export default FormYoutubeSurvey

const detailsQuery = graphql`
  query YoutubeSurveyQuery {
	  contentfulSurveysWithinPage(title: {eq: "Youtube1"}) {
	    id
	    title
	    subTitle
	    questions {
	      id
	      question
	      questionChoices {
	        id
	        choice
	      }
	    }
	    comment {
	      comment
	    }
	  }
  }
`;

