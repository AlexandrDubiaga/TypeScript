import React from 'react';
import './App.css';
import Todolist from "./Todolist";
import {IAppTypesProps} from "./types";


interface IState {
    isVisible: boolean
}

interface IProps{
    state: IAppTypesProps
}

class App extends React.Component<IProps, IState> {
    state: IState = {
        isVisible: true
    }

    render() {
        return (
            <div className="App">
                {this.props.state.todolists.map(tl => {
                    return    <Todolist todolist={tl} />
                })}

                {this.state.isVisible ? 'Alex' : 'Lena'}
                {this.state.isVisible && <button onClick={() => this.setState({isVisible: false})}>Toogle</button>}
                {!this.state.isVisible && <button onClick={() => this.setState({isVisible: true})}>Toogle</button>}
            </div>
        );
    }


}

export default App;
