document.addEventListener("DOMContentLoaded", function () {
    const toggleSidebarButton = document.getElementById("toggle-sidebar");
    const sidebar = document.getElementById("sidebar");
    const mainContainer = document.getElementById("main-container");
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");
    const chatBody = document.getElementById("chat-body");
    const newConversationButton = document.getElementById("new-conversation-button");

    // Fonction pour basculer la barre latérale
    toggleSidebarButton.addEventListener("click", function () {
        sidebar.classList.toggle("hidden");
        if (sidebar.classList.contains("hidden")) {
            toggleSidebarButton.style.left = "10px";
        } else {
            toggleSidebarButton.style.left = "260px";
        }
    });

    // Fonction pour envoyer un message
    sendButton.addEventListener("click", function () {
        sendMessage();
    });

    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Ajouter le message de l'utilisateur au chat
            addMessageToChat("user-message", message);

            // Envoyer la question au serveur et récupérer la réponse
            fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: message })
            })
            .then(response => response.json())
            .then(data => {
                const botResponse = data.answer;  // Réponse du bot
                addMessageToChat("bot-message", botResponse);
            })
            .catch(error => {
                console.error('Erreur:', error);
                addMessageToChat("bot-message", "Désolé, une erreur est survenue.");
            });

            userInput.value = "";  // Effacer l'input
        }
    }

    function addMessageToChat(className, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(className);
        messageElement.textContent = message;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }


    

    newConversationButton.addEventListener("click", function () {
        chatBody.innerHTML = "";  // Effacer les messages
        addMessageToChat("bot-message", "Nouvelle conversation commencée. Comment puis-je vous aider ?");
    });
});
