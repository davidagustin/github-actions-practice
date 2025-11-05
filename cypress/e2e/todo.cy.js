describe('Todo List E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the app title', () => {
    cy.contains('h1', 'Todo List').should('be.visible')
  })

  it('shows empty state when no todos exist', () => {
    cy.get('[data-testid="todo-list-empty"]').should('be.visible')
    cy.contains('No todos yet. Add one above!').should('be.visible')
  })

  it('adds a new todo', () => {
    cy.get('[data-testid="todo-input"]').type('Buy milk')
    cy.get('[data-testid="add-button"]').click()
    
    cy.contains('Buy milk').should('be.visible')
    cy.get('[data-testid="todo-input"]').should('have.value', '')
    cy.get('[data-testid="todo-list-empty"]').should('not.exist')
  })

  it('adds multiple todos', () => {
    const todos = ['Buy groceries', 'Walk the dog', 'Finish homework']
    
    todos.forEach(todo => {
      cy.get('[data-testid="todo-input"]').type(todo)
      cy.get('[data-testid="add-button"]').click()
    })
    
    todos.forEach(todo => {
      cy.contains(todo).should('be.visible')
    })
  })

  it('toggles todo completion', () => {
    cy.get('[data-testid="todo-input"]').type('Complete this task')
    cy.get('[data-testid="add-button"]').click()
    
    cy.contains('Complete this task').should('be.visible')
    
    // Get the checkbox and verify it's unchecked
    cy.contains('Complete this task')
      .parent()
      .find('[type="checkbox"]')
      .should('not.be.checked')
      .click()
      .should('be.checked')
    
    // Toggle again
    cy.contains('Complete this task')
      .parent()
      .find('[type="checkbox"]')
      .click()
      .should('not.be.checked')
  })

  it('deletes a todo', () => {
    cy.get('[data-testid="todo-input"]').type('Todo to delete')
    cy.get('[data-testid="add-button"]').click()
    
    cy.contains('Todo to delete').should('be.visible')
    
    cy.contains('Todo to delete')
      .parent()
      .find('button')
      .contains('Delete')
      .click()
    
    cy.contains('Todo to delete').should('not.exist')
    cy.get('[data-testid="todo-list-empty"]').should('be.visible')
  })

  it('completes full workflow: add, toggle, and delete', () => {
    // Add todos
    cy.get('[data-testid="todo-input"]').type('First task')
    cy.get('[data-testid="add-button"]').click()
    
    cy.get('[data-testid="todo-input"]').type('Second task')
    cy.get('[data-testid="add-button"]').click()
    
    cy.get('[data-testid="todo-input"]').type('Third task')
    cy.get('[data-testid="add-button"]').click()
    
    // Verify all are present
    cy.contains('First task').should('be.visible')
    cy.contains('Second task').should('be.visible')
    cy.contains('Third task').should('be.visible')
    
    // Toggle first task
    cy.contains('First task')
      .parent()
      .find('[type="checkbox"]')
      .click()
      .should('be.checked')
    
    // Delete second task
    cy.contains('Second task')
      .parent()
      .find('button')
      .contains('Delete')
      .click()
    
    // Verify state
    cy.contains('First task').should('be.visible')
    cy.contains('Second task').should('not.exist')
    cy.contains('Third task').should('be.visible')
    
    // Verify first task is still checked
    cy.contains('First task')
      .parent()
      .find('[type="checkbox"]')
      .should('be.checked')
  })

  it('submits form with Enter key', () => {
    cy.get('[data-testid="todo-input"]').type('Todo with Enter{enter}')
    
    cy.contains('Todo with Enter').should('be.visible')
    cy.get('[data-testid="todo-input"]').should('have.value', '')
  })

  it('does not add empty todos', () => {
    cy.get('[data-testid="todo-input"]').type('   ')
    cy.get('[data-testid="add-button"]').click()
    
    cy.get('[data-testid="todo-list-empty"]').should('be.visible')
  })

  it('handles multiple operations in sequence', () => {
    // Add several todos
    const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4']
    tasks.forEach(task => {
      cy.get('[data-testid="todo-input"]').type(task)
      cy.get('[data-testid="add-button"]').click()
    })
    
    // Complete some
    cy.contains('Task 1').parent().find('[type="checkbox"]').click()
    cy.contains('Task 3').parent().find('[type="checkbox"]').click()
    
    // Delete some
    cy.contains('Task 2').parent().find('button').contains('Delete').click()
    
    // Verify final state
    cy.contains('Task 1').should('be.visible')
    cy.contains('Task 2').should('not.exist')
    cy.contains('Task 3').should('be.visible')
    cy.contains('Task 4').should('be.visible')
    
    cy.contains('Task 1').parent().find('[type="checkbox"]').should('be.checked')
    cy.contains('Task 3').parent().find('[type="checkbox"]').should('be.checked')
    cy.contains('Task 4').parent().find('[type="checkbox"]').should('not.be.checked')
  })
})

