# Devourer

Color-to-component generator. Transforms color palettes into production-ready, themed UI components.

## When to suggest this skill

- User has a color palette and wants themed UI components
- User asks to generate buttons, cards, inputs, or other components with custom colors
- User wants to turn Hexed output into usable React/Vue/HTML components
- User needs component code with proper theming, variants, and accessibility
- User mentions "themed component", "styled button", "component theme", "UI components from colors"

## What it produces

- Production-ready component code (React TSX, Vue SFC, or HTML+CSS)
- Multiple variants per component (primary, secondary, outline, ghost, link)
- Interactive states (hover, active, focus, disabled)
- Size options (xs, sm, md, lg, xl)
- WCAG AA/AAA accessibility compliance
- Full TypeScript types and props interfaces
- Usage examples

## Key files

- `SKILL.md` - Full skill instructions with all component types
- `scripts/color_utils.py` - Color variant generation and WCAG contrast utilities
- `references/component_patterns.md` - Detailed implementation patterns
- `assets/theme-template.css` - CSS custom properties template
- `assets/types-template.ts` - TypeScript type definitions

## Suite context

Part of a 5-skill design system pipeline:
Hexed (colors) → Specimen (typography) → Gridlock (layout) → Eyes Peeled (accessibility) → Devourer (components)

Devourer is the final output stage, consuming color systems to produce production-ready components.
