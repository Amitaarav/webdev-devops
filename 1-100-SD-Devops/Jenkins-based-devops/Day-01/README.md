# Day 1: Modern SDLC Explained | Build Automation & Real-World Insights

> Part of the **Jenkins: Basics to Production** series — foundational concepts before diving into Jenkins itself.

---

## ⭐ Support the Project

If this repository helps you, give it a ⭐ to show your support and help others discover it!

---

## 📺 Video Reference

[▶ Watch the Day 1 Video](#)

---

## 📑 Table of Contents

- [Introduction](#introduction)
- [The Software Development Life Cycle (SDLC)](#the-software-development-life-cycle-sdlc)
  - [Phases of SDLC (Modern, Agile/DevOps)](#phases-of-sdlc-modern-agiledevops)
  - [Waterfall vs Agile/DevOps](#waterfall-vs-agiledevops)
  - [Waterfall vs Agile/DevOps – Key Differences](#waterfall-vs-agiledevops--key-differences)
  - [Role of Git in Modern SDLC](#role-of-git-in-modern-sdlc)
- [From SDLC to Build Automation](#from-sdlc-to-build-automation)
  - [Compiled vs. Interpreted Languages](#compiled-vs-interpreted-languages)
  - [Java Artifact Formats](#java-artifact-formats)
- [Build Processes in the Real World (DevOps/SRE Lens)](#build-processes-in-the-real-world-devopssre-lens)
  - [Compiled Languages – Two-Step Build](#compiled-languages--two-step-build)
  - [Interpreted Languages – One-Step Build](#interpreted-languages--one-step-build)
- [Why Build Automation Matters](#why-build-automation-matters)
- [Conclusion](#conclusion)
- [References](#references)

---

## Introduction

Welcome to **Day 1 of Jenkins Basics to Production**. Before diving into Jenkins itself, it's essential to understand the Software Development Life Cycle (SDLC) and how modern build and automation practices evolved.

In this session, you will:

- Explore the **phases of the SDLC** — from requirements gathering to feedback loops.
- Contrast **Waterfall vs Agile/DevOps** and understand why iterative, automated delivery is now standard.
- Learn the difference between **compiled vs interpreted languages**, and what artifacts, runtimes, and dependencies really mean.
- Break down **build processes** for both containerized and non-containerized workloads.
- Understand **why build automation matters** and how it prevents "works on my machine" issues.

> 👉 By the end of this session, you'll have a strong foundation to appreciate why CI/CD exists and how tools like Jenkins fit into the bigger picture.

---

## The Software Development Life Cycle (SDLC)

Every software product — from a simple website to a large-scale banking system — goes through a structured journey called the **Software Development Life Cycle (SDLC)**.

### Phases of SDLC (Modern, Agile/DevOps)

In modern Agile/DevOps, the SDLC is **iterative, automated, and feedback-driven** rather than a rigid one-way process.

---

#### 1. 📋 Requirement Gathering
Define what the system must achieve.

**Example:** A bank requests a mobile loan app; analysts capture user workflows, SLAs, audit requirements, and data-privacy constraints.

**Production notes:**
- **Functional requirements** — what the system should do (e.g., apply for a loan, approve/reject requests, send notifications).
- **Non-functional requirements** — how the system should behave (e.g., 99.9% availability, RPO = 15 min, response time <200 ms, GDPR compliance).
- **Security & compliance** — capture standards upfront (PCI DSS, GDPR, ISO 27001, RBI/MAS guidelines) so architecture choices align with regulations.
- **Environments & workflows** — define dev, staging, and production environments plus branching strategy upfront.

---

#### 2. 🏗️ Design
Decide how the system should function and interact.

**Example:** The team selects a microservices approach for authentication, loan processing, and payments. APIs and data models are defined along with retry and failure-handling strategies.

**Production notes:**
- **Source control strategy** — define branching models (trunk-based, GitFlow, release branches) early.
- **Branching policies** — enforce peer reviews, approvals, and CI checks before merges.
- **Testability & observability** — design services with health endpoints, structured logs, metrics, and distributed tracing.
- **Environment strategy** — plan for dev, staging, and production parity to reduce environment-specific issues.
- **Scalability & resilience** — build for horizontal scaling, graceful degradation, and fallback mechanisms.
- **Security boundaries** — define access controls, encryption standards, and compliance zones (PCI, HIPAA).

---

#### 3. 💻 Development
Implement features and functionality as per design.

**Example:** Developers work on short-lived Git branches, raise pull requests for peer code reviews, run local unit tests, and resolve lint/type errors before merging.

**Production notes:**
- **Shift-left security** — run SAST (Static Application Security Testing) and SCA (Software Composition Analysis) during development.
- **Trunk-based workflows** — commit small, frequent changes to main instead of long-lived feature branches.
- **Feature flags/toggles** — deploy code behind runtime switches for safe, gradual rollouts.
- **Automated checks** — enforce style, quality, and security rules through pre-commit hooks and CI jobs.

---

#### 4. 🔨 Build
Compile code, resolve dependencies, and create deployable artifacts.

**Example:** Java applications are built with Maven/Gradle into JAR/WAR files; Node.js uses npm/yarn; Python pins dependencies with pip and lockfiles.

**Production notes:**
- **Reproducibility** — enforce lockfiles, pinned versions, and deterministic build scripts.
- **Artifact storage** — publish outputs to registries (Nexus, Artifactory, container registries) for traceability and rollbacks.
- **Immutability** — once built, artifacts should not be modified; deploy the same artifact across all environments.
- **Supply-chain security** — generate SBOMs, sign artifacts, and scan images for vulnerabilities.

---

#### 5. 🧪 Testing (Continuous)
Validation happens throughout, not just once.

| Test Type | Description |
|---|---|
| Unit tests | Smallest logic checks (e.g., loan interest calculation) |
| Integration tests | Modules/services together (e.g., loan ↔ payment) |
| End-to-end tests | Full workflow (apply loan → approve → notify) |
| Smoke tests | Quick deploy checks (homepage loads, APIs return 200) |
| Contract tests | Ensure microservices agree on request/response formats |
| Performance tests | Simulate peak traffic, validate SLAs under stress |

**Security testing layers:**

| Type | Tools | Focus |
|---|---|---|
| SAST | SonarQube, Checkmarx, Bandit, Trivy | Source code & image layer scanning |
| SCA | Snyk, Anchore, Clair, JFrog Xray | Vulnerable open-source libraries & base images |
| DAST | OWASP ZAP, Burp Suite, Nikto | Runtime flaws (XSS, SQL injection, auth bypass) |
| Runtime/Container | Falco, Aqua Security, Prisma Cloud | Live container misconfigurations & malicious behavior |

---

#### 6. 🚀 Deployment
Promote software safely across environments.

**Example:** Code flows Dev → Staging → Prod. Staging mirrors production for realistic validation.

**Production notes:**
- **Progressive delivery** — blue-green or canary releases to minimize blast radius.
- **Infrastructure as Code (IaC)** — Terraform, Helm, Ansible for consistency and repeatability.
- **Configuration promotion** — ensure config moves with the build.
- **Rollback & roll-forward playbooks** — automate recovery steps.
- **Post-deploy validations** — smoke tests, monitoring hooks, and health checks immediately after release.

---

#### 7. 🔧 Operate & Maintain
Ensure reliability, security, and efficiency after go-live.

**Production notes:**
- **Monitoring & alerting** — track metrics, logs, and traces; define SLOs/SLIs; integrate with on-call systems.
- **Backups & DR** — ensure data recoverability, run periodic restore drills, validate RPO/RTO targets.
- **Patch & upgrade cycles** — apply OS/runtime updates, upgrade libraries, rotate keys.
- **Capacity & cost optimization** — right-size infrastructure, use autoscaling, and monitor cloud spend.
- **Incident response** — follow playbooks, perform blameless postmortems, and feed improvements back into pipelines.

---

#### 8. 🔁 Feedback & Improve (Continuous)
Learn from signals and evolve the system.

**Production notes:**
- **User feedback loops** — prioritize features and UX fixes based on customer input and usage analytics.
- **Iterative improvement cycles** — schedule retrospectives, review incidents, and agree on reliability improvements.
- **Reliability improvements** — recurring issues or SLO breaches feed directly into engineering backlogs.
- **Security learnings** — vulnerability scans, pen tests, and incident reports inform stronger baselines.
- **Pipeline and process tuning** — refine CI/CD flows, alerts, and test coverage to reduce noise.

---

> 🔑 **Source Control (Git) as Backbone:** All code lives in a Git repo (GitHub/GitLab/Bitbucket). CI pipelines are triggered automatically on repo events (push/PR). Git acts as the **single source of truth** — every change is tracked, versioned, and automatically linked to the build and release process.

---

### Waterfall vs Agile/DevOps

| Model | Description |
|---|---|
| **Waterfall** | Linear, sequential — each phase must complete before the next begins. Feedback is delayed and bugs are discovered late, when fixing them is expensive. |
| **Agile + DevOps** | Iterative — work broken into small increments with automated testing, security, and deployment for early feedback (minutes/hours, not months). |

### Waterfall vs Agile/DevOps – Key Differences

| Aspect | Waterfall | Agile/DevOps |
|---|---|---|
| Process Flow | Linear, sequential | Iterative, continuous, overlapping |
| Delivery | Big-bang release at the end | Small, frequent, incremental releases |
| Feedback | Comes late (after testing/deployment) | Continuous (tests, automation, monitoring) |
| Flexibility | Rigid; hard to adapt | Adaptive; requirements can evolve |
| Risk | High — issues found late are costly | Lower — early detection through automation |
| Team Collaboration | Siloed (handoffs between teams) | Cross-functional (dev + ops + QA together) |
| Examples | Year-long banking system project | Netflix/Amazon deploying updates daily |

---

### Role of Git in Modern SDLC

In Agile/DevOps workflows, source code is always stored in a **Git repository** (GitHub, GitLab, Bitbucket):

- Developers push code into **branches** and raise **pull/merge requests** for peer review.
- Changes are merged into the **main branch** after review and CI checks.
- Automation tools (like Jenkins) pull the code, run builds/tests, and promote it across environments.

> Git is the **single source of truth** — every change is tracked, versioned, and automatically linked to the build and release process.

---

## From SDLC to Build Automation

The **Build** phase is critical in the SDLC. The nature of the build depends on whether the language is **compiled** or **interpreted**.

### Compiled vs. Interpreted Languages

#### Compiled Languages

Source code is **translated before execution** by a compiler into:
- **Machine code** (e.g., C, C++, Go → `.exe`, ELF binary)
- **Bytecode** (e.g., Java → `.class`/`.jar`, C# → `.dll`) which requires a runtime (JVM, .NET CLR)

| Property | Detail |
|---|---|
| Build stage | Required — compiler + build tools (Maven, Gradle, Make, Bazel) |
| Execution speed | Faster — code is pre-translated, runs directly on CPU |
| Portability (non-containerized) | Low — binaries tied to OS and CPU architecture |
| Portability (containerized) | High — artifact + runtime baked into a portable image |
| Source code visibility | Hidden — only compiled binary is shipped |

**Examples:** Java, C, C++, Go, Rust

---

#### Interpreted Languages

Source code is **executed at runtime** by an interpreter — no binary generated beforehand.

| Property | Detail |
|---|---|
| Build stage | No explicit compilation, but dependency setup is still required |
| Execution speed | Slower — translation happens at runtime |
| Portability (non-containerized) | Requires correct interpreter + dependencies on host |
| Portability (containerized) | High — base image bundles interpreter + dependencies |
| Source code visibility | Visible — source code is distributed and readable |

**Examples:** Python, JavaScript (Node.js), PHP, Ruby, Perl

> ⚡ **Note:** Modern engines (like V8 for Node.js) use JIT compilation to speed up execution, but JavaScript is still generally treated as an interpreted language since source code is required at runtime.

---

### Java Artifact Formats

| Artifact | Contents | Needs JVM? | Needs Middleware? | Where it Runs | Example |
|---|---|---|---|---|---|
| `.jar` | Compiled `.class` files + metadata + libraries | ✅ | ❌ | `java -jar app.jar` | Spring Boot microservice |
| `.war` | Web components (servlets, JSPs, HTML, static files) | ✅ | ✅ Servlet container | Tomcat, JBoss, WebLogic | Legacy HR portal on Tomcat |
| `.ear` | Multiple modules: `.war` + `.jar` (EJBs, services) | ✅ | ✅ Full Java EE app server | WebLogic, JBoss EAP, WebSphere | Banking/insurance enterprise suite |

---

## Build Processes in the Real World (DevOps/SRE Lens)

### Key Terms

| Term | Definition | Examples |
|---|---|---|
| **Artifact** | Tangible build output | `.jar`, `.war`, `.exe`, Go binary |
| **Runtime** | Execution environment required to run the app | JVM (Java), .NET CLR (C#), Python interpreter |
| **Middleware** | Layer between runtime/OS and the app providing extra services | Tomcat, JBoss, WebLogic |
| **Dependencies** | External libraries/frameworks needed by the app | Spring Boot (Java), Flask (Python), Express (Node.js) |

---

### Compiled Languages – Two-Step Build

#### Containerized Workloads

**Step 1: Application Build**

| Language | Compiler | Build Tools | Artifact Format |
|---|---|---|---|
| Java | `javac` | Maven, Gradle | `.class`, `.jar`, `.war` |
| C | `gcc`, `clang` | `make`, CMake | Executable (`a.out`, `.exe`) |
| C++ | `g++`, `clang++` | CMake, Bazel | Executable / `.so`, `.dll` |
| Go | `go build` | Go modules, Bazel | Single binary executable |

**Step 2: Container Image Build**

```dockerfile
FROM openjdk:17-jdk-slim
COPY app.jar .
```

The resulting image is slim, immutable, and production-ready — containing only the artifact + minimal runtime.

**Benefits:** Smaller attack surface, secure and reproducible deployments. Enterprise practices include artifact signing, SBOMs, and image scanning.

---

#### Non-Containerized Workloads

**Step 1:** Same compilation step produces the artifact.

**Step 2:** Artifact is deployed directly to a VM/server.

Dependencies must already exist on the VM:
- **Runtimes** → JVM (Java), .NET CLR (C#), libc/glibc (C/C++)
- **Middleware** → Tomcat or JBoss for `.war` deployments

> ⚠️ **Risk:** Configuration drift — different environments may have mismatched runtime/middleware versions. Ops teams often use Ansible, Puppet, or Chef to enforce consistency.

---

### Interpreted Languages – One-Step Build

Unlike compiled languages, the **source code itself is executed** by the interpreter. The "build" step is about assembling a consistent execution environment (runtime + dependencies + code).

#### Non-Containerized Workloads

Source code runs directly on the host via the interpreter:

```bash
python script.py
node app.js
ruby server.rb
```

**Dependency management:**

| Language | Package Manager | Lockfile |
|---|---|---|
| Python | `pip install -r requirements.txt` | `requirements.txt` |
| Node.js | `npm install` | `package-lock.json` |
| Ruby | `gem install` | `Gemfile.lock` |

**Isolation tools to prevent version conflicts:**

| Tool | Purpose | Example |
|---|---|---|
| `venv` | Python virtual environments | Project A: Django 3.2, Project B: Django 4.0 |
| `nvm` | Node.js version manager | App A: Node.js 14, App B: Node.js 20 |
| `rbenv` | Ruby version manager | Ruby 2.7 vs 3.2 side-by-side |

---

#### Containerized Workloads

```dockerfile
FROM python:3.11-slim
COPY source .
RUN pip install -r requirements.txt
```

**Step 1 — Image Build:** Packages source code + dependencies + runtime into an immutable container image.

**Step 2 — Deploy Containers:** That image runs consistently across dev, staging, and production.

> ⚠️ **Note:** Source code is visible inside interpreted language images. Enterprises may apply obfuscation, packaging, or runtime controls to reduce source code exposure.

---

## Why Build Automation Matters

Writing code is only half the job. To run in production, applications must be prepared into a deployable form — a compiled artifact or an interpreted app with packaged dependencies.

**Without automation:**
- Every developer uses different commands, dependency versions, or environments.
- Results are unpredictable — the classic **"works on my machine"** problem.
- In production, mismatches cause outages, bugs, or inconsistent behavior.

**With automation:**

| Guarantee | Outcome |
|---|---|
| Same steps run everywhere | No environment-specific surprises across dev/staging/prod |
| Artifacts and dependencies are version-locked | Predictable, reproducible builds |
| Results are traceable | Every build linked to a commit, testable, and promotable |

> 👉 **Build automation makes builds reproducible, traceable, and environment-agnostic.**

---

## Conclusion

In this session, we shifted focus from writing code to **what it takes to reliably deliver software in production**.

- ✅ **Waterfall** creates late feedback loops; **Agile + DevOps** enable fast, iterative delivery.
- ✅ **Compiled languages** produce artifacts (`.jar`, `.exe`, binaries); **interpreted languages** rely on interpreters/runtimes but still require environment setup.
- ✅ **Non-containerized deployments** (direct to VMs) vs **containerized workloads** (Docker images) have fundamentally different build and dependency management approaches.
- ✅ **Build automation** ensures consistency, reproducibility, and environment-agnostic delivery.

> 🔜 **Next up — Day 2:** Continuous Integration, Testing, Delivery, Deployment, and Monitoring — and how Jenkins brings it all together.

---

## References

| Resource | Link |
|---|---|
| Agile Manifesto | [agilemanifesto.org](https://agilemanifesto.org) |
| What is DevOps? | [AWS DevOps](https://aws.amazon.com/devops/what-is-devops/) |
| Jenkins Official Documentation | [jenkins.io/doc](https://www.jenkins.io/doc/) |
| 12-Factor App Methodology | [12factor.net](https://12factor.net) |
| Martin Fowler on Continuous Integration | [martinfowler.com](https://martinfowler.com/articles/continuousIntegration.html) |
| Docker Official Docs | [docs.docker.com](https://docs.docker.com) |