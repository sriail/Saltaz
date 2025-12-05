# Contributing to SalTaz Emulator

Thank you for your interest in contributing to SalTaz! This guide will help you get started.

## Development Setup

### Prerequisites

- Modern web browser (Chrome/Firefox recommended)
- Text editor or IDE (VS Code, Sublime, etc.)
- Git
- Local web server (Python, Node.js, or PHP)

### Getting Started

1. **Fork the repository**
2. **Clone your fork:**
```bash
git clone https://github.com/[your-username]/Saltaz.git
cd Saltaz
```

3. **Create a feature branch:**
```bash
git checkout -b feature/your-feature-name
```

4. **Start local server:**
```bash
python3 -m http.server 8000
```

5. **Open in browser:**
```
http://localhost:8000
```

## Project Structure

```
Saltaz/
├── index.html          # Main HTML structure
├── styles.css          # Styling and themes
├── emulator.js         # v86 emulation core
├── ui.js              # UI controller and interactions
├── metrics.js         # Performance monitoring
├── README.md          # Project documentation
├── DEPLOYMENT.md      # Deployment guide
└── .gitignore         # Git ignore rules
```

## Code Style

### JavaScript

- Use modern ES6+ syntax
- Use `const` and `let`, avoid `var`
- Use arrow functions where appropriate
- Add JSDoc comments for functions
- Use meaningful variable names

Example:
```javascript
/**
 * Initialize the emulator with configuration
 * @param {Object} config - Emulator configuration
 * @returns {Promise} Initialization promise
 */
async initialize(config) {
    // Implementation
}
```

### CSS

- Use CSS variables for theming
- Follow BEM naming convention for classes
- Keep specificity low
- Group related styles together
- Add comments for complex sections

Example:
```css
/* Component: Modal */
.modal {
    /* Base styles */
}

.modal__header {
    /* Header styles */
}

.modal__content {
    /* Content styles */
}
```

### HTML

- Use semantic HTML5 elements
- Add ARIA labels for accessibility
- Keep structure clean and readable
- Use data attributes for JS hooks

## Feature Development

### Adding New Features

1. **Check existing issues** for similar requests
2. **Open an issue** to discuss your idea
3. **Create a feature branch**
4. **Implement the feature**
5. **Test thoroughly**
6. **Submit a pull request**

### Testing Checklist

Before submitting a PR, ensure:

- [ ] Feature works in Chrome
- [ ] Feature works in Firefox
- [ ] Feature works in Safari (if possible)
- [ ] Light mode works correctly
- [ ] Dark mode works correctly
- [ ] No console errors
- [ ] No breaking changes to existing features
- [ ] Code is properly formatted
- [ ] Comments are added where necessary

## Areas for Contribution

### High Priority

1. **ISO Integration**: Add support for custom SalTaz/SliTaz ISOs
2. **Offline Support**: Implement service worker for offline functionality
3. **Local File System**: Enhance local file storage capabilities
4. **Performance**: Optimize emulation performance
5. **Mobile Support**: Improve mobile/tablet experience

### Medium Priority

1. **Additional Metrics**: Add more performance metrics
2. **Keyboard Shortcuts**: Add more shortcuts
3. **Themes**: Add more theme options
4. **Accessibility**: Improve ARIA labels and keyboard navigation
5. **Documentation**: Improve inline documentation

### Low Priority

1. **Easter Eggs**: Fun hidden features
2. **Animations**: Add subtle UI animations
3. **Sound**: Add audio support
4. **Snapshots**: Save/restore system state

## Bug Reports

When reporting bugs, include:

1. **Browser & Version**: e.g., Chrome 120.0
2. **Operating System**: e.g., Windows 11, macOS 14
3. **Steps to Reproduce**: Clear, numbered steps
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens
6. **Screenshots**: If applicable
7. **Console Logs**: Any error messages

## Pull Request Process

1. **Update documentation** if needed
2. **Add comments** to complex code
3. **Test thoroughly** across browsers
4. **Keep PRs focused** on single feature/fix
5. **Write clear commit messages**
6. **Reference related issues**

### Commit Message Format

```
feat: Add offline support with service worker

- Implement service worker for caching
- Add offline indicator in UI
- Cache static assets
- Handle offline state gracefully

Fixes #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Code Review

All submissions require review. We'll:

1. Review code quality
2. Test functionality
3. Check for breaking changes
4. Suggest improvements
5. Approve or request changes

## Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Give constructive feedback
- Be patient with new contributors
- Follow the code of conduct

## Getting Help

- **Questions?** Open a discussion issue
- **Stuck?** Ask in the PR comments
- **Ideas?** Open a feature request issue

## Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in commit messages

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

## Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

For more information, see:
- [README.md](README.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
