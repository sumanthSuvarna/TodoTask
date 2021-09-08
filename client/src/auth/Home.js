import React, { useState ,useEffect} from "react";
import Cookies from 'universal-cookie';
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Users from '../GetAllUsers'
import Tasks from '../Tasks'
import Button from "react-bootstrap/Button";
import {useHistory} from 'react-router-dom';
import Header from '../Header';

export default function Home() {
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isAdmin, setAdmin] = useState(false);
    const [user,setUser] = useState();
    const history = useHistory();
    const {REACT_APP_AUTH_URL,REACT_APP_COOKIE} = process.env;
    

    useEffect(() => {
        const cookies = new Cookies();
        let token = ''
        if(checkCookie()){
            token = cookies.get(REACT_APP_COOKIE)
        }else{
            token = localStorage.getItem(REACT_APP_COOKIE);
        }
        
      async function fetchData() {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const resp = await axios.get(REACT_APP_AUTH_URL,config)     
        
        setData(resp.data.username)  
        setUser(resp.data.id);
        setLoading(false);
        if(resp.data.role==="admin"){
           setAdmin(true)
        }
      }
        fetchData();
      },[REACT_APP_AUTH_URL,REACT_APP_COOKIE])

      function checkCookie(){
        var cookieEnabled = navigator.cookieEnabled;
        if (!cookieEnabled){ 
            document.cookie = "testcookie";
            cookieEnabled = document.cookie.indexOf("testcookie")!==-1;
        }    
        return cookieEnabled ;
      }

      function registerUser(){
          history.push('/register')
      }
   
      if (isLoading) {
        return <Header data={"Welcome "}></Header>;
      }
    
      
    return  (
        <div>
            <Header data={"Welcome "+data}></Header>
            <Container>
                {(isAdmin)?(<div><Users/>
                <Button block size="lg" type="button" onClick={registerUser}>
                 Create User</Button></div>):<Tasks user={user}></Tasks>  }
            </Container>
        </div>
      )
}

