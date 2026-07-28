import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAkUer_7sgpkdJwGHlThPFpP4VHfnZ607o",
  authDomain: "phuongdong-e-learning.firebaseapp.com",
  projectId: "phuongdong-e-learning",
  storageBucket: "phuongdong-e-learning.firebasestorage.app",
  messagingSenderId: "153889391601",
  appId: "1:153889391601:web:4909f55fddff480bad3a50",
  measurementId: "G-C96C5JWCZ7",
  databaseURL: "https://phuongdong-e-learning-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
