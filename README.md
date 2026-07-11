# 🛡️ AgentShield

### The Cyber-Security Gateway & Command Dashboard for Autonomous AI Agents

AgentShield is a mock next-generation developer platform designed to secure, monitor, and regulate AI agents as they navigate the modern web. Built for **Hackathon Problem Statement Two (AI's First Day Online)**, AgentShield demonstrates a robust infrastructure layer addressing **Identity**, **Payments**, **Trust**, and **Moderation** for agentic systems.

---

## 🚀 Key Features

- **🔒 Trust & Moderation Sandbox:**
  An interactive security zone to test user queries and agent system instructions. It uses real-time pattern matching and semantic parsing (simulated) to detect:
    - Prompt injections (instructions trying to hijack the agent).
    - Data exfiltration attempts.
    - System instruction leakage.

- **💳 Human-in-the-Loop Payments:**
  A simulated wallet for agents that enforces strict spending guardrails. If an agent tries to perform a transaction that exceeds its preset safety limit, AgentShield triggers a **Human-in-the-Loop (HITL)** approval popup, pausing the action until approved.

- **🪪 Agent Identity & Attestation:**
  Verifies the cryptographic identity of agents (e.g., ensuring agent keys match registered models) to prevent malicious bots from spoofing clean agents.

- **📊 Glowing Glassmorphic Command Center:**
  A gorgeous, futuristic dark-mode UI with live-running security logs, active agent traffic telemetry, dynamic threat indicators, and toggleable firewall configuration rules.

---

## 🛠️ Technology Stack

- **Core Structure:** HTML5
- **Styling:** Vanilla CSS (custom glassmorphism, responsive grid, visual keyframe animations, glowing indicators)
- **Logic:** Vanilla JavaScript (ES6+, simulation engines, security parsers)

---

## 💻 How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).
3. Interact with the sandbox to simulate prompt injections, adjust the spending sliders, and click log items to inspect details.
