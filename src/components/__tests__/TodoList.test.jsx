import { render, screen } from '@testing-library/react'
import TodoList from '../TodoList'

describe('TodoList - Unit Tests', () => {
  const mockOnToggle = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    mockOnToggle.mockClear()
    mockOnDelete.mockClear()
  })

  test('renders empty message when no todos', () => {
    render(
      <TodoList
        todos={[]}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    
    expect(screen.getByTestId('todo-list-empty')).toBeInTheDocument()
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument()
  })

  test('renders list of todos', () => {
    const todos = [
      { id: 1, text: 'Todo 1', completed: false },
      { id: 2, text: 'Todo 2', completed: true }
    ]
    
    render(
      <TodoList
        todos={todos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    
    expect(screen.getByTestId('todo-list')).toBeInTheDocument()
    expect(screen.getByText('Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Todo 2')).toBeInTheDocument()
    expect(screen.queryByTestId('todo-list-empty')).not.toBeInTheDocument()
  })
})

