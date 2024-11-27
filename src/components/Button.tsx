import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
    text: string;
    isFull?: boolean;
}

const Button = ({ text, isFull = true, ...rest }: ButtonProps) => {
    return (
        <button
            className={`
            bg-blue-500 hover:bg-blue-600 p-2 rounded-md
            font-bold text-white text-lg
            ${isFull && 'w-full'}`
            }
            {...rest}
        >{text}</button>
    )
}

export default Button;
