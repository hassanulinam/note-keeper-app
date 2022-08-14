import {
  Button,
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabAdd: {
      margin: "auto 24px 32px auto",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Header />
      <Container className={classes.container}>
        <span className={classes.fabAdd}>
          <AddNoteModal>
            <Fab color="secondary" aria-label="add-note">
              <AddOutlined />
            </Fab>
          </AddNoteModal>
        </span>
      </Container>
    </div>
  );
}

export default App;
