import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { ChildProp, NoteObj, USER_CONTEXT } from "../config/customTypes";
import { auth, db } from "../config/firebaseApp";
import { ThemeState } from "./ThemeContextProvider";

const UserContext = createContext<USER_CONTEXT>({
  user: null,
  notesList: [],
  addNoteToList: () => {},
  removeNoteFromList: () => {},
  changePinnedStatus: (noteId) => {},
  addLabel: (noteId, selectedLabel) => {},
  removeLabel: (noteId, selectedLabel) => {},
});

const UserContextProvider = ({ children }: ChildProp) => {
  const [notesList, setNotesList] = useState<NoteObj[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const collectionName = "noteslist";

  const { setNotifyToast } = ThemeState();

  // sync the user auth
  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
      if (userData) setUser(userData);
      else setUser(null);
    });
  }, []);

  // sync notes-list-data with FireStore
  useEffect(() => {
    if (user) {
      var unsubscribe;
      const notesRef = doc(db, collectionName, user.uid);
      unsubscribe = onSnapshot(notesRef, (documentSnap) => {
        if (documentSnap.exists()) setNotesList(documentSnap.data().notesList);
        else {
          console.log("NO ITEMS FOUND IN NotesList");
          setNotifyToast({
            open: true,
            message: "Notes not found!",
            type: "warning",
          });
          setNotesList([]);
        }
      });
    } else setNotesList([]);

    return unsubscribe;
  }, [user]);

  const updateListInFirestore = async (updatedList: NoteObj[]) => {
    if (user) {
      const notesRef = doc(db, collectionName, user.uid);
      try {
        await setDoc(notesRef, {
          notesList: updatedList,
        });
        // SUCCESS TOAST
        console.log("updated Notes-List at FIRESTORE");
      } catch (err: any) {
        console.log(
          "Error while updating Notes-List at FIRESTORE: ",
          err.message
        );
        setNotifyToast({
          open: true,
          message: "Error occured while updating notes",
          type: "error",
        });
      }
    } else setNotesList(updatedList);
  };

  const addNoteToList = async (newNote: NoteObj) => {
    let newList, toastMsg;
    const noteAlreadyExists = notesList.find((note) => note.id === newNote.id);
    if (noteAlreadyExists) {
      newList = notesList.map((note) =>
        note.id === newNote.id ? newNote : note
      );
      toastMsg = "Successfully updated the Note";
    } else {
      newList = [...notesList, newNote];
      toastMsg = "Successfully created the Note";
    }
    await updateListInFirestore(newList);
    setNotifyToast({
      open: true,
      message: toastMsg,
      type: "success",
    });
  };

  const removeNoteFromList = async (noteId: number) => {
    const filteredList = notesList.filter((note) => note.id !== noteId);
    await updateListInFirestore(filteredList);
    setNotifyToast({
      open: true,
      message: "Note deleted",
      type: "warning",
    });
  };

  const changePinnedStatus = async (noteId: number) => {
    const updatedList = notesList.map((note) =>
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    );
    await updateListInFirestore(updatedList);
  };

  const addLabel = async (noteId: number, newLabel: string) => {
    const updatedList = notesList.map((note) =>
      note.id === noteId
        ? { ...note, labels: [...note.labels, newLabel] }
        : note
    );
    await updateListInFirestore(updatedList);
  };

  const removeLabel = async (noteId: number, selectedLabel: string) => {
    const udpatedList = notesList.map((note) =>
      note.id === noteId
        ? {
            ...note,
            labels: note.labels.filter((lb) => lb !== selectedLabel),
          }
        : note
    );
    await updateListInFirestore(udpatedList);
  };

  return (
    <UserContext.Provider
      value={{
        notesList,
        user,
        addNoteToList,
        removeNoteFromList,
        changePinnedStatus,
        addLabel,
        removeLabel,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const UserState = () => useContext(UserContext);
