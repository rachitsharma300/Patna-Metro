import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db, auth } from "./firebase";

const siteDataDocRef = doc(db, "admin", "site_data");

// AUTHENTICATION
export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutAdmin = async () => {
  await signOut(auth);
};

// DATABASE (WRITE)
export const updateTicker = async (tickerText) => {
  try {
    await setDoc(siteDataDocRef, { tickerText }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating ticker:", error);
    return false;
  }
};

export const updateAlertBanner = async (alertActive, alertType, alertMessage) => {
  try {
    await setDoc(siteDataDocRef, {
      alertActive,
      alertType,
      alertMessage
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating banner:", error);
    return false;
  }
};

// DATABASE (READ LIVE STREAM)
export const subscribeToSiteData = (callback) => {
  // Sets up a realtime listener for changes
  return onSnapshot(siteDataDocRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  });
};
