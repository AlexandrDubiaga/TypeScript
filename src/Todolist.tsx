import React from 'react';
import './App.css';
import {ITasks, ITodolist} from "./types";
import TodolistTitle from "./TodolistTitle";
import {AppStateType} from "./redux/store";
import {connect} from "react-redux";
import {
    addTasksThunk, changeTodolistTitleThunk, changeTodoTitleAC, deleteTodolistThunk,
    getTasksThunk
} from "./redux/reducer";
import AddNewIntemForm from "./ui/AddNewIntemForm";

interface IProps {
    id: string,
    title: string,
    tasks: Array<ITasks>
}
interface IMapStateToProps {
    todolists: Array<ITodolist>
}

interface IMapDispatchToProps {
    dellTodo:(id:string)=>void,
    updateTodolistTitleServer:(id:string,title:string)=>void,
    updateTodolistTitleLocal:(id:string,title:string)=>void,
    setTasks:(idTodolist:string,tasks:Array<ITasks>)=>void,
    addTaskInTodolist:(todoId:string, task:string)=>void

}

class Todolist extends React.Component<IMapStateToProps & IMapDispatchToProps& IProps> {
    componentDidMount() {
        this.props.setTasks(this.props.id,this.props.tasks)
    }

    updateTodoTitle = (id:string, title:string) => {
        this.props.updateTodolistTitleServer(id, title)
    }
    changeTodoTitle = (id:string, title:string) => {
        this.props.updateTodolistTitleLocal(id, title)
    }
    deleteTodolist = (idTodo:string) => {
        this.props.dellTodo(idTodo)
    }

    addNewTask=(newTask:string)=>{
        this.props.addTaskInTodolist(this.props.id,newTask)
    }

    render() {
        return (
            <div className="TodoList">
                <TodolistTitle changeTodoTitle={this.changeTodoTitle} updateTodoTitle={this.updateTodoTitle}
                               idTodo={this.props.id} deleteTodolist={this.deleteTodolist} title={this.props.title}/>
                <AddNewIntemForm addItem={this.addNewTask}/>
            </div>
        );
    }


}

let mapStateToProps = (state:AppStateType):IMapStateToProps => {
    return {
        todolists: state.todo.todolists
    }
}

let mapDispatchToProps = (dispatch:any):IMapDispatchToProps => {
    return {
        setTasks(idTodolist,tasks) {
            dispatch(getTasksThunk(idTodolist,tasks))
        },
        dellTodo(id){
            dispatch(deleteTodolistThunk(id))
        },
        updateTodolistTitleServer(idTodo, title){
            dispatch(changeTodolistTitleThunk(idTodo, title))
        },
        updateTodolistTitleLocal(idTodo, title){
            dispatch(changeTodoTitleAC(idTodo, title))
        },
        addTaskInTodolist(todoId, task){
            dispatch(addTasksThunk(todoId, task))
        },
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(Todolist);
export default ConnectedApp;