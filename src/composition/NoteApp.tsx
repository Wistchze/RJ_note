import Button from '@/components/Button';
import Form, { FormSubmitData } from '@/components/Form';
import NoteCard from '@/components/NoteCard';
import { TextFieldProps } from '@/components/TextField';
import { initData, Note } from '@/utils/note';
import { useState } from 'react';

// ===== Type Definitions ===== //

type TabNoteProps = {
    tabNote: boolean;
    setTabNote: (newVal: boolean) => void;
};

type NoteContentProps = {
    tabNote: boolean;
    data: Note[];
    search: string;
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
const NoteContent = ({ tabNote, data, search, onDelete, onArchive }: NoteContentProps) => {
    // Get the filtered data first
    const filteredData = data.filter(note => 
        note.archived !== tabNote && 
        (search === '' || note.title.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className={`${filteredData.length > 0 && 'grid grid-cols-1 md:grid-cols-2'} justify-items-center gap-x-4 gap-y-2 mt-2`}>
            {filteredData.length > 0 ? (
                // Render the NoteCards if data is not empty
                filteredData.map(note => (
                    <NoteCard
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        body={note.body}
                        date={note.createdAt}
                        onDelete={onDelete}
                        onArchive={onArchive}
                    />
                ))
            ) : (
                // Render the "No Data" message if filteredData is empty
                <p className="font-bold text-2xl uppercase text-center ">Tidak ada Catatan!</p>
            )}
        </div>
    );
};

const NoteTitleCounter = ({ titleCount }: { titleCount: number}) => {
    return (
        <p 
            className={`${titleCount === 50 && 'hidden'} absolute right-10 md:right-16 top-14 md:top-[5.6rem] z-10 text-sm font-bold`}
        >Sisa: {titleCount}</p>
    );
}

const NoteApp = () => {
    const [noteData, setNoteData] = useState<Note[]>(initData);

    // ===== Handle Adding Note ===== //

    const noteForm: TextFieldProps[] = [
        { name: 'title', label: 'Judul' },
        { name: 'body', label: 'Isi Catatan', isArea: true }
    ];
    const [titleCount, setTitleCount] = useState(50);

    function addNote(data: FormSubmitData) {
        // Create new note
        const newNote: Note = {
            id: Date.now(),
            title: data['title'],
            body: data['body'],
            archived: false,
            createdAt: new Date().toISOString()
        };

        // Add to database
        setNoteData([...noteData, newNote]);
    };

    function onChangeNote(name: string, value: string) {
        // Set the max limit to 50 for title
        if (name === 'title') {
            if (value.length <= 50) setTitleCount(50 - value.length);
            else return value.slice(0, 50); // Truncate the value to 50 characters
        }

        return value;
    }

    // ===== Handle Removing Note ===== //

    function removeNote(id: number) {
        const newNoteData = noteData.filter(note => id !== note.id);
        setNoteData(newNoteData);
    };

    // ===== Handle Archiving Note ===== //

    const [tabNote, setTabNote] = useState(true);

    function archiveNote(id: number) {
        const updatedNoteData = noteData.map(item => 
            item.id === id ? { ...item, archived: !item.archived } : item
        );
        setNoteData(updatedNoteData);
    };

    // ===== Handle Search Note ===== //

    const [searchNote, setSearchNote] = useState('');
    function onSearchClicked(data: string) {
        setSearchNote(data);
    }
    const searchForm: TextFieldProps[] = [
        { name: 'search', placeholder: 'Cari catatan di sini (Kosongkan untuk reset)', icon: 'fa-solid fa-magnifying-glass', onBtnIconClicked: onSearchClicked }
    ];

    return (
        <main className='relative p-4 w-full md:w-[38rem] lg:w-1/2 mx-auto h-full font-["Roboto"]'>
            <NoteTitleCounter titleCount={titleCount} />
            <Form
                formTitle='Tambahkan Catatan'
                fields={noteForm}
                onChange={onChangeNote}
                onSubmit={addNote}
                submitText='Tambahkan'
            />
            <TabNote tabNote={tabNote} setTabNote={setTabNote} />
            <Form 
                fields={searchForm}
                hasSubmitBtn={false}
            />
            <NoteContent 
                tabNote={tabNote} 
                data={noteData} 
                search={searchNote}
                onDelete={removeNote}
                onArchive={archiveNote}
            />
        </main>
    );
}

export default NoteApp;
