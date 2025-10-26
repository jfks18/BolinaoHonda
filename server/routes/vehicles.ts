import { Router, Request, Response } from 'express';
import { Vehicle, VehicleCreateRequest, VehicleUpdateRequest } from '../../types/vehicle';
import { VehicleModel } from '../models/Vehicle';

const router = Router();

// GET /api/vehicles - Get all vehicles
router.get('/', async (req: Request, res: Response) => {
  try {
    const vehicles = await VehicleModel.findAll();
    res.json({
      success: true,
      data: vehicles,
      count: vehicles.length
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch vehicles'
    });
  }
});

// GET /api/vehicles/:id - Get vehicle by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await VehicleModel.findById(id);
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }
    
    res.json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch vehicle'
    });
  }
});

// POST /api/vehicles - Create new vehicle
router.post('/', async (req: Request<{}, {}, VehicleCreateRequest>, res: Response) => {
  try {
    const { make, model, year, vin, licensePlate, ownerId } = req.body;
    
    // Basic validation
    if (!make || !model || !year || !vin || !licensePlate || !ownerId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const newVehicle = await VehicleModel.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newVehicle
    });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create vehicle'
    });
  }
});

// PUT /api/vehicles/:id - Update vehicle
router.put('/:id', async (req: Request<{ id: string }, {}, VehicleUpdateRequest>, res: Response) => {
  try {
    const { id } = req.params;
    const updatedVehicle = await VehicleModel.update(id, req.body);
    
    if (!updatedVehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedVehicle
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update vehicle'
    });
  }
});

// DELETE /api/vehicles/:id - Delete vehicle
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await VehicleModel.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete vehicle'
    });
  }
});

export { router as vehiclesRouter };