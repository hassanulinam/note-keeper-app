import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { ChildProp, NoteObj, USER_CONTEXT } from "../config/customTypes";
import { auth, db } from "../config/firebaseApp";

const UserContext = createContext<USER_CONTEXT>({
  user: null,
  notesList: [],
  addNoteToList: () => {},
  removeNoteFromList: () => {},
});

const UserContextProvider = ({ children }: ChildProp) => {
  const [notesList, setNotesList] = useState<NoteObj[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const collectionName = "noteslist";

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
          setNotesList([]);
        }
      });
    }
    return unsubscribe;
  }, [user]);

  const addNoteToList = async (newNote: NoteObj) => {
    if (user) {
      const notesRef = doc(db, collectionName, user.uid);
      console.log("NOTES REF: ", notesRef);
      try {
        await setDoc(notesRef, { notesList: [...notesList, newNote] });
        // SUCCESS TOAST
        console.log("successfully added note to FIRESTORE");
      } catch (err: any) {
        console.log("Error While adding note: ", err.message);
        // ERROR TOAST....
      }
    } else {
      setNotesList([...notesList, newNote]);
      // WARNING TOAST (temporary saving of data)
      console.log("ADDING NOTES IN OFFLINE MODE");
    }
  };

  const removeNoteFromList = async (noteId: string) => {};

  return (
    <UserContext.Provider
      value={{ notesList, user, addNoteToList, removeNoteFromList }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const UserState = () => useContext(UserContext);
