export type Note = {
    id: number;
    title: string;
    body: string;
    archived: boolean;
    createdAt: string;
}

export let noteData: Note[] = [];
