> **P2E v3 branding update (2026-08-14): the academic field, research architecture, ownership boundary and methods remain unchanged; only the short group brand migrated to P2E Research Group. The acronym is not expanded unless an official expansion is defined by the PI.**

# P2E Homepage Master Specification v3

**Status:** Canonical / Single Source of Truth  
**Version:** 2.6<br>
**Date:** 2026-08-30<br>
**Owner:** P2E Research Group · Han Sol Jung · KRICT

If website implementation conflicts with this document, the implementation must be updated to match this specification.

## 1. Canonical identity

- **Group brand:** P2E Research Group
- **Academic field:** Plant BOP & Energy Systems Engineering
- **Canonical identity:** Technology Translation & Engineering Decision-Making
- **Core philosophy:** From core technology to operable plant systems.
- **KRICT/internal positioning:** 원천기술의 공정 scale-up·실증을 위한 BOP·Plant System Integration

### Master description
P2E Research Group studies how emerging chemical and energy technologies become operable plant systems. Research focuses on BOP and utilities, plant integration, dynamic operability and scale-up. Core process technologies are combined with engineering data, equipment-performance constraints and demonstration/operating evidence to define feasible plant configurations and operating envelopes. Equipment-performance-aware modeling, dynamic simulation, decision-relevant fidelity and data validation are methods, not ends in themselves. e-SAF, CO2-to-methanol and other low-carbon processes are testbeds for reusable technology-translation and engineering-decision methods.

## 2. Research architecture

**Core Technology Input → BOP & Utilities → Plant Integration → Dynamic Operability → Scale-up & Demonstration Decisions**

### Core Technology Input
Experiments, kinetics, reactor/device models, CFD/multiphysics results, separation performance and source-technology specifications. These are not necessarily P2E-owned technologies.

### BOP & Utilities
Compressors, pumps, heat exchangers/thermal management, utilities, recycle systems, storage/buffer, feed conditioning, equipment performance maps and operating constraints. Core P2E ownership begins here.

### Plant Integration
PFD/HMB, engineering data, mass/energy integration, recycle architecture, BOP-core process interaction, design basis, system efficiency and plant-level constraints.

### Dynamic Operability
Part-load, turndown, ramping, startup/shutdown, renewable intermittency, feed disturbances, recycle dynamics, thermal inertia, buffer requirements and feasible operating envelopes.

### Scale-up & Demonstration Decisions
Scale-up criteria, BOP specification, plant configuration, operating envelope, control requirements, demonstration strategy, equipment sizing, technology selection and deployment decisions.

**Canonical principle:** The endpoint is a decision, not a model.

## 3. Flagship questions

1. **BOP-limited feasibility:** Which BOP and utility constraints become binding as a core technology is scaled up?
2. **Plant integration:** How do compression, pumping, heat management, recycle, storage and utilities reshape overall plant performance?
3. **Dynamic operability:** What operating envelope remains feasible under part-load, ramping, startup/shutdown and variable energy or feed conditions?
4. **Decision-relevant fidelity:** How much plant and equipment fidelity is required before an engineering decision becomes reliable?

## 4. Research themes

1. BOP & Utility Systems
2. Plant Integration & Energy Systems
3. Dynamic Operability & Flexible Operation
4. Scale-up & Engineering Decisions

## 5. Methods

### Signature methods
- Equipment-performance-aware modeling
- Steady-state & dynamic process simulation
- Decision-relevant model fidelity
- Engineering-data integration
- Demo/operation-data validation & reconciliation

### Enabling / collaborative methods
- Optimization
- AI / hybrid modeling
- CFD / multiphysics
- TEA / LCA

These enabling methods are used when they are necessary to answer a plant-system question; they are not top-level P2E identities.

## 6. Evidence principle

**Models do not define plant reality; engineering evidence does.**

Preferred source-of-truth evidence includes PFD/HMB, equipment datasheets, performance maps, vendor information, pilot/demonstration data and operating history.

Workflow: **Source of truth → Independent reproduction → Validation → Operating envelope → Engineering decision**

## 7. Research assets

### BOP Model & Interface Library
Compressors, pumps, heat exchangers/thermal management, utilities, recycle, storage/buffer, performance maps, operating constraints and interfaces to core reactor/process models.

### Engineering Data Interfaces
PFD, HMB, equipment datasheets, vendor curves, operation/demonstration data, tag mapping and assumption registers.

### Operability & Validation Assets
Steady-state operating envelopes, dynamic feasible-region maps, validity domains, uncertainty ranges, validation protocols and data-reconciliation procedures.

### Decision Layer
Design basis, BOP specification criteria, scale-up criteria, flexible-operation criteria, demonstration requirements and decision-oriented TEA/LCA interfaces.

## 8. Current testbeds

- **e-SAF / GlobalTop:** integrated process, BOP, utility logic, engineering data, flexible operation and demonstration/scale-up decisions.
- **CO2-to-methanol demo plant:** actual PFD/HMB, compressor/recycle/thermal constraints, BOP-aware off-design and dynamic operability, decision-relevant fidelity.
- **Other low-carbon systems:** additional proving environments for dynamic integration, validation and demonstration decisions.

