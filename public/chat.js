//Make connection
var socket = io.connect("http://localhost:4000");

//Query DOM
var message = document.getElementById("message"),
    handle = document.getElementById("handle"),
    btn = document.getElementById("send"),
    output = document.getElementById("output"),
    feedback = document.getElementById("feedback");


// Emit(send or initiate) Events means fire event when click on button
btn.addEventListener("click", function () {
    //socket.emit takes two parameter 
    //1) name of message 
    //2)what atcual message is sending to server 
    if (message.value == "" || handle.value == "") {
        alert("Please enter missing data");
    }
    else {
        socket.emit("chat", {
            message: message.value,
            handle: handle.value
        });
    }

    message.value = ""
});

// Emit(send or initiate) Events means fire event when keypress on button
message.addEventListener("keypress", function () {
    socket.emit("typing", handle.value);

});


//Listen for events

socket.on("chat", function (data) {
    feedback.innerHTML = ""
    output.innerHTML += `<p><strong> ${data.handle} </strong> ${data.message}  </p>`;
});

socket.on("typing", function (data) {
    feedback.innerHTML = `<p><em>  ${data}  is typing a message....</em></p>`;
});
