let socket = io.connect("http://localhost:3000/", {"forcNew": true});

socket.on("messages", data => {
    console.log(data);
    console.log("data");
    render(data);
});

function render(data) {
    let html = data.map((e, i) => {
        return (`
        <div>
            <strong>${e.author}</strong>
            <em>${e.text}</em>
        </div>
        `);
    }).join(" ");

    document.getElementById("messages").innerHTML = html;
}

function addMessages() {
    let message = {
        author: document.getElementById("username").value,
        text: document.getElementById("text").value
    };
    console.log("Emitting new message");
    socket.emit("new-message", message);
    document.getElementById("username").value = "";
    document.getElementById("text").value = "";

    return false;
}