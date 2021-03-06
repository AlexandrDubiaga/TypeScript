import React from 'react';
import {ITasks} from "../types";
import style from './Tasks.module.css'


interface IProps {
    changeTaskInTodolist: (idTodo: string, taskId: string, task: ITasks) => void,
    deleteTask: (idTodo: string, taskId: string) => void,
    updateTaskInTodolist: (idTodo: string, idTask: string, newTitleTask: string) => void,
    idTodo: string,
    task: ITasks,
    idTask: string
}
interface IState {
    isVisible: boolean,
    priority: Array<string>
}
interface INewTask {
    title: string,
    priority: number

}
class OneTask extends React.Component<IProps, IState> {
    state: IState = {
        isVisible: false,
        priority: ['Low', 'Middle', 'Hi', 'Urgently', 'Later']
    }
    setChangeTask = () => {
        this.props.changeTaskInTodolist(this.props.idTodo, this.props.idTask, this.props.task)
        this.setState({isVisible: false})
    }
    updateTaskInTodolist = (e: any) => {
        let priority;
        switch (e.currentTarget[1].value) {
            case "Low":
                priority = 0;
                break;
            case "Middle":
                priority = 1;
                break;
            case "Hi":
                priority = 2;
                break;
            case "Urgently":
                priority = 3;
                break;
            case "Later":
                priority = 4;
                break;
            default:
                priority = 5;
                break;
        }

        let newTask: any = {
            title: e.currentTarget[0].value,
            priority: priority
        }
        this.props.updateTaskInTodolist(this.props.idTodo, this.props.idTask, newTask)
    }
    changeStatus = (e: any) => {
        let value;
        if (e.currentTarget.checked) {
            value = 2;
        } else {
            value = 1;
        }
        let task: any = {...this.props.task, status: value}
        this.props.changeTaskInTodolist(this.props.idTodo, this.props.idTask, task)

    }

    render() {
        let priority;
        switch (this.props.task.priority) {
            case 0:
                priority = "Low";
                break;
            case 1:
                priority = "Middle";
                break;
            case 2:
                priority = "Hi";
                break;
            case 3:
                priority = "Urgently";
                break;
            case 4:
                priority = "Later";
                break;
            default:
                priority = 'Server error';
                break;
        }

        return (
            <div className={style.OneTask}>
                {this.state.isVisible ?
                    <div className={style.OneTaskBlockUpdate}>
                        <form onChange={this.updateTaskInTodolist} className={style.form}>
                            <p>Title:</p> <textarea autoFocus={true} value={this.props.task.title}/>
                            <div>
                                <p>Priority:</p><select value={priority}>{this.state.priority.map((priority, idx) =>
                                <option
                                    key={idx}>{priority}</option>)}</select>
                            </div>
                            <button className={style.editButton} onClick={this.setChangeTask}> EDIT</button>
                        </form>
                    </div> :
                    <div className={style.OneTaskBlock}
                         onDoubleClick={this.props.task.status === 2 ? () => this.setState({isVisible: false}) : () => this.setState({isVisible: true})}>
                        <div className={style.showTasksContent}>
                            <div>
                                <input checked={this.props.task.status === 2 ? true : false}
                                       onChange={this.changeStatus} type="checkbox"/><p>Title:</p>
                            </div>
                            <div
                                className={this.props.task.status === 2 ? style.oneTaskContentWithLineThrow : style.oneTaskContent}>{this.props.task.title + " "}</div>
                        </div>
                        <div>
                            <p>Priority:</p> {priority}
                        </div>
                        <p>Delete task: </p>
                        <button onClick={() => this.props.deleteTask(this.props.idTodo, this.props.idTask)}>x</button>
                    </div>

                }
            </div>
        )
    }
}


export default OneTask;