import { useState } from 'react'
import './TodoForm.css'

function TodoForm({ onAdd }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(input)
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form" data-testid="todo-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
        data-testid="todo-input"
      />
      <button type="submit" className="todo-button" data-testid="add-button">
        Add Todo
      </button>
    </form>
  )
}

export default TodoForm

