import { Card, CardContent, Chip, IconButton } from "@material-ui/core";
import { Bookmark, BookmarkBorder, Edit } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import HistoryIcon from "@material-ui/icons/History";
import { NoteObj } from "../config/customTypes";
import { UserState } from "../context/UserContextProvider";
import AddNoteModal from "./AddNoteModal";
import "./styles.css";

const NoteCard = ({ data }: { data: NoteObj }) => {
  const { title, note, isPinned, labels, id, date } = data;
  const { changePinnedStatus, removeNoteFromList, removeLabel } = UserState();

  return (
    <Card variant="outlined" className="note-card">
      <CardContent className="note-card-content">
        <div className="flex-row-spbtw">
          <h2 className="card-title">{title}</h2>
          <IconButton
            onClick={() => changePinnedStatus(id)}
            style={{ fontSize: 18, margin: 0 }}
          >
            {isPinned ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </div>
        <p className="card-text">{note}</p>
        <div className="flex-row-spbtw mt-1">
          <div className="labels-container">
            {labels.map((lb, i) => (
              <Chip
                key={i}
                label={lb}
                size="small"
                onDelete={() => removeLabel(id, lb)}
              />
            ))}
          </div>
          <span className="note-card-date">
            <HistoryIcon style={{ fontSize: 14, margin: 0 }} />
            {date.toLocaleString()}
          </span>
        </div>
      </CardContent>
      <div className="flex-row-spbtw">
        <AddNoteModal data={data}>
          <IconButton>
            <Edit fontSize="small" />
          </IconButton>
        </AddNoteModal>
        <IconButton onClick={() => removeNoteFromList(id)}>
          <DeleteIcon fontSize="small" color="secondary" />
        </IconButton>
      </div>
    </Card>
  );
};

export default NoteCard;
