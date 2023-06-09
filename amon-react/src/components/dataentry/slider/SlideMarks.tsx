import { FC } from 'react'
import { HTMLElementProps, BaseObject } from 'utils/types'
import { posToPercentage } from './utils/sliderUtils'

type SliderMarksType = {
  [key: number]: string | BaseObject
}

// Prop types for SliderMarks component
interface SliderMarksProps extends HTMLElementProps {
  marks: SliderMarksType,
  unit?: string
}

const SliderMarks: FC<SliderMarksProps> = ({
  marks,
  unit
}) => {

  return (
    <div className="AmonReact-Slider-mark-wrapper">
      <div className="AmonReact-Slider-mark"></div>
      <div className="AmonReact-Slider-step"></div>
    </div>
  )
}

export default SliderMarks
export type { SliderMarksType }