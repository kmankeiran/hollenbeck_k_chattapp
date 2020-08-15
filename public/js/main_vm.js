// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();
let nick;

// the packet is whatever data we send through with the connect event
//from the server

// this is data destructuring. Go look it up on MDN
function setUserId({sID}) {
    // debugger;
    console.log(sID);
    vm.socketID = sID;
}

function showDisconnectMessage() {
    console.log('a user disconnected');
}

function appendMessage(message) {
    // Recent edit
    vm.messages.push(message);
}


function likeMessage() {
    console.log('You have liked this message');

}

const vm = new Vue({
    data: {
        socketID: "",
        message: "",
        // Use Javascript to collect data from an input field
        nickname: "",
        messages: []
    },

    methods: {
        // emit a message event to the server so that it 
        // can in turn send this to anyone who's connected
        dispatchMessage() {
            //recent edit
            nick=document.querySelector('#nickname').value;
            console.log(nick);

            console.log('handle emit message');

            vm.nickname = nick;

            // the double pipe || is an "or" operator
            // if the first value is set, use it. else use
            // whatever comes after the "or" operator
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || "anonymous"
            })

            this.message = "";
        },
    
    },

    mounted: function() {
        console.log('vue is done mounting');
    },

    components: {
        newmessage: ChatMessage
    }
}).$mount("#app");

var btn = new Vue({ 
    el: '#likeButton',

    data: {
        name: 'like'
    },

    methods: {
        likeEvent: function(event) {
            console.log('from like event');
        }
    }
    
})

socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);