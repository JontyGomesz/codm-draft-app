import { db } from "./firebase-config.js";
import {
  collection, doc, getDoc, getDocs, updateDoc, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const players = [
  "Kenzo", "Kiddo", "Venom", "Tinki", "Vks", "Twitty", "Heshan",
  "Dumiya", "Yakari", "Steeno", "Razor", "Hunter"
];

const stateDocRef = doc(db, "draft", "state");
const votesColRef = collection(db, "votes");

let currentIndex = 0;

async function getCurrentPlayerIndex() {
  const stateSnap = await getDoc(stateDocRef);
  if (stateSnap.exists()) {
    const data = stateSnap.data();
    currentIndex = data.currentIndex || 0;
  } else {
    await setDoc(stateDocRef, { currentIndex: 0 });
    currentIndex = 0;
  }
}

async function updatePlayerDisplay() {
  if (currentIndex >= players.length) {
    document.getElementById("playerName").textContent = "Drafting complete!";
    document.querySelector(".vote-buttons").style.display = "none";
    document.getElementById("status").textContent = "";
    return;
  }

  document.getElementById("playerName").textContent = players[currentIndex];
  document.getElementById("status").textContent = "Waiting for vote...";
}

async function vote(team) {
  const player = players[currentIndex];
  const voteRef = doc(votesColRef, player);
  await setDoc(voteRef, { team });

  currentIndex++;
  await updateDoc(stateDocRef, { currentIndex });
  updatePlayerDisplay();
}

async function init() {
  await getCurrentPlayerIndex();
  updatePlayerDisplay();
}

init();