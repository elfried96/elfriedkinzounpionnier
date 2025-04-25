# Cassava Olùṣọ́ — Diagnostic Intelligent des Maladies du Manioc

[![Build Status](https://github.com/elfried96/cassava-vision-guard/actions/workflows/ci.yml/badge.svg)](https://github.com/elfried96/cassava-vision-guard/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/cassava-olusọ.svg)](https://www.npmjs.com/package/cassava-olusọ)
[![Docs](https://img.shields.io/readthedocs/olmio/latest.svg)](https://elfriedkinzounpionniers.readthedocs.io)

---

## 🌿 À Propos du Projet

**Cassava Olùṣọ́** est une **application web** dédiée à la détection et à la classification des maladies du manioc via l’intelligence artificielle. Elle offre une interface simple pour :

- 📸 **Télécharger** des photos de feuilles de manioc.
- 🔍 **Classifier** automatiquement l’image parmi les 5 principales maladies ou l’état sain.
- 📝 **Afficher** une description des symptômes et recommandations.

L’application vise à **faciliter le diagnostic** pour les agriculteurs et les chercheurs en Afrique et au-delà.

---

## 🚀 Fonctionnalités

- **Capture et upload d’images** • support PNG/JPEG.
- **Classification en 5 catégories** :
  - Cassava Bacterial Blight
  - Cassava Brown Streak Disease
  - Cassava Green Mottle
  - Cassava Mosaic Disease
  - Cassava Healthy
- **Visualisation des résultats** avec score de confiance.
- **Descriptions détaillées** des maladies et conseils de traitement.
- **Responsive design** pour mobiles et tablettes.

---

## 🛠 Technologies Utilisées

### Frontend
- **React 18** avec **TypeScript**  
- **Vite** pour le bundling ultra-rapide  
- **Tailwind CSS** & **shadcn/ui** pour un design moderne  
- **React Query** pour la gestion des requêtes asynchrones  
- **Framer Motion** pour des animations fluides

### Backend _(À venir)_
- **FastAPI** pour l’API REST
- **SQLAlchemy** & **Pydantic** pour le modèle de données
- **JWT** pour l’authentification sécurisée
- **SQLite** (dev) / **PostgreSQL** (prod)

---

## 🎨 Démos et Captures d’Écran

<p align="center">
  <img src="docs/assets/demo-home.png" alt="Page d'accueil" width="500" />
  <img src="docs/assets/demo-result.png" alt="Résultat de classification" width="500" />
</p>

---

## 📦 Installation

### Prérequis
- **Node.js** v18+ et **npm** ou **yarn**
- **Python** 3.9+ (uniquement pour le futur backend)

### Frontend

```bash
# Cloner le dépôt
git clone https://github.com/elfried96/cassava-vision-guard.git
cd cassava-oluṣọ́/frontend

# Installer les dépendances
npm install    # ou yarn

# Lancer le serveur de développement
npm run dev    # ou yarn dev
```

### Backend (À venir)

```bash
# Installer les dépendances Python
pip install fastapi uvicorn sqlalchemy pydantic python-jose[cryptography]

# Lancer l’API
uvicorn main:app --reload
```  

---

## 🗂 Structure du Projet

```
cassava-oluṣọ́/
├── frontend/                # Application React
│   ├── src/                 # Code source React
│   │   ├── components/      # Composants UI
│   │   ├── pages/           # Pages React
│   │   ├── hooks/           # Hooks personnalisés
│   │   └── utils/           # Fonctions utilitaires
│   ├── public/              # Fichiers statiques
│   └── vite.config.ts       # Configuration Vite
└── backend/ (future)        # API FastAPI + modèle ML
    ├── main.py              # Point d’entrée
    ├── models.py            # Schéma SQLAlchemy
    ├── schemas.py           # Schéma Pydantic
    └── ml_model/            # Codes d’inférence ML
```

---

## 📄 Licence

Distribué sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📞 Contact

Elfried Kinzoun • ekfriedkinzoun@gmail.com  
GitHub : [elfried96](https://github.com/elfried96)

Project Link: [cassava-vision-guard](https://github.com/elfried96/cassava-vision-guard)  
Documentation : [Consulter la documentation](https://elfried96.github.io/elfriedkinzounpionnier/)