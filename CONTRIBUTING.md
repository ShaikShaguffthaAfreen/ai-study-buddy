# CONTRIBUTING

Thank you for your interest in contributing to AI Study Buddy! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on constructive feedback
- Respect maintainer decisions

## How to Contribute

### Reporting Bugs

1. **Check if bug already exists**: Search [Issues](https://github.com/yourusername/ai-study-buddy/issues)
2. **Create new issue** with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Screenshots if applicable

### Requesting Features

1. **Check for existing requests**: Search discussions
2. **Open discussion** with:
   - Feature description
   - Use case and benefits
   - Proposed implementation (if you have ideas)

### Submitting Code

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-study-buddy.git
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes**
   - Follow code style conventions
   - Write tests for new features
   - Update documentation
   - Keep commits atomic and well-documented

4. **Run tests**
   ```bash
   npm test
   npm run lint
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Use clear title and description
   - Link related issues
   - Explain changes and rationale
   - Include screenshots for UI changes

## Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/ai-study-buddy.git
cd ai-study-buddy

# Install dependencies
npm install

# Create .env.local from example
cp .env.example .env.local

# Start development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint
```

## Code Style

### TypeScript
- Use strict mode
- Avoid `any` types where possible
- Use interfaces for object shapes
- Document complex functions with JSDoc

### React
- Use functional components with hooks
- Keep components focused and small
- Use meaningful prop names
- Add PropTypes or TypeScript types

### File Organization
```
Feature/
├── Component.tsx        # Component file
├── Component.test.tsx   # Tests
└── Component.module.css # Styles (if needed)
```

## Commit Convention

Use conventional commits:
```
feat: add new feature
fix: fix a bug
docs: update documentation
test: add or update tests
refactor: refactor code
style: formatting changes
ci: CI/CD configuration
```

Example:
```bash
git commit -m "feat: add spaced repetition algorithm for flashcards"
git commit -m "fix: correct summary algorithm edge case"
```

## Documentation

- Update README.md for user-facing changes
- Update architecture docs for structural changes
- Add code comments for complex logic
- Include examples for new features

## Pull Request Process

1. Update documentation
2. Add/update tests (aim for 80%+ coverage)
3. Ensure tests pass: `npm test`
4. Ensure linter passes: `npm run lint`
5. Update CHANGELOG if applicable
6. Request review from maintainers
7. Address feedback
8. Maintainer merges when approved

## Testing Guidelines

### Unit Tests
```typescript
describe('Feature', () => {
  it('should do something', () => {
    // Arrange
    const input = ...
    
    // Act
    const result = ...
    
    // Assert
    expect(result).toBe(...)
  })
})
```

### Test Coverage
- Aim for 80%+ coverage
- Test edge cases
- Test error scenarios
- Mock external dependencies

## Reporting Security Issues

**Do not** create public issues for security vulnerabilities.

Instead, email security@yourdomain.com with:
- Description of vulnerability
- Impact assessment
- Suggested fix (if available)

## Questions?

- 📖 Check [Documentation](./docs)
- 💬 Start a [Discussion](https://github.com/yourusername/ai-study-buddy/discussions)
- 📧 Email: support@yourdomain.com

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Acknowledged in project README

---

Thank you for contributing! 🙏