Canonical principle: **Different technologies, same plant-system questions.**

## 9. People and collaboration boundary

- **Han Sol Jung:** PI; Plant BOP & Energy Systems Engineering; BOP/utilities, plant integration, dynamic operability, scale-up, technology translation and engineering decisions.
- **Jisoo Kim:** core/direct; process systems, engineering-data/model integration, TCO/TEA/LCA and system decisions.
- **Soo Won Son:** core/directly guided; reactor-plant interface, multiphysics input translation and operability.
- **Seunghyun Cheon:** collaborator; formally supervised by Dr. Kiwoong Kim; e-SAF process-design and GlobalTop collaboration interface.
- Reactor/device high-fidelity modeling is presented as upstream Core Technology Input or collaboration capability unless it directly supports an P2E plant-system question.
- AI/inference/optimization is an enabling/collaborative capability.
- Sustainability/TEA/LCA is an evaluation/decision interface.

## 10. Researcher development and group culture

Public promise: **The goal is not more project support, but more independent research owners.**

Researchers progress from source of truth and independent reproduction to challenging assumptions, owning a technical boundary, owning a flagship question and defining the next question/evidence plan.

Possible technical boundaries include core technology-BOP, BOP-plant, model-data and operation-decision.

### Technical authority principle
Ownership means more than doing the work. As expertise grows, technical judgment should move to the researcher who owns the question. The PI coordinates the research portfolio and priorities; domain owners grow toward responsibility for technical decisions within their boundaries.

### Collaborative integrity principle
**Challenge ideas, respect people.** Assumptions, methods and results should be challenged rigorously, while people, research ownership and credit are treated with respect. Disagreement should be discussed directly and with evidence.

### Researcher promise
P2E does not define success as retaining people indefinitely. The goal is for researchers to leave P2E with more capability, clearer research ownership and more career choices than when they joined.

## 11. Canonical copy bank

- **Academic field:** Plant BOP & Energy Systems Engineering
- **Core identity:** Technology Translation & Engineering Decision-Making
- **Hero:** From core technology to operable plant systems.
- **Korean hero:** 원천기술을 실제 플랜트로 구현하기 위한 설계·운전 조건을 규명합니다.
- **Technology principle:** Technologies change; plant-system questions and methods accumulate.
- **Decision principle:** The endpoint is a decision, not a model.
- **Fidelity principle:** Higher fidelity is not always necessary. Decision-relevant fidelity is.
- **Evidence principle:** Models do not define plant reality; engineering evidence does.
- **Researcher principle:** We own questions, not software territories.
- **Culture:** The goal is not more project support, but more independent research owners.
- **Collaborative integrity:** Challenge ideas, respect people.
- **Technical authority:** As expertise grows, technical judgment moves to the researcher who owns the question.
- **Researcher promise:** More capability, clearer ownership, more career choices.
- **Testbed principle:** Different technologies, same plant-system questions.
- **Career narrative:** From “Is the technology promising?” to “Under what conditions can it operate and scale?”

## 12. Information architecture and navigation

Preferred primary navigation order:

**HOME → RESEARCH → PEOPLE → HOW WE WORK → PUBLICATIONS → IP → JOIN US**

- `HOW WE WORK` is the public-facing label for `group.html`.
- The page explains researcher development, ownership, operating principles and group culture.
- Internal operating controls such as performance checkpoints, staffing gates or PI workload rules should not be exposed verbatim on the public website; translate them into public principles of autonomy, ownership, integrity and technical authority.

### Homepage public communication principles

- Explain the problem and decision value before specialist terminology.
- Easy-language questions are primary; academic terms remain secondary labels.
- **Homepage communication order:** Hero → Why → Four Questions → Decision Value → Testbeds → Collaboration.
- HOME ends after the collaboration interface; detailed Evidence, People preview and Outputs/Traceability content lives on specialist pages rather than being repeated on HOME.
- The WHY section uses a clear **Reaction-System Performance → P2E System Integration → Plant Decisions** bridge.
- Testbeds demonstrate reusable plant-system questions rather than defining the identity.
- Public-facing clarity must not weaken evidence, provenance or ownership boundaries.
- PEOPLE introduces researchers through their research questions and technical responsibilities rather than rank.
- The PI factual profile may include Education, Professional Experience, Professional Service & Memberships and selected entrepreneurial experience.
- The PI factual profile may include selected talks and presentations delivered directly by the PI.
- Talks are categorized by context and must not imply invited or keynote status without supporting evidence.
- Co-authored conference contributions are not presented as PI talks unless the PI actually presented them.
- PI-specific professional activities belong on PEOPLE rather than HOW WE WORK.
- Desktop PI layouts should balance factual biography and profile information without artificial blank regions.
- Header treatment may improve wordmark legibility while preserving the established visual identity.

### Whole-site communication hierarchy

