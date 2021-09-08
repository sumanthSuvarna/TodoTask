import React from "react";
import Card from 'react-bootstrap/Card'

export default function NumberCard(props) {
    const totalTasks =  props.task.length
    let completedTask = 0
    props.task.map(t=>{
        if(t.isCompleted){
            completedTask++;
        }
        return completedTask;
    })
    return(
        <Card style={{height:200}}>
            <Card.Body>
                <Card.Title>Task Completed</Card.Title>
                <div>
                    <span style={{fontSize:"5rem",color:"blue"}}>{completedTask}</span>
                    <span style={{fontSize:"2rem",color:"darkGrey"}}>/{totalTasks}</span>
                </div>
            </Card.Body>
        </Card>
    )
}