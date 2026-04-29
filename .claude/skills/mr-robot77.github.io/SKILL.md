```markdown
# mr-robot77.github.io Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you how to contribute to the `mr-robot77.github.io` repository, a JavaScript-based project with no detected framework. You'll learn the project's coding conventions, how to implement new UI features, fix bugs or accessibility issues, and understand the typical development workflows. The repository follows conventional commit patterns and emphasizes organized, maintainable code.

## Coding Conventions

- **File Naming:**  
  Use camelCase for file names, e.g.:
  ```
  portfolio.js
  myComponent.js
  ```

- **Import Style:**  
  Use relative imports:
  ```js
  import { myFunction } from './utils.js';
  ```

- **Export Style:**  
  Use named exports:
  ```js
  // In utils.js
  export function myFunction() { ... }
  ```

- **Commit Messages:**  
  Follow [Conventional Commits](https://www.conventionalcommits.org/) with prefixes like `feat` and `fix`.  
  Example:
  ```
  feat: add toggle to portfolio section
  fix: correct aria-label for portfolio items
  ```

## Workflows

### Feature Enhancement with UI Update
**Trigger:** When you want to add or enhance a UI feature (e.g., toggle, widget) in the portfolio section.  
**Command:** `/add-ui-feature`

1. **Update HTML Layout:**  
   Edit `_layouts/portfolio.html` to add or modify the UI structure.
   ```html
   <!-- Example: Add a new toggle button -->
   <button id="portfolioToggle">Show More</button>
   ```

2. **Modify or Add CSS:**  
   Update `assets/css/portfolio.css` to style the new or changed UI elements.
   ```css
   #portfolioToggle {
     background: #222;
     color: #fff;
     border-radius: 4px;
   }
   ```

3. **Update or Write JavaScript:**  
   Implement interactivity or logic for the feature in `assets/js/portfolio.js`.
   ```js
   export function initPortfolioToggle() {
     const btn = document.getElementById('portfolioToggle');
     btn.addEventListener('click', () => {
       // Toggle portfolio section
     });
   }
   ```

---

### UI Accessibility or Bugfix
**Trigger:** When you want to fix a bug or improve accessibility for an existing UI component.  
**Command:** `/fix-ui-accessibility`

1. **Update HTML Layout:**  
   Edit `_layouts/portfolio.html` to improve markup or add accessibility attributes.
   ```html
   <!-- Example: Add aria-label for accessibility -->
   <button aria-label="Show more projects" id="portfolioToggle">Show More</button>
   ```

2. **Modify JavaScript Logic:**  
   Update `assets/js/portfolio.js` to enhance accessibility or fix bugs.
   ```js
   // Example: Ensure focus is managed for accessibility
   btn.addEventListener('click', () => {
     document.getElementById('portfolioSection').focus();
   });
   ```

## Testing Patterns

- **Test File Pattern:**  
  Test files are named with the pattern `*.test.*` (e.g., `portfolio.test.js`).
- **Testing Framework:**  
  The specific testing framework is unknown, but tests are likely written in JavaScript and placed alongside or near the code they test.

## Commands

| Command             | Purpose                                              |
|---------------------|------------------------------------------------------|
| /add-ui-feature     | Start a new UI feature or enhancement workflow       |
| /fix-ui-accessibility | Begin a bugfix or accessibility improvement workflow |

```