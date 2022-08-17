import { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  InputBase,
  IconButton,
  Button,
  Chip,
  Popover,
} from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { Add, Bookmark } from "@material-ui/icons";
import { UserState } from "../context/UserContextProvider";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import "./styles.css";
import { NoteObj } from "../config/customTypes";

type CustomProps = {
  children: JSX.Element;
  data: NoteObj;
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

const AddNoteModal = ({ children, data }: CustomProps) => {
  const classes = useStyles();
  const [isPinned, setIsPinned] = useState(data.isPinned);
  const [title, setTitle] = useState(data.title);
  const [note, setNote] = useState(data.note);
  const [labels, setLabels] = useState<string[]>([...data.labels]); // ---- pending....
  const [newLabel, setNewLabel] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClosePopover = () => {
    if (newLabel) setLabels([...labels, newLabel]);
    setAnchorEl(null);
    setNewLabel("");
  };

  const openPop = Boolean(anchorEl);
  const popoverId = openModal ? "add-label-popover" : undefined;

  const { addNoteToList, notesList } = UserState();

  const setInputsToDefaults = () => {
    setTitle(data.title);
    setNote(data.note);
    setLabels([...data.labels]);
    setIsPinned(data.isPinned);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setInputsToDefaults();
    setOpenModal(false);
  };

  const saveNote = () => {
    if (!(title || note)) {
      // toast warning : Empty note
      handleClose();
      return;
    }
    addNoteToList({
      title,
      note,
      isPinned,
      labels,
      id: data.id === "new-note" ? uuid() : data.id,
      date: format(new Date(), "MMM-dd, h:mm aaa"),
    });
    handleClose();
  };

  return (
    <>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
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
            <div className="labels-container">
              {labels?.map((lb, i) => (
                <Chip
                  key={i}
                  label={lb}
                  size="small"
                  onDelete={() => setLabels(labels.filter((i) => i !== lb))}
                />
              ))}
              <Chip
                icon={<Add />}
                label="add label"
                size="small"
                onClick={(e: any) => setAnchorEl(e.currentTarget)}
                aria-describedby={popoverId}
              />
              <Popover
                id={popoverId}
                open={openPop}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div className="popover-content">
                  <InputBase
                    placeholder="new label"
                    value={newLabel}
                    onChange={(e: any) => setNewLabel(e.target.value)}
                    style={{ padding: "0 8px", fontSize: "small" }}
                  />
                  <Button
                    onClick={handleClosePopover}
                    color="primary"
                    size="small"
                  >
                    add
                  </Button>
                </div>
              </Popover>
            </div>
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
    </>
  );
};

export default AddNoteModal;
