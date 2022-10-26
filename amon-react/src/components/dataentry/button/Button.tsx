// General imports
import { MouseEventHandler, CSSProperties } from 'react'
import { BaseObject } from '~/utils/types'

// Style import
import './css/Button.css'

// Add custom properties to the CSSProperties interface for type checking
interface ButtonCustomCSS extends CSSProperties {
  "--button-size": number | string
}

// Props interface
interface ButtonProps {
  id?: string,
  className?: string,
  onClick?: MouseEventHandler,
  size?: number,
  style?: BaseObject,
  children?: JSX.Element | string | number,
}

/**
 * Simple component to render an html button
 * @param   {ButtonProps} props : component properties
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
    style={{ ...style, "--button-size": `${size}px` } as ButtonCustomCSS}
  >
    {children}
  </button>

export default Button