import { Router } from 'express';
import { vehiclesRouter } from './vehicles';
import { servicesRouter } from './services';
import { appointmentsRouter } from './appointments';

const router = Router();

// Mount sub-routers
router.use('/vehicles', vehiclesRouter);
router.use('/services', servicesRouter);
router.use('/appointments', appointmentsRouter);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    name: 'Honda Bolinao API',
    version: '1.0.0',
    endpoints: {
      vehicles: '/api/vehicles',
      services: '/api/services',
      appointments: '/api/appointments'
    }
  });
});

export { router as apiRoutes };