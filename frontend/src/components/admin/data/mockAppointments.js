import { PATIENTS } from './mockPatients';
import { DOCTORS } from './mockDoctors';

const STATUSES = ['Pending','Confirmed','Checked In','In Consultation','Treatment Started','Completed','Cancelled','No Show','Rescheduled'];
const PAY_STATUSES = ['Paid','Pending','Partial','Waived'];
const SOURCES = ['Website','Phone','Walk-in','WhatsApp','Referral'];
const TIMES = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30'];
const TREATMENTS = [
  'Dental Cleaning','Teeth Whitening','Root Canal','Dental Filling','Tooth Extraction',
  'Dental Implant','Braces','Veneers','Crowns','Smile Makeover',
  'Gum Treatment','Pediatric Dentistry','Orthodontics','Wisdom Tooth Removal','Fluoride Treatment',
  'Dental Bonding','Night Guard','Scaling & Polishing','Oral Cancer Screening','Inlays & Onlays'
];
const NOTES = [
  'Patient requested morning slot',
  'First time visit',
  'Follow-up from previous root canal',
  'Referred by Dr. Neemz',
  'Patient has dental anxiety',
  'Insurance pre-authorization required',
  'Post-surgery checkup',
  'Emergency case – walk in',
  'Corporate health camp patient',
  'Senior citizen – assistance required',
  '','','',''
];

function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rndInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

function fmtDate(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

let apptCounter = 1;

function makeAppt(patient, daysOffset, status) {
  const doctor = DOCTORS.find(d => d.id === patient.assignedDoctorId) || DOCTORS[rndInt(0,7)];
  const apptStatus = status || rnd(STATUSES);
  const payStatus = apptStatus === 'Completed' ? rnd(['Paid','Partial']) : apptStatus === 'Cancelled' ? rnd(['Waived','Pending']) : rnd(PAY_STATUSES);
  const fee = rndInt(800, 15000);
  const id = `APT-${String(apptCounter).padStart(5,'0')}`;
  apptCounter++;
  return {
    id,
    patientId: patient.id,
    patientName: patient.name,
    patientInitials: patient.initials,
    avatarColor: patient.avatarColor,
    age: patient.age,
    gender: patient.gender,
    phone: patient.phone,
    email: patient.email,
    treatment: patient.treatment,
    doctor: doctor.name,
    doctorId: doctor.id,
    date: fmtDate(daysOffset),
    time: rnd(TIMES),
    source: rnd(SOURCES),
    status: apptStatus,
    paymentStatus: payStatus,
    fee,
    notes: rnd(NOTES),
    createdAt: fmtDate(daysOffset - rndInt(1, 5)),
    isNew: daysOffset >= -1 && daysOffset <= 0,
  };
}

const appointments = [];

// Today's appointments (8)
for (let i = 0; i < 8; i++) {
  appointments.push(makeAppt(PATIENTS[i % PATIENTS.length], 0, rnd(['Pending','Confirmed','Checked In','In Consultation','Completed'])));
}
// Tomorrow (5)
for (let i = 8; i < 13; i++) {
  appointments.push(makeAppt(PATIENTS[i % PATIENTS.length], 1, rnd(['Confirmed','Pending'])));
}
// Next 7 days (7)
for (let i = 13; i < 20; i++) {
  const day = rndInt(2, 7);
  appointments.push(makeAppt(PATIENTS[i % PATIENTS.length], day, rnd(['Confirmed','Pending'])));
}
// Past 30 days (20)
for (let i = 20; i < 40; i++) {
  const day = -rndInt(1, 30);
  appointments.push(makeAppt(PATIENTS[i % PATIENTS.length], day, rnd(['Completed','Completed','Cancelled','No Show'])));
}

export const APPOINTMENTS = appointments;

export const getTodaysAppointments = () => {
  const today = new Date().toISOString().split('T')[0];
  return APPOINTMENTS.filter(a => a.date === today);
};

export const getUpcomingAppointments = () => {
  const today = new Date().toISOString().split('T')[0];
  return APPOINTMENTS.filter(a => a.date > today).sort((a,b) => a.date.localeCompare(b.date));
};
