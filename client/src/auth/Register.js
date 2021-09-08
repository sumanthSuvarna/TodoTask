import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from '../Header';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'
import Cookies from 'universal-cookie';
import axios from 'axios'
import {useHistory} from 'react-router-dom';


export default function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const history = useHistory();
    const {REACT_APP_USERS_URL,REACT_APP_COOKIE} = process.env;
    

    function validateForm() {
        return username.length > 0 && password.length > 0 && email.length>0 && role.length>0;
    }

    function checkCookie(){
        var cookieEnabled = navigator.cookieEnabled;
        if (!cookieEnabled){ 
            document.cookie = "testcookie";
            cookieEnabled = document.cookie.indexOf("testcookie")!==-1;
        }    
        return cookieEnabled;
      }

      async function  handleSubmit(event){
        event.preventDefault(); 
        const cookies = new Cookies();
        let token = ''
        if(checkCookie()){
            token = cookies.get(REACT_APP_COOKIE)
        }else{
            token = localStorage.getItem(REACT_APP_COOKIE);
        }
        let item =  {username,email,password,role}
        const headers = {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}` 
        }
        try{
            const response = await axios.post(REACT_APP_USERS_URL, item,{headers: headers })
            if(response.status === 201){
                history.push('/home')
            }
        }catch(err){
            alert(err)         
        }
        
    }

    return(
        <div>
            <Header data={"Create User"}></Header>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="username">
                        <Form.Label column sm="2">Username </Form.Label>
                        <Col sm="10">
                            <Form.Control autoFocus type="String" 
                                          value={username}  
                                          placeholder="Username" 
                                          onChange={(e) => setUsername(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="email">
                        <Form.Label column sm="2">  Email </Form.Label>
                        <Col sm="10">
                        <Form.Control type="String"
                                      value={email}
                                      placeholder="@email"
                                      onChange={(e) => setEmail(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="password">
                        <Form.Label column sm="2">  Password </Form.Label>
                        <Col sm="10">
                        <Form.Control type="password" 
                                      value={password} 
                                      placeholder="Password" 
                                      onChange={(e) => setPassword(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="role">
                        <Form.Label column sm="2">  Role </Form.Label>
                        <Col sm="10">
                        <Form.Check inline label="admin" 
                                            value="admin" 
                                            name="role" 
                                            type="radio" 
                                            id='admin' 
                                            onChange={(e) => setRole(e.target.value)}/>
                        <Form.Check inline label="user"
                                           value="user"
                                           name="role"
                                           type="radio"
                                           id='user'
                                           onChange={(e) => setRole(e.target.value)}/>
                        </Col>
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()} > 
          Create User
        </Button>
                </Form> 
            </Container>
        </div>
    )

};

