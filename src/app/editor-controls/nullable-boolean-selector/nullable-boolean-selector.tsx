import {ReactNode} from 'react';
interface NullableBooleanSelectorProps {
    setting: boolean | null,
    changeSetting: (setting: boolean | null) => void,
    children: ReactNode
}

export const NullableBooleanSelector = ({setting, changeSetting, children}: NullableBooleanSelectorProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.value) {
            case 'on':
                changeSetting(true);
                break;
            case 'off':
                changeSetting(false);
                break;
            case 'ignore':
                changeSetting(null);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            {children}
            <div>
                <label>
                    <input
                        type="radio"
                        value="on"
                        checked={setting === true}
                        onChange={handleChange}
                    />
                    On
                </label>
                <label>
                    <input
                        type="radio"
                        value="off"
                        checked={setting === false}
                        onChange={handleChange}
                    />
                    Off
                </label>
                <label>
                    <input
                        type="radio"
                        value="ignore"
                        checked={setting === null}
                        onChange={handleChange}
                    />
                    Ignore
                </label>
            </div>
        </div>
    );
};
