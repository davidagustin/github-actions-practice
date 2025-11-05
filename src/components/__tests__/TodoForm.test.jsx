import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from '../TodoForm'

describe('TodoForm - Unit Tests', () => {
  const mockOnAdd = jest.fn()

  beforeEach(() => {
    mockOnAdd.mockClear()
  })

  test('renders input and button', () => {
    render(<TodoForm onAdd={mockOnAdd} />)
    
    expect(screen.getByTestId('todo-input')).toBeInTheDocument()
    expect(screen.getByTestId('add-button')).toBeInTheDocument()
  })

  test('allows user to type in input', async () => {
    const user = userEvent.setup()
    render(<TodoForm onAdd={mockOnAdd} />)
    
    const input = screen.getByTestId('todo-input')
    await user.type(input, 'Test todo')
    
    expect(input).toHaveValue('Test todo')
  })

  test('calls onAdd with input value when form is submitted', async () => {
    const user = userEvent.setup()
    render(<TodoForm onAdd={mockOnAdd} />)
    
    const input = screen.getByTestId('todo-input')
    const button = screen.getByTestId('add-button')
    
    await user.type(input, 'New todo')
    await user.click(button)
    
    expect(mockOnAdd).toHaveBeenCalledWith('New todo')
    expect(mockOnAdd).toHaveBeenCalledTimes(1)
  })

  test('clears input after submission', async () => {
    const user = userEvent.setup()
    render(<TodoForm onAdd={mockOnAdd} />)
    
    const input = screen.getByTestId('todo-input')
    const button = screen.getByTestId('add-button')
    
    await user.type(input, 'Test todo')
    await user.click(button)
    
    expect(input).toHaveValue('')
  })

  test('submits form when Enter key is pressed', async () => {
    const user = userEvent.setup()
    render(<TodoForm onAdd={mockOnAdd} />)
    
    const input = screen.getByTestId('todo-input')
    await user.type(input, 'Enter todo{Enter}')
    
    expect(mockOnAdd).toHaveBeenCalledWith('Enter todo')
  })
})

