import React,{ChangeEvent} from 'react';

interface IProps{
    idTodo:string,
    title:string,
    deleteTodolist:(value:string)=>void,
    changeTodoTitle:(idTodo:string,title:string)=>void,
    updateTodoTitle:(idTodo:string,title:string)=>void


}
interface IState{
    isVisible:boolean
}
class TodolistTitle extends React.Component<IProps,IState> {
    state = {
        isVisible: false
    }

    updateTodoTitle = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.changeTodoTitle(this.props.idTodo, e.currentTarget.value)
    }
    setTodoTitle = () => {
        this.props.updateTodoTitle(this.props.idTodo, this.props.title)
        this.setState({isVisible: false})
    }

    render() {
        return (

            <div className="TodoTitle">
                {this.state.isVisible ?
                    <div ><input className="input"
                        onChange={this.updateTodoTitle}
                        autoFocus={true}
                        onBlur={this.setTodoTitle} value={this.props.title}/></div>
                    : <div onDoubleClick={() => this.setState({isVisible: true})}>{this.props.title}
                        <button onClick={() => this.props.deleteTodolist(this.props.idTodo)}>x</button>
                    </div>
                }
            </div>
        )
    }
}

export default TodolistTitle