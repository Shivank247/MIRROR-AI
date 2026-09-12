# MIRROR//AI — Future Self Contract

## 1. Purpose

The Future Self system represents a simulated future version of the
player based on the player's actual gameplay history.

It is not a prediction of the player's real future.

The Future Self must be generated from:

- player profile
- goals
- interests
- values/preferences
- current game statistics
- decision history
- important memories
- timeline events
- major consequences
- career trajectory
- financial trajectory
- relationship trajectory
- skill trajectory
- lifestyle trajectory

The Future Self must reflect the decisions actually made by the player.

---

## 2. Ownership

### Suraj owns

- Future Self generation
- Future Self reasoning
- Future Self personality
- Future Self profile
- Future Self presentation
- Future Self conversation
- Counterfactual / What-If system
- Babylon.js 3D Future Self
- Future Self visual presentation

### Shivank owns

- deterministic Game Engine
- authoritative Game State
- state mutation
- progression
- timeline source of truth
- backend/application integration

### Shivani owns

- Grok AI engine
- player profile understanding
- scenario generation
- choice generation
- decision interpretation
- memory system

### Shiva owns

- microphone
- speech-to-text
- text-to-speech
- voice UX

---

## 3. Source of Truth

The deterministic Game Engine is the source of truth.

Future Self is a consumer of game state.

Future Self MUST NOT directly mutate:

- player stats
- XP
- age
- time
- decisions
- timeline
- consequences
- progression
- authoritative game state

Future Self may interpret and present these values.

---

## 4. Future Self Input

The Future Self system should consume the following information.

### Player Profile

- goals
- priorities
- interests
- aspirations
- values
- preferences
- risk tolerance
- player summary

### Current Game State

- age
- year
- stats
- XP
- current trajectory

### Decision History

Each important decision should contain enough information to understand:

- scenario
- selected choice
- decision meaning
- effects
- age
- year
- timestamp

### Memories

Important memories may include:

- profile information
- decisions
- events
- preferences
- goals
- achievements
- failures
- relationships
- turning points

### Timeline

Important timeline events may include:

- decisions
- events
- milestones
- major consequences
- turning points

---

## 5. Future Self Output

Future Self generation should produce structured data.

Required fields:

- age
- career
- financialState
- relationships
- skills
- lifestyle
- achievements
- regrets
- personality
- majorDecisions
- trajectorySummary
- futureVoice

### Personality

Personality is a gameplay characteristic.

It is NOT:

- psychological diagnosis
- medical assessment
- mental-health prediction
- personality disorder classification

Suggested gameplay characteristics:

- confidence
- riskTolerance
- discipline

---

## 6. Personalization Rules

Future Self must be personalized.

It must be grounded in:

1. actual player decisions
2. important memories
3. current game state
4. timeline
5. accumulated consequences
6. player profile
7. long-term trajectory

Do not generate a generic future story that could belong to any player.

The same initial player profile should be capable of producing different Future Selves
when the player makes different decisions.

---

## 7. Decision Causality

Future Self reasoning must explain how major decisions contributed to the simulated future.

Example:

Player chooses:

"Take a difficult internship instead of an easy job."

The Future Self may later reflect:

- increased career progression
- increased knowledge
- reduced energy
- possible relationship/time tradeoff

The Future Self should connect the result to the actual decision history.

It must not invent unrelated major causes.

---

## 8. Future Self Conversation

The Future Self may communicate with the player.

Conversation must use:

- Future Self profile
- decision history
- memories
- timeline
- current trajectory
- generated future

The Future Self should answer questions based on the player's actual gameplay history.

Example questions:

- "Was it worth it?"
- "Why did my career turn out this way?"
- "Which decision changed everything?"
- "What do you regret?"
- "What should I have done differently?"

The conversation must remain consistent with the generated Future Self.

---

## 9. Responsible AI

The system must clearly communicate that Future Self is a simulation.

Preferred framing:

> This is a simulated future created from your decisions.

The system must NOT claim:

- "This is your real future."
- "You will definitely become this."
- "Your career will definitely end this way."
- "You will definitely earn this amount."
- "This is your psychological diagnosis."

Future Self is part of the game simulation.

---

## 10. Counterfactual / What-If

