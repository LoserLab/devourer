/**
 * Devourer Component Types Template
 * Common TypeScript type definitions for themed components
 */

// === BASE TYPES ===

export type ColorRole = 'primary' | 'secondary' | 'accent' | 'neutral';

export type SemanticColor = 'success' | 'warning' | 'error' | 'info';

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ComponentVariant = 
  | 'solid' 
  | 'outline' 
  | 'ghost' 
  | 'link';

// === THEME TYPES ===

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
}

export interface ColorStateVariants {
  default: string;
  hover: string;
  active: string;
  focus: string;
  disabled: string;
}

export interface Theme {
  colors: {
    primary: ColorStateVariants;
    secondary: ColorStateVariants;
    accent: ColorStateVariants;
    neutral: ColorPalette['neutral'];
    semantic: {
      success: ColorStateVariants;
      warning: ColorStateVariants;
      error: ColorStateVariants;
      info: ColorStateVariants;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  typography: {
    fontFamily: {
      sans: string;
      mono: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// === COMPONENT PROP TYPES ===

export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export interface ButtonBaseProps extends BaseComponentProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
  colorScheme?: ColorRole;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface InputBaseProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  success?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  size?: ComponentSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface CardBaseProps extends BaseComponentProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: ComponentSize;
  hoverable?: boolean;
  clickable?: boolean;
}

export interface SelectBaseProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  size?: ComponentSize;
  fullWidth?: boolean;
}

export interface CheckboxBaseProps extends BaseComponentProps {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isChecked?: boolean;
  isIndeterminate?: boolean;
  size?: ComponentSize;
}

export interface ModalBaseProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ComponentSize;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  isCentered?: boolean;
}

export interface AlertBaseProps extends BaseComponentProps {
  variant?: SemanticColor;
  title?: string;
  isDismissible?: boolean;
  onDismiss?: () => void;
}

export interface BadgeBaseProps extends BaseComponentProps {
  variant?: ComponentVariant;
  colorScheme?: ColorRole | SemanticColor;
  size?: ComponentSize;
}

export interface TabsBaseProps extends BaseComponentProps {
  variant?: 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded';
  colorScheme?: ColorRole;
  size?: ComponentSize;
  orientation?: 'horizontal' | 'vertical';
}

// === UTILITY TYPES ===

export type PolymorphicRef<C extends React.ElementType> = 
  React.ComponentPropsWithRef<C>['ref'];

export type AsProp<C extends React.ElementType> = {
  as?: C;
};

export type PropsToOmit<C extends React.ElementType, P> = 
  keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// === ACCESSIBILITY TYPES ===

export interface AriaLabelProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export interface AriaStateProps {
  'aria-checked'?: boolean | 'mixed';
  'aria-disabled'?: boolean;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-invalid'?: boolean;
  'aria-pressed'?: boolean | 'mixed';
  'aria-required'?: boolean;
  'aria-selected'?: boolean;
}

export interface FocusableProps {
  autoFocus?: boolean;
  tabIndex?: number;
}

// === EVENT HANDLER TYPES ===

export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type ChangeHandler<T = HTMLInputElement> = (event: React.ChangeEvent<T>) => void;
export type FocusHandler<T = HTMLElement> = (event: React.FocusEvent<T>) => void;
export type KeyboardHandler = (event: React.KeyboardEvent<HTMLElement>) => void;
