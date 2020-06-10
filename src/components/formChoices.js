import React from "react"

export default ({ choices }) => {

	return choices.map((item) => {
		return (
			<div className="custom-control custom-radio">
			  <input type="radio" id={"customRadio" + item.id} name="customRadio" className="custom-control-input"/>
			  <label className="custom-control-label" htmlFor={"customRadio" + item.id}>{item.choice}</label>
			</div>
		);
	})

}
