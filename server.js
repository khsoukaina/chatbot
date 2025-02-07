const express = require('express');
const app = express();
const port = 3000;

// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

// Servir les fichiers statiques (HTML, JS) du dossier courant
app.use(express.static('public'));

// Route POST pour le chat
app.post('/chat', (req, res) => {
    const question = req.body.question;
    console.log("Question reçue :", question);

    // Simuler une réponse du bot
    const answer = "Réponse du bot : " + question;

    // Réponse JSON envoyée au client
    res.json({ answer });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
