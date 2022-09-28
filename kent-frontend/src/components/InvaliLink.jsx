import React from 'react'
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
const InvaliLink = () => {
  return (
    <div>
    <div className="auth-wrapper">
      <div className="auth-content">
        <div className="auth-bg">
          <span className="r"></span>
          <span className="r s"></span>
          <span className="r s"></span>
          <span className="r"></span>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="mb-4">
              <Link to="/"><img src={logo} alt="kent water" width={200} /></Link>
            </div>
            <h3 className="mb-2">Link Expired</h3>
            <p>Please apply for new link</p>
            <Link to="/login" className='btn btn-primary text-light'>Login Here</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default InvaliLink
