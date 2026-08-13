# E2P Homepage Master Specification v2

**Status:** Canonical / Single Source of Truth  
**Version:** 2.0  
**Date:** 2026-08-13  
**Owner:** E2P Systems Group · Han Sol Jung · KRICT

If website implementation conflicts with this document, the implementation must be updated to match this specification.

## 1. Canonical identity

- **Group brand:** E2P Systems Group
- **Academic field:** Plant BOP & Energy Systems Engineering
- **Canonical identity:** Technology Translation & Engineering Decision-Making
- **Core philosophy:** From core technology to operable plant systems.
- **KRICT/internal positioning:** 원천기술의 공정 scale-up·실증을 위한 BOP·Plant System Integration

### Master description
E2P Systems Group studies how emerging chemical and energy technologies become operable plant systems. Research focuses on BOP and utilities, plant integration, dynamic operability and scale-up. Core process technologies are combined with engineering data, equipment-performance constraints and demonstration/operating evidence to define feasible plant configurations and operating envelopes. Equipment-performance-aware modeling, dynamic simulation, decision-relevant fidelity and data validation are methods, not ends in themselves. e-SAF, CO2-to-methanol and other low-carbon processes are testbeds for reusable technology-translation and engineering-decision methods.

## 2. Research architecture

**Core Technology Input → BOP & Utilities → Plant Integration → Dynamic Operability → Scale-up & Demonstration Decisions**

### Core Technology Input
Experiments, kinetics, reactor/device models, CFD/multiphysics results, separation performance and source-technology specifications. These are not necessarily E2P-owned technologies.

### BOP & Utilities
Compressors, pumps, heat exchangers/thermal management, utilities, recycle systems, storage/buffer, feed conditioning, equipment performance maps and operating constraints. Core E2P ownership begins here.

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

These enabling methods are used when they are necessary to answer a plant-system question; they are not top-level E2P identities.

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
- Reactor/device high-fidelity modeling is presented as upstream Core Technology Input or collaboration capability unless it directly supports an E2P plant-system question.
- AI/inference/optimization is an enabling/collaborative capability.
- Sustainability/TEA/LCA is an evaluation/decision interface.

## 10. Researcher development

Public promise: **The goal is not more project support, but more independent research owners.**

Researchers progress from source of truth and independent reproduction to challenging assumptions, owning a technical boundary, owning a flagship question and defining the next question/evidence plan.

Possible technical boundaries include core technology-BOP, BOP-plant, model-data and operation-decision.

## 11. Canonical copy bank

- **Academic field:** Plant BOP & Energy Systems Engineering
- **Core identity:** Technology Translation & Engineering Decision-Making
- **Hero:** From core technology to operable plant systems.
- **Korean hero:** 원천기술을 실제 운전 가능한 플랜트 시스템으로.
- **Technology principle:** Technologies change; plant-system questions and methods accumulate.
- **Decision principle:** The endpoint is a decision, not a model.
- **Fidelity principle:** Higher fidelity is not always necessary. Decision-relevant fidelity is.
- **Evidence principle:** Models do not define plant reality; engineering evidence does.
- **Researcher principle:** We own questions, not software territories.
- **Culture:** The goal is not more project support, but more independent research owners.
- **Testbed principle:** Different technologies, same plant-system questions.
- **Career narrative:** From “Is the technology promising?” to “Under what conditions can it operate and scale?”

## 12. Non-negotiable guardrails

1. Do not present E2P as owning all reactor/device physics.
2. Do not place CFD/COMSOL/multiphysics as the top-level group identity.
3. Distinguish reactor/device equipment from BOP when using the word equipment.
4. Present BOP as a research object that constrains plant feasibility and operability, not merely an auxiliary equipment list.
5. Keep AI, optimization and TEA/LCA below the top-level identity unless a specific page is about that collaboration/interface.
6. The group identity must remain valid after GlobalTop/e-SAF ends.
7. Demonstration is an important decision context, not the condition for the group's existence.
8. Plant BOP & Energy Systems Engineering does not mean ownership of all plant engineering; it means ownership of BOP/system-level questions between core technology and operable deployment.
9. Preserve explicit provenance, maturity and confidentiality labels for public evidence.

## 13. v1 → v2 change summary

- Equipment-to-Process Systems expanded name → E2P Systems Group brand; expanded name no longer foregrounded.
- Equipment-aware PSE → signature methodology, not top identity.
- Equipment Reality → split into Core Technology Input and BOP & Utilities.
- Equipment reality → process feasibility → decision → Core technology → BOP → plant integration → operability → decision.
- PSE/high-fidelity-equipment interface → core-technology/operable-plant interface.
- Cross-scale fidelity → BOP-limited feasibility.
- Equipment/reactor model library → BOP Model & Interface Library.
- CFD/AI/LCA as peer research themes → enabling/collaborative methods or decision interfaces.
- Application domains → Current Testbeds.
- Independent interface owners → independent research owners.
