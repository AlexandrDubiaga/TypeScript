import React from 'react';
import './App.css';
import {ITasks} from "./types";


interface IProps {
    task: ITasks
}

class Task extends React.Component<IProps> {
    render() {
        return (
            <div>
                <input type={"checkbox"} checked={this.props.task.status}/>{this.props.task.title}
            </div>
        );
    }


}

export default Task;
