import { ComponentProps } from 'react';
import clsx from 'clsx';

type ButtonProps = ComponentProps<'button'> & {
    icon?: string;
    text?: string;
    isFull?: boolean;
}

const Button = ({ icon, text, isFull = true, className, ...rest }: ButtonProps) => {
    return (
        <button
            className={clsx(
                'bg-blue-500 hover:bg-blue-600 p-2 rounded-md font-bold text-white text-lg',
                { 'w-full': isFull, 'w-fit': !isFull },
                className
            )}
            {...rest}
        >
            {icon && <i className={icon}></i>}
            {text && <span>{text}</span>}
        </button>
    );
}

export default Button;
