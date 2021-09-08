import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios'

import "../Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const cookies = new Cookies();
  const {REACT_APP_LOGIN_URL,REACT_APP_COOKIE} = process.env;
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function checkCookie(){
    var cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled){ 
        document.cookie = "testcookie";
        cookieEnabled = document.cookie.indexOf("testcookie")!==-1;
    }    
    return cookieEnabled;
  }


  function handleSubmit(event) {    
    event.preventDefault();
    let item =  {email,password}
    axios.post(REACT_APP_LOGIN_URL, item)
      .then(function (response) {   
        if(response.status===200){
            if(checkCookie()){
                cookies.set(REACT_APP_COOKIE, response.data.accessToken, { path: '/' ,secure: true});   
            }else{
                localStorage.setItem(REACT_APP_COOKIE, response.data.accessToken)
            }      
            history.push('/home')
        }
      }).catch((err)=>{
          alert("Incorrect Email password")
      })
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="string"
            value={email}
            placeholder="@email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()} > 
          Login
        </Button>
      </Form>
    </div>
  );
}