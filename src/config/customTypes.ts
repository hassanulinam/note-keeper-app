import { Color } from "@material-ui/lab";
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

export type ToastObj = {
  open: boolean;
  message: string;
  type: Color;
  duration?: number;
};

export type THEME_CONTEXT = {
  toggleTheme: () => void;
  isDark: boolean;
  notifyToast: ToastObj;
  setNotifyToast: React.Dispatch<React.SetStateAction<ToastObj>>;
};
