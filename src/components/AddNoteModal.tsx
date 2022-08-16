import { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./styles.css";
import { InputBase, IconButton, Button } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { Bookmark } from "@material-ui/icons";
import { UserState } from "../context/UserContextProvider";

type CustomProps = {
  children: JSX.Element;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: 8,
      padding: theme.spacing(2, 2, 2),
      display: "flex",
      flexDirection: "column",
      outline: "none",
      width: "100%",
      maxWidth: 600,
      margin: "0 16px",
    },
  })
);

const AddNoteModal = ({ children }: CustomProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [labels, setLabels] = useState<string[]>(["first"]); // ---- pending....

  const { addNoteToList } = UserState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveNote = () => {
    addNoteToList({ title, note, isPinned, labels });
    handleClose();
  };

  return (
    <div>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="flex-row-spbtw">
              <InputBase
                fullWidth
                placeholder="Title"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                style={{ fontSize: "x-large", padding: "8px 4px" }}
              />
              <IconButton onClick={() => setIsPinned(!isPinned)}>
                {isPinned ? <Bookmark /> : <BookmarkBorderIcon />}
              </IconButton>
            </div>
            <InputBase
              placeholder="Note..."
              value={note}
              onChange={(e: any) => setNote(e.target.value)}
              style={{ fontSize: "medium", padding: "8px 4px" }}
              multiline
            />
            <div className="flex-row-spbtw mt-2">
              <Button
                size="small"
                style={{ marginRight: 16 }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={saveNote}
              >
                Save
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddNoteModal;
