import React, { useState } from 'react';
import Input from 'chayns-components/lib/react-chayns-input/component/Input';
import Button from 'chayns-components/lib/react-chayns-button/component/Button';
import './addTodo.scss';

// We use a customHook to extract components logic.
// CustomHooks have to start with use... useMyName.
const useTodo = (initialValue, addTodo) => {
    // We use the useState Hook to manage our components state. With destructuring we can get the state and the setState function.
    const [todo, setTodo] = useState(initialValue);

    return {
        todo,
        // We use setTodo to set the state to the given value.
        onChange: input => setTodo(input),
        submit: () => {
            // We check the state and call the addTodo callback from the parent component. Additionally we reset the state.
            if (todo.length > 0) {
                addTodo(todo);
                setTodo(initialValue);
            }
        }
    };
};

export default ({ addTodo }) => {
    // We destruct the return value of our customHook to get access to the state and our functions.
    const { todo, onChange, submit } = useTodo('', addTodo);

    return (
        <div className="add-todo">
            <Input
                value={todo}
                onChange={onChange}
                placeholder="add todo"
                onEnter={submit}
            />
            <Button
                className="add-todo__button"
                onClick={submit}
                disabled={todo.length <= 0}
            >
                +
            </Button>
        </div>
    );
};
