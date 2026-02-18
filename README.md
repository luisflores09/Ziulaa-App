# Price Scout (Ziulaa App)

Price Scout is a grocery pricing front-end built with Angular + Angular Material.

It ships with:
- A custom Peach/White Angular Material theme applied globally
- A responsive top navigation bar (Home / Search / About)
- A Home screen with a hero section, centered search bar, and a responsive grid of featured item cards
- A reusable full-screen Item Detail dialog (MatDialog) opened when a card is clicked

## Tech Stack

- Angular (standalone) + Angular Router
- Angular Material + CDK
- SCSS theming

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install

```bash
npm install
```

### Run (dev)

```bash
npm start
```

Open `http://localhost:4200/`.

### Test

```bash
npm test
```

### Build

```bash
npm run build
```

## UI Overview

### Top Navigation

The toolbar uses Angular Material `mat-toolbar` and collapses to a menu on mobile.

### Home

- Hero: “Welcome to Price Scout!” + subtitle
- Search: `mat-form-field` + input + search icon button
	- Enter or clicking the icon triggers `searchItems()`
- Featured items: responsive card grid using `mat-card`
	- Clicking a card opens the Item dialog

### Item Detail Dialog

Opened via `MatDialog` and sized to ~90% of the viewport.
- Large image
- Item name, full description, pricing
- Close button

## Theme

Global Angular Material theme lives in:
- [src/styles/_material-theme.scss](src/styles/_material-theme.scss)

It is applied globally via:
- [src/styles.scss](src/styles.scss)

The theme defines:
- Peach as the primary color
- White background
- Soft gray/light peach accents for surfaces and dividers

## Project Structure (key files)

- App shell + toolbar: [src/app/app.component.html](src/app/app.component.html)
- Routes: [src/app/app.routes.ts](src/app/app.routes.ts)
- Routing module (forRoot): [src/app/app-routing.module.ts](src/app/app-routing.module.ts)
- Material module (imports/exports): [src/app/material/material.module.ts](src/app/material/material.module.ts)
- Home component: [src/app/home/home.component.ts](src/app/home/home.component.ts)
- Item dialog component: [src/app/item-dialog/item-dialog.component.ts](src/app/item-dialog/item-dialog.component.ts)
- Mock data/service: [src/app/services/item.service.ts](src/app/services/item.service.ts)
- Item model: [src/app/models/item.ts](src/app/models/item.ts)

## Notes

- The `Search` and `About` links currently route to the Home screen (UI is in place; routes exist). If you want separate pages, add minimal standalone components and update [src/app/app.routes.ts](src/app/app.routes.ts).

## RapidAPI + Secrets (S3-friendly)

Because this is an Angular SPA hosted on S3, you **cannot** safely keep secrets (like `X-RapidAPI-Key`) in the front-end. Any value shipped to the browser can be extracted.

### Recommended Architecture

- S3 + CloudFront hosts the Angular app
- API Gateway + Lambda provides a backend endpoint (`/api/search?q=...`)
- Lambda calls RapidAPI and keeps the RapidAPI key **server-side**
- Store the RapidAPI key/host server-side (best: Parameter Store/Secrets Manager; cheapest/simplest: Lambda env vars)

### Backend Proxy (SAM)

This repo includes a minimal proxy Lambda:
- Lambda handler: [backend/lambda/rapidapi-proxy/index.mjs](backend/lambda/rapidapi-proxy/index.mjs)
- SAM template: [template.yaml](template.yaml)

#### Manual ($0-friendly) secrets approach

If your goal is to stay at $0 and keep things simple, you can set the RapidAPI key/host as **Lambda environment variables**.

Important: environment variables are still **not public to the browser**, but anyone with AWS access to the Lambda can view them.

#### 1) Deploy the API (SAM)

Install AWS SAM CLI, then:

```bash
sam build
sam deploy --guided
```

During deployment (or after), set these Lambda environment variables:
- `RAPIDAPI_SEARCH_URL` (non-secret; the RapidAPI endpoint URL)
- `RAPIDAPI_KEY` (secret)
- `RAPIDAPI_HOST` (often required by RapidAPI providers)

#### 2) Configure the Angular app to use the proxy

Client config (safe to commit):
- [src/environments/environment.ts](src/environments/environment.ts)

If you are proxying `/api/*` through CloudFront to API Gateway, you can keep `baseUrl` empty and use the default `searchPath: '/api/search'`.

If API Gateway is on a separate domain, set `baseUrl` to your API endpoint (e.g., the `ApiUrl` output from SAM).

### Alternative: Lambda Function URL (no API Gateway)

You can also enable a **Lambda Function URL** (Auth type: NONE) and call it directly from the Angular app.

In that case:
- Set `environment.api.baseUrl` to the Function URL (no trailing slash)
- Set `environment.api.searchPath` to an empty string (`''`)
