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
├── infra/              # Azure infrastructure as code
│   ├── main.bicep      # Main Bicep template
│   ├── parameters.json # Deployment parameters
│   ├── deploy.sh       # Deployment script
│   └── README.md       # Infrastructure documentation
├── package.json
└── README.md
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - CORS origin (default: *)

## Azure Deployment

This application can be deployed to Azure App Service. The infrastructure is defined using Azure Bicep templates in the `infra/` directory.

### Prerequisites for Azure Deployment

- Azure CLI installed and configured
- Azure subscription with appropriate permissions
- Resource group "new-app-copliot-demo" (will be created automatically)

### Deploy Infrastructure

```bash
# Deploy Azure App Service Plan and App Service
./infra/deploy.sh
```

See `infra/README.md` for detailed deployment instructions and configuration options.

## License

ISC
