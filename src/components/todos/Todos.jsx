import React, { useReducer, useEffect } from 'react';
import { Map, List, fromJS } from 'immutable';
import Todo from './todo/Todo';
import AddTodo from '../add-todo/AddTodo';
import getTodosFromLocalStorage from '../../api/get/todos';

// We define the reducer for the useReducer Hook.
const todosReducer = (todos, action) => {
    switch (action.type) {
        case 'add':
            // For this example we use a random number, u should use a real id.
            return todos.push(Map({ todo: action.todo, id: Math.random() }));
        case 'remove':
            return todos.filter(todo => todo.get('id') !== action.id);
        case 'toggleTodoChecked':
            return todos.map(todo => todoReducer(todo, action));
        default:
            return todos;
    }
};

// We define the reducer that we need in our todosReducer.
const todoReducer = (todo, action) => {
    if (todo.get('id') !== action.id) {
        return todo;
    }

    switch (action.type) {
        case 'toggleTodoChecked':
            return todo.set('checked', !todo.get('checked'));
        default:
            return todo;
    }
};

const useTodosReducer = (initialState) => {
    // We use the useReducer Hook (it's not Redux) to manage more complex states. It's an extended implementation of the common useState Hook. It serves the state and the dispatch function.
    const [todos, dispatch] = useReducer(todosReducer, initialState);

    return [
        todos,
        dispatch
    ];
};

export default () => {
    // We destruct the return value of our customHook to get the state and the dispatch function.
    // getTodosFromLocalStorage() will get the initial todos from the localstorage and convert it to an immutable List().
    // All the way down we are using an immutable data-structure with immutable.js
    const [todos, dispatch] = useTodosReducer(List(fromJS(getTodosFromLocalStorage())));

    // Similar to componentDidMount and componentDidUpdate. We pass an array as 2nd argument to specify conditions. In this case the callback will only executed if todos changed.
    useEffect(() => {
        // We will save the todos in the localstorage every time the todos changed
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos.toJS()));
    }, [todos]);

    // We extract the complex logic to render the headline for a more readable return()
    const renderTodosHeadline = () => {
        const todosCount = todos.size;
        const checkedTodosCount = todos.filter(todo => todo.get('checked')).size;
        const headlineString = `
             ${checkedTodosCount > 0 ? checkedTodosCount : ''}
             ${checkedTodosCount > 0 && todosCount > 0 ? '/' : ''} 
             ${todosCount > 0 ? todosCount : ''} ${todosCount === 1 && checkedTodosCount <= 0 ? 'Todo' : 'Todos'} 
             ${checkedTodosCount > 0 ? 'abgeschlossen' : ''}`;

        return <h2>{headlineString}</h2>;
    };

    return (
        <div className="todos">
            {renderTodosHeadline()}
            {todos.map(todo => (
                <Todo
                    key={todo.get('id')}
                    todo={todo}
                    toggleTodoChecked={(id) => {
                        // We dispatch an action to manipulate the state. The reducer will do the rest.
                        dispatch({ type: 'toggleTodoChecked', id });
                    }}
                    removeTodo={id => dispatch({ type: 'remove', id })}
                />
            ))}
            <AddTodo addTodo={todo => dispatch({ type: 'add', todo })}/>
        </div>
    );
};
