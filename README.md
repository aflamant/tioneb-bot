# tioneb-bot

Petit projet de développement d'un bot discord.

## Mise en place

Après avoir cloné le dépôt, il faut installer les dépendances avec `npm install`. Ensuite faut ensuite créer un fichier `config.json` sur la racine, sur le modèle de `config.json.example`. Pour lancer le bot, il faut exécuter `node index.js`.

### config.json

Il y a trois champs à renseigner:

- `token` : le token de votre bot Discord, cf [la documentation officielle](https://discordapp.com/developers/docs/intro)
- `prefix` : le préfixe voulu pour vos commandes dans le chat
- `activity` : l'activité à afficher pour le bot sur le serveur
