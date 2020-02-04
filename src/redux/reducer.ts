import {ITodolist} from "../types";
import {todoAPI} from "../api/api";
import {Dispatch} from "redux";
const SET_TODOLIST = "SET_TODOLIST";
const ADD_TODOLIST = "ADD_TODOLIST";


interface IInitialState {
    todolists: Array<ITodolist>,
}
let initialState = {
    todolists: []
}

const reducer = (state: IInitialState = initialState, action: TodolistReducerActionsTypes): IInitialState => {
    switch (action.type) {
        case SET_TODOLIST: {
            return <IInitialState>{
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
    }
    return state;
}
type TodolistReducerActionsTypes = ISetTodolistAction | IAddTodolistAction;


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


export default reducer;