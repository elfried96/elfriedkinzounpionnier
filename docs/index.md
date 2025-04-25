## Projet : Classification des maladies du manioc

---

### Présentation générale

Ce projet vise à développer un **pipeline complet de classification multiclasse** pour identifier automatiquement les maladies du manioc à partir d’images :  
- Passage d’une approche d’annotation via Azure AI à un **modèle PyTorch** entraîné sur vos images.  
- Structure reproduisible, tests, notebooks d’exploration et site de documentation auto-déployé.

---

### Contexte

Le manioc est une culture critique en Afrique de l’Ouest, soumise à des maladies comme :  
- **Cassava Mosaic Disease (CMD)**  
- **Cassava Brown Streak Disease (CBSD)**  
- **Cassava Bacterial Blight (CBB)**  
- **Cassava Green Mottle**  
- **Plantes saines**  

L’automatisation de la détection et de la classification accélère la surveillance des cultures et la création de datasets annotés de haute qualité.

---

### Objectifs

- **Principal** : Classifier 5 états/maladies du manioc via un modèle CNN PyTorch.  
- **Spécifiques** :  
  - Prétraiter et organiser le dataset (_raw → processed_).  
  - Gérer l’équilibre des classes (pondération de la perte & sampler pondéré).  
  - Implémenter et comparer un CNN personnalisé et un modèle pré-entraîné.  
  - Entraîner, évaluer (courbes, matrice de confusion) et explicabiliser (Grad-CAM).  
  - Documenter chaque étape et déployer via MkDocs + GitHub Pages.

---

### Technologies

| Outil / Langage        | Usage principal                                      |
|------------------------|------------------------------------------------------|
| Python & PyTorch       | Modélisation, entraînement, évaluation                |
| torchvision            | `ImageFolder`, transforms, modèles pré-entraînés      |
| Matplotlib & Seaborn   | Visualisation (courbes, matrices de confusion)        |
| Captum / TorchCAM      | Explicabilité (saliency maps, Grad-CAM)               |
| Jupyter Notebooks      | Exploration, démo interactive                        |
| MkDocs + Material      | Génération du site de documentation                   |
| GitHub Actions         | CI pour tests et déploiement documentaire             |

---

### Structure du dépôt

```plaintext
elfriedkinzounpionniers/
├── ci/                    # Environnements conda, CI
├── data/                  # Données brutes et processing
│   ├── raw/               # Images par classe
│   ├── processed/         # train/val/test organisés
│   └── metadata.csv       # Métadonnées du dataset
├── docs/                  # Documentation MkDocs
│   ├── index.md           # Cette page
│   ├── data.md            # Dashboard dataset & gallery
│   ├── pipeline.md        # Pipeline détaillé (prétraitement → évaluation)
│   ├── model.md           # Architectures et choix de modèle
│   ├── training.md        # Entraînement & hyperparamètres
│   └── evaluation.md      # Résultats, matrices, explicabilité
├── models/                # Définitions des architectures PyTorch
│   ├── classifier.py
│   └── utils.py
├── notebooks/             # Notebooks d’exploration & démo
├── scripts/               # Outils (split, preprocess, inference)
├── training.py            # Fonctions train/predict/save/load
├── environment.yml        # Dépendances
├── README.md              # Lien vers docs/index.md
└── tests/                 # Tests unitaires
```

## 📄 Licence

Distribué sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📞 Contact

Elfried Kinzoun • ekfriedkinzoun@gmail.com  
GitHub : [elfried96](https://github.com/elfried96)