# 🎬 Movie Streaming Platform

A responsive, full-featured anime and TV show streaming platform built with **React.js** and **NestJS**, supporting both registered users and guests. Features personalized viewing history, cross-device session sync, real-time updates, and multi-language UI.

![Movie Streaming Preview](https://portfolio.knite.online/assets/bg_movie.webp)

---

## 🚀 Features

-   🔐 **Authentication & Authorization**

    -   OAuth2 + JWT
    -   Guest & Multi-account login
    -   Silent background authentication (silent login using refresh tokens)
    -   Role-based access control (RBAC)

-   🎞️ **Movie System**

    -   Browse by genre, season, and episode
    -   Real-time viewing history, bookmarks, and favorites
    -   Episode-level rating, comment, and reaction system

-   🌐 **Frontend**

    -   SPA (Single Page Application) using React.js
    -   Multi-language support via `i18n`
    -   Responsive UI with TailwindCSS + SCSS
    -   Infinite scrolling, filter & sort using React Query

-   ⚙️ **Backend**
    -   Microservice architecture (Movie, Comment, View, Rating, Notification, etc.)
    -   RESTful API Gateway built in NestJS
    -   MongoDB with Mongoose, Redis for cache/session
    -   Real-time logic via Redis Pub/Sub or Kafka

---

## 🧱 Tech Stack

### Frontend

-   **Framework**: React.js (TypeScript)
-   **State/Logic**: Zustand, React Query
-   **UI/UX**: SCSS, TailwindCSS, Framer Motion
-   **Form & Validation**: React Hook Form + Zod
-   **Video Playback**: Hls.js
-   **Routing & i18n**: React Router, i18next

### Backend

-   **Framework**: NestJS (Modular Monorepo)
-   **Database**: MongoDB
-   **Cache & Session**: Redis
-   **Authentication**: OAuth2, JWT, Cookie
-   **Service Communication**: REST, Kafka, gRPC-ready
-   **Deployment Ready**: Docker + Docker Compose

---

## 🏗️ Architecture Overview

```
[ Web Client (React) ]
        ↓
[ REST API Gateway (NestJS) ]
        ↓
[ Microservices: Movie | View | Comment | Rating | Noti | User ]
        ↓
[ MongoDB | Redis | Kafka (Optional) ]
```

-   Microservices are separated by responsibility (e.g., `movie`, `view`, `comment`, etc.)
-   Gateway handles authentication, i18n, and traffic routing
-   Services communicate via REST now, gRPC support coming

---

## 🔧 Getting Started

> Clone monorepo or individual service/frontend depending on your architecture.

```bash
# Clone repo
git clone https://github.com/hlxlevi/ReactJS-Movie.git
cd ReactJS-Movie

# Install frontend dependencies using Bun
bun install

# Run frontend
bun run start:dev
```

> ⚠️ Make sure the following are **already running** before starting:
>
> -   MongoDB
> -   Redis
> -   OAuth2 Auth Service (e.g. https://auth.knite.online)
>
> These are required for full functionality (authentication, session management, etc.)

---

## 📫 Contact

Feel free to connect or reach out for collaboration:

-   💼 [LinkedIn](https://www.linkedin.com/in/hải-lý-nguyễn-a0a5942a0)
-   🌐 Portfolio: [https://portfolio.knite.online](https://portfolio.knite.online)
-   📧 Email: nhly.dev@gmail.com

---

## 📄 License

MIT License – free to use with attribution.
