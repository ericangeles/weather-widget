# Contributing to the Weather Widget Micro Frontend

Thank you for considering contributing to our micro frontend architecture project! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

### Setting Up the Development Environment

1. **Clone the repositories**:
   ```bash
   git clone https://github.com/ericangeles/weather-widget.git
   git clone https://github.com/ericangeles/weather-container.git
   ```

2. **Install dependencies**:
   ```bash
   # For the Weather Widget
   cd weather-widget
   npm install

   # For the Container Application
   cd ../weather-container
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the weather-widget directory
   - Add your OpenWeatherMap API key:
     ```
     VITE_OPENWEATHER_API_KEY=your_api_key_here
     ```

4. **Run the development servers**:
   ```bash
   # In one terminal (Weather Widget)
   cd weather-widget
   npm run dev

   # In another terminal (Container Application)
   cd weather-container
   npm run dev
   ```

## Project Structure

### Weather Widget

```
weather-widget/
├── public/                # Static assets
├── src/
│   ├── components/        # Vue components
│   │   ├── WeatherWidget.vue  # Main micro frontend component
│   │   └── ...
│   ├── App.vue            # Root component
│   └── main.ts            # Entry point
└── vite.config.ts         # Vite configuration with Module Federation
```

### Container Application

```
weather-container/
├── public/                # Static assets
├── src/
│   ├── App.vue            # Root component that integrates micro frontends
│   └── main.ts            # Entry point
└── vite.config.ts         # Vite configuration with Module Federation
```

## Coding Standards

### General Guidelines

- Follow the Vue.js Style Guide
- Use TypeScript for type safety
- Write unit tests for new features
- Keep components small and focused on a single responsibility

### Naming Conventions

- **Components**: PascalCase (e.g., `WeatherWidget.vue`)
- **Files**: kebab-case (e.g., `weather-service.ts`)
- **CSS Classes**: kebab-case (e.g., `.weather-container`)
- **TypeScript Interfaces**: PascalCase with 'I' prefix (e.g., `IWeatherData`)

### Code Formatting

We use ESLint and Prettier for code formatting. Run the linter before submitting a pull request:

```bash
npm run lint
```

## Git Workflow

### Branching Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: New features or enhancements
- `bugfix/*`: Bug fixes
- `release/*`: Release preparation

### Commit Messages

Follow the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or tools

Example:
```
feat(weather): add temperature unit conversion
```

## Pull Request Process

1. **Create a branch** from `develop` for your changes
2. **Make your changes** and commit them
3. **Write or update tests** as needed
4. **Update documentation** to reflect any changes
5. **Submit a pull request** to the `develop` branch
6. **Address review comments** and update your PR as needed

## Testing

### Unit Tests

Write unit tests for all new features and bug fixes:

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Integration Tests

For changes that affect the interaction between micro frontends, write integration tests.

## Documentation

Update documentation when making changes:

- Update README.md files as needed
- Document new features in API-DOCUMENTATION.md
- Add troubleshooting information to TROUBLESHOOTING.md
- Update architecture documentation for significant changes

## Versioning

We follow Semantic Versioning (SemVer):

- MAJOR version for incompatible API changes
- MINOR version for new functionality in a backward-compatible manner
- PATCH version for backward-compatible bug fixes

## Communication

- Use GitHub Issues for bug reports and feature requests
- Use Pull Requests for code reviews and discussions
- Join our Slack channel for real-time communication

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