- HOME is the non-specialist entry layer.
- RESEARCH provides technical depth after an easy-language entry.
- PEOPLE foregrounds research ownership and technical boundaries.
- HOW WE WORK owns the detailed researcher-development model.
- JOIN US references HOW WE WORK rather than duplicating the full ladder.
- **Canonical navigation:** HOME → RESEARCH → PEOPLE → HOW WE WORK → PUBLICATIONS → IP → JOIN US
- Public clarity must not weaken scientific, provenance, evidence or ownership boundaries.

## 13. Non-negotiable guardrails

1. Do not present P2E as owning all reactor/device physics.
2. Do not place CFD/COMSOL/multiphysics as the top-level group identity.
3. Distinguish reactor/device equipment from BOP when using the word equipment.
4. Present BOP as a research object that constrains plant feasibility and operability, not merely an auxiliary equipment list.
5. Keep AI, optimization and TEA/LCA below the top-level identity unless a specific page is about that collaboration/interface.
6. The group identity must remain valid after GlobalTop/e-SAF ends.
7. Demonstration is an important decision context, not the condition for the group's existence.
8. Plant BOP & Energy Systems Engineering does not mean ownership of all plant engineering; it means ownership of BOP/system-level questions between core technology and operable deployment.
9. Preserve explicit provenance, maturity and confidentiality labels for public evidence.
10. Do not describe researchers primarily as project support or software operators; foreground research ownership and growth in technical judgment.
11. Do not present internal personnel-management rules as public recruiting copy; translate them into clear and humane public principles.

## 14. v2.5 → v2.6 change summary

- Added selected verified PI talks and presentations, categorized by university/outreach, international and conference/professional context without unsupported status claims.
- Rebalanced the desktop PI profile by moving existing summary facts beneath the portrait and keeping the factual biography alongside it.
- Consolidated PI-specific professional activities on PEOPLE and removed their duplicate summary from HOW WE WORK.
- The scientific identity, research architecture, evidence/provenance principles, researcher and collaboration boundaries, publication/IP records and public URLs remain unchanged.

## 15. v2.4 → v2.5 change summary

- Simplified HOME to the canonical Hero, Why, Four Questions, Decision Value, Testbeds and Collaboration sequence.
- Replaced the earlier two-stage homepage concept with a three-stage Reaction-System Performance → P2E System Integration → Plant Decisions bridge.
- Updated PEOPLE introductory framing around research questions and technical responsibilities, and added factual PI professional service and membership information.
- Improved wordmark legibility through a light blue-gray header treatment while retaining the existing visual identity.
- The scientific identity, research architecture, evidence/provenance principles, researcher and collaboration boundaries, publication/IP records and public URLs remain unchanged.

## 16. v2.3 → v2.4 change summary

- Extended the homepage communication hierarchy across RESEARCH, PEOPLE, HOW WE WORK and JOIN US.
- Normalized public navigation around the canonical page order and retained `group.html` as the HOW WE WORK URL.
- Clarified that RESEARCH owns technical depth, PEOPLE foregrounds ownership boundaries, HOW WE WORK owns researcher development and JOIN US references that model without duplicating it.
- The scientific identity, evidence/provenance principles, researcher and collaboration boundaries, publication/IP records and public URLs remain unchanged.

## 17. v2.2 → v2.3 change summary

- Reorganized homepage public communication around Why, Four Questions, Decision Value, Testbeds, Collaboration and Evidence.
- Reframed specialist terminology as secondary labels beneath easy-language questions.
- The scientific identity, research architecture, evidence/provenance principles and ownership boundaries remain unchanged.

## 18. v2.1 → v2.2 change summary

- Refined the Korean homepage hero for clearer external communication.
- The scientific identity, academic field, research architecture, ownership boundaries, English canonical hero and evidence principles remain unchanged.

## 19. v2.0 → v2.1 change summary

- `GROUP` public navigation label → `HOW WE WORK`, positioned after `PEOPLE`.
- Added technical-authority principle: technical judgment moves toward the domain owner as expertise grows.
- Added collaborative-integrity principle: challenge ideas rigorously while respecting people, ownership and credit.
- Added researcher promise: researchers should gain capability, ownership and career choices through P2E.
- Clarified that internal PI/staffing controls should be translated into public principles rather than exposed verbatim.

## 20. v1 → v2 change summary

- Equipment-to-Process Systems expanded name → P2E Research Group brand; expanded name no longer foregrounded.
- Equipment-aware PSE → signature methodology, not top identity.
- Equipment Reality → split into Core Technology Input and BOP & Utilities.
- Equipment reality → process feasibility → decision → Core technology → BOP → plant integration → operability → decision.
- PSE/high-fidelity-equipment interface → core-technology/operable-plant interface.
- Cross-scale fidelity → BOP-limited feasibility.
- Equipment/reactor model library → BOP Model & Interface Library.
- CFD/AI/LCA as peer research themes → enabling/collaborative methods or decision interfaces.
- Application domains → Current Testbeds.
- Independent interface owners → independent research owners.
