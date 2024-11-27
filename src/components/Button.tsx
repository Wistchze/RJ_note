import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<'button'> & {
    text: string;
    isFull?: boolean;
}

const Button = ({ text, isFull = true }: ButtonProps) => {
    return (
        <button
            className={`
            bg-blue-500 hover:bg-blue-600 p-2 rounded-md 
            font-bold text-white
            ${isFull ? 'w-full' : 'w-auto'}`
            }
        >{text}</button>
    )
}

export default Button;
