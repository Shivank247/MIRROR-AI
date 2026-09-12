# MIRROR//AI — Architecture

## 1. Product Overview

MIRROR//AI is an AI-powered playable life simulation.

Core philosophy:

> **You don't choose your future. You build it through your decisions.**

MIRROR//AI does not claim to predict a player's real future.

Instead, it creates a simulated future based on:

* Player goals
* Player priorities
* Player interests
* Player decisions
* Game state
* Memories
* Timeline progression
* Consequences of previous decisions

The player experiences the consequences of their choices through gameplay.

### Signature

> **We don't predict your future. We let you experience the consequences of your decisions.**

---

# 2. Core Gameplay Architecture

The game follows this loop:

```text
PLAYER
   ↓
REAL-WORLD INPUT
   ↓
AI UNDERSTANDING
   ↓
PLAYER PROFILE
   ↓
PERSONALIZED SCENARIO
   ↓
MEANINGFUL DECISION
   ↓
DETERMINISTIC GAME ENGINE
   ↓
CONSEQUENCE
   ↓
MEMORY
   ↓
TIMELINE PROGRESSION
   ↓
ADAPTIVE SCENARIO
   ↓
BUTTERFLY EFFECT
   ↓
FUTURE SELF
   ↓
WHAT-IF / ALTERNATE FUTURE
```

The system is designed around one important principle:

> **AI provides intelligence; the deterministic game engine controls game state.**

---

# 3. High-Level System Architecture

```text
                         ┌─────────────────────┐
                         │       PLAYER        │
                         └──────────┬──────────┘
                                    │
                         Voice / Text / Input
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    CLIENT / UI      │
                         │ React + Vite        │
                         │ Tailwind             │
                         │ Framer Motion        │
                         │ Babylon.js           │
                         └──────────┬──────────┘
                                    │
                              HTTP / API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      EXPRESS        │
                         │      BACKEND        │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
       │ Game Engine │      │ AI Services │      │ Voice       │
       │             │      │             │      │ Services    │
       └──────┬──────┘      └──────┬──────┘      └─────────────┘
              │                    │
              │                    ▼
              │             ┌─────────────┐
              │             │   Grok AI   │
              │             └─────────────┘
              │
              ▼
       ┌─────────────┐
       │ Game State  │
       │ Source of   │
       │ Truth       │
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │ Prisma +    │
       │ SQLite      │
       └─────────────┘
```

---

# 4. Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion
* Lucide
* Babylon.js

## Backend

* Node.js
* Express
* Prisma
* SQLite

## AI

* Grok AI by xAI

API keys must remain on the backend.

## Voice

* Browser microphone
* Speech-to-Text
* Text-to-Speech
* Text fallback

Advanced voice cloning is a stretch goal only.

---

# 5. Repository Architecture

```text
MIRROR-AI/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── ui/
│       │   ├── game/
│       │   ├── future/
│       │   ├── timeline/
│       │   ├── visuals/
│       │   └── voice/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── store/
│       └── lib/
│
├── server/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   ├── game/
│   │   │   ├── memory/
│   │   │   └── voice/
│   │   └── utils/
│   └── tests/
│
├── shared/
│   ├── constants/
│   └── types/
│
├── docs/
│
└── scripts/
```

---

# 6. Shared Contracts

The `shared/` directory is the integration boundary.

```text
shared/
├── constants/
│   ├── game.ts
│   └── index.ts
│
└── types/
    ├── game.ts
    ├── ai.ts
    ├── futureSelf.ts
    ├── voice.ts
    └── index.ts
```

### Game contracts

`shared/types/game.ts`

Contains:

* Game statistics
* Stat effects
* Decisions
* Timeline events
* Memory references
* Game state

### AI contracts

`shared/types/ai.ts`

Contains:

* Player profile
* Scenario
* Scenario choices
* AI request/response structures

### Future Self contracts

`shared/types/futureSelf.ts`

Contains:

* Future Self input
* Future Self output
* Counterfactual request
* Counterfactual response

### Voice contracts

`shared/types/voice.ts`

Contains:

* Transcription result
* Voice state

---

# 7. Deterministic Game Engine

The Game Engine is the source of truth for gameplay state.

AI must never directly mutate:

* stats
* XP
* age
* year
* timeline
* decisions
* progression

Correct architecture:

```text
AI
 ↓
Structured Output
 ↓
Validation
 ↓
Game Engine
 ↓
Deterministic State Mutation
 ↓
Game State
```