The What-If system compares the player's original trajectory with an
alternative decision.

Required inputs:

- original game state
- original decision history
- original decision
- alternative choice
- relevant memories
- timeline
- trajectory

The system should produce:

- original future
- alternate future
- changed consequences
- trajectory differences
- explanation of the differences

The alternative future must be causally related to the changed decision.

It must NOT be a random alternative story.

---

## 11. Counterfactual Isolation

What-If simulation must not permanently modify the player's real game state.

The original game state remains authoritative.

Conceptually:

Original State
    |
    +----> Original Future
    |
    +----> Temporary Alternative Simulation
                    |
                    +----> Alternate Future

The temporary counterfactual simulation must not overwrite:

- real stats
- real decisions
- real timeline
- real memories
- real progression

---

## 12. Babylon.js Responsibility

The Babylon.js Future Self experience should provide:

- 3D scene
- camera
- lighting
- Future Self avatar
- lightweight futuristic environment
- interaction
- cinematic reveal

The first implementation should prioritize reliability over visual complexity.

A simple but convincing avatar is better than an unstable complex character system.

Avoid spending excessive time on:

- complex rigging
- advanced facial animation
- expensive 3D assets
- unnecessary particle systems

---

## 13. Cinematic Reveal

The intended reveal sequence is:

1. Black screen
2. Camera moves forward
3. Silhouette appears
4. Environment lights activate
5. Future Self becomes visible
6. Age appears
7. Future trajectory appears
8. Future Self begins conversation

Example presentation:

SIMULATION COMPLETE

Age 32

THIS FUTURE WAS CREATED BY YOUR DECISIONS.

Future Self:

"Was it worth it?"

---

## 14. Future Self Visual States

The Future Self presentation may use these states:

- INTRO
- REVEAL
- IDLE
- LISTENING
- THINKING
- SPEAKING
- REFLECTING

These states may control:

- avatar animation
- camera behavior
- lighting
- UI
- dialogue presentation

---

## 15. Architecture Boundary

The intended architecture is:

Player
    |
    v
Game History
    |
    +--> Decisions
    +--> Memories
    +--> Timeline
    +--> Stats
    +--> Consequences
    |
    v
Future Self Service
    |
    v
AI Reasoning
    |
    v
Structured Future Self
    |
    +--> Future Profile
    +--> Future Dialogue
    +--> Personality
    |
    v
Babylon.js
    |
    v
3D Future Self

For What-If:

Original Game State
    |
    v
Counterfactual Simulation
    |
    v
Alternate Trajectory
    |
    v
Alternate Future Self
    |
    v
Comparison

---

## 16. Integration Rule

Future Self should integrate with existing project contracts.

Do not:

- rewrite the Game Engine
- rewrite the Memory system
- replace the AI Engine
- replace the voice system
- replace application routing
- create duplicate shared contracts
- directly mutate authoritative game state

If a shared contract needs to change, coordinate with the owner before changing it.

---

## 17. MVP Priority

### P0 — Required

- Future Self structured data
- Future Self reasoning
- Future Self generation
- Future Self screen
- basic Babylon.js scene
- reliable Future Self avatar
- Future Self presentation
- text conversation
- Counterfactual / What-If

### P1 — Important

- cinematic reveal
- Future Self statistics
- timeline visualization
- AI consistency
- memory-aware conversation

### P2 — Enhancement

- advanced avatar
- advanced animation
- facial animation
- detailed environment
- holographic effects
- particles

P2 work must not delay P0.

---

## 18. Success Condition

The Future Self experience is successful when:

1. Player makes meaningful decisions.
2. Decisions affect the game state.
3. Game history is available to Future Self.
4. Future Self is generated from the actual history.
5. Screen transitions into the Future Self experience.
6. A 3D Future Self is revealed.
7. The simulated future is presented.
8. Future Self can discuss the player's decisions.
9. Player can ask:

   "What if I had chosen the other option?"

10. The system generates a causally different alternate future.
11. The original game state remains unchanged.

---

## 19. Core Principle

MIRROR//AI does not predict the player's real future.

It creates a playable simulated future from the player's decisions.

> You don't choose your future.
> You build it through your decisions.

And:

> We don't predict your future.
> We let you experience the consequences of your decisions.