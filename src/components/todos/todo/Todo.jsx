import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import Checkbox from 'chayns-components/lib/react-chayns-checkbox/component/Checkbox';
import Icon from 'chayns-components/lib/react-chayns-icon/component/Icon';
import Tooltip from 'chayns-components/lib/react-chayns-tooltip/component/Tooltip';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import formatDateMonthYearHoursMinutes from '../../../utils/date-helper';
import './todo.scss';

// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
class Todo extends PureComponent {
    render() {
        const { todo, toggleTodoChecked, removeTodo } = this.props;

        return (
            <div className="todo">
                <Checkbox
                    checked={todo.get('checked')}
                    onChange={() => toggleTodoChecked(todo.get('id'))}
                />
                <Icon
                    className="todo__delete-icon"
                    icon={faTrash}
                    onClick={() => removeTodo(todo.get('id'))}
                />
                <Tooltip
                    bindListeners
                    position={3}
                    content={{ text: formatDateMonthYearHoursMinutes(todo.get('creationTime')) }}
                >
                    <div>{todo.get('todo')}</div>
                </Tooltip>
            </div>
        );
    }
}

Todo.propTypes = {
    todo: PropTypes.instanceOf(Map).isRequired,
    toggleTodoChecked: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
};

export default Todo;
