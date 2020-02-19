import {ITasks, ITodolist} from "../types";
import {tasksAPI, todoAPI} from "../api/api";
import {Dispatch} from "redux";
const SET_TODOLIST = "SET_TODOLIST";
const ADD_TODOLIST = "ADD_TODOLIST";
const DELL_TODOLIST = "DELL_TODOLIST";
const CHANGE_TODO_TITLE = "CHANGE_TODO_TITLE";
const SET_TASKS = "SET_TASKS";
const ADD_TASK = "ADD_TASK";
const DELL_TASK = "DELL_TASK";
const CHANGE_TASK = "CHANGE_TASK";
const CHANGE_FILTER = "CHANGE_FILTER";


interface IInitialState {
    todolists: Array<ITodolist>,
    filterValue: string
}
let initialState = {
    todolists: [],
    filterValue: 'All'
}

const reducer = (state: IInitialState = initialState, action: TodolistReducerActionsTypes): IInitialState => {
    switch (action.type) {
        case SET_TODOLIST: {
            return {
                ...state,
                todolists: action.nextTodo.map((tl: ITodolist) => {
                    return {...tl, tasks: []}
                })
            }
        }
        case ADD_TODOLIST: {
            return {
                ...state,
                todolists: [...state.todolists, {...action.newTodolist, tasks: []}]
            }
        }
        case DELL_TODOLIST: {
            return {
                ...state,
                todolists: state.todolists.filter(t => {
                    return t.id !== action.idTodo
                })
            }
        }
        case CHANGE_TODO_TITLE: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.idTodo) {
                        return {...tl, title: action.title}
                    } else return tl
                })
            }
        }


        case SET_TASKS: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoId) {
                        return {...tl, tasks: [...action.tasks]}
                    } else return tl
                })
            }
        }

        case ADD_TASK: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoId) {
                        return {
                            ...tl,
                            tasks: [...tl.tasks, {...action.task}]
                        }
                    } else return tl
                })
            }
        }
        case DELL_TASK: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => {
                                return t.id !== action.taskId
                            })
                        }
                    }
                    return tl
                })
            }
        }

        case CHANGE_TASK: {
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoId) {
                        return {
                            ...tl,
                            tasks: [...tl.tasks.map(task => {
                                if (task.id === action.taskId) {
                                    return {
                                        ...task, ...action.task
                                    }
                                }
                                return task
                            })]
                        }
                    } else return tl
                })
            }
        }
        case CHANGE_FILTER: {
            return {
                ...state,
                filterValue: action.filter
            }
        }


    }
    return state;
}
type TodolistReducerActionsTypes =
    ISetTodolistAction
    | IAddTodolistAction
    | IDeleteTodolistAction
    | IChangeTodolistAction
    | ISetTaskAction
    | IAddTaskAction
    | IDeleteTaskAction
    | IChangeTaskAction
    | IChangeFilter;


export interface ISetTodolistAction {
    type: typeof SET_TODOLIST
    nextTodo: Array<ITodolist>
}
export interface IResponceSetDotolist {
    data: Array<ITodolist>
    status: string
    statusText: string
    headers: any
    config: any
    request: any
}

export const setTodolistAC = (nextTodo: Array<ITodolist>): ISetTodolistAction => ({type: SET_TODOLIST, nextTodo})
export const setTodolistThunk = () => {
    return async (dispatch: Dispatch) => {
        await todoAPI.getTodolist().then((response: IResponceSetDotolist) => {
            dispatch(setTodolistAC(response.data))

        })
    }
}


export interface IAddTodolistAction {
    type: typeof ADD_TODOLIST
    newTodolist: INewTodolist
}
export interface IResponceAddDotolist {
    data: {
        data: {
            item: {
                id: string;
                addedDate: string;
                order: number;
                title: string;
            }
        }
    }
}
export interface INewTodolist {
    id: string;
    addedDate: string;
    order: number;
    title: string;
}

export const addTodolistThunk = (newTodoTitle: string) => {
    return async (dispatch: Dispatch) => {
        await todoAPI.addTodolist(newTodoTitle).then((response: IResponceAddDotolist) => {
            dispatch(addTodolistAC(response.data.data.item))
        })
    }
}
export const addTodolistAC = (newTodolist: INewTodolist): IAddTodolistAction => ({type: ADD_TODOLIST, newTodolist});


