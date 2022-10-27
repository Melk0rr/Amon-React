// General imports
import { CLickableElementProps } from '~/utils/types'
import icons from './icons'

// Style import
import './css/Icon.css'

// Type check for Icon properties
interface IconProps extends CLickableElementProps {
  icon: string,
  color?: string,
  viewBox?: string
}

/**
 * Simple component to render an icon using html svg tag
 * @param   {IconProps} props : component properties
 * @returns {JSX.Element} : HTML button
 */
const Icon = ({
  icon,
  color = "#000000",
  size = 20,
  style,
  viewBox = "0 0 24 24",
  onClick,
  id,
  className
}: IconProps): JSX.Element =>
  <svg
    id={id}
    className={`AmonReact-Icon ${className ?? ''}`.trim()}
    style={{ ...style }}
    onClick={onClick}
    viewBox={viewBox}
    width={size + "px"}
    height={size + "px"}
  >
    <path fill={color} d={icons[icon]} />
  </svg>

export default Icon