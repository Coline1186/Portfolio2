# 🚀 Portfolio Fullstack – Coline Grosso

## 👩‍💻 À propos

Développeuse web en reconversion, j’ai conçu ce portfolio comme une **application fullstack complète**, et non comme un simple site vitrine.

Objectif : démontrer ma capacité à concevoir une architecture moderne, scalable et maintenable, en conditions proches de la production.

---

## 🎯 Objectifs du projet

* Présenter mon parcours et mes compétences
* Mettre en valeur mes projets
* Construire une application administrable en autonomie
* Maîtriser une stack moderne (React + GraphQL + Docker)

---

## 🧱 Architecture

Application construite avec une **architecture découplée** :

* Frontend (SPA)
* API GraphQL
* Service dédié à la gestion des images
* Base de données relationnelle

👉 Cette séparation permet :

* une meilleure maintenabilité
* une scalabilité facilitée
* une logique claire entre les responsabilités

---

## ⚙️ Stack technique

### Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* Apollo Client
* React Router
* Framer Motion

---

### Backend

* GraphQL (Apollo Server)
* TypeORM
* PostgreSQL ✅
* Authentification sécurisée (Argon2 + JWT)
* Validation des données (class-validator)

---

### Service fichiers

* Express
* Multer
* Sharp (optimisation des images)

---

### DevOps & Qualité

* Docker & Docker Compose
* CI avec GitHub Actions
* Tests :

  * Jest (backend)
  * Vitest (frontend)
* ESLint + Husky (qualité de code)

---

## 📊 Performance & Qualité

Audit réalisé avec Lighthouse afin de garantir une application performante, accessible et optimisée.

![Performance](./frontend/public/screenshots/Capture%20d’écran%202026-03-20%20à%2019.23.57.png)

* Performance : 94
* Accessibilité : 100
* Bonnes pratiques : 100
* SEO : 100

---

## 🚀 Fonctionnalités

### Front Office

* Présentation dynamique
* Affichage des projets
* Liste des compétences
* Navigation fluide (scroll + ancres)
* Animations modernes

---

### Back Office sécurisé

* Authentification admin
* CRUD complet :

  * projets
  * compétences
* Upload d’images
* Interface non accessible sans authentification

---

## 🧠 Points techniques clés

* Mise en place d’une API GraphQL complète (queries + mutations)
* Gestion des états côté client avec Apollo Client
* Upload d’images avec service dédié + stockage persistant
* Gestion des environnements (dev / staging / production)
* Conteneurisation complète de l’application
* CI automatisée avec exécution des tests

---

## 🧪 Tests & Qualité

* Tests unitaires backend avec Jest
* Tests frontend avec Vitest
* Linting automatisé
* Hooks Git pour garantir la qualité du code

---

## 🐳 Lancer le projet en local

```bash
docker compose up --build
```

Accès :

* Frontend : <http://localhost:5173>
* Backend : <http://localhost:4000>
* Service images : <http://localhost:3002>

---

## 📸 Aperçu page Admin (non visible si pas de compte)

<<<<<<< HEAD
![Admin](./frontend/public/screenshots/Capture%20d’écran%202026-03-20%20à%2019.09.18.png)
=======
![Admin](./frontend/public/Capture%20d’écran%202026-03-20%20à%2019.09.18.png)
>>>>>>> c8500ec70f67077939167d8d669f4cb8903038a4

---

## ⚠️ Challenges rencontrés

* Debug des mutations GraphQL en production
* Gestion du stockage des images avec Docker
* Synchronisation des environnements Railway
* Gestion des erreurs côté client (Apollo)

---

## 📈 Améliorations prévues

* Plus de tests côté front

---

## 💡 Ce que démontre ce projet

* Capacité à concevoir une application fullstack complète
* Bonne compréhension des architectures modernes
* Maîtrise des outils de production (Docker, CI/CD)
* Autonomie sur un projet de bout en bout

---

## 👤 Auteur

Coline Grosso
Développeuse web fullstack

---
