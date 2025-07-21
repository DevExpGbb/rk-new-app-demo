# Node.js Express.js Application

A simple Express.js application with basic middleware and routing setup.

## Features

- Express.js server
- Security middleware (Helmet)
- CORS support
- Request logging (Morgan)
- JSON and URL-encoded body parsing
- Basic error handling
- Health check endpoint
- Sample API routes

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api/users` - Get all users (sample data)
- `POST /api/users` - Create a new user

## Project Structure

```
├── src/
│   ├── app.js          # Main application file
│   ├── config/         # Configuration files
│   │   └── index.js
│   └── routes/         # Route definitions
│       └── index.js
├── package.json
└── README.md
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - CORS origin (default: *)

## License

ISC
