export type TextFieldProps = {
    name: string;
    label: string;
    placeholder?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    isFull?: boolean;
}

const TextField = ({ name, label, placeholder, onChange, isFull = true }: TextFieldProps) => {
    return (
        <fieldset className='font-["Roboto"] relative my-5'>
            <label 
                htmlFor={name}
                className='font-bold tracking-wider bg-white px-3 py-0 uppercase
                absolute left-5 -top-4'
            >{label}</label>
            <input
                // props 
                name={name} 
                placeholder={placeholder} 
                onChange={onChange} 

                // Styling
                className={`p-2 rounded-md border-2 shadow-md outline-none
                border-gray-300 focus:shadow-glow focus:shadow-blue-500 focus:border-blue-500
                text-black placeholder-gray-400 ${isFull ? 'w-full' : 'w-auto'}`}
            />
        </fieldset>
    );
}

export default TextField;
