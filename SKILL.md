---
name: devourer
description: Component Theme Generator that transforms color palettes into production-ready UI components. Use when the user requests themed components (buttons, cards, inputs, forms, etc.) based on a color system or palette, especially when consuming output from Hexed or other color generation tools. Generates complete component code in React, Vue, or HTML+CSS with proper theming, variants, states, and accessibility considerations.
---

# Devourer

**Devourer** is a color-to-component generator that transforms color palettes into production-ready, themed UI components.

## Overview

Devourer accepts color palettes (from Hexed or any source) and returns complete, themed component code ready for use in React, Vue, or HTML+CSS projects. The output includes variants, states, accessibility features, and TypeScript types.

This skill does **not** generate color palettes or design systems. It only produces UI components from existing color systems.

---

## When to Use This Skill

Use Devourer when the user:
- Requests UI components styled with specific colors
- Wants to generate themed components from Hexed output
- Needs buttons, inputs, cards, or other components with custom theming
- Asks for component code in React, Vue, or HTML+CSS
- Mentions terms like: "themed component", "styled button", "component theme", "UI components"

**Example triggers:**
- "Create a button using these colors"
- "Generate a themed card component from my Hexed palette"
- "Build me input fields styled with this color system"
- "Make a modal component in Vue with these colors"

---

## What Devourer Produces

Given a color palette, Devourer produces **production-ready component code** including:

1. **Multiple variants**: Primary, secondary, outline, ghost, link
2. **Interactive states**: Hover, active, focus, disabled
3. **Size options**: xs, sm, md, lg, xl
4. **Accessibility features**: WCAG compliance, ARIA attributes, keyboard navigation
5. **TypeScript types**: Full type safety for React/Vue components
6. **Usage examples**: Code samples showing how to use the component

The output is copy-paste ready and follows framework best practices.

---

## Usage Instructions

### Step 1: Parse Color Input

Accept color palettes in multiple formats:

