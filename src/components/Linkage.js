import React from "react"
import "../css/font-awesome.css";

const Linkage = ({description, url}) => (

	<div style={{ marginBottom: `6px` }}>
    <div>
      {description}
    </div>
    <a href={url} target='_blank' rel='noopener noreferrer'>
      {url}
    </a>
  </div>

)

export default Linkage
