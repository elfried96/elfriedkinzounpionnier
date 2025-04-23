from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from PIL import Image
import torch
from torchvision import transforms
import torch.nn.functional as F
from openai import AsyncOpenAI
import os
import logging
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Charger les variables d'environnement en premier
load_dotenv()

# Configuration initiale
app = FastAPI()
logging.basicConfig(level=logging.INFO)

# Ajouter le middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Remplacez par l'origine de votre frontend
    allow_credentials=True,
    allow_methods=["*"],  # Autoriser toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],  # Autoriser tous les en-têtes
)

# Charger le modèle de classification
model = torch.load("/home/pionners03/elfriedkinzounpionniers/notebooks/model_complete.pth", 
                  map_location=torch.device('cpu'), 
                  weights_only=False)
model.eval()
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Configuration OpenAI
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Transformations des images
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.4303, 0.4967, 0.3134], std=[0.2206, 0.2236, 0.2117])
])

classes = [
    'Cassava___bacterial_blight',
    'Cassava___brown_streak_disease',
    'Cassava___green_mottle',
    'Cassava___healthy',
    'Cassava___mosaic_disease'
]

async def generate_gpt_description(class_name: str, confidence: float) -> str:
    """Génère une description adaptée selon la classe"""
    if class_name == "Cassava___healthy":
        return (
            "Aucune maladie détectée. La plante de manioc présente toutes les caractéristiques d'une feuille saine :\n"
            "1. Couleur uniforme vert foncé\n"
            "2. Forme foliaire intacte\n"
            "3. Aucune tache ou décoloration anormale\n"
            "Conseil : Maintenir les bonnes pratiques agricoles pour préserver la santé des plants."
        )

    try:
        disease_info = {
            'Cassava___bacterial_blight': "la brûlure bactérienne du manioc",
            'Cassava___brown_streak_disease': "la maladie des stries brunes du manioc",
            'Cassava___green_mottle': "la marbrure verte du manioc",
            'Cassava___mosaic_disease': "la maladie de la mosaïque du manioc"
        }

        prompt = f"""
        Tu es un expert en agriculture tropicale. Fais une description concise et pédagogique de {disease_info[class_name]} 
        identifiée avec un taux de confiance de {confidence:.2f}%. Inclus en 3 points :
        1. Symptômes visuels caractéristiques
        2. Impact sur la production
        3. Méthodes de prévention
        Formule la réponse en français courant sans termes techniques excessifs.
        """

        response = await client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=256
        )
        
        return response.choices[0].message.content.strip()
    
    except Exception as e:
        logging.error(f"Erreur GPT: {str(e)}")
        return "Description non disponible pour le moment."

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Traitement de l'image
    image = Image.open(file.file).convert("RGB")
    input_tensor = transform(image).unsqueeze(0).to(device)
    
    # Prédiction
    with torch.no_grad():
        output = model(input_tensor)
        probabilities = F.softmax(output, dim=1)
        predicted_idx = torch.argmax(output).item()
        confidence = probabilities[0][predicted_idx].item()
    
    class_name = classes[predicted_idx]
    
    # Génération de la description
    description = await generate_gpt_description(class_name, confidence * 100)
    
    return {
        "prediction_summary": {
            "classe": class_name,
            "confiance": f"{confidence * 100:.2f}%",
            "severite": "Aucune" if "healthy" in class_name else "Élevée"
        },
        "analyse_detaillee": description,
        "note_interpretation": "Les résultats sont basés sur une analyse algorithmique et doivent être confirmés par un agronome certifié."
    }

# Modèle pour les utilisateurs
class User(BaseModel):
    email: str
    password: str

# Base de données simulée (à remplacer par une vraie base de données)
users_db = {}

@app.post("/register")
async def register_user(email: str = Form(...), password: str = Form(...)):
    if email in users_db:
        raise HTTPException(status_code=400, detail="L'utilisateur existe déjà.")
    users_db[email] = password
    return {"message": "Inscription réussie"}

@app.post("/login")
async def login_user(email: str = Form(...), password: str = Form(...)):
    if email not in users_db or users_db[email] != password:
        raise HTTPException(status_code=401, detail="Identifiants incorrects")
    return {"message": "Connexion réussie"}