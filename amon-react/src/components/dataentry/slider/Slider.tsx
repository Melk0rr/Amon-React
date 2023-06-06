// General imports
import { useState, useRef, useEffect, FC, RefObject } from 'react'
import { HTMLElementProps } from 'utils/types'
import { round, percent } from 'utils/math'

// Style imports
import './css/Slider.css'

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
  onChange?: (target: number) => void
}

interface SliderHandleProps extends HTMLElementProps {
  defaultValue?: number,
  min: number,
  max: number,
  step: number,
  sliderRef: RefObject<HTMLDivElement>
  onChange?: (target: number) => void
}

type SliderHandleSort = {
  [key: string]: number
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

  const initHandleValue = () => {
    let initValue = min
    if (defaultValue) {

    }
  }

  const baseClassName = "AmonReact-Slider"
  const slide = useRef<HTMLDivElement>(null)
  const [handle1Value, setHandle1Value] = useState(min)
  const [handle2Value, setHandle2Value] = useState(min)
  /**
   * Callback function updating Slider handle values based on its value
   * @param {number} value : Slider value
   * @param {0 | 1} handleIndex : index of the handle
   */
  const onHandleValueChange = (value: number, handleIndex: 0 | 1): void => {
    if (onChange)
      onChange(value)

    if (handleIndex === 0) {
      setHandle1Value(value)
    } else {
      setHandle2Value(value)
    }
  }

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

  const getTrackWidth = (): number => {
    let trackWidth = 0
    if (showTrack) {
      if (range) {
        const sort = getHandleValueSorted()
        trackWidth = posToPercentage(sort.max, min, max) - posToPercentage(sort.min, min, max)
      } else {
        trackWidth = posToPercentage(handle1Value, min, max)
      }
    }


    return trackWidth
  }

  const handleBaseProps = { min, max, step, sliderRef: slide }
  let handles = [
    <SliderHandle
      defaultValue={handle1Value}
      className="AmonReact-Slider-handle-1"
      onChange={pos => onHandleValueChange(pos, 0)}
      {...handleBaseProps}
    />
  ]

  if (range) {
    handles.push(
      <SliderHandle
        defaultValue={handle2Value}
        className="AmonReact-Slider-handle-2"
        onChange={pos => onHandleValueChange(pos, 1)}
        {...handleBaseProps}
      />
    )
  }

  let forgedClassName = baseClassName + " " + baseClassName + "-" + (vertical ? "vertical" : "horizontal")
  const trackCSSLeft = range ? { left: getHandleValueSorted().min + "%" } : {}
  const trackCSSProps = {
    width: getTrackWidth() + "%",
    ...trackCSSLeft
  }

  return (
    <div id={id} className={(forgedClassName + " " + (className ?? '')).trim()} style={{ width: size }} ref={slide}>
      <div className="AmonReact-Slider-rail" ></div>
      <div className="AmonReact-Slider-track" style={trackCSSProps}></div>
      <div className="AmonReact-Slider-step"></div>
      {handles}
      {/* <input onChange={e => handleSlideChange(e)} type="range" {...baseProps} ></input> */}
    </div>
  )
}

/**
 * SliderHandle component rendering and describing the behavior of a Slider component handle
 * @param {SliderHandleProps} props : SliderHandle component properties
 * @returns {FC} : SliderHandle component
 */
const SliderHandle: FC<SliderHandleProps> = ({
  defaultValue,
  min,
  max,
  step,
  sliderRef,
  onChange,
  className
}) => {

  // State 
  const [dragged, setDragged] = useState(false)
  const [handleValue, setHandleValue] = useState(defaultValue ?? min)
  const [handleValuePercentage, setHandleValuePercentage] = useState(
    posToPercentage((defaultValue ?? min), min, max)
  )

  const baseClassName = "AmonReact-Slider-handle"

  /**
   * Function to run when the handle is dragged
   */
  useEffect(() => {
    const rect = sliderRef.current?.getBoundingClientRect()

    if (rect) {
      const minPos = 0,
        maxPos = rect.width

      let absolutePos = handleValuePercentage
      window.onmousemove = (eMove: MouseEvent): void => {
        const position = eMove.clientX - rect.x

        if (dragged) {
          window.onmouseup = (): void => {
            setDragged(false)
          }

          if (position < minPos) {
            absolutePos = min
          } else if (position > maxPos) {
            absolutePos = max
          } else {
            absolutePos = (position / maxPos) * (max - min) + min
          }

          if (
            absolutePos <= handleValuePercentage + step &&
            absolutePos >= handleValuePercentage - step
          ) {
            absolutePos = handleValuePercentage
          }

          absolutePos = round(absolutePos, (1 / step))

          if (onChange)
            onChange(absolutePos)

          setHandleValue(absolutePos)
        }
      }
    }
  }, [dragged])

  /**
   * Function to run when the handle value changes
   */
  useEffect(() => {
    setHandleValuePercentage(posToPercentage(handleValue, min, max))
  }, [handleValue])

  let forgedClassName = baseClassName + " " + (dragged ? (baseClassName + "-dragging") : "") + " " + (className ?? "")

  return (
    <div className={forgedClassName.trim()} onMouseDown={() => setDragged(true)} style={{ left: handleValuePercentage + "%" }}>
      <span className="AmonReact-Slider-value">{handleValue}</span>
    </div>
  )
}

export default Slider