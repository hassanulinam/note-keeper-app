import { Pagination } from "@material-ui/lab";
import { useState } from "react";
import { UserState } from "../context/UserContextProvider";
import NoteCard from "./NoteCard";
import "./styles.css";

const NoteCardsList = () => {
  const [page, setPage] = useState(1);

  const { notesList, user } = UserState();

  const sortedList = [...notesList].sort((a, b) =>
    a.isPinned === true && b.isPinned === false ? -1 : 1
  );

  const renderEmptyView = () => (
    <div className="note-cards-empty-view">
      <h2>Get started by creating a Note</h2>
      <p>Click on the below add button</p>
      {!user && <p>You can login with your Google account </p>}
    </div>
  );

  if (notesList.length === 0) {
    return renderEmptyView();
  }

  return (
    <div className="note-cards-section">
      <h3>Notes</h3>
      <div className="note-cards-list">
        {sortedList.slice((page - 1) * 6, page * 6).map((note) => (
          <NoteCard key={note.id} data={note} />
        ))}
      </div>

      {sortedList.length > 6 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 48,
          }}
        >
          <Pagination
            count={Math.ceil(notesList.length / 6)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 0);
            }}
            variant="outlined"
            shape="rounded"
          />
        </div>
      )}
    </div>
  );
};

export default NoteCardsList;
