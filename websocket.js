const socket = new WebSocket("ws://localhost:6789")

// Connection opened
socket.onopen = (event) => {
  socket.send(JSON.stringify({
    "role": "contestant",
    "token": "cont123"
  }))
}

// Listen for messages
socket.onmessage = (event) => {
  msg = JSON.parse(event.data).message

  if (msg[0] == "login") {
    loginAnswer(msg[1])
    return
  }
  if (msg[0] == "showCorrectAnswer") {
    showCorrectAnswer(msg[1])
    return
  }
}

function sendMessage(message) {
  socket.send(message)
}