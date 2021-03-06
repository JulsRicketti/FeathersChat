const socket = io();
const client = feathers();

// Create the Feathers application with a `socketio` connection
client.configure(feathers.socketio(socket));

// Get the service for our `messages` endpoint
const messages = client.service('messages');
const user = client.service('users');

// Configure authentication
client.configure(feathers.authentication({
  storage: window.localStorage
}));

// authenticates facebook user (remember, we do it via requests!)
client.authenticate()
  .then(()=>{
    console.log('yaaay! Authenticated')
    messages.find().then(data => data.forEach(addMessage));
    messages.on('created', addMessage);

  })
  .catch(()=>{
    console.log('not authenticated...')
  })

// only works if user is authenticated through facebook
document.getElementById('login-button').addEventListener('click', (evt) => {
  // authenticating the local user
  client.authenticate({
    strategy:'local',
    email: 'email@email.com',
    password: 'pass'
  }).then(token => {
    messages.find().then(data => data.forEach(addMessage));
    messages.on('created', addMessage);

    console.log('User is logged in');
  });
})

document.getElementById('logout-button').addEventListener('click', function(evt){
  // logging all out
  client.logout()
    .then(()=>{
      console.log('logout successfull')
    })
    .catch(()=>{
      console.log('failed to logout...')
    })

})

// Add a new message to the list
function addMessage(message) {
  const chat = document.querySelector('.chat');
  chat.insertAdjacentHTML('beforeend', `<div class="message flex flex-row">
    <img src="https://placeimg.com/64/64/any" alt="${message.name}" class="avatar">
    <div class="message-wrapper">
      <p class="message-header">
        <span class="username font-600">${message.name}</span>
        <p>Sent at: ${message.createdAt}</p>
      </p>
      <p contenteditable id="message-area-${message._id}" class="message-content font-300">${message.text}</p>
      <button id="bt-delete-${message._id}">Delete</button>
    </div>
  </div>`);

  document.getElementById(`message-area-${message._id}`).addEventListener('blur', (evt) => {
    client.service('messages').patch(message._id, {text: evt.target.innerHTML})
      .then (() => {
  
      })
      .catch((err) => {
        if (err.name === 'Forbidden') {
          alert ('You must be the messages creator to edit it!');
        }

        console.log('Error: ', err);
      });
  });
  
  document.getElementById(`bt-delete-${message._id}`).addEventListener('click', (evt) => {
    evt.target.disabled = true;
    client.service('messages').remove(message._id)
      .then (()=>{
        const topDiv = evt.target.parentNode.parentNode;
        topDiv.parentNode.removeChild(topDiv);
        evt.target.disabled = false;
      })
      .catch((err)=>{
        if (err.name === 'Forbidden') {
          alert ('You must be the messages creator to delete it!');
        }
        console.log('Error! ', err)
        evt.target.disabled = false;
      });

  });
  chat.scrollTop = chat.scrollHeight - chat.clientHeight;
}

document.getElementById('send-message').addEventListener('submit', (ev) => {
  
  const nameInput = document.querySelector('[name="name"]');
  // This is the message text input field
  const textInput = document.querySelector('[name="text"]');
  // Create a new message and then clear the input field
  client.service('messages').create({
    text: textInput.value,
    name: nameInput.value
  }).then(() => {
    textInput.value = '';
  });
  ev.preventDefault();
});
