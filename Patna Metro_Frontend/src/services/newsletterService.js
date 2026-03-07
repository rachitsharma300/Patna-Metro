import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const subscribeNewsletter = async (email) => {
  try {
    const subscribersRef = collection(db, "newsletter_subscribers");
    await addDoc(subscribersRef, {
      email: email,
      subscribedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: error.message };
  }
};
