import { ChangeEvent, FormEvent, useState } from 'react';

import Button from './Button';
import TextField, { TextFieldProps } from './TextField';

/**
 * When on Submitted, the callback shall have this type to get the data from submited form.
 */
export type FormSubmitData = {
    [key: string]: string;
}

type FormProps = {
    fields: TextFieldProps[];
    formTitle?: string;
    submitText?: string;
    hasSubmitBtn?: boolean;

    // Events
    onChange?: (name: string, value: string) => string;
    onSubmit?: (data: FormSubmitData) => void;
}

const Form = ({ fields, formTitle, submitText = 'Submit', hasSubmitBtn = true, onChange, onSubmit }: FormProps) => {
    // Helper func to init back to default
    function initializeFormValues(fields: TextFieldProps[]): { [key: string]: string } {
        return fields.reduce((acc, field) => {
            acc[field.name] = ''; // Set each field's value to an empty string
            return acc;
        }, {} as { [key: string]: string });
    };

    // The actual data for the form
    const [formValues, setFormValues] = useState(initializeFormValues(fields));

    // Internal on change
    function onChangeInternal(e: ChangeEvent<HTMLInputElement>) {
        const { name } = e.target;
        let { value } = e.target;

        // Call the on change if existed
        if (onChange) value = onChange(name, value);

        // Change the internal data
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    // Internal on submit
    function onSubmitInternal(e: FormEvent) {
        e.preventDefault();

        // Send the data to external onSubmit
        if (onSubmit && hasSubmitBtn) onSubmit(formValues);

        // Reset the values
        setFormValues(initializeFormValues(fields));
    }

    return (
        <form className='py-4 px-4 md:px-10 shadow-xl bg-white rounded-md' onSubmit={onSubmitInternal}>
            {formTitle &&
                <h2 className='font-bold uppercase text-center tracking-wider text-xl'>{formTitle}</h2>
            }
            {fields.map(field => (
                <TextField
                    key={field.name}
                    {...field}
                    onChange={onChangeInternal}
                    value={formValues[field.name]}
                />
            ))}
            {hasSubmitBtn &&
                <Button text={submitText} type='submit' />
            }
        </form>
    );
}

export default Form;