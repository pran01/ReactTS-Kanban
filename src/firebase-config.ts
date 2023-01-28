import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBeN8VGTjw_6YocD2eFjhDow_DfmFPX0UU",
    authDomain: "reactts-kanban.firebaseapp.com",
    projectId: "reactts-kanban",
    storageBucket: "reactts-kanban.appspot.com",
    messagingSenderId: "468464582155",
    appId: "1:468464582155:web:0d32216b52d7c4c085110e",
    measurementId: "G-DQTHD2TERK"
  };

  const app = initializeApp(firebaseConfig);
  export const db=getFirestore(app);