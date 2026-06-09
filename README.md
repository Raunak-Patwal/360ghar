# 360 Ghar — AI Property Search Assistant

> A smart property search UI that lets users describe what they're looking for in plain language and returns filtered, ranked property cards powered by AI.

![Tech Stack](https://img.shields.io/badge/React-Vite-blue) ![AI](https://img.shields.io/badge/AI-OpenRouter-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎥 Loom Screen Recording
Watch the full end-to-end demo here:
**[View Loom Video](https://www.loom.com/share/00a420dd50384e4a848fa22ee2648c8c)**

---

## ✨ Features

1. **Natural Language Search** — Type or speak queries like *"2BHK in Sector 50 under 80 lakhs, good sunlight, near a school"*
2. **AI-Powered Parsing** — LLM extracts structured filters (BHK, price, location, amenities, preferences) from free-form text
3. **Smart Property Cards** — Ranked results with contextual match-reason badges showing *why* each property fits
4. **AI-Generated Summaries** — Click any card for a personalized 2–3 line summary referencing your original query
5. **Voice Search** — Browser Speech Recognition API for hands-free search
6. **AI Follow-up Clarification** — When queries are ambiguous, the AI asks a clarifying question with clickable options

---

## 🚀 Setup & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/360ghar.git
cd 360ghar

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Note on API Key**: For seamless review, create a `.env` file in the root directory and add `VITE_OPENROUTER_API_KEY=your_key_here`. This will automatically inject the key and bypass the UI modal. You can get a free key at [openrouter.ai/keys](https://openrouter.ai/keys).

---

## 🤖 OpenRouter Model Choice

**Primary Model**: `google/gemma-4-31b-it:free`
**Fallback Models**: `qwen/qwen-2-7b-instruct:free`, `openrouter/free`

**Why this choice?**
I selected `gemma-4-31b-it:free` as the primary model because it offers a high parameter count (31B), yielding excellent instruction-following capabilities crucial for strict JSON schema adherence and ambiguity detection. Since free APIs can be volatile, I implemented an OpenRouter fallback array (`models: [...]`) and a strict 20-second `AbortController` timeout. If the Gemma endpoint fails, it instantly routes to Qwen or an auto-router, ensuring zero UI crashes.

---

## 📐 Architecture

```
src/
├── components/
│   ├── Header.jsx          # Logo + API key settings
│   ├── SearchBar.jsx        # Text + voice input + example queries
│   ├── FilterChips.jsx      # Parsed filter visualization
│   ├── FollowUpBanner.jsx   # AI clarification questions
│   ├── PropertyGrid.jsx     # Responsive card grid + loading states
│   ├── PropertyCard.jsx     # Individual property card
│   ├── PropertyDetail.jsx   # Modal with AI summary
│   ├── ApiKeyModal.jsx      # API key input/validation
│   └── SkeletonCard.jsx     # Loading placeholder
├── data/
│   └── properties.js        # 10 mock Gurgaon properties
├── services/
│   ├── openrouter.js        # LLM API calls (parse + summarize)
│   └── filterEngine.js      # Client-side filter + rank + match reasons
├── App.jsx                  # Root component + state management
├── main.jsx                 # Entry point
└── index.css                # Full design system (dark theme, glassmorphism)
```

**Data Flow**: User query → LLM parses to structured filters → Client-side filter engine scores & ranks mock data → Cards render with match reasons → Card click triggers live LLM summary call.

---

## 🧠 Prompt Design Notes

**How I structured the LLM prompt:** I used a strict system prompt with explicit JSON schema definitions, field types, and a normalized vocabulary list for amenities/preferences. I also provided contextual Indian real-estate rules (e.g., 1 Crore = 100 Lakhs) and instructions to trigger a `followUpQuestion` if the user's intent is ambiguous.

**What didn't work:** Initially, I didn't enforce a vocabulary list, which caused the LLM to output inconsistent terms (e.g., "pool" vs "swimming pool"), breaking the frontend matching engine. I also tried relying purely on the LLM for JSON formatting, but free models occasionally wrapped responses in markdown, forcing me to implement a robust regex extractor on the client side.

**Why I chose my model:** I opted for `google/gemma-4-31b-it:free` as the primary model for its superior reasoning and strict schema adherence. To combat the unreliability of free-tier APIs, I built a robust fallback array (falling back to Qwen) and a 20-second fetch timeout to guarantee a seamless UX.

---

## 🎨 Bonus Features

### 1. Voice Search
Uses the Web Speech Recognition API (`webkitSpeechRecognition`) for hands-free search. Click the microphone, speak your query, and results appear automatically. The mic pulses red while listening for clear visual feedback.

### 2. AI Follow-up Clarification
When the LLM detects ambiguity in a query, it returns a follow-up question with 2–3 clickable options. For example, searching "flat in Gurgaon" might prompt "Which area interests you?" with options like "Sector 50-57" or "Golf Course Road". Clicking an option refines and re-runs the search.

### 3. Side-by-Side Comparison
Users can select up to 2 properties by clicking the "+ Compare" button on the cards. A floating bar appears to initiate a detailed side-by-side comparison modal that automatically highlights the "winner" for metrics like lower price or larger area.

### 4. Premium Animations (Framer Motion)
Incorporates physics-based, staggered animations for property cards using `framer-motion` to fulfill the "Vibe Coding" aesthetic requirements. Modals feature smooth spring-based entry and exit transitions.

### 5. Typewriter Effect for AI Summary
When viewing an AI summary, the text is revealed character-by-character with a blinking cursor, mimicking a live AI text stream for a more engaging "AI-native" feel.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite |
| Styling | Vanilla CSS (custom properties, glassmorphism) |
| Animations| Framer Motion |
| AI/LLM | OpenRouter (`openrouter/free`) |
| Voice | Web Speech Recognition API |
| Font | Inter (Google Fonts) |
| Data | Mock JSON (10 Gurgaon properties) |

---

## 📄 License

MIT
