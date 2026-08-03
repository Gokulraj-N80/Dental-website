import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Appointment from './models/Appointment.js';

dotenv.config();

const seedDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dental_clinic';
  
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB.');

    // Seed Admin
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'adminpassword123';

    // Clear existing admins
    await Admin.deleteMany({});
    console.log('Cleared existing admin accounts.');

    const admin = new Admin({ username, password });
    await admin.save();
    console.log(`Admin account seeded successfully:`);
    console.log(`- Username: ${username}`);
    console.log(`- Password: ${password}`);

    // Seed some dummy appointments if none exist
    const count = await Appointment.countDocuments();
    if (count === 0) {
      console.log('Seeding demo appointments...');
      const services = [
        'Teeth Cleaning & Hygiene',
        'Invisalign & Orthodontics',
        'Dental Implants & Restorations',
        'Teeth Whitening & Aesthetics',
        'Root Canal Treatment',
        'Pediatric Dentistry'
      ];
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0,0,0,0);
      
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);
      dayAfter.setHours(0,0,0,0);

      const appointments = [
        {
          name: 'Sarah Connor',
          email: 'sarah@example.com',
          phone: '+1 (555) 019-2834',
          date: tomorrow,
          timeSlot: '09:00 AM - 10:00 AM',
          service: services[0],
          notes: 'Routine dental scaling and routine examination.',
          status: 'approved'
        },
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 012-3456',
          date: tomorrow,
          timeSlot: '11:00 AM - 12:00 PM',
          service: services[2],
          notes: 'Discuss options for a crown replacement.',
          status: 'pending'
        },
        {
          name: 'Arthur Dent',
          email: 'arthur.d@galaxy.org',
          phone: '+1 (555) 424-2424',
          date: dayAfter,
          timeSlot: '02:00 PM - 03:00 PM',
          service: services[4],
          notes: 'Experiencing sensitive pain on the lower-left molar.',
          status: 'pending'
        }
      ];

      await Appointment.insertMany(appointments);
      console.log('Demo appointments seeded.');
    }

    console.log('Seeding operation completed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();
