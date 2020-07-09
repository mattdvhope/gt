import React from "react"
import { Link, navigate } from "gatsby"
import { logout } from "../utils/auth"

const Logout = () => (

		<a
      style={{ textDecoration: `none` }}
	    href="/"
	    onClick={event => {
	      event.preventDefault()
	      logout(() => navigate(`/`))
        localStorage.setItem("loginLink", null)
	    }}
	  >
	    ออกจากระบบ
	  </a>

)

export default Logout
