import React from 'react';
import './App.css';
import {ITodolist} from "./types";
import Task from "./Task";

interface IProps {
    todolist: ITodolist
}

class Todolist extends React.Component<IProps> {
    render() {
        return (
            <div>
                <div>Id: {this.props.todolist.id}-Age {this.props.todolist.title} {this.props.todolist.tasks.map(task => {
                    return <Task task={task} />
                })}</div>

            </div>
        );
    }


}

export default Todolist;
