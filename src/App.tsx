import React from 'react';
import './App.css';
import Todolist from "./Todolist";
import {IAppTypesProps, ITodolist} from "./types";
import {connect} from "react-redux";
import {AppStateType} from "./redux/store";


interface IState {
    isVisible: boolean
}
interface IMapStateToProps {
    todolists: Array<ITodolist>
}

interface IMapDispatchToProps {

}


class App extends React.Component<IMapStateToProps & IMapDispatchToProps, IState> {
    state: IState = {
        isVisible: true
    }

    render() {
        return (
            <div className="App">
                {this.props.todolists.map(tl => {
                    return <Todolist todolist = {tl}/>
                })}


                {this.state.isVisible ? 'Alex' : 'Lena'}
                {this.state.isVisible && <button onClick={() => this.setState({isVisible: false})}>Toogle</button>}
                {!this.state.isVisible && <button onClick={() => this.setState({isVisible: true})}>Toogle</button>}
            </div>
        );
    }


}



let mapStateToProps = (state: AppStateType): IMapStateToProps => {
    return {
        todolists: state.todo.items
    }
}
let mapDispatchToProps = (dispatch: any) => {

}


export default connect(mapStateToProps, mapDispatchToProps)(App);
