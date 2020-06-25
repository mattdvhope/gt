import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby";
import FormChoices from "./formChoices";

const FormYoutubeSurvey = () => {

	const [submitted, setSubmittedState] = useState(false);

	useEffect(() => {
    document.documentElement.scrollTop = 900;
  });

	function handleSubmit(e) {
    e.preventDefault();
		setSubmittedState(true)
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
		    	return (<h2><hr/>{data.contentfulSurveysWithinPage.comment.comment}</h2>)
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

