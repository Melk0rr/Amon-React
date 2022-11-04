// General imports
import { CSSProperties, MouseEventHandler } from 'react'
import { HTMLElementProps } from '~/utils/types'

// Style import
import './css/Button.css'

// Add custom properties to the CSSProperties interface for type checking
interface ButtonCustomCSS extends CSSProperties {
  "--button-size": number | string
}

// Type check for Icon properties
interface ButtonProps extends HTMLElementProps {
  size?: number,
  onClick?: MouseEventHandler
}

/**
 * Simple component to render an html button
 * @param   {CLickableElementProps} props : component properties
 * @returns {JSX.Element} : HTML button
 */
const Button = ({
  id,
  className,
  onClick,
  size,
  style,
  children = "Button"
}: ButtonProps): JSX.Element =>

  <button
    id={id}
    className={`AmonReact-Button ${className ?? ''}`.trim()}
    onClick={onClick}
    style={{ 
      ...style,
      "--button-size": size ? `${size}px` : 'auto' 
    } as ButtonCustomCSS}
  >
    {children}
  </button>

export default Button