import os
import json
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import time
from google import genai
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

app = FastAPI(title="AI Mastery Forge API")

# Setup CORS for local Vercel/React dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYLLABUS_CONTEXT = """
COURSE SYLLABUS: Foundations & Applications of AI
Unit I: Foundations of AI, Evolution, narrow vs general AI, Key AI problems, TensorFlow, PyTorch, Responsible AI.
Unit II: Problem Solving & Search (Uninformed, Best-first, A*, Heuristics, Constraint satisfaction, Metaheuristics, RL basics).
Unit III: Machine Learning (Linear algebra, Supervised/unsupervised, Feature engineering, cross-validation, Bayes theorem, Probabilistic reasoning).
Unit IV: Deep Neural Networks (Perceptron, MLP, CNN, RNN, Transformers, Modern NLP, BERT, GPT).
Unit V: Generative AI & Ethics (LLMs, GANs, Diffusion, Prompt Engineering, Prompt Patterns).
Unit VI: Data Analysis & Visualization (ChatGPT Advanced Data Analysis, Tableau, MLOps, Cloud, Edge deployment).
"""

SYSTEM_PROMPT = f"""You are the AI Mastery Forge—an advanced, Python-based academic tutor and chatbot strictly dedicated to mastering Artificial Intelligence concepts, Python implementations (TensorFlow/PyTorch), and ML algorithms.

{SYLLABUS_CONTEXT}

Core Function: Engage in a conversational, back-and-forth dialogue to help students master the AI syllabus. 

1. OPERATIONAL FRAMEWORK
- Python-First: Always provide Python code snippets (numpy, sklearn, pytorch, transformers) when relevant.
- Concept Clarity: Explain complex math and intuition simply before showing code.
- Socratic Method: Ask follow-up questions to test the student's understanding. Keep responses relatively concise to encourage a chat-like flow.
- Data-Centric: Emphasize MLOps, data pipelines, and evaluation metrics when discussing ML.

5. CONVERSATIONAL STYLE
- Be encouraging, clear, and professional.
- Format code blocks with `python` syntax highlighting.
- Use markdown for headers and lists when breaking down complex topics.
- Do NOT generate a huge, rigid blueprint on every turn. Respond directly to the user's current message, adapting your length to their question.
"""

def get_gemini_client():
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Missing GEMINI_API_KEY environment variable.")
    return genai.Client(api_key=api_key)

@app.post("/api/verify")
async def verify_endpoint(
    claim: Optional[str] = Form(""),
    history: Optional[str] = Form("[]"),
    image: Optional[UploadFile] = File(None)
):
    start_time = time.time()
    
    try:
        hist_list = json.loads(history)
    except:
        hist_list = []
        
    ocr_text = None
    image_provided = False
    
    # Initialize client
    client = get_gemini_client()
    
    content_parts = []
    
    if image:
        image_provided = True
        img_bytes = await image.read()
        # Create an inline image part
        content_parts.append(
            genai.types.Part.from_bytes(
                data=img_bytes,
                mime_type=image.content_type
            )
        )
        ocr_text = "[Image Processed]" # Simplified for python backend

    if claim:
        content_parts.append(claim)
        
    if not content_parts:
        raise HTTPException(status_code=400, detail="Please provide a query or upload an image.")

    try:
        # Convert history into the format expected by gemini python SDK
        contents = []
        for msg in hist_list:
            role = 'user' if msg.get('role') == 'user' else 'model'
            text = msg.get('parts', [{}])[0].get('text', '')
            contents.append(genai.types.Content(role=role, parts=[genai.types.Part.from_text(text=text)]))
            
        # Add current message
        contents.append(genai.types.Content(role='user', parts=content_parts))
            
        config = genai.types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            temperature=0.3,
            max_output_tokens=2048,
        )
        
        # We use gemini-2.5-flash as the default for this robust engine
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=contents,
            config=config
        )
        
        raw_text = response.text
        
        # Build updated history to return
        updated_history = hist_list + [
            {"role": "user", "parts": [{"text": claim if claim else "[Image]"}]},
            {"role": "model", "parts": [{"text": raw_text}]}
        ]
        
        processing_time = int((time.time() - start_time) * 1000)
        
        return {
            "success": True,
            "claim": claim[:500] if claim else "[Image uploaded]",
            "ocrExtracted": ocr_text,
            "imageProvided": image_provided,
            "verdict": {
                "markdown": raw_text,
                "history": updated_history
            },
            "meta": {
                "processingTimeMs": processing_time,
                "dataSourcesQueried": ["AI Mastery Forge (Python)"],
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            }
        }
        
    except Exception as e:
        print(f"Error calling Gemini: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI Engine Error: {str(e)}")

@app.get("/api/health")
@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Python AI Mastery API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
