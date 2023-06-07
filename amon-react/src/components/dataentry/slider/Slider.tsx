// General imports
import { useState, useEffect, useRef, FC } from 'react'
import { HTMLElementProps, BaseObject } from 'utils/types'
import { percent } from 'utils/math'

import SliderHandle from './SliderHandle'

// Style imports
import './css/Slider.css'

type SliderHandleSort = {
  [key: string]: number
}

type SliderMarks = {
  [key: number]: string | BaseObject
}

// Prop types for Slider component
interface SliderProps extends HTMLElementProps {
  defaultValue?: number | [number, number],
  min?: number,
  max?: number,
  step?: number,
  size?: number,
  range?: boolean,
  vertical?: boolean,
  showTrack?: boolean,
  unit?: string,
  onChange?: (v: number | [number, number]) => void
}

const posToPercentage = (value: number, min: number, max: number): number => percent((value - min), (max - min))

/**
 * Slider component rendering an 'input range' like UI element
 * @param {SliderProps} props : Slider component properties 
 * @returns {FC} : 
 */
const Slider: FC<SliderProps> = ({
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  size,
  range = false,
  vertical = false,
  showTrack = true,
  unit,
  onChange,
  id,
  className
}) => {

  /**
   * Initialize the values of the slider handles based on the provided default value
   * @returns {number[]} : initialized values
   */
  const initHandleValue = (): number[] => {
    let initValue = [min]
    if (defaultValue) {
      if (Array.isArray(defaultValue)) {
        initValue = defaultValue

      } else {
        initValue = [defaultValue]
      }
    }

    return initValue
  }

  const baseClassName = "AmonReact-Slider"
  const slide = useRef<HTMLDivElement>(null)
  const [handle1Value, setHandle1Value] = useState(initHandleValue()[0])
  const [handle2Value, setHandle2Value] = useState(initHandleValue()[1] ?? min)

  /**
   * Function to run when the handle values change
   */
  useEffect(() => {
    if (onChange)
      onChange(range ? [handle1Value, handle2Value] : handle1Value)

  }, [handle1Value, handle2Value])

  /**
   * Returns an object with 3 keys : max and min based on the current handle values
   * Used to determine which handle value is greater than the other
   * @returns {SliderHandleSort} : Slider handle values sorted as "max" and "min"
   */
  const getHandleValueSorted = (): SliderHandleSort => {
    let sort: SliderHandleSort = {
      max: handle1Value
    }
    if (range) {
      if (handle2Value > handle1Value) {
        sort["max"] = handle2Value
        sort["min"] = handle1Value
      }
      else {
        sort["min"] = handle2Value
      }

    }
    return sort
  }

  /**
   * Returns the track width based on the current handle values
   * @returns {number} : track width
   */
  const getTrackSize = (): number => {
    let trackSize = 0
    if (showTrack) {
      const sort = getHandleValueSorted()
      trackSize = posToPercentage(sort.max, min, max)

      if (range)
        trackSize -= posToPercentage(sort.min, min, max)
    }


    return trackSize
  }

  // Handle list
  const handleBaseProps = { min, max, step, vertical, sliderRef: slide }
  let handles = [
    <SliderHandle
      key="handle-1"
      defaultValue={handle1Value}
      className="AmonReact-Slider-handle-1"
      onChange={pos => setHandle1Value(pos)}
      {...handleBaseProps}
    />
  ]

  if (range) {
    handles.push(
      <SliderHandle
        key="handle-2"
        defaultValue={handle2Value}
        className="AmonReact-Slider-handle-2"
        onChange={pos => setHandle2Value(pos)}
        {...handleBaseProps}
      />
    )
  }

  let forgedClassName = `${baseClassName} ${baseClassName}-` + (vertical ? "vertical" : "horizontal")
  const trackCSSProps = {
    [vertical ? "height" : "width"]: getTrackSize() + "%",
    [vertical ? "bottom" : "left"]: (range ? getHandleValueSorted().min : 0) + "%"
  }

  return (
    <div id={id} className={(forgedClassName + " " + (className ?? '')).trim()} style={{ [vertical ? "height" : "width"]: size }} ref={slide}>
      <div className="AmonReact-Slider-rail" ></div>
      <div className="AmonReact-Slider-track" style={trackCSSProps}></div>
      <div className="AmonReact-Slider-mark"></div>
      <div className="AmonReact-Slider-step"></div>
      {handles}
    </div>
  )
}

export default Slider