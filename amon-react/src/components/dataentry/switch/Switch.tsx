// General imports
import { useState, FC } from 'react'
import { HTMLElementProps } from 'utils/types'

// Style import
import './css/Switch.css'

// Type check for Switch properties
interface SwitchProps extends HTMLElementProps {
  size?: "default" | "small",
  checked?: boolean,
  disabled?: boolean,
  onClick?: (check: boolean) => void,
}

/**
 * Simple component to display a switch input
 * @param   {SwitchProps} props : component properties
 * @returns {React.FC} : HTML switch component
 */
const Switch: FC<SwitchProps> = ({
  size = "default",
  checked = false,
  disabled = false,
  onClick,
  id,
  className
}) => {

  // React hook
  const [check, setCheck] = useState(checked)

  /**
   * On switch check function
   * @returns
   */
  const onCheck = (): void => {
    setCheck(prevState => !prevState)
    if (onClick)
      onClick(check)
  }

  // Forging class name based on checked state and disabled property
  const disabledProp = disabled ? { disabled: true } : {}
  const checkedClassName = check ? "AmonReact-Switch-checked" : "",
    disabledClassName = disabled ? "AmonReact-Switch-disabled" : "";

  const forgedClassName = "AmonReact-Switch AmonReact-Switch-" + size + " " + checkedClassName + " " + disabledClassName

  return (
    <button
      id={id}
      className={(forgedClassName + " " + (className ?? "")).trim()}
      onClick={onCheck}
      {...disabledProp}
    >
      <div className="AmonReact-Switch-handle"></div>
    </button>
  )
}

export default Switch