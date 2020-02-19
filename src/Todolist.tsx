import React from 'react';
import './App.css';
import {ITasks, ITodolist} from "./types";
import TodolistTitle from "./TodolistTitle";
import {AppStateType} from "./redux/store";
import {connect} from "react-redux";
import {
    addTasksThunk, changeFilterValueAC, changeTaskAC, changeTaskThunk, changeTodolistTitleThunk, changeTodoTitleAC,
    deleteTaskThunk,
    deleteTodolistThunk,
    getTasksThunk
} from "./redux/reducer";
import AddNewIntemForm from "./ui/AddNewIntemForm";
import ShowTasks from "./ShowTasks";
import Footer from "./Footer";

interface IProps {
    id: string,
    title: string,
    tasks: Array<ITasks>
}
interface IMapStateToProps {
    todolists: Array<ITodolist>,
    filterValue:string
}

interface IMapDispatchToProps {
    dellTodo: (id: string) => void,
    updateTodolistTitleServer: (id: string, title: string) => void,
    updateTodolistTitleLocal: (id: string, title: string) => void,
    setTasks: (idTodolist: string, tasks: Array<ITasks>) => void,
    addTaskInTodolist: (todoId: string, task: string) => void,
    deleteTask: (todoId: string, taskId: string) => void,
    updateTaskLocal: (idTodo: string, idTask: string, title: string) => void,
    setTaskInCurrentTodoServer: (idTodo: string, idTask: string, task: ITasks) => void,
    changeFilter:(filter:string)=>void
}

class Todolist extends React.Component<IMapStateToProps & IMapDispatchToProps & IProps> {
    componentDidMount() {
        this.props.setTasks(this.props.id, this.props.tasks)
    }

    updateTodoTitle = (id: string, title: string) => {
        this.props.updateTodolistTitleServer(id, title)
    }
    changeTodoTitle = (id: string, title: string) => {
        this.props.updateTodolistTitleLocal(id, title)
    }
    deleteTodolist = (idTodo: string) => {
        this.props.dellTodo(idTodo)
    }

    addNewTask = (newTask: string) => {
        this.props.addTaskInTodolist(this.props.id, newTask)
    }
    deleteTask = (idTodo:string, taskId:string) => {
        this.props.deleteTask(idTodo, taskId)
    }

    changeTaskInTodolist = (idTodo:string, taskId:string, task:ITasks) => {
        this.props.setTaskInCurrentTodoServer(idTodo, taskId, task)
    }
    updateTaskInTodolist = (idTodo:string, idTask:string, newTitleTask:string) => {
        this.props.updateTaskLocal(idTodo, idTask, newTitleTask);
    }

    changeFilterValue = (newFilterValue:any) => {
        this.props.changeFilter(newFilterValue.currentTarget.value)
    }


    render() {
        return (
            <div className="TodoList">
                <TodolistTitle changeTodoTitle={this.changeTodoTitle} updateTodoTitle={this.updateTodoTitle}
                               idTodo={this.props.id} deleteTodolist={this.deleteTodolist} title={this.props.title}/>
                <AddNewIntemForm nameValue="Add Task" addItem={this.addNewTask}/>
                <ShowTasks changeTaskInTodolist={this.changeTaskInTodolist}
                           updateTaskInTodolist={this.updateTaskInTodolist} deleteTask={this.deleteTask}
                           idTodo={this.props.id} tasks={this.props.tasks.filter(t => {
                    if (this.props.filterValue === "All") {
                        return true
                    } else if (this.props.filterValue === "Completed") {
                        return t.status === 2;
                    } else if (this.props.filterValue === "Active") {
                        return t.status === 1;
                    } else {
                        return t.status === 0
                    }
                })}/>
                <Footer filterValue={this.props.filterValue} changeFilterValue={this.changeFilterValue}/>

            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType): IMapStateToProps => {
    return {
        todolists: state.todo.todolists,
        filterValue: state.todo.filterValue
    }
}

let mapDispatchToProps = (dispatch: any): IMapDispatchToProps => {
    return {
        setTasks(idTodolist, tasks) {
            dispatch(getTasksThunk(idTodolist, tasks))
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
        deleteTask(todoId, taskId){
            dispatch(deleteTaskThunk(todoId, taskId))
        },
        updateTaskLocal(idTodo, idTask, title){
            dispatch(changeTaskAC(idTodo, idTask, title))
        },
        setTaskInCurrentTodoServer(idTodo, idTask, task){
            dispatch(changeTaskThunk(idTodo, idTask, task))
        },
        changeFilter(filter){
            dispatch(changeFilterValueAC(filter))
        },
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(Todolist);
export default ConnectedApp;