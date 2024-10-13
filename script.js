let peer;
let fileInput = document.getElementById('file-input');
let fileList = document.getElementById('file-list');

document.getElementById('create-room').onclick = () => {
    const roomId = prompt('Enter a room ID or leave blank for a random one:') || undefined;
    peer = new Peer(roomId);

    document.getElementById('room-link').value = peer.id;

    peer.on('connection', (conn) => {
        conn.on('data', (data) => {
            if (typeof data === 'string') {
                addFileToList(data);
            }
        });
    });

    peer.on('open', (id) => {
        console.log(`Your peer ID is: ${id}`);
    });

    fileInput.click();
};

fileInput.onchange = (event) => {
    const files = event.target.files;
    const conn = peer.connect(prompt('Enter the peer ID to connect:'));
    
    conn.on('open', () => {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            conn.send(file.name);
            addFileToList(file.name);
        }
    });
};

function addFileToList(fileName) {
    const div = document.createElement('div');
    div.textContent = fileName;

    const yesButton = document.createElement('button');
    yesButton.textContent = 'Yes';
    yesButton.onclick = () => {
        alert(`${fileName} accepted.`);
    };

    const noButton = document.createElement('button');
    noButton.textContent = 'No';
    noButton.onclick = () => {
        alert(`${fileName} rejected.`);
    };

    div.appendChild(yesButton);
    div.appendChild(noButton);
    fileList.appendChild(div);
}
