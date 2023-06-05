// General imports
import { FC, MouseEventHandler } from 'react'
import { HTMLElementProps } from 'utils/types'
import { Icon } from 'components'

// Style import
import './css/Button.css'

// Type check for Icon properties
interface ButtonProps extends HTMLElementProps {
  size?: number,
  onClick?: MouseEventHandler
  shape?: "round" | "default"
  icon?: string
}

/**
 * Button component rendering a simple button
 * @param   {ButtonProps} props : component properties
 * @returns {FC} : HTML button
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
      width: size ?? "auto",
      borderRadius: (shape === "round") ? "50px" : "5px"
    }}
  >
    {icon && <Icon icon={icon} className="AmonReact-Button-icon" />}
    <span>{children}</span>
  </button>

export default Button