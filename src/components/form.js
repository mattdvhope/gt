import React, { Component } from "react"
import { navigate } from "gatsby";
import { graphql } from "gatsby";
import FormChoices from "./formChoices";
import { preventTooManyChoices } from "../utils/handleQuestionChoices"
import { updatedQuestions, final_selections_of_choices } from "../utils/handleQuestionChoices"
// import { persistQuestions } from "../utils/railsVisits"
import { persistUser } from "../utils/railsVisits"
import axios from 'axios'
import "../css/spinner.css";

export default class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      question: undefined,
      one_selected: undefined,
      selected_in_question: [],
      waiting: false,
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

  spinner() {
    return (
      <span>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <div className="loader" />
        <br/>
      </span>
    )
  }


	handleSubmit(e) {
    e.preventDefault();
  //   const selected = final_selections_of_choices(this.state.questions)
		// persistQuestions(this.state.questions, selected) // in Rails API
    const _this = this;
    this.setState({ waiting: true })

    const { id, name, picture } = this.props.profile;
    
    axios.post(`https://nameless-coast-54274.herokuapp.com/users`, {
      name: name, picture: picture.data.url, fb_id: id
    })
    .then(response => {
      console.log(response)
      // return response.data.message;
      _this.setState({ waiting: false })
  		alert("ขอบคุณที่กรอกแบบฟอร์มสำรวจนี้ค่ะ")
      navigate(`/#About`)
    })


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
          {this.state.waiting ? this.spinner() : null}
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