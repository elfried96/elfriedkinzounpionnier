# 📦 Guide d'Installation

Ce guide vous aide à installer et à lancer l’application **Cassava Olùṣọ́** en local, en configurant à la fois le frontend (interface utilisateur) et le backend (API + pipelines ML).

---

## ✅ Prérequis

Assurez-vous d’avoir les outils suivants installés :

- [Node.js](https://nodejs.org/en) **v18+** avec `npm` ou `yarn`
- [Python](https://www.python.org/) **3.9+** (recommandé : via [Miniconda](https://docs.conda.io/en/latest/miniconda.html))
- [Conda](https://docs.conda.io/en/latest/) pour gérer l’environnement Python
- Une **clé API Azure OpenAI** avec accès à GPT-4 Vision (obligatoire pour la classification par vision)
- [Git](https://git-scm.com/)

---

## 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/elfried96/cassava-vision-guard.git
cd cassava-vision-guard
```

### 2️⃣ Installation du Frontend (React)

```bash
cd frontend
npm install         # ou yarn install
npm run dev         # ou yarn dev
```

Cela démarre le serveur sur :  
📍 `http://localhost:3000`

---

### 3️⃣ Configuration de l’Environnement Python

Depuis la racine du projet :

```bash
conda create -n cassava python=3.9 --yes
conda activate cassava
```

Ensuite installez les dépendances :

```bash
pip install -r requirements.txt
# OU utilisez le fichier conda
# conda env create -f environment.yml
```

---

### 4️⃣ Lancement du Backend (FastAPI)

```bash
pip install "fastapi[standard]" uvicorn[standard] sqlalchemy pydantic python-dotenv
uvicorn backend.main:app --reload
```

L’API sera disponible sur :  
📍 `http://localhost:8000`

---

### 5️⃣ Variables d’Environnement

Créez un fichier `.env` à la racine du projet :

```dotenv
AZURE_OPENAI_KEY=votre_clé_openai
FASTAPI_ENV=development
```

Ensuite, exportez les variables (sous Linux/macOS) :

```bash
export $(grep -v '^#' .env | xargs)
```

Sous Windows (CMD) :

```cmd
for /f "delims=" %i in (.env) do set %i
```


### ✅ Résumé des ports

| Composant | Port par défaut       |
|-----------|------------------------|
| Frontend  | `http://localhost:3000` |
| Backend   | `http://localhost:8000` |

---

### 🧪 Test de bon fonctionnement

- Lancez le frontend (`npm run dev`)
- Lancez l’API (`uvicorn backend.main:app --reload`)
- Accédez à `http://localhost:3000` et chargez une image de feuille de manioc pour tester

---
