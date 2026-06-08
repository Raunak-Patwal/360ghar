# 360 Ghar — AI Property Search Assistant

> A smart property search UI that lets users describe what they're looking for in plain language and returns filtered, ranked property cards powered by AI.

![Tech Stack](https://img.shields.io/badge/React-Vite-blue) ![AI](https://img.shields.io/badge/AI-OpenRouter-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

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

**First Run**: The app will prompt you for an OpenRouter API key. Get one free (no credit card) at [openrouter.ai/keys](https://openrouter.ai/keys).

---

## 🤖 OpenRouter Model Choice

**Model**: `openrouter/free`

**Why openrouter/free?**
- Automatically routes your request to whichever model is currently available and free.
- Ensures the app never breaks due to a specific free model going offline or becoming paid.
- Consistently good at instruction-following for structured JSON output.
- 100% free with no credit card required.

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

### Query Parsing Prompt

The parsing prompt was the most critical piece to get right. Here's what I learned:

1. **Explicit JSON schema in the system prompt** — I define the exact output format with field descriptions and types. This eliminates the most common failure mode (free-form text responses instead of JSON).

2. **Normalization vocabulary** — The prompt includes exhaustive lists of valid amenity/preference/nearby-place values. This ensures the LLM maps colloquial terms ("good light" → "good sunlight", "near school" → nearbyPlaceType: "school") to values the filter engine understands.

3. **Indian real-estate context** — I explicitly explain lakh/crore conversion, Gurgaon sector numbering, and BHK terminology. Without this, free models sometimes misinterpret "80 lakhs" as 80 or treat sectors as generic addresses.

4. **Ambiguity detection** — The prompt instructs the model to set a `followUpQuestion` when the query is too vague (e.g., "flat in Gurgaon" with no budget/location). This makes the AI feel intelligent rather than just silently returning all results.

5. **What didn't work**: Early attempts without the normalization lists led to inconsistent amenity names (e.g., "pool" vs "swimming pool" vs "swimming_pool"). Adding the explicit vocabulary list solved this completely. I also tried requesting markdown-wrapped JSON but found raw JSON with a JSON-extraction regex to be more reliable.

### Summary Generation Prompt

The summary prompt takes a different approach — it's conversational rather than structured. Key decisions:
- Pass both the property details AND the original query so the model can draw direct connections
- Instruct it NOT to start with "This property" to keep summaries varied and natural
- Request exactly 2–3 sentences with specific match reasons — not generic marketing copy

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
