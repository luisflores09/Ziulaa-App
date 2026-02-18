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
