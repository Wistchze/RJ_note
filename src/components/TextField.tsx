export type TextFieldProps = {
    name: string;
    label: string;
    placeholder?: string;
    onChange: React.ChangeEventHandler;
    isFull?: boolean;
    isArea?: boolean;
}

const TextField = ({ 
    name, 
    label, 
    placeholder = 'Answer here', 
    onChange, 
    isFull = true,
    isArea = false,
}: TextFieldProps) => {
    const className = `p-2 rounded-md border-2 shadow-md outline-none
                border-gray-300 focus:shadow-glow focus:shadow-blue-500 focus:border-blue-500
                text-black text-sm placeholder-gray-400 
                ${isFull ? 'w-full' : 'w-auto'}
                ${isArea ? 'h-32' : ''}`;

    return (
        <fieldset className='font-["Roboto"] relative my-5'>
            <label 
                htmlFor={name}
                className='bg-white px-3 py-0 text-sm tracking-wide font-bold text-gray-600
                absolute left-5 -top-3'
            >{label}</label>
            {!isArea ? 
                <input
                    // props 
                    name={name} 
                    placeholder={placeholder} 
                    onChange={onChange} 

                    // Styling
                    className={className}
                />
                : 
                <textarea 
                    // Props
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}

                    // Styling
                    className={className}
                />
            }
        </fieldset>
    );
}

export default TextField;
