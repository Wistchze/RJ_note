import Button from './Button';

type NoteCardProps = {
    id?: number;
    title?: string;
    date?: string;
    body?: string;

    // Events
    onDelete?: (id: number) => void;
    onArchive?: (id: number) => void;
}

const NoteHeader = ({ id, title, date, onDelete, onArchive }: NoteCardProps) => {
    const onDeleteInternal = () => {
        if (onDelete && id) onDelete(id)
    }

    const onArchiveInternal = () => {
        if (onArchive && id) onArchive(id)
    }

    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }
          return new Date(date).toLocaleDateString('id-ID', options)
    }

    return (
        <div className='flex justify-between items-center'>
            {/* Text Info */}
            <div className='-space-y-1'>
                <h1 className='font-bold text-xl tracking-wider'>{title}</h1>
                <p className='text-xs text-gray-400'>{date && formatDate(date)}</p>
            </div>

            {/* Buttons */}
            <div className='flex space-x-2'>
                <Button 
                    className='bg-red-400 hover:bg-red-500 text-sm'
                    icon='fa-solid fa-trash'
                    title='Hapus Catatan'
                    isFull={false}
                    onClick={onDeleteInternal}
                />
                <Button 
                    className='bg-yellow-400 hover:bg-yellow-500 text-sm'
                    icon='fa-solid fa-box-archive'
                    title='Arsipkan atau Aktifkan Catatan'
                    isFull={false}
                    onClick={onArchiveInternal}
                />
            </div>
        </div>
    );
}

const NoteBody = ({ body }: NoteCardProps) => {
    return (
        <p className='overflow-y-auto h-40 mt-2 text-sm'>
            {body}
        </p>
    );
}

const NoteCard = ({ id, title, date, body, onDelete, onArchive }: NoteCardProps) => {
    return (
        <div className='p-3 bg-white rounded-md w-full shadow-md'>
            <NoteHeader id={id} title={title} date={date} onDelete={onDelete} onArchive={onArchive} />
            <NoteBody body={body} />
        </div>
    );
}

export default NoteCard;
