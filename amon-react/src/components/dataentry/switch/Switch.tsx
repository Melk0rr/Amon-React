// General imports
import { useState } from 'react'
import { HTMLElementProps } from '~/utils/types'

// Style import
import './css/Switch.css'

// Type check for Switch properties
interface SwitchProps extends HTMLElementProps {
  size?: "default" | "small",
  checked?: boolean,
  disabled?: boolean,
  onClick?: Function,
}

/**
 * Simple component to display a switch input
 * @param   {SwitchProps} props : component properties 
 * @returns {JSX.Element} : HTML button
 */
const Switch = ({
  size = "default",
  checked = false,
  disabled = false,
  onClick,
  id,
  className
}: SwitchProps): JSX.Element => {
  
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

  const disabledProp = disabled ? { disabled: true } : {}
  const checkedClassName = check ? "AmonReact-Switch-checked" : "",
        disabledClassName = disabled ? "AmonReact-Switch-disabled" : "",
        forgedClassName = "AmonReact-Switch AmonReact-Switch-" + size + " " + checkedClassName + " " + disabledClassName

  return (
    <button
      id={id}
      className={(forgedClassName + (className ?? "")).trim()}
      onClick={onCheck}
      {...disabledProp}
    >
      <div className="AmonReact-Switch-handle"></div>
    </button>
  )
}

export default Switch