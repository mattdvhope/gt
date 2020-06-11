import React from "react"

export default ({ choices, quest_id }) => {

	return choices.map((item) => {
		return (
			<>
				<br/>
				<div className="custom-control custom-radio">
				  <input type="radio" id={"customRadio" + item.id} name={"customRadio" + quest_id} className="custom-control-input"/>
				  <label className="custom-control-label" htmlFor={"customRadio" + item.id}>{item.choice}</label>
				</div>
			</>
		);
	})

}
