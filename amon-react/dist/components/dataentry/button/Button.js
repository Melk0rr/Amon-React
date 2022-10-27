import { jsx as _jsx } from "react/jsx-runtime";
// Style import
import './css/Button.css';
/**
 * Simple component to render an html button
 * @param   {CLickableElementProps} props : component properties
 * @returns {JSX.Element} : HTML button
 */
const Button = ({ id, className, onClick, size, style, children = "Button" }) => _jsx("button", { id: id, className: `AmonReact-Button ${className ?? ''}`.trim(), onClick: onClick, style: {
        ...style,
        "--button-size": size ? `${size}px` : 'auto'
    }, children: children });
export default Button;
