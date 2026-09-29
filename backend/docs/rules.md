<!-- basic example of md -->

# Rules

Follow these rules for all code in this project (Next.js + Express + TypeScript).

## General

- Use TypeScript strict mode. Do not use `any`; use proper types or `unknown`.
- Keep functions small and single-purpose.
- Match the style of the surrounding code.
- Do not add new dependencies without asking first.
- Do not leave `console.log`, commented-out code, or unused imports.
- Only change what the task requires.

## Naming

| Thing | Style | Example |
|---|---|---|
| Files (general) | kebab-case | `user-service.ts` |
| React components | PascalCase | `UserCard.tsx` |
| Variables / functions | camelCase | `getUserById` |
| Types / interfaces | PascalCase | `UserProfile` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Env variables | UPPER_SNAKE_CASE | `DATABASE_URL` |

## Frontend (Next.js)

- Use Server Components by default. Add `"use client"` only when needed (state, effects, browser APIs).
- Keep pages thin. Put reusable UI in `components/`.
- Reuse existing components before creating new ones.
- Fetch data through the shared API client in `lib/`, not raw `fetch` scattered in components.
- Handle loading, error, and empty states for every data-driven view.
- Use [Tailwind / CSS modules] for styling. No inline styles unless dynamic.
- Use `next/image` and `next/link` instead of `<img>` and `<a>` for internal content.

## Backend (Express)

- Follow the layers: **route → controller → service**.
  - Routes: define endpoints only.
  - Controllers: read the request, call a service, send the response.
  - Services: hold business logic and database access.
- Validate all incoming data (body, params, query) with [Zod / Joi] before using it.
- Use `async/await` and pass errors to the central error handler. No silent `catch`.
- Use correct HTTP status codes (200, 201, 400, 401, 403, 404, 500).
- Return a consistent response shape:

```json
{ "success": true, "data": {} }
{ "success": false, "error": { "message": "Something went wrong", "code": "ERROR_CODE" } }
```

## Security

- Never commit or log secrets, tokens, or passwords.
- Never trust client input. Validate and sanitize it.
- Protect private routes with auth middleware.
- Do not expose stack traces or internal errors to clients.

## Error Handling

- Throw meaningful errors with clear messages.
- Log errors on the server with useful context.
- Show friendly messages to users, never raw error text.

## Testing

- Add or update tests for new logic and bug fixes.
- Tests live in `[__tests__ / next to the file]`.
- Do not change existing tests just to make them pass; fix the code.

## Do Not Touch

- `.env` files and secrets
- `node_modules/`, `.next/`, `dist/`
- Lock files (unless installing a dependency)
- Database migrations already committed
- Auto-generated files

## Before Finishing a Task

1. Run lint and type check.
2. Run relevant tests.
3. Make sure the app still builds.
4. Summarize your changes.