import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firbaseConfig";

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default { auth, db };
