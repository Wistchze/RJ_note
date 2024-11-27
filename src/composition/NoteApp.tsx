import Button from '@/components/Button';
import TextField from '@/components/TextField';
import { Note, noteData } from '@/utils/note';
import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useState } from 'react';

type FormProps = {
    onChange: ChangeEventHandler;
    onSubmit: FormEventHandler;
}
const AddNoteForm = ({ onChange, onSubmit }: FormProps) => {
    return (
        <form className='p-4 shadow-glow' onSubmit={onSubmit}>
            <h2 className='font-bold uppercase text-center tracking-wider text-xl'>Tambahkan Catatan</h2>
            <TextField 
                name='title' 
                label='Judul'
                onChange={onChange}
            />
            <TextField 
                name='body' 
                label='Isi Catatan'
                onChange={onChange}
                isArea={true}
            />
            <Button text='Tambahkan' type='submit' />
        </form>
    );
}

const NoteApp = () => {
    const [noteForm, setNoteForm] = useState({
        title: '',
        body: ''
    });

    const onAddFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNoteForm({
            ...noteForm,
            [name]: value,
        });
    }

    const onAddFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        // New Note
        const newNote: Note = {
            id: noteData.length + 1,
            title: noteForm.title,
            body: noteForm.body,
            archived: false,
            createdAt: Date.now().toLocaleString()
        };
        noteData.push(newNote);
        console.log(noteData);

        // Reset Form
        setNoteForm({
            title: '',
            body: ''
        });
    }

    return (
        <AddNoteForm 
            onChange={onAddFormChange} 
            onSubmit={onAddFormSubmit}
        />
    );` `
}
export default NoteApp;
