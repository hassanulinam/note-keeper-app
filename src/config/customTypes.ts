import { User } from "firebase/auth";

export type NoteObj = {
  title: string;
  note: string;
  isPinned: boolean;
  labels: string[];
  id?: string;
};

export type USER_CONTEXT = {
  user: User | null;
  notesList: NoteObj[];
  addNoteToList: (newNote: NoteObj) => void;
  removeNoteFromList: (noteId: string) => void;
};

export type ChildProp = { children: JSX.Element };
