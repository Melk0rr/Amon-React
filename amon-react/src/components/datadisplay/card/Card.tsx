// General imports
import { FC } from 'react'
import { HTMLElementProps } from 'utils/types'

// Style import
import './css/Card.css'

// Type check for Switch properties
interface CardProps extends HTMLElementProps {
  title?: string
  size?: number
  hoverable?: boolean
}

/**
 * Simple component to display elements in a card
 * @param   {SwitchProps} props : component properties 
 * @returns {React.FC} : HTML button
 */
const Card: FC<CardProps> = ({
  title,
  size,
  hoverable = false,
  id,
  className,
  style,
  children
}) => {

  let cardHead = null;
  if (title) {
    cardHead = <div className="AmonReact-Card-head">
      <h3 className="AmonReact-Card-title">{title}</h3>
    </div>
  }

  let forgedClassName = "AmonReact-Card"
  if (hoverable) {
    forgedClassName += " AmonReact-Card-hoverable"
  }

  return (
    <div
      id={id}
      style={{ ...style, width: size ?? "auto" }}
      className={(forgedClassName + (className ?? "")).trim()}
    >
      {cardHead}
      <div className="AmonReact-Card-content">
        {children}
      </div>
    </div>
  )
}

export default Card
