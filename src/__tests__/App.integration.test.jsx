import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App - Integration Tests', () => {
  test('adds a new todo when form is submitted', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByTestId('todo-input')
    const button = screen.getByTestId('add-button')
    
    await user.type(input, 'Buy groceries')
    await user.click(button)
    
    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  test('adds multiple todos', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByTestId('todo-input')
    const button = screen.getByTestId('add-button')
    
    await user.type(input, 'First todo')
    await user.click(button)
    
    await user.type(input, 'Second todo')
    await user.click(button)
    
    await user.type(input, 'Third todo')
    await user.click(button)
    
    expect(screen.getByText('First todo')).toBeInTheDocument()
    expect(screen.getByText('Second todo')).toBeInTheDocument()
    expect(screen.getByText('Third todo')).toBeInTheDocument()
  })

  test('toggles todo completion status', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByTestId('todo-input')
    const button = screen.getByTestId('add-button')
    
    await user.type(input, 'Test todo')
    await user.click(button)
    
    const todoText = screen.getByText('Test todo')
    const todoItem = todoText.closest('li')
    const checkbox = todoItem.querySelector('[type="checkbox"]')
    
    expect(checkbox).not.toBeChecked()
    
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  test('deletes a todo', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByTestId('todo-input')
    const button = screen.getByTestId('add-button')
    
    await user.type(input, 'Todo to delete')
    await user.click(button)
    
    expect(screen.getByText('Todo to delete')).toBeInTheDocument()
    
    const todoText = screen.getByText('Todo to delete')
    const todoItem = todoText.closest('li')
    const deleteButton = todoItem.querySelector('button')
    
    await user.click(deleteButton)
    
    expect(screen.queryByText('Todo to delete')).not.toBeInTheDocument()
  })

  test('full workflow: add, toggle, and delete todos', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Initially empty
    expect(screen.getByTestId('todo-list-empty')).toBeInTheDocument()
    
    // Add first todo
    const input = screen.getByTestId('todo-input')
    const addButton = screen.getByTestId('add-button')
    
    await user.type(input, 'Learn React')
    await user.click(addButton)
    
    // Add second todo
    await user.type(input, 'Write tests')
    await user.click(addButton)
    
    // Both todos should be visible
    expect(screen.getByText('Learn React')).toBeInTheDocument()
    expect(screen.getByText('Write tests')).toBeInTheDocument()
    
    // Toggle first todo
    const firstTodoText = screen.getByText('Learn React')
    const firstTodoItem = firstTodoText.closest('li')
    const firstCheckbox = firstTodoItem.querySelector('[type="checkbox"]')
    
    await user.click(firstCheckbox)
    expect(firstCheckbox).toBeChecked()
    
    // Delete second todo
    const secondTodoText = screen.getByText('Write tests')
    const secondTodoItem = secondTodoText.closest('li')
    const secondDeleteButton = secondTodoItem.querySelector('button')
    
    await user.click(secondDeleteButton)
    expect(screen.queryByText('Write tests')).not.toBeInTheDocument()
    expect(screen.getByText('Learn React')).toBeInTheDocument()
  })

  test('does not add empty todo', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByTestId('todo-input')
    const button = screen.getByTestId('add-button')
    
    // Try to submit empty input
    await user.type(input, '   ')
    await user.click(button)
    
    // Should still show empty message
    expect(screen.getByTestId('todo-list-empty')).toBeInTheDocument()
  })
})

