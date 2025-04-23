# 🔄 Pipeline de classification des maladies du manioc

Ce document détaille le pipeline complet mis en place pour la classification automatique des maladies du manioc à partir d'images, en utilisant PyTorch.

---

## 1. 📂 Chargement et préparation des données

- **Source des données** : Images collectées sur le terrain, organisées par classe dans le répertoire `data/raw/`.
- **Chargement** : Utilisation de `torchvision.datasets.ImageFolder` pour structurer les données.
- **Transformations appliquées** :
  - Redimensionnement des images à une taille uniforme (par exemple, 224x224 pixels).
  - Normalisation des canaux RGB selon les moyennes et écarts-types d'ImageNet.
  - Augmentations de données (rotations, flips horizontaux) pour améliorer la robustesse du modèle.

---

## 2. 🧪 Séparation du jeu de données

- **Répartition** :
  - Entraînement : 70%
  - Validation : 15%
  - Test : 15%
- **Méthode** : Utilisation de `torch.utils.data.random_split` avec une graine fixe (`torch.Generator().manual_seed(42)`) pour assurer la reproductibilité.

---

## 3. ⚖️ Gestion du déséquilibre des classes

- **Analyse** : Comptage des occurrences de chaque classe à l'aide de `collections.Counter`.
- **Techniques mises en œuvre** :
  - **Pondération de la fonction de perte** : Calcul des poids inverses des fréquences des classes pour `torch.nn.CrossEntropyLoss`.
  - **Sampler pondéré** : Optionnellement, utilisation de `torch.utils.data.WeightedRandomSampler` pour équilibrer les classes lors de l'entraînement.

---

## 4. 🧠 Modélisation

- **Architecture personnalisée** : Convolutional Neural Network (CNN) défini dans `models/classifier.py`.
- **Modèles pré-entraînés** : Intégration de modèles tels que `ResNet18` via `torchvision.models` pour le transfert d'apprentissage.
- **Fonction de perte** : `torch.nn.CrossEntropyLoss` avec ou sans pondération.
- **Optimiseur** : `torch.optim.Adam` avec un taux d'apprentissage initial de 1e-4.

---

## 5. 🏋️ Entraînement

- **Boucle d'entraînement** : Implémentée dans `training.py`, avec suivi de la perte et de la précision.
- **Sauvegarde du modèle** : Enregistrement des poids du modèle après chaque époque si la performance s'améliore.
- **Visualisation** : Courbes de perte et de précision générées à l'aide de `matplotlib`.

---

## 6. 📊 Évaluation

- **Métriques** :
  - Précision globale.
  - Matrice de confusion.
  - Rapport de classification (précision, rappel, F1-score).
- **Explicabilité** : Utilisation de `torchcam` pour générer des cartes de chaleur (Grad-CAM) illustrant les zones d'attention du modèle.

---

## 7. 📁 Organisation des fichiers

```plaintext
data/
├── raw/                # Images originales
├── processed/          # Données après séparation
models/
├── classifier.py       # Définition du modèle
├── utils.py            # Fonctions utilitaires
notebooks/
├── exploration.ipynb   # Analyse exploratoire
├── training.ipynb      # Entraînement du modèle
scripts/
├── split_data.py       # Script de séparation des données
├── train_model.py      # Script d'entraînement

```
