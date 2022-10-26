// Style import
import './css/Button.css';
/**
 * Simple component to render an html button
 * @param   {ButtonProps} props : component properties
 * @returns {JSX.Element} : HTML button
 */
const Button = ({ id, className, onClick, size, style, children = "Button" }) => 
  <button
    id={id}
    className={`Button ${className ?? ''}`.trim()}
    onClick={onClick}
    style={{ ...style, "--button-size": `${size}px` }}
  >
    {children}
  </button>;

export default Button;
