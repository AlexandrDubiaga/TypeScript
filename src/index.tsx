import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let state = {
    todolists: [
        {id: 1, title: 'First Todolist', tasks: [{title: 'First Task', status: true}]},
        {id: 2, title: 'Second Todolist', tasks: [{title: 'Second Task', status: false}]},
        {id: 3, title: 'Third Todolist', tasks: [{title: 'Third Task', status: true}]}
    ],
    filterValue: 'All'
}


ReactDOM.render(<App state={state} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
