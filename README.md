# React Todo List with CI/CD Pipeline

A simple React todo list application with comprehensive testing (unit, integration, and E2E) and a GitHub Actions CI/CD pipeline.

## Features

- ✅ Add, toggle, and delete todos
- ✅ Clean, modern UI
- ✅ Unit tests for individual components
- ✅ Integration tests for component interactions
- ✅ E2E tests using Cypress
- ✅ Automated CI/CD pipeline with GitHub Actions
- ✅ Docker containerization with automatic push to GitHub Container Registry

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Jest** - Unit and integration testing
- **React Testing Library** - Component testing utilities
- **Cypress** - E2E testing
- **GitHub Actions** - CI/CD pipeline
- **Docker** - Containerization
- **Nginx** - Production web server

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd github-actions-practice
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Docker

Build the Docker image:
```bash
docker build -t todo-list .
```

Run the Docker container:
```bash
docker run -p 8080:80 todo-list
```

The app will be available at `http://localhost:8080`

Pull the image from GitHub Container Registry:
```bash
docker pull ghcr.io/<your-username>/<repository-name>:latest
```

## Testing

### Unit Tests

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Integration Tests

Integration tests are included in the test suite and run with the same commands:
```bash
npm test
```

### E2E Tests

Open Cypress Test Runner:
```bash
npm run cypress:open
```

Run Cypress tests headless:
```bash
npm run cypress:run
```

Or use the dedicated script:
```bash
npm run test:e2e
```

**Note:** Make sure the development server is running before executing E2E tests, or use the preview server:
```bash
npm run build
npm run preview &
npm run test:e2e
```

## Project Structure

```
github-actions-practice/
├── src/
│   ├── components/
│   │   ├── __tests__/          # Unit tests
│   │   ├── TodoForm.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   ├── __tests__/              # Integration tests
│   ├── App.jsx
│   ├── main.jsx
│   └── setupTests.js
├── cypress/
│   ├── e2e/
│   │   └── todo.cy.js          # E2E tests
│   └── support/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions pipeline
├── Dockerfile                  # Docker configuration
├── .dockerignore              # Docker ignore file
├── package.json
├── vite.config.js
├── jest.config.js
└── cypress.config.js
```

## GitHub Actions CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

1. **Unit Tests** - Runs Jest unit tests with coverage
2. **Integration Tests** - Runs integration tests after unit tests pass
3. **E2E Tests** - Runs Cypress E2E tests after integration tests pass
4. **Build and Push Docker Image** - Builds and pushes Docker image to GitHub Container Registry (only on successful test runs for pushes to main/develop)

The pipeline triggers on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Note:** Docker image is only built and pushed on successful pushes to `main` or `develop` branches (not on pull requests).

### Pipeline Jobs

1. **Unit Tests Job**
   - Runs all unit tests
   - Generates coverage reports
   - Uploads coverage to Codecov (optional)

2. **Integration Tests Job**
   - Runs integration tests
   - Depends on unit tests passing

3. **E2E Tests Job**
   - Builds the application
   - Starts the preview server
   - Runs Cypress E2E tests
   - Depends on integration tests passing

4. **Build and Push Docker Image Job**
   - Builds Docker image using Dockerfile
   - Pushes to GitHub Container Registry (ghcr.io)
   - Tags images with branch name, commit SHA, and latest (for main branch)
   - Uses Docker layer caching for faster builds
   - Only runs on successful pushes to main/develop branches

## Test Coverage

- **Unit Tests**: Test individual components in isolation
  - `TodoForm.test.jsx` - Form input and submission
  - `TodoItem.test.jsx` - Individual todo item rendering and interactions
  - `TodoList.test.jsx` - List rendering and empty states

- **Integration Tests**: Test component interactions
  - `App.integration.test.jsx` - Full app workflows including add, toggle, delete

- **E2E Tests**: Test user flows end-to-end
  - `todo.cy.js` - Complete user scenarios in the browser

## Docker Image

The application is automatically built and pushed to GitHub Container Registry when all tests pass on pushes to `main` or `develop` branches.

### Image Location

Images are published to: `ghcr.io/<your-username>/<repository-name>`

### Image Tags

- `main` or `develop` - Branch name tag
- `<branch>-<sha>` - Commit SHA tag (e.g., `main-abc1234`)
- `latest` - Latest tag (only for default branch, typically `main`)

### Pulling the Image

```bash
docker pull ghcr.io/<your-username>/<repository-name>:latest
```

### Running the Image

```bash
docker run -p 8080:80 ghcr.io/<your-username>/<repository-name>:latest
```

### Making the Image Public

By default, GitHub Container Registry images are private. To make them public:
1. Go to your repository on GitHub
2. Click on "Packages" in the right sidebar
3. Click on the package
4. Go to "Package settings"
5. Scroll down to "Danger Zone" and click "Change visibility"

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Ensure all tests pass
6. Submit a pull request

## License

ISC