export interface IDeleteTodolistAction {
    type: typeof DELL_TODOLIST
    idTodo: string
}

export interface IDeleteResponce {
    data: {
        data: object
        messages: Array<string>
        resultCode: number
        status: number
        statusText: string
        headers: any
        config: any
        request: any
    }
}

export const deleteTodolistThunk = (id: string) => {
    return async (dispatch: Dispatch) => {
        await todoAPI.deleteTodolist(id).then((response: IDeleteResponce) => {
            dispatch(deleteTodolistAC(id))
        })
    }
}
export const deleteTodolistAC = (idTodo: string) => ({type: DELL_TODOLIST, idTodo});


export interface IChangeTodolistAction {
    type: typeof CHANGE_TODO_TITLE
    idTodo: string,
    title: string
}

export const changeTodolistTitleThunk = (id: string, title: string) => {
    return async (dispatch: Dispatch) => {
        await todoAPI.updateTodolist(id, title);
    }
}
export const changeTodoTitleAC = (idTodo: string, title: string): IChangeTodolistAction => ({
    type: CHANGE_TODO_TITLE,
    idTodo,
    title
});

export interface IResponceTaskAction {
    data: {
        items: Array<ITasks>
        totalCount: number,
        error: string
    }

}
export interface ISetTaskAction {
    type: typeof SET_TASKS,
    todoId: string
    tasks: Array<ITasks>
}
export const getTasksThunk = (idTodolist: string, tasks: Array<ITasks>) => {
    return async (dispatch: Dispatch) => {
        await tasksAPI.getTasks(idTodolist).then((response: IResponceTaskAction) => {
            dispatch(setTasksAC(idTodolist, response.data.items))
        })
    }
}
export const setTasksAC = (todoId: string, tasks: Array<ITasks>): ISetTaskAction => ({type: SET_TASKS, todoId, tasks});


export interface IAddTaskAction {
    type: typeof ADD_TASK,
    todoId: string
    task: ITasks
}

export interface IResponceAddTaskAction {
    data: {
        data: {
            item: ITasks
        }
    }
    messages: Array<string>,
    resultCode: number
    headers: any,
    config: any
    request: any
}

export const addTasksThunk = (idTodolist: string, newTask: string) => {
    return async (dispatch: Dispatch) => {
        await tasksAPI.addTask(idTodolist, newTask).then((response: IResponceAddTaskAction) => {
            dispatch(addTaskAC(idTodolist, response.data.data.item))
        })
    }
}

export const addTaskAC = (todoId: string, task: ITasks): IAddTaskAction => ({type: ADD_TASK, todoId, task});


export interface IDeleteTaskAction {
    type: typeof DELL_TASK
    todoId: string,
    taskId: string
}

export interface IDeleteTaskResponce {
    data: {
        data: object
        messages: Array<string>
        resultCode: number
    }
}
export const deleteTaskAc = (todoId: string, taskId: string): IDeleteTaskAction => ({type: DELL_TASK, todoId, taskId});

export const deleteTaskThunk = (idTodo: string, taskId: string) => {
    return async (dispatch: Dispatch) => {
        await tasksAPI.deleteTask(idTodo, taskId).then((response: IDeleteTaskResponce) => {
            dispatch(deleteTaskAc(idTodo, taskId))
        })
    }
}

export interface IChangeTaskAction {
    type: typeof CHANGE_TASK
    todoId: string,
    taskId: string,
    task: any
}
export interface IResponceChangeTaskAction {
    data: {
        data: {
            item: ITasks
            messages: Array<string>,
            resultCode: number
        }
    }
    headers: any,
    config: any
    request: any

}
export const changeTaskAC = (todoId: string, taskId: string, task: any): IChangeTaskAction => ({
    type: CHANGE_TASK,
    todoId,
    taskId,
    task
});

export const changeTaskThunk = (idTodo: string, taskId: string, task: ITasks) => {
    return async (dispatch: Dispatch) => {
        tasksAPI.updateTask(idTodo, taskId, task).then((response: IResponceChangeTaskAction) => {
            dispatch(changeTaskAC(idTodo, taskId, response.data.data.item))
        })
    }
}

export interface IChangeFilter {
    type: typeof CHANGE_FILTER
    filter: string
}
export const changeFilterValueAC = (filter: string): IChangeFilter => ({type: CHANGE_FILTER, filter});


export default reducer;