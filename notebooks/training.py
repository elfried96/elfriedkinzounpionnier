import torch
import torch.nn as nn
import torch.optim as optim
from tqdm import tqdm

import torch
import torch.nn as nn
import torch.optim as optim
from tqdm import tqdm

def train(model, train_loader, val_loader, loss_fn, optimizer, device, epochs=10):
    model.to(device)
    
    # Listes pour stocker les métriques
    train_losses, train_accs = [], []
    val_losses, val_accs = [], []
    
    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0
        
        # Boucle d'entraînement pour une époque
        for images, labels in tqdm(train_loader, desc=f"Training Epoch {epoch+1}/{epochs}"):
            images, labels = images.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(images)
            loss = loss_fn(outputs, labels)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item() * images.size(0)
            _, predicted = torch.max(outputs, 1)
            correct += (predicted == labels).sum().item()
            total += labels.size(0)
        
        avg_loss = running_loss / total
        train_acc = (correct / total) * 100
        train_losses.append(avg_loss)
        train_accs.append(train_acc)
        print(f"Epoch {epoch+1}/{epochs} - Loss: {avg_loss:.4f} - Accuracy: {train_acc:.2f}%")
        
        # Validation à la fin de l'époque
        model.eval()
        val_running_loss = 0.0
        val_correct = 0
        val_total = 0
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = loss_fn(outputs, labels)
                val_running_loss += loss.item() * images.size(0)
                _, predicted = torch.max(outputs, 1)
                val_total += labels.size(0)
                val_correct += (predicted == labels).sum().item()
        
        avg_val_loss = val_running_loss / val_total
        val_acc = (val_correct / val_total) * 100
        val_losses.append(avg_val_loss)
        val_accs.append(val_acc)
        print(f"Validation - Loss: {avg_val_loss:.4f} - Accuracy: {val_acc:.2f}%\n")
    
    # Retourner le modèle et les métriques pour visualisation
    metrics = {
        "train_losses": train_losses,
        "train_accs": train_accs,
        "val_losses": val_losses,
        "val_accs": val_accs
    }
    return model, metrics

def predict(model, data_loader, device):
    """
    Fonction de prédiction sur un DataLoader.
    model       : ton modèle entraîné
    data_loader : DataLoader contenant les données à prédire
    device      : torch.device("cuda") ou torch.device("cpu")
    Retourne : une liste de prédictions.
    """
    model.to(device)
    model.eval()
    predictions = []
    
    with torch.no_grad():
        for images, _ in data_loader:
            images = images.to(device)
            outputs = model(images)
            _, preds = torch.max(outputs, 1)
            predictions.extend(preds.cpu().numpy().tolist())
    
    return predictions
def save_model(model, path):
    """
    Fonction pour sauvegarder le modèle.
    model : ton modèle PyTorch
    path  : chemin où sauvegarder le modèle
    """
    torch.save(model.state_dict(), path)
    print(f"Modèle sauvegardé à {path}")
def load_model(model, path, device):
    """
    Fonction pour charger un modèle sauvegardé.
    model : ton modèle PyTorch
    path  : chemin du modèle sauvegardé
    device : torch.device("cuda") ou torch.device("cpu")
    """
    model.load_state_dict(torch.load(path, map_location=device))
    model.to(device)
    print(f"Modèle chargé depuis {path}")
    return model    
