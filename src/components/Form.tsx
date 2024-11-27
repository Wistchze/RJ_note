import { ChangeEvent, FormEvent, useState } from 'react';
import Button from './Button';
import TextField from './TextField';

/**
 * To use this form, we MUST define the fields using this type.
 */
export type FormField = {
    name: string;
    label: string;
    placeholder?: string;

    // Is the field ordinary input or a text area?
    isArea?: boolean;
}

/**
 * When on Submitted, the callback shall have this type to get the data from submited form.
 */
export type FormSubmitData = {
    [key: string]: string;
}

type FormProps = {
    fields: FormField[];
    formTitle: string;
    submitText?: string;

    // Events
    onChange?: (name: string, value: string) => void;
    onSubmit: (data: FormSubmitData) => void;
}

const Form = ({ fields, formTitle, submitText = 'Submit', onChange, onSubmit }: FormProps) => {
    // Helper func to init back to default
    const initializeFormValues = (fields: FormField[]): { [key: string]: string } => {
        return fields.reduce((acc, field) => {
            acc[field.name] = ''; // Set each field's value to an empty string
            return acc;
        }, {} as { [key: string]: string });
    };

    // The actual data for the form
    const [formValues, setFormValues] = useState(initializeFormValues(fields));

    // Internal on change
    const onChangeInternal = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Change the internal data
        setFormValues({
            ...formValues,
            [name]: value
        })

        // Call the on change if existed
        if (onChange) onChange(name, value);
    }

    // Internal on submit
    const onSubmitInternal = (e: FormEvent) => {
        e.preventDefault();

        // Send the data to external onSubmit
        onSubmit(formValues);

        // Reset the values
        setFormValues(initializeFormValues(fields));
    }

    return (
        <form className='p-4 shadow-xl bg-white rounded-md' onSubmit={onSubmitInternal}>
            <h2 className='font-bold uppercase text-center tracking-wider text-xl'>{formTitle}</h2>
            {fields.map(field => (
                <TextField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={formValues[field.name]}
                    isArea={field.isArea}
                    onChange={onChangeInternal}
                />
            ))}
            <Button text={submitText} type='submit' />
        </form>
    );
}

export default Form;