import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbDiBnwa-9rx1O9bxzfs8jWRcn2kOBkjI",
  authDomain: "panta-metro-admin.firebaseapp.com",
  projectId: "panta-metro-admin",
  storageBucket: "panta-metro-admin.firebasestorage.app",
  messagingSenderId: "716022750805",
  appId: "1:716022750805:web:647c2a7a89a6e01193fedc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
