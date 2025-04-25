## Méthodologie du Pipeline de Classification et d’Annotation

Ce document décrit le pipeline actualisé, combinant à la fois l’annotation automatique des scènes et la classification multiclasse, ainsi que l’intégration de l’application web Cassava Olùṣọ́.

---

### 1. Collecte et Description des Scènes

1. **Acquisition des images**

   - Photos de feuilles de manioc prises in situ et issues de bases ouvertes.
   - Organisation en cinq catégories :
     - *Cassava Bacterial Blight*
     - *Cassava Brown Streak Disease*
     - *Cassava Green Mottle*
     - *Cassava Mosaic Disease*
     - *Cassava Healthy*

2. **Prétraitement des images**

   - Redimensionnement à 224×224 px, conversion RGB 
   - Normalisation (moyennes et écarts‑types calculés sur le jeu complet)
   - Séparation en *train*, *validation*, *test* (70/15/15) avec copie des fichiers dans `/processing`

---

### 2. Pipeline de Classification Multiclasse (PyTorch)

1. **Construction du modèle**

   - CNN personnalisé (`CassavaCNN`) ou modèle pré‑entraîné (ResNet18) fine‑tuned
   - Trois blocs conv + pool, deux couches fully‑connected, sortie 5 classes

2. **Gestion du déséquilibre**

   - Calcul de poids inverses de fréquence
   - Mise en place d’un `WeightedRandomSampler` pour des batchs équilibrés
   - (Optionnel) Data augmentation ciblée

3. **Boucle d’entraînement**

   - Fonctions `train()` et `predict()` encapsulées dans `training.py`
   - Enregistrement des métriques de perte et de précision par époque

4. **Évaluation et visualisation**

   - Courbes de loss / accuracy
   - Matrice de confusion via Scikit‑learn
   - Saliency maps ou Grad‑CAM pour l’explicabilité

---

- Prédictions PyTorch 
- Post‑traitement des scores (seuil, moyenne pondérée)

### 3. Annotation Automatique via GPT-4 Vision

1. **Utilisation de l’API GPT (Azure OpenAI)**

   - Génération automatique de descriptions de scène pour chaque image de feuille de manioc
   - Analyse sémantique de la scène : niveau de flétrissement, présence de taches, teinte dominante, etc.

2. **Contribution à l’explicabilité du modèle**

   - Les descriptions générées sont utilisées pour enrichir le retour utilisateur dans l’application
   - Elles permettent aussi de vérifier la cohérence entre la prédiction du modèle et l’apparence réelle de la feuille

3. **Post-traitement des résultats**

   - Alignement des descriptions avec les prédictions du modèle PyTorch
   - Conservation des textes utiles dans la base pour annotation manuelle et audit de qualité

---

### 4. Intégration à l’Application Web

1. **Frontend Cassava Olùṣọ́**

   - Composant d’upload et aperçu immédiat
   - Affichage du résultat (maladie + pourcentage de confiance)
   - Description des symptômes et recommandations liées

2. **API Backend (FastAPI)**

   - Endpoint `/predict` acceptant une image et retournant JSON {classe, score, description}

3. **Déploiement**

   - Dockerisation du service
   - CI/CD avec GitHub Actions pour tests et déploiement automatique

---

> Cette méthodologie combinée garantit une annotation précise, une expérience utilisateur fluide et une reproductibilité académique et industrielle.

