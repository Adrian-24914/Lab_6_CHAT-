const getMessages = async () => {
    const chatBox = document.getElementById("chat-box");

    const wasAtBottom =
        chatBox.scrollHeight - chatBox.scrollTop <= chatBox.clientHeight + 5;

    const response = await fetch("/api/messages");
    const messages = await response.json();

    chatBox.innerHTML = "";

    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];

        const li = document.createElement("li");
        li.innerHTML = `<strong>${message.author || message.user}:</strong> ${message.text}`;

        chatBox.appendChild(li);
    }

    if (wasAtBottom) {
        chatBox.scrollTop = chatBox.scrollHeight;
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

getMessages();
setInterval(getMessages, 5000);

const sendButton = document.getElementById("send-button");
const userInput = document.getElementById("user-input");

if (sendButton && userInput) {

    sendButton.addEventListener("click", () => {
        const text = userInput.value.trim();

        if (text !== "") {
            postMessage({
                user: "Adrian",
                text: text
            });

            userInput.value = "";
        }
    });

        userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });
}