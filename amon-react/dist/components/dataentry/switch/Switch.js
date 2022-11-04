import { jsx as _jsx } from "react/jsx-runtime";
// General imports
import { useState } from 'react';
// Style import
import './css/Switch.css';
/**
 * Simple component to display a switch input
 * @param   {SwitchProps} props : component properties
 * @returns {JSX.Element} : HTML button
 */
const Switch = ({ size = "default", checked = false, disabled = false, onClick, id, className }) => {
    // React hook
    const [check, setCheck] = useState(checked);
    /**
     * On switch check function
     * @returns
     */
    const onCheck = () => {
        setCheck(prevState => !prevState);
        if (onClick)
            onClick(check);
    };
    const disabledProp = disabled ? { disabled: true } : {};
    const checkedClassName = check ? "AmonReact-Switch-checked" : "", disabledClassName = disabled ? "AmonReact-Switch-disabled" : "", forgedClassName = "AmonReact-Switch AmonReact-Switch-" + size + " " + checkedClassName + " " + disabledClassName;
    return (_jsx("button", { id: id, className: (forgedClassName + (className ?? "")).trim(), onClick: onCheck, ...disabledProp, children: _jsx("div", { className: "AmonReact-Switch-handle" }) }));
};
export default Switch;
