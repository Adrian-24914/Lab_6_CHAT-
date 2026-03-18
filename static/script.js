const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i;

const extractUrls = (text) => text.match(/https?:\/\/[^\s]+/g) || [];

const isImageUrl = (url) => IMAGE_EXTENSIONS.test(url.split('?')[0]);

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


        const urls = extractUrls(message.text || "");
        for (const url of urls) {
            if (isImageUrl(url)) {
                const img = document.createElement("img");
                img.src = url;
                img.alt = "image";
                img.style.cssText = "display:block; max-width:100%; max-height:250px; margin-top:6px; border-radius:6px;";
                img.onerror = () => img.remove();
                li.appendChild(img);
            }
        }

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