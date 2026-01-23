# Component Patterns Reference

This reference provides detailed implementation patterns for each component type.

## Button Component Patterns

### React Implementation

```typescript
import React, { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active focus:ring-primary',
      secondary: 'bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-active focus:ring-secondary',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary-active',
      ghost: 'text-primary hover:bg-primary/10 active:bg-primary/20',
      link: 'text-primary hover:underline',
    };
    
    const sizeStyles = {
      sm: 'text-sm px-3 py-1.5 rounded',
      md: 'text-base px-4 py-2 rounded-md',
      lg: 'text-lg px-6 py-3 rounded-lg',
      xl: 'text-xl px-8 py-4 rounded-xl',
    };
    
    const classes = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      disabled && 'opacity-50 cursor-not-allowed',
      className,
    ].filter(Boolean).join(' ');
    
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block animate-spin mr-2">⏳</span>
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);
```

### Vue Implementation

```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  fullWidth?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  isLoading: false,
  fullWidth: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active focus:ring-primary',
  secondary: 'bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-active focus:ring-secondary',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-primary hover:bg-primary/10',
  link: 'text-primary hover:underline'
}

const sizeClasses = {
  sm: 'text-sm px-3 py-1.5 rounded',
  md: 'text-base px-4 py-2 rounded-md',
  lg: 'text-lg px-6 py-3 rounded-lg',
  xl: 'text-xl px-8 py-4 rounded-xl'
}

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center font-medium transition-colors',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.fullWidth && 'w-full',
  (props.disabled || props.isLoading) && 'opacity-50 cursor-not-allowed'
].filter(Boolean).join(' '))
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || isLoading"
    @click="emit('click', $event)"
  >
    <span v-if="isLoading" class="inline-block animate-spin mr-2">⏳</span>
    <slot name="left-icon" />
    <slot />
    <slot name="right-icon" />
  </button>
</template>
```

## Card Component Patterns

### React Implementation

```typescript
import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  hoverable = false,
  clickable = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-lg transition-all';
  
  const variantStyles = {
    elevated: 'bg-white shadow-md hover:shadow-lg',
    outlined: 'bg-white border-2 border-gray-200',
    filled: 'bg-gray-50',
  };
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const classes = [
    baseStyles,
    variantStyles[variant],
    paddingStyles[padding],
    hoverable && 'hover:transform hover:-translate-y-1',
    clickable && 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);
```

## Input Component Patterns

### React Implementation with Validation States

```typescript
import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    const baseStyles = 'px-4 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2';
    
    const stateStyles = error
      ? 'border-red-500 focus:ring-red-500'
      : success
      ? 'border-green-500 focus:ring-green-500'
      : 'border-gray-300 focus:ring-primary';
    
    const inputClasses = [
      baseStyles,
      stateStyles,
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      fullWidth && 'w-full',
      props.disabled && 'bg-gray-100 cursor-not-allowed',
      className,
    ].filter(Boolean).join(' ');
    
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {success && (
          <p className="mt-1 text-sm text-green-600">{success}</p>
        )}
        
        {helperText && !error && !success && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
```

## Accessibility Patterns

### Focus Management

```typescript
// Focus trap for modals
export const useFocusTrap = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    element.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => element.removeEventListener('keydown', handleTab);
  }, [ref]);
};
```

### ARIA Announcements

```typescript
// Live region announcer for screen readers
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  document.body.appendChild(announcer);
  
  setTimeout(() => {
    announcer.textContent = message;
  }, 100);
  
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
};
```

## Color Contrast Utilities

```typescript
// Calculate WCAG contrast ratio
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Check if contrast meets WCAG AA standard
export const meetsWCAGAA = (foreground: string, background: string): boolean => {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= 4.5; // AA standard for normal text
};
```
