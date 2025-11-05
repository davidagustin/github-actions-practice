import './TodoItem.css'

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`} data-testid={`todo-item-${todo.id}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
        data-testid={`todo-checkbox-${todo.id}`}
      />
      <span className="todo-text" data-testid={`todo-text-${todo.id}`}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="todo-delete"
        data-testid={`todo-delete-${todo.id}`}
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem

