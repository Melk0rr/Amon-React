// General imports
import { FC } from 'react'
import { HTMLElementProps } from 'utils/types'
import { capitalize } from 'utils/strings'

// Style imports
import './css/Flex.css';

// CSS Alignment options
type Alignment = "start" | "center" | "end" | "stretch"
type Justify = "start" | "center" | "end" | "stretch" | "space-between" | "space-around" | "space-evenly"

// Prop types for Row and Col components
interface FlexProps extends HTMLElementProps {
  wrap?: boolean,
  align?: Alignment,
  justify?: Justify,
  order?: "normal" | "reverse"
}

interface FlexBaseProps extends FlexProps {
  type: "row" | "col"
}

// Both Row and Col have the same render, just different css properties
const FlexBase: FC<FlexBaseProps> = ({
  type,
  wrap = true,
  align = "start",
  justify = "center",
  order = "normal",
  id,
  className,
  style,
  children
}) => {

  const baseClassName = "AmonReact-" + capitalize(type)
  let forgedClassName = baseClassName
  forgedClassName += " AmonReact-Flex-" + align + "-aligned"
  forgedClassName += " AmonReact-Flex-" + justify + "-justified"

  if (!wrap) {
    forgedClassName += " AmonReact-Flex-nowrap"
  }
  if (order === "reverse") {
    forgedClassName += " " + baseClassName + "-reverse"
  }

  const otherProps = { id, className: (forgedClassName + " " + className ?? '').trim() }

  return <div {...otherProps} style={style}>{children}</div>
}

/**
 * Returns a flex row / column
 * @param {Object} props : component props
 * @returns 
 */
const Row = (props: FlexProps) => FlexBase({ type: "row", ...props })
const Col = (props: FlexProps) => FlexBase({ type: "col", ...props })

const Flex = { Row, Col }
export default Flex