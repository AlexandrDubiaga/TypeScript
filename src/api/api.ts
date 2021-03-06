import {ITasks} from "../types";
import {
    IDeleteResponce,
    IDeleteTaskResponce, IResponceAddDotolist, IResponceAddTaskAction, IResponceChangeTaskAction, IResponceSetDotolist,
    IResponceTaskAction
} from "../redux/reducer";
const axios = require('axios');

interface IInstanceControll{
    withCredentials:boolean,
    baseURL:string,
    headers:object,
    get:(url:string)=>void,
    post:(url:string,data:object)=>void,
    delete:(url:string)=>void,
    put:(url:string,data:object)=>void

}
const instance:IInstanceControll = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    headers: {"API-KEY": "ec13c7fa-bf13-4b56-aa9c-409a1e523851"}

});
interface ITodolistControll{
    getTodolist:()=>Promise<IResponceSetDotolist>,
    addTodolist:(newTodoTitle:string)=>Promise<IResponceAddDotolist>,
    deleteTodolist:(id:string)=>Promise<IDeleteResponce>,
    updateTodolist:(id:string, title:string)=>void
}

export const todoAPI:ITodolistControll = <ITodolistControll>{
    getTodolist(){
        return instance.get(`todo-lists`);
    },
    addTodolist(newTodoTitle){
        return instance.post(`todo-lists`, {title: newTodoTitle});
    },
    deleteTodolist(id){
        return instance.delete(`todo-lists/${id}`);
    },
    updateTodolist(id, title){
        return instance.put(`todo-lists/${id}`, {title: title});
    }
}
interface ITaskControll{
    getTasks:(todoId:string)=>Promise<IResponceTaskAction>,
    addTask:(todoId:string,newTask:string)=>Promise<IResponceAddTaskAction>,
    deleteTask:(todoId:string,taskId:string)=>Promise<IDeleteTaskResponce>,
    updateTask:(todoId:string, taskId:string, task:ITasks)=>Promise<IResponceChangeTaskAction>
}

export const tasksAPI:ITaskControll = <ITaskControll>{
    getTasks(todoId){
        return instance.get(`todo-lists/${todoId}/tasks`);
    },
    addTask(todoId, newTask){
        return instance.post(`todo-lists/${todoId}/tasks`, {title: newTask});
    },
    deleteTask(todoId, taskId){
        return instance.delete(`todo-lists/${todoId}/tasks/${taskId}`);
    },
    updateTask(todoId, taskId, task: ITasks){
        return instance.put(`todo-lists/${todoId}/tasks/${taskId}`, task);
    }
}
