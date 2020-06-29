import React, { Component } from "react"
import { navigate } from "gatsby";
import { graphql } from "gatsby";
import axios from 'axios'
import FormChoices from "./formChoices";
import { preventTooManyChoices } from "../utils/handleQuestionChoices"
import { updatedQuestions, final_selections_of_choices } from "../utils/handleQuestionChoices"
// import { persistQuestions } from "../utils/railsVisits"
import { persistUser } from "../utils/railsVisits"
import YoutubeHolder from "./YoutubeHolder"

export default class Form extends Component {
	constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      question: undefined,
      choice_selected: undefined,
      selected_in_question: [],
      survey_done: false,
      document: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    
    // const testDiv = document.getElementById("___gatsby");

    // console.log("testDiv:", testDiv)
    // console.log("testDiv.offsetTop;", testDiv.offsetTop)

    this.setState({ document: document })
  }

	handleChange = e => {
    let question = JSON.parse(e.target.name)
    const choice_selected = JSON.parse(e.target.value)
		const selected_in_question = this.state.selected_in_question
		question = preventTooManyChoices(selected_in_question, choice_selected, question)
    const updated = updatedQuestions(this.state.questions, question)

console.log("question: ", question)
console.log("choice_selected: ", choice_selected)

    this.setState({
      questions: updated,
    	question: question,
    	choice_selected: choice_selected,
    	selected_in_question: selected_in_question,
    });
  }

	handleSubmit(e) {
    e.preventDefault();
    this.setState({ survey_done: true })

    // const { id, name, picture } = this.props.profile;
    // axios.post(`https://nameless-coast-54274.herokuapp.com/users`, {
    //   name: name, picture: picture.data.url, fb_id: id
    // })
    // .then(response => {
    //   console.log(response)
    //   // return response.data.message;
    // })
  }

  render() {
		const questions =  this.state.questions; // array
    const survey_done = this.state.survey_done;

    if (!survey_done) {
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
            <p style={{ fontSize: `125%` }} >{this.props.thankYouNote}</p>
            <br/>
  				  <button type="submit" className="btn btn-success">"ส่ง"</button>
  				</form>
  			</div>
  		)
    } else {
      return (
        <YoutubeHolder/>
      )
    }
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