**From Hexed output:**
\`\`\`python
import json

# Load Hexed color system
with open('/mnt/user-data/uploads/color-system.json', 'r') as f:
    hexed_output = json.load(f)

# Extract colors
primary = hexed_output['colors']['core']['primary']['hex']
secondary = hexed_output['colors']['core']['secondary']['hex']
neutrals = hexed_output['colors']['neutrals']['ramp']
\`\`\`

**From direct hex values:**
\`\`\`python
colors = {
    'primary': '#3B82F6',
    'secondary': '#8B5CF6',
    'accent': '#EC4899'
}
\`\`\`

### Step 2: Generate State Variants

Use the color utilities to create hover, active, and disabled states:

\`\`\`python
import sys
sys.path.append('/mnt/skills/user/devourer')

from scripts.color_utils import generate_state_variants, get_contrast_ratio

# Generate variants
primary_variants = generate_state_variants('#3B82F6')
# Returns: {'default': '#3B82F6', 'hover': '...', 'active': '...', 'disabled': '...'}

# Check accessibility
contrast = get_contrast_ratio('#3B82F6', '#FFFFFF')
# Returns: 4.5 (for WCAG AA compliance)
\`\`\`

### Step 3: Generate Component Code

Create the component in the requested framework:

**React Example:**
\`\`\`typescript
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  // Component implementation with proper theming
};
\`\`\`

**Vue Example:**
\`\`\`vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})
</script>
\`\`\`

### Step 4: Save and Present Outputs

Save component code to \`/mnt/user-data/outputs/\` so the user can access it:

\`\`\`python
# Save component
with open('/mnt/user-data/outputs/Button.tsx', 'w') as f:
    f.write(button_code)

# Save theme tokens
with open('/mnt/user-data/outputs/theme.css', 'w') as f:
    f.write(css_variables)

# Save TypeScript types
with open('/mnt/user-data/outputs/types.ts', 'w') as f:
    f.write(type_definitions)
\`\`\`

Then use \`present_files\` to share them with the user.

---

## Component Types

Devourer supports these component categories:

### Interactive
- **Button**: All variants, loading states, icon support
- **Input**: Text, email, password with validation states
- **Select**: Dropdown with custom styling
- **Checkbox/Radio**: Custom styled with accessibility
- **Switch**: Toggle with smooth animations
- **Slider**: Range input with value display

### Container
- **Card**: Elevated, outlined, filled variants
- **Modal**: Overlay with focus trap
- **Panel**: Collapsible sections
- **Alert**: Success, warning, error, info types

### Navigation
- **NavBar**: Horizontal/vertical layouts
- **Tabs**: Multiple style variants
- **Breadcrumb**: With separators
- **Pagination**: Numbered navigation

### Data Display
- **Table**: Sortable headers, row actions
- **Badge**: Status indicators
- **Avatar**: With fallback states
- **Progress**: Linear and circular

---

## Output Structure

Each component includes:

\`\`\`typescript
// 1. TypeScript interface
interface ComponentProps {
  variant?: string;
  size?: string;
  // ... other props
}

// 2. Component implementation
export const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  // Styled implementation with proper theming
};

// 3. Usage example
<Component variant="primary" size="lg">
  Content
</Component>
\`\`\`

---

## Framework Patterns

### React (TypeScript)
- Functional components with hooks
- Proper prop types and interfaces
- Ref forwarding where needed
- Event handler typing

### Vue 3 (Composition API)
- \`<script setup>\` syntax
- TypeScript interfaces
- Emits and props typing
- Slot support

### HTML + CSS
- Semantic HTML structure
- CSS custom properties for theming
- BEM naming convention
- No framework dependencies

---

## Best Practices

1. **Always validate color input** - Check for valid hex values or Hexed structure
2. **Check WCAG contrast ratios** - Use \`get_contrast_ratio()\` to verify accessibility
3. **Generate state variants** - Use \`generate_state_variants()\` for consistent theming
4. **Include accessibility features** - ARIA attributes, keyboard navigation, focus management
5. **Provide usage examples** - Show the user how to use the component
6. **Save outputs to \`/mnt/user-data/outputs/\`** so users can download them

---

## Example Workflow

**User:** "Create a button component using my Hexed colors"

**Claude response pattern:**
1. Parse Hexed color system or hex values
2. Generate state variants for hover/active/disabled
3. Check WCAG contrast compliance
4. Generate component code in requested framework (default: React)
5. Include TypeScript types and props interface
6. Add usage example
7. Save to \`/mnt/user-data/outputs/Button.tsx\`
8. Use \`present_files\` to share the file

---

## Limitations

- Components are single-file (CSS/JS inline for React/Vue)
- Does not generate color palettes (use Hexed for that)
- No state management or routing included
- Each component request is independent
- Default framework is React if not specified

---

## Technical Details

**Color Algorithm:**
1. Parse color input (Hexed JSON, hex array, or named colors)
2. Map colors to component roles (primary, secondary, accent, neutrals)
3. Generate state variants using lightness adjustment
4. Calculate WCAG contrast ratios for text/background pairs
5. Apply colors to component styles with proper fallbacks

**Accessibility:**
- WCAG AA contrast ratio: 4.5:1 (normal text), 3:1 (large text)
- WCAG AAA contrast ratio: 7:1 (normal text), 4.5:1 (large text)
- Full keyboard navigation support
- Screen reader compatible with ARIA attributes
- Focus management and visual indicators

**Dependencies:**
- Pillow for color manipulation
- No runtime dependencies for generated components

---

## Troubleshooting

**"Invalid color format"**: Check that hex values start with # and are 6 characters. Hexed output should be JSON with proper structure.

**"Contrast too low"**: Colors may not meet WCAG standards. Suggest darker foreground or lighter background colors.

**"Component not rendering"**: Check framework-specific requirements (React imports, Vue setup syntax).

---

## Reference Files

- \`references/component_patterns.md\` - Detailed implementation patterns for each component type
- \`assets/theme-template.css\` - Complete CSS custom properties template
- \`assets/types-template.ts\` - TypeScript type definitions for all component props
- \`scripts/color_utils.py\` - Color variant generation and WCAG contrast utilities

---

Created by Heathen ([x.com/heathenft](https://x.com/heathenft))
