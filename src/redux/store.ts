import {createStore, combineReducers,applyMiddleware} from "redux"
import thunk from 'redux-thunk';
import reducer from "./reducer";

let rootReducer = combineReducers({
    todo: reducer
});

export type AppStateType = ReturnType<typeof rootReducer>
const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;

