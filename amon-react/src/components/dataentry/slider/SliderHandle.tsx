import { useState, useEffect, FC, RefObject } from 'react'
import { HTMLElementProps } from 'utils/types'
import { round, percent } from 'utils/math'

interface SliderHandleProps extends HTMLElementProps {
  defaultValue?: number,
  min: number,
  max: number,
  step: number,
  vertical?: boolean,
  sliderRef: RefObject<HTMLDivElement>
  onChange?: (target: number) => void
}

const posToPercentage = (value: number, min: number, max: number): number => percent((value - min), (max - min))

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
  vertical = false,
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
        maxPos = vertical ? rect.height : rect.width

      let absolutePos = handleValuePercentage
      window.onmousemove = (eMove: MouseEvent): void => {
        const position = vertical ? rect.y - eMove.clientY + maxPos : eMove.clientX - rect.x

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
  const handleCSSProps = {
    [vertical ? "bottom" : "left"]: handleValuePercentage + "%"
  }

  return (
    <div className={forgedClassName.trim()} onMouseDown={() => setDragged(true)} style={handleCSSProps}>
      <span className="AmonReact-Slider-value">{handleValue}</span>
    </div>
  )
}

export default SliderHandle