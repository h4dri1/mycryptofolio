# projet-11-crypt-o-folio - Backend

Ce sous-dépôt est destiné à l'API de MyCryptoFolio.

Ce projet est une API REST pour gérer les appels du Front et alimenter un site de cryptomonnaies

## Stack technique

- [NodeJS](https://nodejs.org/en/download) (v12 ou supérieur)
- [PostgreSQL](https://postgresql.org/download) (v12 ou supérieur)
- [Sqitch](https://sqitch.org/download) (v1 ou supérieur)

Ces outils sont nécessaires à l'installation et au fonctionnement de l'API.
A installer sur votre hôte avant de continuer.

## Installation

Cloner le dépot en local

```bash
git clone <url_du_depot>
```

Puis dans le dossier local, installer les dépendances npm

```bash
npm install
```

Copier le fichier .env.example, le renommer en .env et remplir les informations nécessaires.

Copier le fichier .sqitch.example, le renommer en sqitch.conf et rajouter 'target = db:pg://postgres:password@localhost:5432/mycryptofolio

Enfin, créer une base de données PostgreSQL et déployer le projet Sqitch dessus

```bash
createdb -U postgres mycryptofolio
sqitch deploy
```

Configurer PostgreSQL (ou fournir les vartiables d'environnement nécéssaires) pour que les commandes `createdb` et `sqitch` puissent s'exécuter

## Lancement 

```bash
npm run dev (node-dev)
npm start (node)
```