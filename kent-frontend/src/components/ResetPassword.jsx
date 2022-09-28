import React, { useState } from 'react'
import logo from "../images/logo.png";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/');      
    }
}, [navigate]);
    const [credentials, setCredentials] = useState({ email: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.React_App_Host}/forgetPassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email
          }),
        });
        const json = await response.json();
        
        if (json.success) {
        //   console.log(json)
          toast.success(json.response)
        } else {
          toast.error(json.error);
        }
        // console.log(json)
      };

      
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
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
              <h3 className="mb-4">Reset Password</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    value={credentials.email}
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <button type="submit" className="btn btn-primary shadow-2 mb-4">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
