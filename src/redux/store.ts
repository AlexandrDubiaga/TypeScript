import {createStore, combineReducers} from "redux"
import todolistReducer from "./TodolistsReducer";

let rootReducer = combineReducers({
    todo: todolistReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

let store = createStore(rootReducer);


export default store;