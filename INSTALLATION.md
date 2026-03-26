# Installing Devourer

## Usage

Once installed:
1. Provide a color palette (from Hexed or hex values)
2. Request a component: *"Create a button using these colors"*
3. Specify framework if needed: *"Generate in Vue"*

## For Developers

### Running Locally

If you want to use Devourer's utilities locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/devourer-skill.git
cd devourer-skill

# Install dependencies
pip install pillow

# Use color utilities
python scripts/color_utils.py variants "#3B82F6"
python scripts/color_utils.py contrast "#3B82F6" "#FFFFFF"
```

### Integration

```python
from scripts.color_utils import generate_state_variants, get_contrast_ratio

# Generate color variants
variants = generate_state_variants("#3B82F6")
print(variants['hover'])  # Darker shade for hover state

# Check accessibility
ratio = get_contrast_ratio("#3B82F6", "#FFFFFF")
print(f"Contrast ratio: {ratio}:1")
```

## Requirements

- Python 3.8+
- Pillow (for color manipulation)

All dependencies are included in the skill environment.

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/devourer-skill/issues)
- **Documentation**: See [README.md](README.md)
- **Author**: [@heathenft](https://x.com/heathenft)
