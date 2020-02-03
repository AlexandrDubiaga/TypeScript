import React from 'react';
import './App.css';
import Todolist from "./Todolist";
import {ITodolist} from "./types";
import {connect} from "react-redux";
import {AppStateType} from "./redux/store";
import AddNewIntemForm from "./ui/AddNewIntemForm";
import {Dispatch} from "redux";
import {addTodolistAC} from "./redux/TodolistsReducer";


interface IState {
    isVisible: boolean
}
interface IMapStateToProps {
    todolists: Array<ITodolist>,
    filterValue: string
}

interface IMapDispatchToProps {
    addTodolist:(title:string)=>void
}

class App extends React.Component<IMapStateToProps & IMapDispatchToProps, IState> {
    state: IState = {
        isVisible: true
    }
    addnewTodolist = (title: string) => {
       this.props.addTodolist(title)
    }

    render() {
        return (
            <div className="App">
                <AddNewIntemForm addItem={this.addnewTodolist}/>
                {this.props.todolists.map(tl => {
                    return <Todolist todolist={tl}/>
                })}
                <div>{this.props.filterValue}</div>
                {this.state.isVisible ? 'Alex' : 'Lena'}
                {this.state.isVisible && <button onClick={() => this.setState({isVisible: false})}>Toogle</button>}
                {!this.state.isVisible && <button onClick={() => this.setState({isVisible: true})}>Toogle</button>}
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType): IMapStateToProps => {
    return {
        todolists: state.todo.items,
        filterValue: state.todo.filterValue
    }
}
let mapDispatchToProps = (dispatch: Dispatch):IMapDispatchToProps => ({
    addTodolist:(title:string)=>{
        dispatch(addTodolistAC(title));
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
