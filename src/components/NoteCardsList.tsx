import { UserState } from "../context/UserContextProvider";
import NoteCard from "./NoteCard";
import "./styles.css";

const NoteCardsList = () => {
  const { notesList } = UserState();
  const pinnedList = notesList.filter((note) => note.isPinned);

  return (
    <div className="note-cards-section">
      <h3>Notes</h3>
      <div className="note-cards-list">
        {pinnedList.map((note, i) => (
          <NoteCard key={i} data={note} />
        ))}
        {notesList?.map((note) =>
          note.isPinned ? null : <NoteCard key={note.id} data={note} />
        )}
      </div>
    </div>
  );
};

export default NoteCardsList;
