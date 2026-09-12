# MIRROR//AI — Team Contracts

## 1. Purpose

This document defines:

* Team ownership
* Feature boundaries
* Integration rules
* Shared contracts
* Git workflow
* Review rules
* Communication expectations

The purpose is to prevent duplicate implementations and integration conflicts during the hackathon.

---

# 2. Team

## Shivank

### Role

**Team Lead + Core Game + Full-Stack Integration**

### Primary Ownership

* Architecture
* Git coordination
* Deterministic Game Engine
* Game State
* Stats
* XP
* Decision processing
* Consequences
* Time progression
* Timeline
* Butterfly effects
* Backend/API architecture
* Database integration
* Frontend integration
* Testing
* Deployment
* Final demo

### Primary Branch

```text
feat/game-engine-core
```

---

# 3. Shivani

### Role

**AI Engine + Memory**

### Primary Ownership

* Grok AI integration
* Player understanding
* Player profile generation
* Scenario generation
* Meaningful choice generation
* Decision interpretation
* Memory interpretation
* Adaptive scenarios
* Prompt architecture
* Structured AI output
* AI fallback handling

### Primary Areas

```text
server/src/services/ai/
server/src/services/memory/
```

### Branch

```text
feat/ai-engine
```

### Shivani must not own

* Deterministic stat mutation
* Direct game-state mutation
* Direct database game-state mutation
* Future Self 3D
* Voice implementation

---

# 4. Suraj

### Role

**Future Self + Counterfactual + Babylon.js**

### Primary Ownership

* Future Self reasoning
* Future trajectory
* Future Self personality
* Future Self responses
* Counterfactual simulation
* What-If
* Babylon.js
* 3D environment
* Avatar
* Camera
* Lighting
* Future Self animation states

### Primary Areas

```text
server/src/services/future/
client/src/components/future/
```

If the exact folders differ from the repository, inspect first and adapt without creating duplicate architecture.

### Branch

```text
feat/future-self
```

### Suraj must not own

* Core deterministic game state
* Core stat mutation
* Voice/STT/TTS infrastructure
* AI scenario engine

---

# 5. Shiva

### Role

**Voice + Voice UX**

### Primary Ownership

* Microphone
* Speech-to-Text
* Text-to-Speech
* Voice states
* Voice UI
* Voice errors
* Text fallback
* Future Self voice integration

### Primary Areas

```text
server/src/services/voice/
client/src/components/voice/
```

### Branch

```text
feat/voice
```

### Shiva must not own

* Core AI scenario generation
* Game-state mutation
* Future Self reasoning
* Database architecture

---

# 6. Shared Folder Contract

The shared folder is the integration boundary.

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

---

# 7. Shared Game Contract

`shared/types/game.ts`

Defines:

```text
GameStatName
GameStats
StatEffects
GameDecision
TimelineEvent
GameMemoryReference
GameState
```

All teams must use these definitions when interacting with game state.

Do not create:

```text
GameState2
GameStatsV2
AlternativeGameState
LocalGameState
```

without team coordination.

---

# 8. Shared AI Contract

`shared/types/ai.ts`

Defines:

```text
PlayerProfile
ScenarioChoice
GameScenario
AIProfileRequest
AIScenarioRequest
AIProfileResponse
AIScenarioResponse
```

Shivani owns implementation.

Other systems consume the contract.

---

# 9. Shared Future Self Contract

`shared/types/futureSelf.ts`

Defines:

```text
FutureSelfInput
FutureSelf
CounterfactualRequest
CounterfactualResponse
```

Suraj owns implementation.

The input should be grounded in actual game history.

---

# 10. Shared Voice Contract

`shared/types/voice.ts`

Defines:

```text
TranscriptionResult
VoiceState
```

Shiva owns implementation.

---

# 11. Deterministic Engine Rule

The most important team contract:

> **AI does not directly mutate game state.**

AI can propose:

```text
scenario
choice
effects
narrative
memory
future interpretation
```

The Game Engine decides what actually happens.

Correct:

```text
AI
 ↓
Structured Output
 ↓
Validation
 ↓
Game Engine
 ↓
State Mutation
```

Incorrect:

```text
AI
 ↓
Database
```

---

# 12. Game State Ownership

Only the Game Engine is authoritative for:

* Stats
* XP
* Age
* Year
* Decisions
* Timeline
* State progression
* Consequences

Other systems may read game state when needed.

They should not independently mutate the authoritative state.

---

# 13. AI Output Rule

AI output must be:

1. Structured
2. Validated
3. Compatible with shared types
4. Safe to consume
5. Fallback-capable

AI should not be trusted as an unrestricted state mutation mechanism.

---

# 14. Memory Rule

Memory should capture meaningful information.

Good examples:

```text
Player prioritizes family.
Player wants financial independence.
Player repeatedly chooses high-risk opportunities.
Player rejected a stable career path.
Player sacrificed free time for career growth.
```

Do not save every minor interaction.

Memory should improve later gameplay.

---

# 15. Future Self Rule

