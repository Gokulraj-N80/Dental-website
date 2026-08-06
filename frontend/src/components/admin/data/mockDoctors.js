// ─── 3 Doctors ────────────────────────────────────────────────────────────────
export const DOCTORS = [
  {
    id: 'DOC-001', name: 'Dr. Neemz Williams', initials: 'NW', color: '#10b981',
    qualification: 'BDS, MDS – Oral & Maxillofacial Surgery',
    specialization: 'Principal Dentist & Oral Surgeon',
    experience: 15, consultationFee: 800,
    phone: '+91 98400 11001', email: 'neemz@drneemz.com',
    workingDays: ['Mon','Tue','Wed','Thu','Fri','Sat'],
    timeSlots: ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'],
    totalPatients: 1240, completedTreatments: 3820, currentAppointments: 8, rating: 4.9,
    bio: 'Principal dentist with 15 years of experience in oral surgery and full-mouth reconstructions.',
    languages: ['English','Tamil','Hindi'],
  },
  {
    id: 'DOC-002', name: 'Dr. Priya Sharma', initials: 'PS', color: '#8b5cf6',
    qualification: 'BDS, MDS – Orthodontics',
    specialization: 'Orthodontist & Smile Designer',
    experience: 10, consultationFee: 600,
    phone: '+91 98400 22002', email: 'priya.sharma@drneemz.com',
    workingDays: ['Mon','Wed','Thu','Fri','Sat'],
    timeSlots: ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'],
    totalPatients: 890, completedTreatments: 2140, currentAppointments: 6, rating: 4.8,
    bio: 'Specialist in invisible aligners, braces and smile makeovers with over 2000 successful cases.',
    languages: ['English','Hindi','Punjabi'],
  },
  {
    id: 'DOC-003', name: 'Dr. Arjun Mehta', initials: 'AM', color: '#3b82f6',
    qualification: 'BDS, MDS – Implantology',
    specialization: 'Implant & Restorative Specialist',
    experience: 12, consultationFee: 700,
    phone: '+91 98400 33003', email: 'arjun.mehta@drneemz.com',
    workingDays: ['Tue','Wed','Thu','Fri','Sat'],
    timeSlots: ['10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'],
    totalPatients: 760, completedTreatments: 1980, currentAppointments: 5, rating: 4.9,
    bio: 'Expert in dental implants, full-arch restorations and bone grafting procedures.',
    languages: ['English','Hindi','Gujarati'],
  },
];

export const getDoctorById = (id) => DOCTORS.find(d => d.id === id) || DOCTORS[0];
export const getDoctorByName = (name) => DOCTORS.find(d => d.name === name) || DOCTORS[0];
