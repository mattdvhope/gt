import React, { Component } from "react"
import { graphql } from "gatsby";
import FormChoices from "./formChoices";

export default class surveyPost extends Component {
	constructor(props) {
    super(props);
    this.state = {
      window: undefined,
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

	handleSubmit(e) {
    e.preventDefault();
    console.log("in handleSubmit")
  }

  render() {

console.log("questions: ", this.props.questions);
		const questions =  this.props.questions; // array

		return (

			<div class="container-fluid">
				<form onSubmit={this.handleSubmit} >
					{questions.map((item) => {
						return (
							<div >
							  <h3>
							    {item.question}
							    <br/>
							    <FormChoices choices={item.questionChoices} />
							  </h3>
							  <br/>
							</div>
						);
					})}
					<br/>
				  <button type="submit" className="btn btn-success">Submit</button>
				</form>
			</div>

		)

	}

}

export const FormQuery = graphql`
  query FormQuery {
    contentfulPhotos {
      photos {
        file {
          url
        }
        fluid(maxWidth: 600) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }
  }
`;