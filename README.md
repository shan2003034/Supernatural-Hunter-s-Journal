<div align="center">
  <!-- 🖼️ Cover Image Placeholder -->
  <img width="1344" height="768" alt="Image" src="https://github.com/user-attachments/assets/0cd3e33a-3ec4-42cf-950d-9cea039cad91" />

  <h1>🕵️‍♂️ Supernatural Hunter's Journal</h1>
  <p><strong>A 100% Offline, AI-Powered Paranormal Investigation Dashboard</strong></p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Backend-Spring_Boot-6DB33F?logo=spring&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/AI-Ollama_%2F_Gemma-000000?logo=ollama&logoColor=white" alt="Ollama" />
  <img src="https://img.shields.io/badge/Database-SQLite-003B57?logo=sqlite&logoColor=white" alt="SQLite" />
</div>

<br />

## 📖 About The Project

The **Supernatural Hunter's Journal** is a modern, classified digital dashboard designed for paranormal investigators. It allows users to input eerie paranormal evidence and uses a **100% offline Local LLM** to analyze the data, identify the supernatural entity, and provide ancient lore, danger levels, and methods of defeat.

Built with an immersive, atmospheric UI featuring flickering tech-grids, GSAP animations, and dynamic jump-scare audio themes that react to the identified entity. 

## ✨ Key Features

- 🧠 **100% Offline AI Analysis**: Powered by Spring AI and local Ollama models (no internet required, ensuring complete privacy).
- 🎨 **Immersive Investigator Dashboard**: A modern, split-screen UI built with React and Tailwind CSS, resembling a classified government or SCP database.
- 🔊 **Dynamic Audio Themes**: Automatically plays specific background ambient noises and jump-scare sounds based on the identified entity (e.g., glass shattering for Poltergeists, demonic growls for Demons).
- 🗄️ **Database Archives (Bestiary)**: Automatically logs all your paranormal encounters and AI analyses into a local SQLite database for future reference.
- 🎬 **Cinematic Animations**: Smooth page transitions, radar sweeps, and loading states powered by GSAP.

## 📸 System Screenshots
 
<div align="center">
<table>
<tr>
<td align="center">
<img width="1920" height="862" alt="Image" src="https://github.com/user-attachments/assets/f4806518-392d-435f-8cfc-3c5d124dbb7d" /><br />

</td>
<td align="center">
<img width="1920" height="865" alt="Image" src="https://github.com/user-attachments/assets/9a61cc07-40ff-40b7-85af-397953f0738c" /><br />

</td>
<td align="center">
<img width="1920" height="872" alt="Image" src="https://github.com/user-attachments/assets/b0770b6e-67e8-4983-8064-aaec11675a5f" /><br />

</td>


<br />

 
</table>


</div>

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Styling & Glassmorphism)
- **GSAP** (Cinematic Animations)

### Backend
- **Java Spring Boot** (REST APIs)
- **Spring AI** (Seamless LLM Integration)
- **Hibernate / JPA** (ORM)
- **SQLite** (Lightweight Local Database)

### AI Model
- **Ollama** (Running `gemma:2b` or `llama3` locally)

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

1. **Java 17 or higher** installed.
2. **Node.js and npm** installed.
3. **Ollama** installed on your system ([Download Ollama](https://ollama.com/)).
4. Pull your preferred AI model via Ollama terminal:
   ```bash
   ollama run gemma:2b
   ```

### 1. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Ensure you have the `sqlite-jdbc` and `hibernate-community-dialects` dependencies in your `pom.xml`.
3. Check your `application.properties` for the SQLite connection:
   ```properties
   spring.datasource.url=jdbc:sqlite:journal.db
   spring.datasource.driver-class-name=org.sqlite.JDBC
   spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect
   spring.jpa.hibernate.ddl-auto=update
   ```
4. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will start on `http://localhost:8080`*

### 2. Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies (including GSAP):
   ```bash
   npm install
   ```
3. Add the required audio files into the `public/audio/` folder:
   - `bg-music.mp3`, `page-turn.mp3`, `jump-scare.mp3`
   - Entity specific: `demon_growl.mp3`, `glass_shatter.mp3`, `creepy_woods.mp3`, `whispers.mp3`, `heartbeat.mp3`
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:5173` (or similar)*

---

## 📂 Folder Structure Overview

```text
Supernatural-Hunters-Journal/
├── backend/
│   ├── src/main/java/lk/bytecodelk/SupernaturalHunter/sJournal/
│   │   ├── controller/JournalController.java
│   │   ├── entity/HuntRecord.java
│   │   ├── repository/HuntRecordRepository.java
│   │   └── service/JournalAnalysisService.java
│   └── pom.xml
└── frontend/
    ├── public/audio/        # Contains dynamic horror sound effects
    ├── src/
    │   ├── components/      # UI Widgets, History, Form, LoadingState
    │   ├── pages/Home.jsx   # Main Dashboard Layout
    │   └── App.jsx
    └── package.json
```

## 📜 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/journal/analyze` | Sends user evidence to Ollama and returns the classified entity details and audio theme. |
| `GET` | `/api/journal/history` | Fetches all past paranormal encounters from the SQLite database. |

## 🛡️ License

This project is licensed under the MIT License - see the LICENSE file for details.

**Prasanna Lakshan**
 
- 🌐 Portfolio: [https://prasanna-lakshan.vercel.app/](https://prasanna-lakshan.vercel.app/)
- 💼 LinkedIn: [https://www.linkedin.com/in/prasannalakshan](https://www.linkedin.com/in/prasannalakshan)
- 🐙 GitHub: [https://github.com/shan2003034](https://github.com/shan2003034)

</div>

---
*“There are things in the dark that do not want to be found. Now, you have a way to track them.”* 🕯️
