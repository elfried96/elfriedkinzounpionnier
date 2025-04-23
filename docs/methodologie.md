# Méthodologie du Pipeline d’Annotation Automatique

Ce document décrit de manière exhaustive le pipeline utilisé pour l’annotation automatique des images de maladies du manioc. Chaque étape a été conçue pour garantir la reproductibilité, la précision et la robustesse de l’annotation, en tirant parti des API Azure.

---

## Vue d’ensemble du Pipeline

Le pipeline d’annotation automatique se décline en 5 étapes principales :

1. **Collecte et Prétraitement des Données**
2. **Configuration et Utilisation des API Azure**
3. **Annotation Automatique**
4. **Post-traitement et Agrégation des Résultats**
5. **Évaluation des Performances et Validation**

Pour mieux visualiser l’architecture générale, voici un schéma simplifié :

```mermaid
flowchart TD
    A[Collecte des Images] --> B[Prétraitement des Images]
    B --> C[Interrogation des API Azure]
    C --> D[Post-traitement]
    D --> E[Évaluation et Validation]
