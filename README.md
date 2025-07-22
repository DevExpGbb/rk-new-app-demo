# Canada Day Calculator - Node.js Application

A modern Node.js application that determines what day of the week Canada Day (July 1st) falls on for any year between 1600 and 3000. This application was converted from an AS400 COBOL program to provide modern accessibility through both web and command-line interfaces.

## Features

- **Canada Day Calculator**: Accurate day-of-week calculation for July 1st for any year (1600-3000)
- **Web Interface**: Interactive web application with real-time calculations
- **CLI Interface**: Command-line tool for both interactive and non-interactive usage
- **API Endpoints**: RESTful API for integration with other applications
- **Input Validation**: Robust validation with clear error messages
- **Fun Facts**: Contextual information about the calculated date (weekend/weekday, historical facts)
- **Express.js server**: Security middleware (Helmet), CORS support, request logging (Morgan)
- **Comprehensive Testing**: Jest test suite for core functionality

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

#### Web Application (Production Mode)
```bash
npm start
```
Visit http://localhost:3000 to use the interactive web interface.

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Command Line Interface
```bash
# Interactive mode
npm run cli

# Non-interactive mode (single calculation)
node cli.js 2024
```

## Usage Examples

### Web Interface
Visit `http://localhost:3000` for an interactive web application where you can:
- Enter any year between 1600-3000
- Get instant results with fun facts
- See whether Canada Day falls on a weekend or weekday
- View historical information for special years

### CLI Examples
```bash
# Interactive mode - guided prompts
npm run cli

# Quick calculation for a specific year
node cli.js 1867
# Output: 🎉 Canada Day 1867: Monday

# Error handling for invalid years
node cli.js 1500
# Output: ❌ Error: Year must be between 1600 and 3000 (inclusive).
```

### API Examples
```bash
# Get calculation for a specific year
curl http://localhost:3000/api/canada-day/2024

# Post request with year in body
curl -X POST http://localhost:3000/api/canada-day \
  -H "Content-Type: application/json" \
  -d '{"year": 2024}'

# Get API information
curl http://localhost:3000/api/canada-day
```

## API Endpoints

- `GET /` - Welcome message and application status
- `GET /health` - Health check endpoint
- `GET /api/canada-day` - API documentation and usage information
- `GET /api/canada-day/:year` - Calculate Canada Day for specific year
- `POST /api/canada-day` - Calculate Canada Day with year in request body

### API Response Format
```json
{
  "status": "success",
  "data": {
    "year": 2024,
    "date": "July 1, 2024",
    "dayName": "Monday",
    "dayNumber": 1,
    "isWeekend": false,
    "isWeekday": true,
    "funFact": "Canada Day 2024 falls on a Monday, a weekday. Many Canadians will have a statutory holiday. A Monday Canada Day means the weekend celebration can extend into the statutory holiday!"
  },
  "timestamp": "2025-07-22T05:12:22.193Z"
}
```

## Testing

Run the test suite:
```bash
npm test

# Watch mode for development
npm run test:watch
```

The test suite includes:
- Input validation tests
- Calculation accuracy tests
- Cross-validation with JavaScript Date object
- Fun fact generation tests
- Edge case handling

## Project Structure

```
├── src/
│   ├── app.js              # Main Express application
│   ├── config/             # Configuration files
│   │   └── index.js
│   ├── routes/             # Route definitions
│   │   ├── index.js        # Main routes
│   │   └── canada-day.js   # Canada Day calculator routes
│   └── utils/              # Utility functions
│       └── date-calculator.js  # Core calculation logic
├── public/                 # Static files (web interface)
│   └── index.html          # Interactive web application
├── tests/                  # Test files
│   └── date-calculator.test.js # Core functionality tests
├── infra/                  # Azure infrastructure as code
│   ├── main.bicep          # Main Bicep template
│   ├── parameters.json     # Deployment parameters
│   ├── deploy.sh           # Deployment script
│   └── README.md           # Infrastructure documentation
├── cli.js                  # Command-line interface
├── package.json
└── README.md
```

## Technical Details

### Algorithm
The application uses JavaScript's native `Date` object for accurate day-of-week calculations. This provides reliable results for the entire supported range (1600-3000) and ensures consistency with modern date standards.

### Input Validation
- Years must be integers between 1600 and 3000 (inclusive)
- Clear error messages guide users to valid input ranges
- Handles both string and numeric input gracefully

### Fun Facts Generation
The application provides contextual information including:
- Weekend vs. weekday classification
- Special historical facts for significant years (1867 - Confederation, 2017 - 150th anniversary)
- Day-specific celebration tips
- Milestone year recognition (century years, quarter-century years)

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

## Original COBOL Conversion

This Node.js application is a modern conversion of the AS400 COBOL program "Canada Day Calculator" (CANDAY01.CBLLE). The conversion provides:

- **Enhanced Accessibility**: Web and CLI interfaces vs. terminal-only access
- **Modern Integration**: RESTful API for easy integration with other systems
- **Improved Usability**: Interactive interfaces with real-time validation
- **Better Maintainability**: Modern JavaScript codebase with comprehensive testing
- **Extensibility**: Modular design allows for easy addition of new features

### Key Improvements Over COBOL Version
- Multi-interface support (Web, CLI, API)
- Real-time input validation with helpful error messages
- Rich contextual information and fun facts
- Cross-platform compatibility
- Modern deployment options (cloud-ready)
- Comprehensive test coverage

## License

ISC
