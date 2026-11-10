# Chirpy

A Twitter-style REST API built with TypeScript, Express and PostgreSQL. Users can sign up, log in, post short "chirps", and manage their own content. Authentication uses JWTs and refresh tokens.

## Why?

Chirpy is a complete backend built without a framework that hides the details. It covers what a real production API needs:

- **Authentication:** argon2 password hashing, short-lived JWT access tokens (1 hour) and revocable refresh tokens (60 days)
- **Authorization:** users can only delete their own chirps
- **Database:** PostgreSQL with Drizzle ORM, type-safe queries and versioned migrations
- **Webhooks:** a payment-provider webhook (Polka) secured with an API key that upgrades users to "Chirpy Red"
- **Middleware:** request metrics, response logging and centralized error handling
- **Testing:** unit tests for the auth layer with Vitest

## Installation

### Prerequisites

- Node.js (version in `.nvmrc`)
- PostgreSQL

### Setup

```bash
git clone https://github.com/jacobduck99/http_server.git
cd http_server
npm install
```

Create a `.env` file in the project root:

```env
PORT=8080
PLATFORM="dev"
DB_URL="postgres://username:password@localhost:5432/chirpy?sslmode=disable"
JWT_SECRET="your-jwt-secret"
POLKA_KEY="your-polka-api-key"
```

You can generate a JWT secret with `openssl rand -base64 64`.

Create the database:

```bash
psql -c "CREATE DATABASE chirpy;"
```

Database migrations run automatically when the server starts.

### Run

```bash
npm run dev
```

The server starts on `http://localhost:8080`.

### Test

```bash
npm test
```

## API

### Users & auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users` | Create a user |
| `PUT` | `/api/users` | Update email/password (requires JWT) |
| `POST` | `/api/login` | Log in, returns an access token and a refresh token |
| `POST` | `/api/refresh` | Exchange a refresh token for a new access token |
| `POST` | `/api/revoke` | Revoke a refresh token |

### Chirps

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/chirps` | List chirps. Optional query params: `authorId`, `sort=asc\|desc` |
| `GET` | `/api/chirps/:chirpId` | Get a single chirp |
| `POST` | `/api/chirps` | Create a chirp (requires JWT, 140 character max) |
| `DELETE` | `/api/chirps/:chirpId` | Delete your own chirp (requires JWT) |

### Admin & system

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/healthz` | Health check |
| `GET` | `/admin/metrics` | File server hit count |
| `POST` | `/admin/reset` | Reset the database (only when `PLATFORM="dev"`) |
| `POST` | `/api/polka/webhooks` | Polka payment webhook (requires API key) |

### Example

```bash
# Create a user
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "walt@example.com", "password": "123456"}'

# Log in
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "walt@example.com", "password": "123456"}'

# Post a chirp
curl -X POST http://localhost:8080/api/chirps \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"body": "I am the one who knocks!"}'

# Get chirps, newest first
curl "http://localhost:8080/api/chirps?sort=desc"
```

## Tech stack

TypeScript · Node.js · Express 5 · PostgreSQL · Drizzle ORM · argon2 · jsonwebtoken · Vitest
