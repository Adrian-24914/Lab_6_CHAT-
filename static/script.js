const getMessages = async () => {
    const chatBox = document.getElementById("chat-box");

    const response = await fetch("/api/messages");
    const messages = await response.json();

    chatBox.innerHTML = "";

    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];

        const li = document.createElement("li");
        li.innerHTML = `<strong>${message.author || message.user}:</strong> ${message.text}`;

        chatBox.appendChild(li);
    }


};

const postMessage = async (message) => {
    await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
    });

    getMessages();
};
