# Devourer Usage Examples

This file contains example prompts and expected outputs when using the Devourer skill.

## Example 1: Basic Button

**User Prompt:**
```
Create a primary button using the color #3B82F6
```

**Expected Output:**
- React button component with TypeScript
- Primary variant using #3B82F6
- All size options (sm, md, lg, xl)
- All variants (primary, secondary, outline, ghost, link)
- Interactive states (hover, active, focus, disabled)
- Loading state support
- Icon support
- Complete usage example

## Example 2: Themed Card from Hexed

**User Prompt:**
```
Generate a card component using this Hexed output:
{
  "primary": "#3B82F6",
  "secondary": "#8B5CF6",
  "accent": "#EC4899",
  "neutral": {
    "50": "#F9FAFB",
    "900": "#111827"
  }
}
```

**Expected Output:**
- Card component in requested framework (defaults to React)
- Elevated, outlined, and filled variants
- Uses primary color for borders/accents
- Proper neutral colors for backgrounds
- CardHeader, CardBody, CardFooter sub-components
- Hoverable and clickable options
- Usage examples

## Example 3: Complete Form Components

**User Prompt:**
```
I need a login form with email input, password input, and submit button.
Use Vue 3 with this palette: primary #3B82F6, error #EF4444
```

**Expected Output:**
- Vue 3 components with Composition API
- Email input with validation states
- Password input with show/hide toggle
- Submit button in primary color
- Error states using #EF4444
- Form layout example
- Accessibility attributes
- TypeScript types

## Example 4: Multi-Variant Button Set

**User Prompt:**
```
Create buttons in React showing all variants (primary, secondary, outline, ghost)
using these colors: primary #3B82F6, secondary #8B5CF6
```

**Expected Output:**
- Single Button component supporting all variants
- Primary variant uses #3B82F6
- Secondary variant uses #8B5CF6
- Outline and ghost variants derived from primary
- Complete prop interface
- Usage example showing all variants side-by-side

## Example 5: Accessible Input Field

**User Prompt:**
```
Generate an accessible text input with label, helper text, and error state support
```

**Expected Output:**
- Input component with proper ARIA attributes
- Label association (htmlFor/id)
- Helper text with aria-describedby
- Error state with aria-invalid
- Focus management
- Visual error indicators
- Semantic HTML structure

## Example 6: Navigation Component

**User Prompt:**
```
Create a horizontal navigation bar in HTML+CSS with these colors:
background: #111827, links: #60A5FA, active: #3B82F6
```

**Expected Output:**
- Semantic HTML <nav> structure
- CSS using custom properties
- Link hover states
- Active/current page indicator
- Responsive behavior
- Keyboard navigation support
- ARIA role and attributes

## Example 7: Data Table

**User Prompt:**
```
Generate a data table component with sortable headers and row hover states
```

**Expected Output:**
- Table component with semantic HTML
- Sortable column headers with indicators
- Row hover effects
- Striped or bordered variants
- Responsive design options
- ARIA attributes for sorting
- Usage example with sample data

## Example 8: Modal Dialog

**User Prompt:**
```
Create a modal dialog component with overlay, close button, and focus trap
```

**Expected Output:**
- Modal component with portal/teleport support
- Overlay with backdrop blur
- Close button with aria-label
- Focus trap implementation
- Escape key to close
- Click outside to close (optional)
- Size variants
- Animation transitions
- Usage example

## Example 9: Alert/Toast Component

**User Prompt:**
```
Generate alert components for all semantic types (success, warning, error, info)
```

**Expected Output:**
- Alert component with all semantic variants
- Color-coded backgrounds and borders
- Icon support for each type
- Dismissible option
- Title and description support
- Proper ARIA role="alert"
- Usage examples for each type

## Example 10: Dark Mode Theme

**User Prompt:**
```
Create a button that supports both light and dark mode using this palette:
Light mode primary: #3B82F6
Dark mode primary: #60A5FA
```

**Expected Output:**
- Button component with theme support
- CSS custom properties for theming
- prefers-color-scheme media query
- Both color variants defined
- Smooth transition between themes
- Usage example showing theme toggle

## Common Request Patterns

### Simple Component Request
"Create a [component] using [color]"
→ Generates that component in React with specified color

### Multi-Component Request
"I need [component1], [component2], and [component3] using [palette]"
→ Generates all components with consistent theming

### Framework-Specific Request
"Generate a [component] in [Vue/React/HTML] with [colors]"
→ Generates component in specified framework

### Hexed Integration
"Use this Hexed output to create [components]"
→ Parses Hexed JSON and generates themed components

### Accessibility-Focused Request
"Create an accessible [component] with proper ARIA"
→ Emphasizes accessibility features in output

### State-Focused Request
"Show me [component] with all its states (hover, active, disabled)"
→ Generates component with explicit state demonstrations
