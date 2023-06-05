// General imports
import { useState, useRef, useEffect, FC, ChangeEvent } from 'react'
import { HTMLElementProps } from 'utils/types'
import { round, percent } from 'utils/math'

// Style imports
import './css/Slider.css'

// Prop types for Slider component
interface SliderProps extends HTMLElementProps {
  defaultValue?: number,
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

/**
 * Slider component rendering an 'input range' like UI element
 * @param param0 
 * @returns 
 */
const Slider: FC<SliderProps> = ({
  defaultValue,
  min = 0,
  max = 10,
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

  const slide = useRef<HTMLDivElement>(null)

  const [dragged, setDragged] = useState(false)
  const [positionCursor, setPositionCursor] = useState(defaultValue ?? min)
  const [positionCursorPercentage, setPositionCursorPercentage] = useState(
    percent(((defaultValue ?? min) - min), (max - min))
  )


  useEffect(() => {
    const rect = slide.current?.getBoundingClientRect()

    if (rect) {
      const minPos = 0,
        maxPos = rect.width

      let absolutePos = positionCursorPercentage
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
            absolutePos <= positionCursorPercentage + step &&
            absolutePos >= positionCursorPercentage - step
          ) {
            absolutePos = positionCursorPercentage
          }

          absolutePos = round(absolutePos, (1 / step))

          if (onChange)
            onChange(absolutePos)

          setPositionCursor(absolutePos)
        }
      }
    }
  }, [dragged])

  const onChangePositionOfCursor = (absolutePos: number) => {
    setPositionCursorPercentage(((absolutePos - min) / (max - min)) * 100);
  }

  useEffect(() => {
    onChangePositionOfCursor(positionCursor)
  }, [positionCursor])

  const baseClassName = "AmonReact-Slider AmonReact-Slider-" + (vertical ? "vertical" : "horizontal")

  return (
    <div id={id} className={(baseClassName + " " + className ?? '').trim()} style={{ width: size }} ref={slide}>
      <div className="AmonReact-Slider-rail" ></div>
      <div className="AmonReact-Slider-track" style={{ width: positionCursorPercentage + "%" }}></div>
      <div className="AmonReact-Slider-step" onMouseDown={() => setDragged(true)}></div>
      <div className="AmonReact-Slider-handle" onMouseDown={() => setDragged(true)} style={{ left: positionCursorPercentage + "%" }}>
        <span className="AmonReact-Slider-value">{positionCursor}</span>
      </div>
      {/* <input onChange={e => handleSlideChange(e)} type="range" {...baseProps} ></input> */}
    </div>
  )
}

export default Slider