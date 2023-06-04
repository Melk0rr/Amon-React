// General imports
import { FC, CSSProperties, MouseEventHandler } from 'react'
import { HTMLElementProps } from 'utils/types'
import { Icon } from 'components'

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
  shape?: "round" | "default"
  icon?: string
}

/**
 * Simple component to render an html button
 * @param   {CLickableElementProps} props : component properties
 * @returns {JSX.Element} : HTML button
 */
const Button: FC<ButtonProps> = ({
  id,
  className,
  onClick,
  shape = "default",
  icon,
  size,
  style,
  children = "Button"
}) =>

  <button
    id={id}
    className={`AmonReact-Button ${className ?? ''}`.trim()}
    onClick={onClick}
    style={{
      ...style,
      "--button-size": size ? `${size}px` : 'auto',
      "--button-shape-radius": (shape === "round") ? "50px" : "5px"
    } as ButtonCustomCSS}
  >
    {icon && <Icon icon={icon} className="AmonReact-Button-icon" />}
    <span>{children}</span>
  </button>

export default Button