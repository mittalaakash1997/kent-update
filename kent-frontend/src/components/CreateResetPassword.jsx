import React, { useState } from 'react';
import logo from "../images/logo.png";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateResetPassword = () => {

    const navigate = useNavigate();
    const { id, token } = useParams();

    const validLink = async ()=>{
        const response = await fetch(`${process.env.React_App_Host}/forgetPassword/valid/${id}/${token}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }
          });
          const json = await response.json();
        //   console.log(json)
        if(json.success){
            navigate('/invalidlink')
        }
    }

    useEffect(() => {
      if(localStorage.getItem('token')){
        navigate('/');      
      }
      validLink();
  }, [navigate]);
  const [credentials, setCredentials] = useState({ nPassword: "", cPassowrd: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.nPassword === credentials.cPassowrd){
        // toast.success("password match")
    const response = await fetch(`${process.env.React_App_Host}/forgetPassword/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: credentials.nPassword
      }),
    });
    const json = await response.json();
    
    if (json.success) {
    //   console.log(json)
      toast.success(json.response)
      navigate('/login'); 
    } else {
      toast.error(json.error);
    }
    // console.log(json)
}
else{
    toast.error("Password not match");
}
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
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    value={credentials.nPassword}
                    name="nPassword"
                    placeholder="Enter New Password"
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    value={credentials.cPassowrd}
                    name="cPassowrd"
                    placeholder="Confirm Password"
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

export default CreateResetPassword
