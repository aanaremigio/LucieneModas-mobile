import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADgihNowA1A7VpmVm0faJGFveAXfL3qPQ",
  authDomain: "lucienemodasmobile.firebaseapp.com",
  projectId: "lucienemodasmobile",
  storageBucket: "lucienemodasmobile.firebasestorage.app",
  messagingSenderId: "450493430420",
  appId: "1:450493430420:web:8a9de93a0ac59193101281",
  measurementId: "G-16GM3Z91TW"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância do Auth, para que possamos autenticar os usuários do sistema
export const auth = getAuth(app);