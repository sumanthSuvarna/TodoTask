import React, { useState,useEffect ,useCallback} from "react";
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import {Table, FormControl,InputGroup,Row,Button,Col,Modal,Form } from 'react-bootstrap'
import { Trash ,PenFill } from 'react-bootstrap-icons';

import NumberCard from './NumberCard'
import LatestTask from './LatestTask'
import ChartCard from'./ChartCard'

const Tasks=({user})=>{
    const [tasks,setTasks] = useState([]);
    const [taskData,setTaskData] = useState([]);
    const [newTask,setNewTask] = useState("");    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ didMount, setDidMount ] = useState(false)
    
    const fetchData=  useCallback(() => {          
        axios.get("http://localhost:4000/api/users/tasks/"+user).then((resp)=>{
            let arr= []   
            setTaskData(resp.data)
            resp.data.map((task,i)=>{
                return arr.push((<tr key={i}>
                    <td><input type="checkbox" onChange={() => taskCompleted(task.id)} checked={task.isCompleted}/></td>                    
                    <td>{(task.isCompleted) ?(<s>{task.task_name}</s>):task.task_name}</td>
                    <td><PenFill onClick={deleteTasks.bind(this,task.id)}/></td>
                    <td><Trash onClick={deleteTasks.bind(this,task.id)}/></td>
                </tr>))
            })
            setTasks(arr)
        });
    }, [user]) 

    async function taskCompleted (task_id){
        await axios.put("http://localhost:4000/api/users/tasks/"+task_id);
        setDidMount(true)
    }
    
    useEffect(()=>{
        if(didMount){
            fetchData();
            setDidMount(false)
            setNewTask('')
            setShow(false)
        }else{
            fetchData();
        }       
    }, [didMount,fetchData])

    async function deleteTasks(task_id){
        await axios.delete("http://localhost:4000/api/users/tasks/"+task_id) 
        setDidMount(true)        
      }

      async function  handleSubmit(){
        let item =  {
            "task_name": newTask,
             "user_id":user
        }
         await axios.post("http://localhost:4000/api/users/tasks",item)       
        setDidMount(true)
        
      }

    return(
        <div>
            <Container >
                <Row style={{marginTop:"2rem"}}>
                    <Col><NumberCard task={taskData}></NumberCard></Col>
                    <Col><LatestTask user={user}  reload={didMount}></LatestTask></Col>
                    <Col><ChartCard></ChartCard></Col>
                </Row>
                <Row style={{marginTop:"2rem"}}>

                    <InputGroup className="mb-3">
                        <h3 style={{paddingRight:"40%"}}>Tasks</h3>
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                        <Button style={{marginLeft:"2%"}} onClick={handleShow} block size="sm" type="button">Create User</Button>
                    </InputGroup>
                </Row>
                <Row>                    
                    <Table striped bordered hover>
                        <tbody>{tasks}</tbody>
                    </Table> 
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="task">
                        <Form.Label column sm="2">Task </Form.Label>
                        <Col sm="10">
                            <Form.Control autoFocus type="String" value={newTask}  placeholder="Enter Task" onChange={(e) => setNewTask(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </Form> 
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}> Close</Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Save Task</Button>
                </Modal.Footer>
            </Modal>
               
        </div>   
    );
}

export default Tasks;