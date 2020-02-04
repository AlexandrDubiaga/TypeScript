const axios = require('axios');


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    headers: {"API-KEY": "ec13c7fa-bf13-4b56-aa9c-409a1e523851"}

});

export const todoAPI = {
    getTodolist(){
        return instance.get(`todo-lists`);
    },
    addTodolist(newTodoTitle:string){
        return instance.post(`todo-lists`,{title:newTodoTitle});
    },
    deleteTodolist(id:string){
        return instance.delete(`todo-lists/${id}`);
    },
    updateTodolist(id:string, title:string){
        return instance.put(`todo-lists/${id}`, {title: title});
    }
}

export const tasksAPI = {
    getTasks(todoId:string){
        return instance.get(`todo-lists/${todoId}/tasks`);
    },
    addTask(todoId:string,newTask:string){
        return instance.post(`todo-lists/${todoId}/tasks`, {title: newTask});
    },
    deleteTask(todoId:string,taskId:string){
        return instance.delete(`todo-lists/${todoId}/tasks/${taskId}`);
    },
    updateTask(todoId:string, taskId:string, task:any){
        return instance.put(`todo-lists/${todoId}/tasks/${taskId}`,task);
    }

}
