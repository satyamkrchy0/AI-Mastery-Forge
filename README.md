# Academic Strategy Engine 🎓

An advanced AI-powered decision-support system designed exclusively for educational optimization, student productivity, and outcome maximization.

## Features
- **Constraint-Based Reasoning:** Provide your academic goals, limitations (e.g., "only have 2 hours a day"), and challenges to receive highly optimized learning strategies.
- **Multimodal Input:** Type your constraints directly, or upload images of syllabi, assignments, and handwritten notes.
- **OCR Extraction:** Uses **Google Gemini Vision** to accurately extract text from your uploaded academic materials.
- **Strategic Blueprint Generation:** Leverages **Google Gemini 2.0 Flash** to synthesize your inputs into a structured execution blueprint, complete with time-blocks and psychological counters for procrastination.

## Tech Stack
- **Frontend:** React (Vite), CSS Modules, React Markdown
- **Backend:** Node.js, Express, Multer
- **APIs:** Google Gemini API

## Getting Started

### Prerequisites
- Node.js installed on your machine
- API keys for:
  - Google Gemini API (`GEMINI_API_KEY`)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aditya-0x/StudyForge-AI.git
   cd StudyForge-AI
   ```

2. **Install dependencies:**
   From the main directory, install for both client and server:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the `server` directory.
   - Add your API keys:
     ```env
     GEMINI_API_KEY="your_gemini_api_key"
     ```

4. **Run the Application:**
   On Windows, simply run the start script located in the root directory:
   ```bash
   ./start.bat
   ```
   
   Alternatively, you can run them in separate terminals:
   - **Backend:** `cd server && npm run dev`
   - **Frontend:** `cd client && npm run dev`

## Disclaimer
The Academic Strategy Engine is built to assist with study planning and strategy. It does not complete assignments or promote academic dishonesty.
