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

## Deploying to Render.com

This project is ready to deploy to Render.com using the included `render.yaml` configuration.

### Prerequisites
1. A Render.com account
2. A MySQL database (can be provisioned on Render or use an external service)

### Deployment Steps

#### Option 1: Using Render Blueprint (Recommended)
1. Push your code to a GitHub repository
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect the `render.yaml` and create the services
6. Configure the environment variables (see below)
7. Deploy!

#### Option 2: Manual Service Creation
1. **Create the Database:**
   - Go to Render Dashboard → New → MySQL
   - Note down the connection details

2. **Create the API Service:**
   - Go to Render Dashboard → New → Web Service
   - Connect your repository
   - Build Command: `npm install && npm run build:server`
   - Start Command: `npm run start:server`
   - Add environment variables (see below)

3. **Create the Web Service:**
   - Go to Render Dashboard → New → Web Service
   - Connect your repository
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variables (see below)

### Required Environment Variables

For both services, configure these environment variables in Render:

```env
NODE_ENV=production
CLIENT_URL=https://your-web-service.onrender.com
DB_HOST=your-db-host.render.com
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=bolinaohonda
```

For the API service, set:
```env
PORT=5000
```

For the Web service, set:
```env
PORT=3000
```

### Database Setup

The application will automatically create the required tables on first connection. The schema includes:
- `customers` - Customer information
- `vehicles` - Vehicle records
- `services` - Service offerings
- `appointments` - Service appointments

### Important Notes

1. **CORS Configuration:** Update the `CLIENT_URL` environment variable to match your deployed frontend URL
2. **Free Tier Limitations:** Render's free tier spins down after inactivity. First request may take 30-60 seconds
3. **Database Migrations:** The app automatically creates tables on startup. No manual migration needed
4. **Health Checks:** Both services include health check endpoints (`/health` for API, `/` for web)

### Monitoring

- API Health Check: `https://your-api-service.onrender.com/health`
- Check Render logs for any startup or runtime errors
- Database connection status is logged on server startup

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is private and proprietary to Honda Bolinao.
