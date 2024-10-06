import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        await createUserWithEmailAndPassword(auth, username + "@example.com", password);
        localStorage.setItem('username', username);
        showDMSection();
    } catch (error) {
        console.error("Error registering: ", error);
    }
}

async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await signInWithEmailAndPassword(auth, username + "@example.com", password);
        localStorage.setItem('username', username);
        showDMSection();
    } catch (error) {
        console.error("Error logging in: ", error);
    }
}

function showDMSection() {
    document.getElementById('registration').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('dmSection').style.display = 'block';
}

async function loadDM() {
    const username = document.getElementById('dmUsername').value;
    const currentUser = localStorage.getItem('username');
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('participants', 'array-contains', currentUser), where('participants', 'array-contains', username), orderBy('timestamp'));

    try {
        const snapshot = await getDocs(q);
        const dmChat = document.getElementById('dmChat');
        dmChat.innerHTML = '';

        snapshot.forEach(doc => {
            const msgData = doc.data();
            const msgElement = document.createElement('div');
            msgElement.textContent = `${msgData.sender}: ${msgData.message}`;
            dmChat.appendChild(msgElement);
        });
    } catch (error) {
        console.error("Error loading DM: ", error);
    }
}

async function sendMessage() {
    const username = document.getElementById('dmUsername').value;
    const message = document.getElementById('dmMessage').value;
    const currentUser = localStorage.getItem('username');

    const messagesRef = collection(db, 'messages');

    try {
        await addDoc(messagesRef, {
            sender: currentUser,
            message: message,
            participants: [currentUser, username],
            timestamp: new Date()
        });
        document.getElementById('dmMessage').value = '';
        loadDM();
    } catch (error) {
        console.error("Error sending message: ", error);
    }
}
