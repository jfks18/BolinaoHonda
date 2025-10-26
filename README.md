# Honda Bolinao Service Management System

A comprehensive service management system built with Next.js and Express.js for Honda Bolinao dealership.

## Features

- **Frontend**: Next.js with TypeScript and Bootstrap
- **Backend**: Express.js server with CORS support
- **API Endpoints**: RESTful APIs for vehicles, services, and appointments
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Project Structure

```
honda_bolinao/
├── app/                    # Next.js app directory
├── server/                 # Express.js server
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── index.ts          # Server entry point
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To run both the Next.js client and Express server simultaneously:

```bash
npm run dev
```

This will start:
- Next.js client on http://localhost:3000
- Express server on http://localhost:5000

### Individual Services

Run only the client:
```bash
npm run dev:client
```

Run only the server:
```bash
npm run dev:server
```

## API Endpoints

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `POST /api/vehicles` - Create new vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Health Check
- `GET /health` - Server health status

## Technologies Used

- **Frontend**: Next.js 16, React 19, TypeScript, Bootstrap 5, Tailwind CSS
- **Backend**: Express.js, CORS, TypeScript
- **Development**: ts-node, concurrently, ESLint

## Environment Variables

Create a `.env.local` file in the root directory:

```env
CLIENT_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

## Building for Production

Build the Next.js client:
```bash
npm run build
```

Build the Express server:
```bash
npm run build:server
```

Start production servers:
```bash
npm run start        # Next.js
npm run start:server # Express server
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is private and proprietary to Honda Bolinao.
