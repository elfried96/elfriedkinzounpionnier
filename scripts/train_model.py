import torch
import torch.nn as nn
import torch.optim as optim
from training import train, predict
from torchvision import transforms, datasets
from torch.utils.data import DataLoader

# Configuration du device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Hyperparamètres
batch_size = 32
epochs = 15

# Définir tes transformations (assure-toi d'avoir resize à 224x224, etc.)
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

# Charger le dataset avec ImageFolder (en supposant que train_dir et val_dir existent)
train_dir = "data/processed/train"
val_dir = "data/processed/val"
test_dir = "data/processed/test"

train_dataset = datasets.ImageFolder(root=train_dir, transform=transform)
val_dataset = datasets.ImageFolder(root=val_dir, transform=transform)
test_dataset = datasets.ImageFolder(root=test_dir, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)
test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

# Instanciation de ton modèle (ici, par exemple, un modèle custom ou Sequential)
from models.classifier import CassavaCNN  # ou utilise ton modèle Sequential
num_classes = 5  # adapte selon ton dataset
model = CassavaCNN(num_classes)  # ou ton modèle pré-défini

# Définir la loss et l'optimiseur
loss_fn = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Afficher la structure du modèle
from torchsummary import summary
summary(model, input_size=(3, 224, 224))

# Entraînement
model = train(model, train_loader, val_loader, loss_fn, optimizer, device, epochs=epochs)

# Après entraînement, lancer la prédiction sur le test set
predictions = predict(model, test_loader, device)
print("Prédictions sur le test set :", predictions)
