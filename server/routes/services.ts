import { Router, Request, Response } from 'express';
import { Service, ServiceCreateRequest, ServiceUpdateRequest } from '../../types/service';
import { ServiceModel } from '../models/Service';

const router = Router();

// GET /api/services - Get all services
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const services = await ServiceModel.findAll(category as string);
    
    res.json({
      success: true,
      data: services,
      count: services.length
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services'
    });
  }
});

// GET /api/services/:id - Get service by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await ServiceModel.findById(id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service'
    });
  }
});

// POST /api/services - Create new service
router.post('/', async (req: Request<{}, {}, ServiceCreateRequest>, res: Response) => {
  try {
    const { name, description, price, duration, category } = req.body;
    
    // Basic validation
    if (!name || !price || !duration || !category) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const newService = await ServiceModel.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newService
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create service'
    });
  }
});

// PUT /api/services/:id - Update service
router.put('/:id', async (req: Request<{ id: string }, {}, ServiceUpdateRequest>, res: Response) => {
  try {
    const { id } = req.params;
    const updatedService = await ServiceModel.update(id, req.body);
    
    if (!updatedService) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedService
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update service'
    });
  }
});

// DELETE /api/services/:id - Delete service
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await ServiceModel.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete service'
    });
  }
});

export { router as servicesRouter };