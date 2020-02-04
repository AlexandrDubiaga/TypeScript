import React from 'react';
import './App.css';
import {ITasks, ITodolist} from "./types";
import Task from "./Task";

interface IProps {
    id: string,
    title: string,
    tasks: Array<ITasks>
}

class Todolist extends React.Component<IProps> {

    render() {
        return (
            <div>
                <div>Title: {this.props.title}</div>
            </div>
        );
    }


}

export default Todolist;
