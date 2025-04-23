# Guide d'Installation

Cette section décrit en détail comment installer et configurer l'environnement de développement nécessaire pour exécuter le pipeline d'annotation automatique des images de maladies du manioc. Le but est d'assurer une reproduction facile et fiable des résultats, conformément aux standards d'un projet scientifique.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir :

- **Git** installé pour cloner le dépôt.
- **Python 3.8** (ou version supérieure) installé sur votre machine.
- **Conda** (optionnel, mais recommandé) pour gérer les environnements virtuels.
- Accès à une machine (ou VM Azure) avec une configuration minimale requise (8GB de RAM, 4 CPU).
- Clés d'API Azure pour accéder aux services Azure Computer Vision / Custom Vision (voir [Configuration d'Azure AI](#configuration-azure-ai)).

---

## 1. Cloner le Dépôt

Ouvrez un terminal et exécutez la commande suivante pour cloner le dépôt GitHub du projet :

```bash
git clone https://github.com/elfried96/elfriedkinzounpionniers.git
cd elfriedkinzounpionniers
```