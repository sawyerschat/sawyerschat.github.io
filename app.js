function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(username + "@example.com", password)
        .then(() => {
            localStorage.setItem('username', username);
            showDMSection();
        })
        .catch(error => {
            console.error("Error registering: ", error);
        });
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(username + "@example.com", password)
        .then(() => {
            localStorage.setItem('username', username);
            showDMSection();
        })
        .catch(error => {
            console.error("Error logging in: ", error);
        });
}

function showDMSection() {
    document.getElementById('registration').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('dmSection').style.display = 'block';
}

function loadDM() {
    const username = document.getElementById('dmUsername').value;
    const currentUser = localStorage.getItem('username');
    const messagesRef = db.collection('messages');
    messagesRef
        .where('participants', 'array-contains', currentUser)
        .where('participants', 'array-contains', username)
        .orderBy('timestamp')
        .get()
        .then(snapshot => {
            const dmChat = document.getElementById('dmChat');
            dmChat.innerHTML = '';

            snapshot.forEach(doc => {
                const msgData = doc.data();
                const msgElement = document.createElement('div');
                msgElement.textContent = `${msgData.sender}: ${msgData.message}`;
                dmChat.appendChild(msgElement);
            });
        })
        .catch(error => {
            console.error("Error loading DM: ", error);
        });
}

function sendMessage() {
    const username = document.getElementById('dmUsername').value;
    const message = document.getElementById('dmMessage').value;
    const currentUser = localStorage.getItem('username');
    const messagesRef = db.collection('messages');

    messagesRef.add({
        sender: currentUser,
        message: message,
        participants: [currentUser, username],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        document.getElementById('dmMessage').value = '';
        loadDM();
    })
    .catch(error => {
        console.error("Error sending message: ", error);
    });
}
