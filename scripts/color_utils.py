#!/usr/bin/env python3
"""
Color utilities for Devourer skill.
Generates color variants (hover, active, disabled states) and checks WCAG contrast.
"""

import colorsys
import json
import sys
from typing import Dict, Tuple


def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:
    """Convert hex color to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def rgb_to_hex(rgb: Tuple[int, int, int]) -> str:
    """Convert RGB tuple to hex color."""
    return '#{:02x}{:02x}{:02x}'.format(*rgb)


def adjust_lightness(hex_color: str, factor: float) -> str:
    """
    Adjust the lightness of a color.
    factor > 1 makes it lighter, factor < 1 makes it darker.
    """
    r, g, b = hex_to_rgb(hex_color)
    h, l, s = colorsys.rgb_to_hls(r/255, g/255, b/255)
    
    # Adjust lightness
    l = max(0, min(1, l * factor))
    
    r, g, b = colorsys.hls_to_rgb(h, l, s)
    return rgb_to_hex((int(r * 255), int(g * 255), int(b * 255)))


def generate_state_variants(base_color: str) -> Dict[str, str]:
    """
    Generate color variants for different interaction states.
    Returns hover, active, focus, and disabled variants.
    """
    return {
        'default': base_color,
        'hover': adjust_lightness(base_color, 0.85),  # 15% darker
        'active': adjust_lightness(base_color, 0.75),  # 25% darker
        'focus': base_color,  # Focus uses ring, not color change
        'disabled': base_color + '80',  # 50% opacity (hex alpha)
    }


def get_luminance(hex_color: str) -> float:
    """Calculate relative luminance for WCAG contrast ratio."""
    r, g, b = hex_to_rgb(hex_color)
    
    # Convert to 0-1 range and apply gamma correction
    rgb = []
    for c in (r, g, b):
        c = c / 255
        if c <= 0.03928:
            rgb.append(c / 12.92)
        else:
            rgb.append(((c + 0.055) / 1.055) ** 2.4)
    
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]


def get_contrast_ratio(color1: str, color2: str) -> float:
    """Calculate WCAG contrast ratio between two colors."""
    l1 = get_luminance(color1)
    l2 = get_luminance(color2)
    
    lighter = max(l1, l2)
    darker = min(l1, l2)
    
    return (lighter + 0.05) / (darker + 0.05)


def meets_wcag_aa(foreground: str, background: str, large_text: bool = False) -> bool:
    """
    Check if color combination meets WCAG AA standards.
    Large text requires 3:1, normal text requires 4.5:1.
    """
    ratio = get_contrast_ratio(foreground, background)
    required_ratio = 3.0 if large_text else 4.5
    return ratio >= required_ratio


def meets_wcag_aaa(foreground: str, background: str, large_text: bool = False) -> bool:
    """
    Check if color combination meets WCAG AAA standards.
    Large text requires 4.5:1, normal text requires 7:1.
    """
    ratio = get_contrast_ratio(foreground, background)
    required_ratio = 4.5 if large_text else 7.0
    return ratio >= required_ratio


def generate_theme_from_palette(palette: Dict[str, str]) -> Dict[str, any]:
    """
    Generate a complete theme with state variants from a color palette.
    
    Args:
        palette: Dictionary with color roles (primary, secondary, accent, etc.)
    
    Returns:
        Complete theme with all color variants
    """
    theme = {}
    
    for role, color in palette.items():
        if isinstance(color, dict):
            # Handle nested color objects (like neutral.50, neutral.900)
            theme[role] = color
        else:
            # Generate state variants for each color
            theme[role] = generate_state_variants(color)
    
    return theme


def suggest_text_color(background: str) -> str:
    """
    Suggest white or black text based on background color.
    Returns color that provides better contrast.
    """
    white_ratio = get_contrast_ratio('#FFFFFF', background)
    black_ratio = get_contrast_ratio('#000000', background)
    
    return '#FFFFFF' if white_ratio > black_ratio else '#000000'


def main():
    """CLI interface for color utilities."""
    if len(sys.argv) < 2:
        print("Usage: python color_utils.py <command> [args]")
        print("\nCommands:")
        print("  variants <hex_color>           - Generate state variants")
        print("  contrast <color1> <color2>     - Check contrast ratio")
        print("  suggest <background_color>     - Suggest text color")
        print("  theme <palette_json>           - Generate complete theme")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == 'variants':
        if len(sys.argv) < 3:
            print("Usage: python color_utils.py variants <hex_color>")
            sys.exit(1)
        
        variants = generate_state_variants(sys.argv[2])
        print(json.dumps(variants, indent=2))
    
    elif command == 'contrast':
        if len(sys.argv) < 4:
            print("Usage: python color_utils.py contrast <color1> <color2>")
            sys.exit(1)
        
        ratio = get_contrast_ratio(sys.argv[2], sys.argv[3])
        aa = meets_wcag_aa(sys.argv[2], sys.argv[3])
        aaa = meets_wcag_aaa(sys.argv[2], sys.argv[3])
        
        print(json.dumps({
            'ratio': round(ratio, 2),
            'wcag_aa': aa,
            'wcag_aaa': aaa
        }, indent=2))
    
    elif command == 'suggest':
        if len(sys.argv) < 3:
            print("Usage: python color_utils.py suggest <background_color>")
            sys.exit(1)
        
        suggestion = suggest_text_color(sys.argv[2])
        print(suggestion)
    
    elif command == 'theme':
        if len(sys.argv) < 3:
            print("Usage: python color_utils.py theme <palette_json>")
            sys.exit(1)
        
        palette = json.loads(sys.argv[2])
        theme = generate_theme_from_palette(palette)
        print(json.dumps(theme, indent=2))
    
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)


if __name__ == '__main__':
    main()
