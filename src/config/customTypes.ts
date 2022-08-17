import { Color } from "@material-ui/lab";
import { User } from "firebase/auth";

export type NoteObj = {
  title: string;
  note: string;
  isPinned: boolean;
  labels: string[];
  id: string;
  date: string;
};

export type USER_CONTEXT = {
  user: User | null;
  notesList: NoteObj[];
  addNoteToList: (newNote: NoteObj) => void;
  removeNoteFromList: (noteId: string) => void;
  changePinnedStatus: (noteId: string) => void;
  addLabel: (noteId: string, newLabel: string) => void;
  removeLabel: (noteId: string, selectedLabel: string) => void;
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
