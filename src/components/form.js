import React, { Component } from "react"
import { graphql } from "gatsby";


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

		return (

			<form onSubmit={this.handleSubmit} >

				<div class="form-check">
				  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"/>
				  <label class="form-check-label" for="exampleRadios1">
				    First default radio
				  </label>
				</div>
				<div class="form-check">
				  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
				  <label class="form-check-label" for="exampleRadios2">
				    Second default radio
				  </label>
				</div>
				<div class="form-check">
				  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3"/>
				  <label class="form-check-label" for="exampleRadios3">
				    Third default radio
				  </label>
				</div>
				<div class="form-check disabled">
				  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option4"/>
				  <label class="form-check-label" for="exampleRadios4">
				    Fourth default radio
				  </label>
				</div>

			  <button type="submit" className="btn btn-success">Submit</button>
			</form>

		)

	}

}