# Axiom Keeper Client

A fantasy football draft order generator that handles keeper leagues with automatic penalty calculations and snake draft
ordering.

## Features

- **Keeper League Management**: Support for up to 2 keepers per team with automatic penalty tracking
- **Snake Draft Generation**: Automatic draft order generation with alternating rounds
- **Penalty System**: Smart penalty calculation for drafted players (lose pick 2 rounds later)
- **Free Agent Handling**: Special treatment for undrafted players with late-round assignments
- **Export Options**: Copy to clipboard or download draft results as text
- **Real Data Integration**: Pre-loaded with 2025 league data and keeper selections

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **UI**: Tailwind CSS + Radix UI components
- **Deployment**: AWS Amplify integration
- **State Management**: React hooks with session storage
- **Styling**: Custom design system with dark/light mode support

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd axiom-keeper-client
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## How It Works

1. **Setup Phase**: Configure league settings (rounds 10-18) and team members
2. **Keeper Selection**: Add up to 2 keepers per team with original draft round info
3. **Penalty Calculation**: System automatically calculates where teams lose picks
4. **Draft Generation**: Creates complete snake draft order with keeper assignments
5. **Results Export**: View, copy, or download the final draft order

## Keeper Rules

The application implements standard keeper league rules:

- Maximum 2 keepers per team (optional)
- Cannot keep same player for more than 2 consecutive years
- **Drafted Players**: Keep in original round, lose pick 2 rounds later
- **Undrafted Players**: No penalty, assigned to rounds (n-1) and (n-2) where n = total rounds
- Snake draft format with alternating round order

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (buttons, cards, etc.)
│   ├── member-form.tsx   # Team member configuration
│   └── theme-provider.tsx # Dark/light mode handling
├── lib/                  # Core business logic
│   ├── keeper-rules.ts   # Keeper validation and penalty logic
│   ├── draft-logic.ts    # Draft order generation
│   └── api.ts           # API integration
├── types/               # TypeScript type definitions
└── data/               # Static data (2024 draft results, 2025 keepers)
```

## API Endpoints

- `GET /api/draft/players` - Fetch available players
- `POST /api/draft/generate` - Generate draft order with league configuration

## Deployment

The application is configured for AWS Amplify deployment with:

- Automatic builds on main branch
- Environment-based configuration
- Serverless API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
