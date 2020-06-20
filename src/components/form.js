import React, { Component } from "react"
import { navigate } from "gatsby";
import { graphql } from "gatsby";
import FormChoices from "./formChoices";
import { preventTooManyChoices } from "../utils/handleQuestionChoices"
import { updatedQuestions, final_selections_of_choices } from "../utils/handleQuestionChoices"
// import { persistQuestions } from "../utils/railsVisits"
import { persistUser } from "../utils/railsVisits"

export default class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      question: undefined,
      one_selected: undefined,
      selected_in_question: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	handleChange = e => {
    let question = JSON.parse(e.target.name)
    const one_selected = JSON.parse(e.target.value)
		const selected_in_question = this.state.selected_in_question
		question = preventTooManyChoices(selected_in_question, one_selected, question)
    const updated = updatedQuestions(this.state.questions, question)

    this.setState({
      questions: updated,
    	question: question,
    	one_selected: one_selected,
    	selected_in_question: selected_in_question,
    });
  }

	handleSubmit(e) {
    e.preventDefault();
  //   const selected = final_selections_of_choices(this.state.questions)
		// persistQuestions(this.state.questions, selected) // in Rails API

    persistUser(this.props.profile)
		alert("ขอบคุณที่กรอกแบบฟอร์มสำรวจนี้ค่ะ")
    navigate(`/#About`)

  }

  render() {
		const questions =  this.state.questions; // array
		return (
			<div className="container-fluid">
				<form onSubmit={this.handleSubmit} >
					{questions.map((item) => {
						return (
							<div key={item.id}>
							  <h3>
							    {item.question}
							    <br/>
							    <FormChoices
							    	choices={item.questionChoices}
							    	question={JSON.stringify(item)}
							    	handleChange={this.handleChange}
							    />
							  </h3>
							  <br/>
							</div>
						);
					})}
				  <button type="submit" className="btn btn-success">"ส่ง"</button>
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