# Smart Interview Prep

An AI-powered MERN stack app for interview preparation. It generates role-based interview questions using the Gemini API, provides AI explanations, and lets users pin questions for later review.

---

## Features
- Role-based interview question generation  
- AI-powered explanations  
- Pin & review questions  
- Full-stack MERN architecture  

---

## Tech Stack
- **Frontend**: React  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  
- **AI**: Gemini API  

---

##  Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Rohith-Nannaveni/smart-Interview-prep.git
cd smart-Interview-prep
```

### 2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend/interview-prep-ai
npm install

```
### 3. Environment variables
```bash
# create a .env file in backend
PORT=5000
MONGO_URI=your_mongo_connection
GEMINI_API_KEY=your_api_key

```

### 4. Run it
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend/interview-prep-ai
npm run dev

```

### 5. Live preview
```bash
# In the terminal Start both frontend and backend servers in two powershells
then open http://localhost:5173/ for the live view of the project
```

### Project Structure
```bash
smart-Interview-prep/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── ...
├── frontend/
│   └── interview-prep-ai/
│       ├── src/
│       ├── public/
│       └── ...
├── .gitignore
└── README.md
```
