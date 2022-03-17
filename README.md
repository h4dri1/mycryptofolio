# Mycryptofolio

MyCryptoFolio est une plateforme qui permet d'explorer le marché des cryptomonnaies. Vous pourrez consulter les cours des principales cryptomonnaies en direct, les graphiques, la capitalisation ou encore le volume d'échange. En tant qu'utilisateur enregistrés vous pourrez gérer vos portefeuilles d’investissement, enregistrer des transactions et monitorer les performances en fonction des évolutions des cours.

# Backend

Cette API REST est là pour gérer les appels du Front et alimenter le site en données

## Path :

-Docs disponible sur http://hostname:port/docs
-API disponible sur http://hotnale:port/v1

## Stack technique

- [NodeJS](https://nodejs.org/en/download) (v12 ou supérieur)
- [PostgreSQL](https://postgresql.org/download) (v12 ou supérieur)
- [Sqitch](https://sqitch.org/download) (v1 ou supérieur)
- [Redis](https://redis.io/) (v6 ou supérieur)

Ces outils sont nécessaires à l'installation et au fonctionnement de l'API.
A installer sur votre hôte avant de continuer.

## Installation
Cloner le dépot en local

```bash
git clone git@github.com:h4dri1/mycryptofolio.git
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
```

### Solution 1 : Avec sqitch

Pour une base de test :

```bash
sqitch deploy testuser
node data/importJson.js
sqitch deploy
```

Pour une base de production :

```bash
sqitch deploy --plan-file ./migrations/sqitch_prod.plan
node data/importJson.js
```

### Solution 2 : Avec NPM

Pour une base de test :

```bash
npm run install_dev
```

Pour une base de production :

```bash
npm run install_prod
```

### Clean DB :

```bash
npm run clean OU sqitch revert -y
```

Configurer PostgreSQL (ou fournir les vartiables d'environnement nécéssaires) pour que les commandes `createdb` et `sqitch` puissent s'exécuter

## Lancement 

### Developpement :

=> NODE_ENV=dev node-dev

```bash
npm run dev
```

### Test :

Jest

```bash
npm test
```

### Production :

=> NODE_ENV=production node start

```bash
npm start
```

# Frontend

Affichage et mise en forme des données reçus de l'API

## Installation :

```shell
cd ~/myCryptoFolio/front
yarn
```

## Configuration environnement :

Copier le fichier .env.example, le renommer en .env et remplir le chemin d'accés au back (http://localhost:8888/v1 en cas d'utilisation en local).

## Démarrage du serveur front

`yarn start`

Ouvrir votre navigateur à l'url `http://localhost:8080`
