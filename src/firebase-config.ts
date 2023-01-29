import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBx8gknrbjYe8IhrYvjg9Locrl5tGLVcbk",
  authDomain: "kanban-react-d0399.firebaseapp.com",
  projectId: "kanban-react-d0399",
  storageBucket: "kanban-react-d0399.appspot.com",
  messagingSenderId: "721130459904",
  appId: "1:721130459904:web:06a1c62c67a40d709ad9e5",
  measurementId: "G-119DFGGZYK"
  };

  const app = initializeApp(firebaseConfig);
  export const db=getFirestore(app);