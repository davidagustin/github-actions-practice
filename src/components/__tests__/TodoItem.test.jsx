import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from '../TodoItem'

describe('TodoItem - Unit Tests', () => {
  const mockTodo = {
    id: 1,
    text: 'Test todo item',
    completed: false
  }

  const mockOnToggle = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    mockOnToggle.mockClear()
    mockOnDelete.mockClear()
  })

  test('renders todo text', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    
    expect(screen.getByText('Test todo item')).toBeInTheDocument()
  })

  test('renders checkbox unchecked when todo is not completed', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    
    const checkbox = screen.getByTestId('todo-checkbox-1')
    expect(checkbox).not.toBeChecked()
  })

  test('renders checkbox checked when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true }
    
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    
    const checkbox = screen.getByTestId('todo-checkbox-1')
    expect(checkbox).toBeChecked()
  })

  test('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup()
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    
    const checkbox = screen.getByTestId('todo-checkbox-1')
    await user.click(checkbox)
    
    expect(mockOnToggle).toHaveBeenCalledWith(1)
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  test('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    
    const deleteButton = screen.getByTestId('todo-delete-1')
    await user.click(deleteButton)
    
    expect(mockOnDelete).toHaveBeenCalledWith(1)
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  test('applies completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true }
    
    const { container } = render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    
    const todoItem = container.querySelector('.todo-item')
    expect(todoItem).toHaveClass('completed')
  })
})

