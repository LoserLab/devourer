<div align="center">
  <img src="assets/devourer_logo.svg" alt="Devourer" width="200"/>
  
  <br/>
  <br/>
  
  **Color-to-Component Generator for Claude Skills**
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)]()
  [![Claude Skills](https://img.shields.io/badge/Claude-Skills-purple)]()
  
</div>

---

# Devourer

Devourer is a Claude skill that transforms color palettes into production-ready UI components.

## What It Does

- Accepts color palettes from Hexed or any color source
- Generates themed UI components in React, Vue, or HTML+CSS
- Creates complete component code with:
  - Multiple variants (primary, secondary, outline, ghost)
  - Interactive states (hover, active, focus, disabled)
  - Size variations (xs, sm, md, lg, xl)
  - Full TypeScript types
  - WCAG AA/AAA accessibility compliance
- Exports production-ready, copy-paste code

## Installation

### For Claude Users

Install Devourer from the [Claude Skills marketplace](https://claude.ai):
1. Go to Settings → Skills
2. Search for "Devourer"
3. Click "Add Skill"

See [INSTALLATION.md](INSTALLATION.md) for detailed instructions.

### For Developers

To use the color utilities locally:

```bash
pip install pillow
python scripts/color_utils.py variants "#3B82F6"
```

## Files

- `SKILL.md` - Instructions for Claude on how to use the skill
- `scripts/color_utils.py` - Color variant generation and WCAG contrast checking
- `references/component_patterns.md` - Detailed React/Vue implementation patterns
- `assets/theme-template.css` - CSS custom properties template
- `assets/types-template.ts` - TypeScript type definitions

## Usage

When a user requests a themed component:

1. Parse the color palette (Hexed output, hex values, or named colors)
2. Generate the component with proper theming
3. Include all variants, states, and accessibility features
4. Save to `/mnt/user-data/outputs/` and present to user

See `SKILL.md` for complete usage instructions.

## Algorithm

1. **Parse**: Accept color palette in any format (Hexed JSON, hex array, named colors)
2. **Map**: Assign colors to component roles (primary, secondary, accent, neutrals)
3. **Generate**: Create state variants (hover, active, focus, disabled)
4. **Validate**: Check WCAG contrast ratios for accessibility
5. **Output**: Production-ready component code with types and examples

## Supported Components

- **Interactive**: Button, Input, Select, Checkbox, Radio, Switch, Slider
- **Container**: Card, Modal, Panel, Alert, Toast
- **Navigation**: NavBar, Tabs, Breadcrumb, Pagination
- **Data Display**: Table, Badge, Avatar, Progress

## Export Formats

### React (TypeScript)
```tsx
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  // Production-ready component
};
```

### Vue 3 (Composition API)
```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}
</script>
```

### HTML + CSS
Clean semantic HTML with CSS custom properties for theming.

## Limitations

- Components are single-file (CSS/JS inline for React/Vue)
- Default framework is React if not specified
- Requires color input (doesn't generate palettes)
- Each component request is independent
- No state management or routing included

## Version

Current version: 1.0.0

## Author

Created by Heathen ([@heathenft](https://x.com/heathenft))

## License

MIT License

Copyright (c) 2026 Heathen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
