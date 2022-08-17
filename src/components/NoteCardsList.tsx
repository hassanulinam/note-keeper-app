import { Pagination } from "@material-ui/lab";
import { useState } from "react";
import { UserState } from "../context/UserContextProvider";
import NoteCard from "./NoteCard";
import "./styles.css";

const NoteCardsList = () => {
  const [page, setPage] = useState(1);

  const { notesList } = UserState();

  const pinnedList = notesList.filter((note) => note.isPinned);

  const sortedList = [...notesList].sort((a, b) =>
    a.isPinned === true && b.isPinned === false ? -1 : 1
  );

  console.log(
    "slist",
    sortedList.map((nt) => ({ title: nt.title, isPinned: nt.isPinned }))
  );

  return (
    <div className="note-cards-section">
      <h3>Notes</h3>
      <div className="note-cards-list">
        {sortedList.slice((page - 1) * 6, page * 6).map((note) => (
          <NoteCard key={note.id} data={note} />
        ))}
      </div>
      <Pagination
        count={Math.ceil(notesList.length / 6)}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 0);
        }}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "cetner",
        }}
      />
    </div>
  );
};

export default NoteCardsList;
