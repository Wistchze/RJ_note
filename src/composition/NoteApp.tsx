import Button from '@/components/Button';
import Form, { FormField, FormSubmitData } from '@/components/Form';
import NoteCard from '@/components/NoteCard';
import { Note } from '@/utils/note';
import { useState } from 'react';

// ===== Type Definitions ===== //

type TabNoteProps = {
    tabNote: boolean;
    setTabNote: (newVal: boolean) => void;
};

type NoteContentProps = {
    tabNote: boolean;
    data: Note[];
    onDelete: (id: number) => void;
    onArchive: (id: number) => void;
};

// ===== Components ===== //

const TabNote = ({ tabNote, setTabNote }: TabNoteProps) => {
    return (
        <div 
            className='w-full mt-5 flex'
        >
            <Button 
                text='Aktif' 
                className={`rounded-none ${!tabNote && 'bg-gray-400 hover:bg-gray-500'}`}
                onClick={() => setTabNote(true)}
            />
            <Button 
                text='Arsip' 
                className={`rounded-none ${tabNote && 'bg-gray-400 hover:bg-gray-500'}`}
                onClick={() => setTabNote(false)}
            />
        </div>
    );
}

const NoteContent = ({ tabNote, data, onDelete, onArchive }: NoteContentProps) => {
    return (
        <div className='grid grid-cols-1 justify-items-center gap-x-4 gap-y-2 mt-2'>
            {data.filter(note => note.archived !== tabNote).map(note => (
                <NoteCard
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    body={note.body}
                    date={note.createdAt}
                    onDelete={onDelete}
                    onArchive={onArchive}
                />
            ))}
        </div>
    );
}

const NoteApp = () => {
    const [noteData, setNoteData] = useState<Note[]>([
        {
            id: 1,
            title: 'Testing',
            body: 'Ini catatan satu',
            createdAt: new Date().toLocaleDateString('id-ID'),
            archived: false
        },
        {
            id: 2,
            title: 'Testing Dua',
            body: 'Ini catatan dua',
            createdAt: new Date().toLocaleDateString('id-ID'),
            archived: false
        },
        {
            id: 3,
            title: 'Testing Tiga',
            body: 'Ini catatan tiga',
            createdAt: new Date().toLocaleDateString('id-ID'),
            archived: false
        },
        {
            id: 4,
            title: 'Testing Empat',
            body: 'Ini catatan empat',
            createdAt: new Date().toLocaleDateString('id-ID'),
            archived: false
        }
    ]);

    // ===== Handle Adding Note ===== //

    const noteForm: FormField[] = [
        { name: 'title', label: 'Judul' },
        { name: 'body', label: 'Isi Catatan', isArea: true }
    ];

    const addNote = (data: FormSubmitData) => {
        // Create new note
        const newNote: Note = {
            id: noteData.length + 1,
            title: data['title'],
            body: data['body'],
            archived: false,
            createdAt: new Date().toLocaleDateString('id-ID')
        };

        // Add to database
        setNoteData([...noteData, newNote]);
    };

    // ===== Handle Removing Note ===== //

    const removeNote = (id: number) => {
        const newNoteData = noteData.filter(note => id !== note.id);
        setNoteData(newNoteData);
    };

    // ===== Handle Archiving Note ===== //

    const [tabNote, setTabNote] = useState(true);

    const archiveNote = (id: number) => {
        const updatedNoteData = noteData.map(item => 
            item.id === id ? { ...item, archived: !item.archived } : item
        );
        setNoteData(updatedNoteData);
    };

    return (
        <main className='p-4 bg-gray-200 h-full font-["Roboto"]'>
            <Form
                formTitle='Tambahkan Catatan'
                fields={noteForm}
                onSubmit={addNote}
                submitText='Tambahkan'
            />
            <TabNote tabNote={tabNote} setTabNote={setTabNote} />
            <NoteContent tabNote={tabNote} data={noteData} onDelete={removeNote} onArchive={archiveNote} />
        </main>
    );
}

export default NoteApp;
