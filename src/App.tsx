import React, {ChangeEvent} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {ITodolist} from "./types";
import {connect} from "react-redux";
import {AppStateType} from "./redux/store";
import AddNewIntemForm from "./ui/AddNewIntemForm";
import {Dispatch} from "redux";
import {addTodolistThunk, INewTodolist, setTodolistThunk} from "./redux/reducer"


interface IMapStateToProps {
    todolists: Array<ITodolist>
}

interface IMapDispatchToProps {
    getTodolists: () => void,
    addTodo: (newTodolist: string) => void
}

class App extends React.Component<IMapStateToProps & IMapDispatchToProps> {
    componentDidMount() {
        this.props.getTodolists()
    }

    addNewTodo = (newTitle: string) => {
        this.props.addTodo(newTitle);
    }
    render() {
        let todolists = this.props.todolists.map(function (tl) {
            return <Todolist id={tl.id} title={tl.title} tasks={tl.tasks}/>
        })
        return (
            <>
            <div><AddNewIntemForm addItem={this.addNewTodo}/></div>
            <div className="App">
                {todolists}
            </div>
            </>
        );
    }
}

let mapStateToProps = (state: AppStateType): IMapStateToProps => {
    return {
        todolists: state.todo.todolists
    }
}
let mapDispatchToProps = (dispatch: any): IMapDispatchToProps => ({
    getTodolists: () => {
        dispatch(setTodolistThunk());
    },
    addTodo(newTodolist){
        dispatch(addTodolistThunk(newTodolist))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
