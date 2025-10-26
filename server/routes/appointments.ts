import { Router, Request, Response } from 'express';
import { Appointment, AppointmentCreateRequest, AppointmentUpdateRequest } from '../../types/appointment';
import { AppointmentModel } from '../models/Appointment';

const router = Router();

// GET /api/appointments - Get all appointments
router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, vehicleId, customerId } = req.query;
    
    const filters = {
      status: status as string,
      vehicleId: vehicleId as string,
      customerId: customerId as string
    };
    
    const appointments = await AppointmentModel.findAll(filters);
    
    res.json({
      success: true,
      data: appointments,
      count: appointments.length
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointments'
    });
  }
});

// GET /api/appointments/:id - Get appointment by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await AppointmentModel.findById(id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    
    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointment'
    });
  }
});

// POST /api/appointments - Create new appointment
router.post('/', async (req: Request<{}, {}, AppointmentCreateRequest>, res: Response) => {
  try {
    const { vehicleId, serviceId, customerId, scheduledDate, notes } = req.body;
    
    // Basic validation
    if (!vehicleId || !serviceId || !customerId || !scheduledDate) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const newAppointment = await AppointmentModel.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newAppointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create appointment'
    });
  }
});

// PUT /api/appointments/:id - Update appointment
router.put('/:id', async (req: Request<{ id: string }, {}, AppointmentUpdateRequest>, res: Response) => {
  try {
    const { id } = req.params;
    const updatedAppointment = await AppointmentModel.update(id, req.body);
    
    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedAppointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update appointment'
    });
  }
});

// DELETE /api/appointments/:id - Delete appointment
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await AppointmentModel.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete appointment'
    });
  }
});

export { router as appointmentsRouter };