import express from 'express';
import jwt from 'jsonwebtoken';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// Middleware to authenticate Admin JWT
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dental_clinic_secret_key_2026');
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// @route   POST api/appointments
// @desc    Create a new appointment (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, timeSlot, service, notes } = req.body;

    if (!name || !phone || !date || !timeSlot || !service) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Check if appointment already exists for this slot on this day
    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(parsedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const existingAppointment = await Appointment.findOne({
      date: {
        $gte: parsedDate,
        $lt: nextDay
      },
      timeSlot,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'This time slot is already booked. Please select another slot.' });
    }

    const appointment = new Appointment({
      name,
      email,
      phone,
      date: parsedDate,
      timeSlot,
      service,
      notes
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully!', appointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server error during booking' });
  }
});

// @route   GET api/appointments
// @desc    Get all appointments (Admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { service: { $regex: search, $options: 'i' } }
      ];
    }

    const appointments = await Appointment.find(query).sort({ date: 1, timeSlot: 1 });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error fetching appointments' });
  }
});

// @route   PUT api/appointments/:id
// @desc    Update appointment status (Admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: `Appointment status updated to ${status}`, appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Server error updating appointment' });
  }
});

// @route   DELETE api/appointments/:id
// @desc    Delete appointment record (Admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Server error deleting appointment' });
  }
});

export default router;