Future Self must be grounded in:

```text
Player Profile
+
Game State
+
Decision History
+
Memories
+
Timeline
+
Trajectory
```

It must not respond with generic statements unrelated to the player's actual journey.

Example:

Bad:

> "You worked hard and became successful."

Good:

> "You chose the startup at 21, accepted the higher workload, and repeatedly protected your financial goals. By 32, that path gave you more independence, but your timeline shows several moments where family time was sacrificed."

The exact response is AI-generated, but the underlying facts must come from the simulation history.

---

# 16. What-If Rule

What-If must modify a meaningful decision and simulate the alternative.

Example:

```text
Original decision:
Startup

Alternative:
Stable career
```

The alternate future should be derived from:

```text
Original history
+
Changed decision
+
Deterministic consequences
+
Future simulation
```

It must not simply create an unrelated story.

---

# 17. Voice Rule

Primary:

```text
Voice → STT → Text → AI/Game → Response → TTS
```

Fallback:

```text
Typing → AI/Game → Text Response
```

If microphone access fails, gameplay must remain usable.

If TTS fails, text response must remain available.

---

# 18. API Key Rule

Never commit:

```text
.env
API keys
tokens
credentials
secrets
```

AI credentials belong only on the backend.

Frontend code must never contain the Grok API key.

---

# 19. Git Workflow

`main` is the stable branch.

Nobody should directly push feature work to `main`.

Basic workflow:

```bash
git checkout main
git pull origin main

git checkout -b feat/your-feature

git status
# make changes

git diff

git add .
git commit -m "feat: description"

git push -u origin feat/your-feature
```

Then:

```text
Pull Request
     ↓
Review
     ↓
Merge
     ↓
Delete feature branch if appropriate
```

---

# 20. Branch Ownership

```text
main
│
├── feat/game-engine-core
│       └── Shivank
│
├── feat/ai-engine
│       └── Shivani
│
├── feat/future-self
│       └── Suraj
│
└── feat/voice
        └── Shiva
```

---

# 21. Development Discipline

Every developer follows:

```text
READ
 ↓
INSPECT
 ↓
CHECK CONTRACTS
 ↓
PLAN
 ↓
SMALL CHANGE
 ↓
TEST
 ↓
CHECK DIFF
 ↓
COMMIT
 ↓
PUSH
```

Do not:

* Rewrite the entire project
* Randomly change architecture
* Modify another person's feature without coordination
* Duplicate shared types
* Commit secrets
* Skip testing
* Make large unrelated changes

---

# 22. Cross-Team Changes

If a developer needs a change to a shared contract:

1. Identify the requirement.
2. Explain why the current contract is insufficient.
3. Inform Shivank.
4. Check impact on all affected teammates.
5. Update the shared contract.
6. Notify everyone.
7. Test dependent features.

Never silently change a shared contract.

---

# 23. Integration Checkpoints

## Checkpoint 1

Approximately hour 3.

Review:

* Repository
* Shared types
* Branches
* Initial implementations

## Checkpoint 2

Approximately hour 6.

Review:

* Voice
* AI
* Game Engine

## Checkpoint 3

Approximately hour 10.

Review:

* Decisions
* Consequences
* Memory
* Timeline

## Checkpoint 4

Approximately hour 14.

Review:

* Future Self
* What-If
* 3D
* Voice

## Checkpoint 5

Approximately hour 17.

Review:

* Full gameplay
* UI
* Integration
* Errors

---

# 24. Code Review Rules

When reviewing another teammate's work, classify issues correctly.

## Actual Bug

The code is objectively broken.

## Contract Violation

The implementation conflicts with an agreed shared interface or architecture.

## Missing Later Work

The feature is intentionally incomplete because it belongs to a later phase.

## Integration-Dependent Gap

The code depends on another teammate's unfinished work.

## Acceptable Temporary Behavior

The behavior is intentionally simplified for the hackathon.

Do not report integration-dependent or planned work as an actual bug.

---

# 25. Hackathon Priority

When time is limited:

```text
Working Gameplay
      >
AI Reliability
      >
Integration
      >
3D Polish
      >
Extra Features
```

The team should always prioritize the playable vertical slice.

---

# 26. Feature Freeze

At approximately hour 18:

**STOP adding major features.**

Only work on:

* Bugs
* Integration
* Reliability
* UI polish
* Demo preparation

---

# 27. Communication Rule

When handing work to another teammate, provide:

```text
What changed
What files changed
What contract is involved
How to run/test it
Known limitations
Dependencies
```

This prevents integration confusion.

---

# 28. Final Team Principle

Everyone owns a system.

Nobody owns the entire project alone.

```text
Shivank
Game + Integration
        +
Shivani
AI + Memory
        +
Suraj
Future Self + What-If + 3D
        +
Shiva
Voice + Voice UX
        =
MIRROR//AI
```

The goal is not four separate features.

The goal is **one playable, integrated experience**.

> **MIRROR//AI doesn't predict your future. It lets you experience the consequences of your decisions.**
