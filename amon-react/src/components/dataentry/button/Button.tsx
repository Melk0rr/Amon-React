// General imports
import { CSSProperties } from 'react'
import { CLickableElementProps } from '~/utils/types'

// Style import
import './css/Button.css'

// Add custom properties to the CSSProperties interface for type checking
interface ButtonCustomCSS extends CSSProperties {
  "--button-size": number | string
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
}: CLickableElementProps): JSX.Element =>

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