import React, { useState,useEffect } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { Trash  } from 'react-bootstrap-icons';

export default function Users(){
    const [users,setUsers]= useState([]);
    const {REACT_APP_USERS_URL,REACT_APP_COOKIE} = process.env;

    useEffect(() => {
        const cookies = new Cookies();
        let token = ''
        if(checkCookie()){
            token = cookies.get(REACT_APP_COOKIE)
        }else{
            token = localStorage.getItem(REACT_APP_COOKIE);
        }

        async function deleteUser(id,config){
            await axios.delete(REACT_APP_USERS_URL+"/"+id,config) 
            const resp1 = await axios.get(REACT_APP_USERS_URL,config)       
            let arr= [] 
            resp1.data.map((user,i)=>{
                return arr.push((<tr key={i}>
                    <td>{i+1}</td>
                     <td>{user.username}</td>
                     <td>{user.email}</td>
                     <td>{user.role}</td>
                     <td><Trash onClick={deleteUser.bind(this,user.id,config)}/></td>
                </tr>))
            })
            setUsers(arr);              
        }

        async function fetchData() {
            const config = {headers: { Authorization: `Bearer ${token}` }};
           const resp = await axios.get(REACT_APP_USERS_URL,config)       
            let arr= [] 
            resp.data.map((user,i)=>{
                return arr.push((<tr key={i}>
                    <td>{i+1}</td>
                     <td>{user.username}</td>
                     <td>{user.email}</td>
                     <td>{user.role}</td>
                     <td><Trash onClick={deleteUser.bind(this,user.id,config)}/></td>
                </tr>))
            })
            setUsers(arr);
        }

        fetchData();
      }, [REACT_APP_USERS_URL,REACT_APP_COOKIE])


    function checkCookie(){
        var cookieEnabled = navigator.cookieEnabled;
        if (!cookieEnabled){ 
            document.cookie = "testcookie";
            cookieEnabled = document.cookie.indexOf("testcookie")!==-1;
        }    
        return cookieEnabled ;
    }


     
    return(
        <div>            
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </Table>            
        </div>
    )
        
}