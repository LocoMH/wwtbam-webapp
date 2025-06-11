const socket = new WebSocket("ws://localhost:6789")
var socketConnected = false
// Connection opened
socket.onopen = (event) => {
  socketConnected = true
  register()
}

function register() {
  console.log(socketConnected)
  if (!socketConnected) {
    return
  }
  socket.send(JSON.stringify({
    "role": screenType,
    "token": screenTypePasskeys[screenType]
  }))
}

// Listen for messages
socket.onmessage = (event) => {
  console.log("Message from server ", event.data);

  msg = JSON.parse(event.data).message

  if (msg[0] == "login") {
    loginAnswer(msg[1])
    return
  }
  if (msg[0] == "showCorrectAnswer") {
    showCorrectAnswer(msg[1])
    return
  }
  if (msg[0] == "setCurrentLevel") {
    setCurrentLevel(msg[1])
    return
  }
  if (msg[0] == "setGraphicsVersion") {
    setGraphicsVersion(msg[1])
    return
  }
  if (msg[0] == "setVisibility") {
    setVisibility(msg[1], msg[2])
    return
  }
  if (msg[0] == "setLifelineStatus") {
    setLifelineStatus(lifeline = msg[1], status = msg[2])
    return
  }
}

function sendMessage(message) {
  socket.send(message)
}