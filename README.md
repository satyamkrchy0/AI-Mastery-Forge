# AI Mastery Forge 🤖🔥

An AI-powered conversational tutor built to help students master the **Foundations & Applications of Artificial Intelligence**. Ask questions, upload course notes or images, and engage in multi-turn dialogue — all powered by **Google Gemini 2.5 Flash**.

![React](https://img.shields.io/badge/Frontend-React_18_(Vite)-61DAFB?logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI_(Python)-009688?logo=fastapi&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Google_Gemini_2.5_Flash-4285F4?logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 **Conversational AI Tutor** | Multi-turn chat with persistent history — ask follow-ups and get coherent, context-aware answers. |
| 🖼️ **Multimodal Input** | Upload images of lecture slides, handwritten notes, or problem sheets alongside your question. |
| 🔍 **OCR & Vision Processing** | Gemini Vision extracts and reasons over text and diagrams in your uploaded images. |
| 🐍 **Python-First Explanations** | Code examples in NumPy, Scikit-Learn, PyTorch, and TensorFlow are always just a question away. |
| 🎓 **Full Syllabus Coverage** | Covers all 6 course units — from AI foundations and search to deep learning and generative AI. |
| 📖 **Swagger API Docs** | Interactive API documentation available at `/docs` when running the backend locally. |

---

## 📚 Course Units Covered

| Unit | Topics |
|---|---|
| **I — Foundations of AI** | Evolution of AI, narrow vs. general AI, TensorFlow, PyTorch, Responsible AI |
| **II — Problem Solving & Search** | Uninformed search, A\*, heuristics, constraint satisfaction, RL basics |
| **III — Machine Learning** | Supervised/unsupervised learning, feature engineering, Bayes theorem, probabilistic reasoning |
| **IV — Deep Neural Networks** | Perceptron, MLP, CNN, RNN, Transformers, BERT, GPT |
| **V — Generative AI & Ethics** | LLMs, GANs, Diffusion models, prompt engineering, responsible AI |
| **VI — Data Analysis & Deployment** | ChatGPT Advanced Data Analysis, Tableau, MLOps, cloud & edge deployment |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, CSS Modules, React Markdown, remark-gfm |
| **Python Backend** | FastAPI, Uvicorn, Pydantic, python-multipart |
| **Serverless API** | Node.js, Express, Multer (Vercel deployment) |
| **AI / LLM** | Google Gemini 2.5 Flash (`google-genai` SDK) |
| **Deployment** | Vercel (frontend + serverless functions) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+) — for the React frontend and Vercel serverless API
- [Python 3.10+](https://www.python.org/) — for the local FastAPI backend
- A **Google Gemini API key** — get one at [Google AI Studio](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/satyamkrchy0/AI-Mastery-Forge.git
cd AI-Mastery-Forge
```

### 2. Install frontend dependencies

```bash
cd client
npm install
cd ..
```

### 3. Configure environment variables

Create a `.env` file inside the `python_backend` directory:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
```

### 4. Run the application

#### ▶️ Windows (one-click launcher)

Double-click or run the provided start script from the root directory:

```bat
start.bat
```

This will:
- Install Python dependencies automatically
- Start the **FastAPI backend** on `http://localhost:5000`
- Start the **React frontend** on `http://localhost:5173`
- Open the app in your browser

#### 🐧 Linux / macOS (manual)

Open two terminal windows:

**Terminal 1 — Python Backend:**
```bash
cd python_backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
```

**Terminal 2 — React Frontend:**
```bash
cd client
npm run dev
```

### 5. Access the app

| Service | URL |
|---|---|
| **Frontend UI** | http://localhost:5173 |
| **API (Swagger UI)** | http://localhost:5000/docs |
| **Health Check** | http://localhost:5000/api/health |

---

## ☁️ Deploying to Vercel

This project is configured for Vercel out of the box via `vercel.json`.

1. Push your repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/).
3. Add the environment variable `GEMINI_API_KEY` in the Vercel project settings.
4. Vercel will automatically build the React frontend and deploy the Node.js serverless API function in `api/index.js`.

---

## 📁 Project Structure

```
AI-Mastery-Forge/
├── api/
│   └── index.js            # Vercel serverless API entry point
├── client/
│   ├── src/
│   │   ├── components/     # React UI components (Header, Chat, Upload, etc.)
│   │   ├── App.jsx         # Main application shell
│   │   └── main.jsx        # React entry point
│   └── package.json
├── python_backend/
│   ├── main.py             # FastAPI server with Gemini 2.5 Flash integration
│   └── requirements.txt
├── start.bat               # Windows one-click launcher
├── vercel.json             # Vercel deployment configuration
└── package.json            # Root dependencies for serverless functions
```

---

## ⚠️ Disclaimer

AI Mastery Forge is a study aid designed to help you understand AI concepts and implement them in code. It does not complete assignments on your behalf and does not promote academic dishonesty. All generated content should be reviewed and understood before use in academic work.
