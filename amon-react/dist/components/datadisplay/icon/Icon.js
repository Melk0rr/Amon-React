import { jsx as _jsx } from "react/jsx-runtime";
import icons from './icons';
// Style import
import './css/Icon.css';
/**
 * Simple component to render an icon using html svg tag
 * @param   {IconProps} props : component properties
 * @returns {JSX.Element} : HTML button
 */
const Icon = ({ icon, color = "#000000", size = 20, style, viewBox = "0 0 24 24", onClick, id, className }) => _jsx("svg", { id: id, className: `AmonReact-Icon ${className ?? ''}`.trim(), style: { ...style }, onClick: onClick, viewBox: viewBox, width: size + "px", height: size + "px", children: _jsx("path", { fill: color, d: icons[icon] }) });
export default Icon;
