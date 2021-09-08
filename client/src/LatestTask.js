import React, { useState ,useEffect,useCallback} from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'

const LatestTasks= ({user,reload})=> {
    const [tasks,setTasks] = useState([]);

    const fetchData= useCallback(() => {  
        axios.get("http://localhost:4000/api/users/tasks/latest/"+user).then((resp)=>{
            let arr= []               
            resp.data.map((task,i)=>{
                return arr.push(
                    <ListGroup.Item key={i} style={{borderBottom:0}}>{(task.isCompleted) ?(<s>{task.task_name}</s>):task.task_name} </ListGroup.Item>
                )
            })
            setTasks(arr)
        })            
    },[user])

    useEffect(()=>{
        fetchData();
    },[user,reload,fetchData])

    return(
        <Card style={{height:200}}>
            <Card.Body>
              <Card.Title>Latest Created Task</Card.Title>
            <ListGroup variant="flush">
                {tasks}
            </ListGroup>
            </Card.Body>
        </Card>
    )
}
export default LatestTasks;