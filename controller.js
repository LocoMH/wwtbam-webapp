let socket = new WebSocket("ws://localhost:6789")


// Listen for messages
socket.onmessage = (event) => {
    console.log("Message from server ", event.data);
}

socket.onopen = (event) => {
    socket.send(JSON.stringify({
        "role": "controller",
        "token": "ctrl123",
    }))
}

function sendMessage(message, roles) {
    socket.send(JSON.stringify({ "message": message, "roles": roles }))
}

$(document).ready(function () {
    $('#btn-login-A').on('click', function () {
        sendMessage(message = ["login", "A"])
    })
    $('#btn-login-B').on('click', function () {
        sendMessage(message = ["login", "B"])
    })
    $('#btn-login-C').on('click', function () {
        sendMessage(message = ["login", "C"])
    })
    $('#btn-login-D').on('click', function () {
        sendMessage(message = ["login", "D"])
    })
    $('#btn-correct-A').on('click', function () {
        sendMessage(message = ["showCorrectAnswer", "A"])
    })
    $('#btn-correct-B').on('click', function () {
        sendMessage(message = ["showCorrectAnswer", "B"])
    })
    $('#btn-correct-C').on('click', function () {
        sendMessage(message = ["showCorrectAnswer", "C"])
    })
    $('#btn-correct-D').on('click', function () {
        sendMessage(message = ["showCorrectAnswer", "D"])
    })
    $("#level-setter").on("change", function () {
        sendMessage(message = ["setCurrentLevel", this.value])
    })
    $('input[type=radio][name=graphics-version]').on("change", function () {
        sendMessage(message = ["setGraphicsVersion", this.value])
    })
    $("#btn-show-paf").on("click", function () {
        sendMessage(message = ["setVisibility", "paf-area", true])
    })
    $("#btn-hide-paf").on("click", function () {
        sendMessage(message = ["setVisibility", "paf-area", false])
    })


    // $('#btn-show-correct').on('click', function () {
    //     showCorrectAnswer("B")
    // })
    // $('#btn-level-up').on('click', function () {
    //     setCurrentLevel(currentLevel + 1)
    // })
    // $('#btn-level-down').on('click', function () {
    //     setCurrentLevel(currentLevel - 1)
    // })
    // $('#cb-lifeline-1-available').on('change', function() {
    //     setLifelineAvailability(4, this.checked)
    // })
})