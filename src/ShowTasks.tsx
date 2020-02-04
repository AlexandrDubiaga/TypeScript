import React from 'react';
import {connect} from "react-redux";
import OneTask from "./OneTask";
import {ITasks} from "./types";

interface IProps{
    changeTaskInTodolist:(idTodo:string, taskId:string, task:ITasks)=>void,
    deleteTask:(idTodo:string, taskId:string)=>void,
    updateTaskInTodolist:(idTodo:string, idTask:string, newTitleTask:string)=>void,
    idTodo:string,
    tasks:Array<ITasks>
}

class ShowTasks extends React.Component<IProps> {
    render() {
        return (
            <div>
                {this.props.tasks.map(t => {
                    return <OneTask  deleteTask={this.props.deleteTask} changeTaskInTodolist={this.props.changeTaskInTodolist}
                                    updateTaskInTodolist={this.props.updateTaskInTodolist} idTodo={this.props.idTodo}
                                    task={t} idTask={t.id}/>
                })}
            </div>
        )
    }
}


export default ShowTasks;