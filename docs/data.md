## 🧬 Aperçu du Dataset

Le dataset est constitué de **X images** de feuilles de manioc classées en **8 catégories** de santé/maladies.  
Chaque image a été annotée manuellement et prétraitée pour entraîner un modèle de classification.

- 📦 Total d'images : **X**
- 📂 Classes : **5**
- 🖼️ Taille normalisée : **224x224 pixels**

## 📊 Répartition des classes Pour le train

![Répartition des classes](./assets/assets.png)

## Tableau résumé

| Classe                | Nombre d'images | Description courte                             | Exemple |
|-----------------------|------------------|------------------------------------------------|---------|
| Cassava Mosaic        | 13.2k              | Feuilles avec motifs marbrés irréguliers       | ![Mosaic](./assets/100609661.jpg) |
| Cassava Bacterial Blight | 1087         | Feuilles perforées avec nécrose humide         | ![Blight](./assets/1040315063.jpg) |
| Cassava Healthy               | 2577              | Feuilles saines, vertes homogènes              | ![Healthy](./assets/1002088496.jpg) |
|Cassava Brown Streak Disease               | 2189              | Taches brunes le long des nervures              | ![Brown](./assets/1036380403.jpg) |
| Cassava Green Mottle               | 2338           | Feuilles saines, vertes homogènes              | ![Mottle](./assets/1035014017.jpg) |


Pour plus d'informtion veiller consulter 
[Kaggle](https://www.kaggle.com/datasets/nirmalsankalana/cassava-leaf-disease-classification?select=data)

mkdocs serve