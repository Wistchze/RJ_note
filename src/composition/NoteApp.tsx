import Form, { FormField, FormSubmitData } from '@/components/Form';
import { Note } from '@/utils/note';

const NoteApp = () => {
    const noteData: Note[] = [];

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
            createdAt: new Date().toISOString()
        }

        // Add to databsae
        noteData.push(newNote);
    }

    return (
        <main className='p-4 bg-gray-200 h-screen font-["Roboto"]'>
            <Form
                formTitle='Tambahkan Catatan'
                fields={noteForm}
                onSubmit={addNote}
                submitText='Tambahkan'
            />
        </main>
    );
}

export default NoteApp;
