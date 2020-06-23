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
      one_selected: undefined,
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

  youtubeEmbeddable(youtubeUrl) {
    const video_id = this.youtubeId(youtubeUrl);
    return `https://www.youtube.com/embed/${video_id}?rel=0`
  }

  youtubeId(youtubeUrl) {
    let video_id = youtubeUrl.split('v=')[1];
    const ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id    
  }

	handleSubmit(e) {
    e.preventDefault();
    this.setState({ survey_done: true })

    if (this.state.document) {
      document.documentElement.scrollTop = 600
    }

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
    const youtubeUrl = this.youtubeEmbeddable(this.props.youtubeUrl)
    

    console.log(this.props)

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
        <div className="container-fluid">
          <h2 style={{ color: `#BF8F63` }}><i>{this.props.furtherCta}</i></h2>
          <p style={{ fontSize: `125%` }} >{this.props.belowCta}</p>
          <hr/>
          <YoutubeHolder youtubeUrl={youtubeUrl} belowVideo={this.props.belowVideo}/>
        </div>
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