import { ChangeEventHandler, MouseEventHandler } from "react";
import Button from "./Button";

export type TextFieldProps = {
    // Props
    name: string;
    label?: string;
    value?: string;
    placeholder?: string;
    icon?: string;
    isFull?: boolean;
    isArea?: boolean;

    // Events
    onChange?: ChangeEventHandler;
    onBtnIconClicked?: MouseEventHandler;
}

const TextField = ({ 
    name, 
    label, 
    placeholder = 'Answer here',
    value,
    icon,
    isFull = true,
    isArea = false,
    onChange,
    onBtnIconClicked
}: TextFieldProps) => {
    const className = `p-2 rounded-md border-2 shadow-md outline-none
                border-gray-300 focus:shadow-glow focus:shadow-blue-500 focus:border-blue-500
                text-black text-sm placeholder-gray-400 
                ${isFull && 'w-full'}
                ${isArea && 'h-32'}`;

    return (
        <fieldset className='font-["Roboto"] relative my-5'>
            {label && 
                <label 
                    htmlFor={name}
                    className='bg-white px-3 py-0 text-sm tracking-wide font-bold text-gray-600
                    absolute left-5 -top-3'
                >{label}</label>
            }
            {!isArea ? 
                <input
                    // props 
                    name={name} 
                    placeholder={placeholder} 
                    value={value}
                    onChange={onChange}

                    // Styling
                    className={className}
                />
                : 
                <textarea 
                    // Props
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}

                    // Styling
                    className={className}
                />
            }
            {icon &&
                <Button 
                    icon={icon}
                    className={`absolute p-1 top-1/2 -translate-y-1/2 right-3 
                        rounded-full text-xs`} 
                    isFull={false}
                    onClick={onBtnIconClicked}
                />
            }
        </fieldset>
    );
}

export default TextField;
