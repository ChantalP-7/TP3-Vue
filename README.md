# TP3 — Projet de gestion de forfaits de voyage

Application web full-stack permettant de gérer des forfaits de voyage (consultation, ajout, modification et suppression), développée avec Vue.js côté client et Node.js côté serveur.

Le projet est divisé en trois parties principales : Frontend, Backend et Base de données.TP3 Projet de gestion de forfaits de voyage

# Technologies utilisées

## Frontend

- Vue.js — framework JavaScript pour la création de l’interface utilisateur

- Vite — bundler rapide pour le développement et la production

- Tailwind CSS — framework CSS utilitaire pour le design

- Axios — communication HTTP avec l’API backend

## Backend

- Node.js — environnement serveur JavaScript

- Express.js — framework backend pour la création de l’API REST

- Sequelize — ORM pour interagir avec la base de données SQL

- CORS / Body-parser — gestion des requêtes HTTP


## Base de données

- MySQL (SQL)

- Modélisation des données avec Sequelize

- Opérations CRUD complètes (Create, Read, Update, Delete)


## Fonctionnalités principales

- Affichage des forfaits de voyage

- Ajout de nouveaux forfaits

- Modification de forfaits existants

- Suppression de forfaits

- Communication frontend/backend via API REST


## Installation locale et faire sur le terminal :

1. Cloner le projet
-  Faire git clone <mon-url-du-repo>

2. Frontend
- cd app-vue
- npm install
- npm run dev

3. Backend
- cd server
- npm install
- node server.js

4. Variables d’environnement (backend)

Créer un fichier .env dans server :

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nom_de_la_db

## Déploiement

- Frontend : Netlify

- Backend : Render

- Base de données : Railway (MySQL)

## Architecture cloud :

Vue (Netlify)
   ↓ Axios
Node / Express (Render)
   ↓ Sequelize
MySQL (Railway)


## Objectifs pédagogiques

- Développer une application full-stack

- Mettre en place une API REST

- Utiliser Sequelize avec une base SQL

- Gérer la communication frontend/backend

- Déployer une application complète dans le cloud