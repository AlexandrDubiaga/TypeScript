const ADD_TODOLIST = "ADD_TODOLIST"
const REMOVE_TODOLIST = "REMOVE_TODOLIST"
const UPDATE_TODOLIST = "UPDATE_TODOLIST"

const ADD_TASK = "ADD_TASK"


const initialState = {
    items: [
        {id: 1, title: 'First Todolist', tasks: [{title: 'First Task', status: true}]},
        {id: 2, title: 'Second Todolist', tasks: [{title: 'Second Task', status: false}]},
        {id: 3, title: 'Third Todolist', tasks: [{title: 'Third Task', status: true}]}
    ]
}
const todolistReducer = (state = initialState, action: TodolistReducerActionsTypes) => {
    switch (action.type){
        case ADD_TODOLIST:{
            return state
        }
        case REMOVE_TODOLIST:{
            return state
        }
    }
    return state;

}

interface IAddTodolistAction{
    type:string,
    title:string
}

interface IRemoveTodolistAction{
    type:string,
    id:string
}

type TodolistReducerActionsTypes = IAddTodolistAction | IRemoveTodolistAction;

const addTodolistAC = (title: string):IAddTodolistAction => ({
    type: ADD_TODOLIST,
    title
})

const removeTodolistAC = (id: string):IRemoveTodolistAction => ({
    type: REMOVE_TODOLIST, id
})

export default todolistReducer;