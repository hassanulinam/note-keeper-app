import { User } from "firebase/auth";

export type NoteObj = {
  title: string;
  note: string;
  isPinned: boolean;
  labels: string[];
  id: number;
  date: string;
};

export type USER_CONTEXT = {
  user: User | null;
  notesList: NoteObj[];
  addNoteToList: (newNote: NoteObj) => void;
  removeNoteFromList: (noteId: number) => void;
  changePinnedStatus: (noteId: number) => void;
  addLabel: (noteId: number, newLabel: string) => void;
  removeLabel: (noteId: number, selectedLabel: string) => void;
};

export type ChildProp = { children: JSX.Element };
