const socket = io() //by doing this we are connected socket to the client file

let name;
let textarea = document.querySelector('#textarea') // jo bhi textarea pe likha tha index.html pe vo sb msg yha pe aa rha hai
let messageArea = document.querySelector('.message__area')
do{
    name = prompt('Please enter your name')
}while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key==='Enter'){
        let tmp = e.target.value.trim()     // this is bcoz if anyone sends msg without typing anything then this will not be sended
        if(tmp.length>0) sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    // Append the typed message
    appendMessage(msg, 'outgoing')
    scrollToBottom()
    textarea.value = ''

    // Send to Server via websocket connection
    socket.emit('message', msg) // .emit means we are sending msg as name of message now we should go to server to listen this emit
}

function appendMessage(msg, type){
    // ek div ka box bna rhe hai yha pe aur uss box mei pura textarea ka msg copy kr denge aur last mei uss box ko append kr denge
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(type, 'message')

    // this is html markup
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    // so we have to put this html markup inside the mainDiv
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve msg from the server

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

// This function scrolls the msg box to the end
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}