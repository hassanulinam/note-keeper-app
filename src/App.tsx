import {
  Container,
  createStyles,
  Fab,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";
import "./App.css";
import AddNoteModal from "./components/AddNoteModal";
import Header from "./components/Header";
import NoteCardsList from "./components/NoteCardsList";
import ToastAlert from "./components/ToastAlert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabAdd: {
      position: "fixed",
      bottom: 32,
      right: "10%",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
  })
);

const emptyNoteObj = {
  title: "",
  note: "",
  isPinned: false,
  labels: [],
  id: "new-note",
  date: "",
};

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Header />
      <Container className={classes.container}>
        <NoteCardsList />
        <span className={classes.fabAdd}>
          <AddNoteModal data={emptyNoteObj}>
            <Fab color="secondary" aria-label="add-note">
              <AddOutlined />
            </Fab>
          </AddNoteModal>
        </span>
        <ToastAlert />
      </Container>
    </div>
  );
}

export default App;
