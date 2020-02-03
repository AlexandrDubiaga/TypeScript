import {ITodolist} from "../types";
const ADD_TODOLIST = "ADD_TODOLIST"
const REMOVE_TODOLIST = "REMOVE_TODOLIST"
const UPDATE_TODOLIST = "UPDATE_TODOLIST"

const ADD_TASK = "ADD_TASK"

interface IInitialState{
    items:Array<ITodolist>,
    filterValue:string
}
const initialState = {
    items: [
        {id: 1, title: 'First Todolist', tasks: [{title: 'First Task', status: true}]},
        {id: 2, title: 'Second Todolist', tasks: [{title: 'Second Task', status: false}]},
        {id: 3, title: 'Third Todolist', tasks: [{title: 'Third Task', status: true}]}
    ],
    filterValue:'All'
}
const todolistReducer = (state:IInitialState = initialState, action: TodolistReducerActionsTypes):IInitialState => {
    switch (action.type){
        case ADD_TODOLIST:{
            return {
                ...state,
                items:[...state.items, {id:4,title:action.title,tasks:[]}],
            }
        }
        case REMOVE_TODOLIST:{
            return state
        }
    }
    return state;

}

interface IAddTodolistAction{
    type:typeof ADD_TODOLIST
    title:string
}

interface IRemoveTodolistAction{
    type: typeof REMOVE_TODOLIST
    id:string
}

type TodolistReducerActionsTypes = IAddTodolistAction | IRemoveTodolistAction;

export const addTodolistAC = (title: string):IAddTodolistAction => ({
    type: ADD_TODOLIST,
    title
})

const removeTodolistAC = (id: string):IRemoveTodolistAction => ({
    type: REMOVE_TODOLIST, id
})

export default todolistReducer;