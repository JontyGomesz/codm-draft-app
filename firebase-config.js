// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Replace the below config with YOUR Firebase project's config
const firebaseConfig = {
  apiKey: "AIzaSyDtqnNc2TqV4-G8aE3sIgsI_6XMmzHxdJk",
  authDomain: "tournament-bidding.firebaseapp.com",
  projectId: "tournament-bidding",
  storageBucket: "tournament-bidding.firebasestorage.app",
  messagingSenderId: "376788024235",
  appId: "1:376788024235:web:65a6a88584fb3622ce70ee",
  measurementId: "G-HJSJ75NM0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Automatically sign in anonymously
signInAnonymously(auth).catch((error) => {
  console.error("Anonymous auth error:", error);
});

export { db };