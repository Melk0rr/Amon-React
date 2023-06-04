// General imports
import { useState, FC, ChangeEvent } from 'react'
import { HTMLElementProps } from 'utils/types'

// Style imports
import './css/Slider.css'

interface SliderProps extends HTMLElementProps {
  defaultValue?: number,
  min?: number,
  max?: number,
  step?: number,
  size?: number,
  onChange?: (target: HTMLInputElement) => void
}

const Slider: FC<SliderProps> = ({
  defaultValue = 1,
  min = 0,
  max = 10,
  step = 1,
  size,
  onChange,
  id,
  className
}) => {
  const [value, setValue] = useState(defaultValue)

  /**
   * Handles changes in sliders value
   * @param {Object} e : catched event
   * @param {Function} callback : callback function to execute after state change 
   */
  const handleSlideChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const value = +e.target.value
      setValue(value)

      if (onChange)
        onChange(e.target)
    }
  }

  const baseProps = { id, min, max, step, defaultValue, className: "AmonReact-Slider-input" }

  return (
    <div className={`AmonReact-Slider ${className ?? ''}`.trim()} style={{ width: size }}>
      <span className="AmonReact-Slider-value">{value}</span>
      <input onChange={e => handleSlideChange(e)} type="range" {...baseProps} ></input>
    </div>
  )
}

export default Slider