Incorrect architecture:

```text
AI
 ↓
Direct Database Mutation
```

---

# 8. Game State

The core game state contains:

```text
age
year
stats
xp
decisions
timeline
memories
```

Stats currently include:

```text
career
money
relationships
knowledge
creativity
energy
stress
```

Stats operate on a 0–100 scale.

The game constants define:

```text
MIN_STAT = 0
MAX_STAT = 100
INITIAL_AGE = 20
INITIAL_YEAR = 1
INITIAL_XP = 0
```

---

# 9. Decision Processing

A decision follows:

```text
Scenario
   ↓
Player Choice
   ↓
Choice Effects
   ↓
Validate Effects
   ↓
Apply Effects
   ↓
Clamp Stats
   ↓
Record Decision
   ↓
Create Timeline Event
   ↓
Update XP
   ↓
Advance Time
   ↓
Generate Next Scenario
```

The engine must validate all state mutations.

A stat must never become:

```text
< 0
```

or:

```text
> 100
```

---

# 10. AI Responsibilities

AI is responsible for:

* Understanding player input
* Creating player profiles
* Generating personalized scenarios
* Generating meaningful choices
* Interpreting decisions
* Identifying important memories
* Creating adaptive narrative
* Future Self reasoning
* Counterfactual reasoning

AI is not responsible for:

* Direct state mutation
* Direct database mutation
* Bypassing validation
* Controlling progression

---

# 11. Memory Architecture

Memory stores meaningful information about the player's journey.

Examples:

```text
Player values family time.
Player wants financial independence.
Player accepted a risky opportunity.
Player repeatedly prioritizes career.
Player rejected a stable opportunity.
```

Memory should be selective.

Do not store every trivial interaction.

Memory types currently supported:

```text
PROFILE
DECISION
EVENT
PREFERENCE
GOAL
ACHIEVEMENT
FAILURE
RELATIONSHIP
TURNING_POINT
```

---

# 12. Future Self Architecture

Future Self is generated from actual gameplay history.

Inputs include:

```text
Player Profile
Game State
Decision History
Memories
Timeline
Trajectory
```

The Future Self should reflect:

* Previous decisions
* Accumulated consequences
* Player priorities
* Major turning points
* Long-term trajectory

It must not be a generic motivational chatbot.

---

# 13. Counterfactual Architecture

The What-If system allows the player to explore an alternative decision.

Example:

```text
Original:
Choose Startup
       ↓
Future A

What If:
Choose Stable Job
       ↓
Future B
```

The alternate future must be derived from the changed decision and subsequent simulated consequences.

It should not generate a random unrelated future.

---

# 14. Voice Architecture

Primary flow:

```text
Microphone
   ↓
Speech-to-Text
   ↓
Text
   ↓
AI / Game System
   ↓
Response
   ↓
Text-to-Speech
```

Text input remains available as a fallback.

If microphone permission is denied:

```text
Voice unavailable
       ↓
Typing fallback
```

If TTS fails:

```text
Show response as text
```

---

# 15. Frontend Architecture

The client is responsible for:

* Rendering game state
* Displaying scenarios
* Showing choices
* Showing consequences
* Timeline visualization
* Voice controls
* Future Self visualization
* What-If interface
* Loading states
* Error states
* Responsive design

The client must not become the authoritative source of game state.

---

# 16. Babylon.js Architecture

Babylon.js is used for the Future Self experience.

The initial 3D environment should remain lightweight:

```text
Dark futuristic chamber
        ↓
Circular platform
        ↓
Future Self avatar
        ↓
Holographic timeline
        ↓
Camera
        ↓
Lighting
```

Required states:

```text
idle
listening
thinking
speaking
```

Complex facial animation and advanced assets are optional.

---

# 17. Security

Never commit:

```text
.env
API keys
secrets
credentials
private tokens
```

AI API keys remain server-side.

User input must be treated as untrusted input.

AI-generated effects must be validated before entering the game engine.

---

# 18. Responsible AI

MIRROR//AI should clearly communicate that:

* It is a simulation.
* It does not predict the actual future.
* Simulated outcomes are not guaranteed real-world outcomes.
* It does not provide professional financial, medical, legal, or psychological advice.
* Players remain responsible for real-world decisions.

The game explores consequences rather than prescribing the correct life choice.

---

# 19. Core Architectural Principle

The most important
