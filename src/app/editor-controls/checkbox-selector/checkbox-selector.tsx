import {useRef, ReactNode} from 'react';

interface CheckboxSelectorProps {
    setting: boolean,
    changeSetting: (setting: boolean) => void,
    children: ReactNode
}

export const CheckboxSelector = ({setting, changeSetting, children}: CheckboxSelectorProps) => {
    const checkboxRef = useRef<HTMLInputElement>(null);
    const changed = () => {
        if (checkboxRef.current) {
            changeSetting(checkboxRef.current.checked);
        }
    };
    return <div>{children} <input ref={checkboxRef} type="checkbox" onChange={changed} checked={setting}/></div>;
};