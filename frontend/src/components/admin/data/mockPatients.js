import { DOCTORS } from './mockDoctors';

const FIRST = ['Arjun','Priya','Rahul','Ananya','Suresh','Deepa','Kavitha','Vikram','Meera','Ravi',
  'Sita','Kumar','Divya','Arun','Nisha','Rajesh','Sunita','Ganesh','Pooja','Karthik',
  'Lakshmi','Mohan','Saritha','Vijay','Sowmya','Murugan','Bhavana','Sanjay','Rekha','Dinesh',
  'Padma','Ashok','Malathi','Ramesh','Usha','Prakash','Geetha','Venkat','Saranya','Balamurugan',
  'Mythili','Selvam','Kamala','Thirumaran','Radha','Senthil','Vasantha','Kannan','Hema','Mani',
  'Jayanthi','Chitra','Parthasarathy','Vimala','Saravanan','Nalini','Muthu','Revathi','Pandian','Ambika',
  'Thangam','Durai','Indira','Balaji','Yazhini','Gopal','Suganya','Shankar','Anuradha','Prabhu',
  'Shanthi','Siva','Kalaiselvi','Kathirvel','Vijayalakshmi','Nithyanandam','Palanivel','Renuka','Kumaran','Rajeswari',
  'Srinivasan','Vanitha','Hariharan','Kousalya','Periyasamy','Subha','Logesh','Amudha','Tamilarasan','Pushpa'];

const LAST = ['Kumar','Sharma','Patel','Iyer','Nair','Reddy','Singh','Gupta','Mehta','Joshi',
  'Rao','Krishnan','Pillai','Menon','Verma','Agarwal','Bose','Das','Sinha','Pandey',
  'Shetty','Hegde','Naidu','Rajan','Subramanian','Venkataraman','Murthy','Swaminathan','Annamalai','Krishnaswamy',
  'Balakrishnan','Sundaram','Natarajan','Venkatesan','Ramasamy','Murugesan','Perumal','Palani','Arumugam','Dhandapani'];

const TREATMENTS = [
  'Dental Cleaning','Teeth Whitening','Root Canal','Dental Filling','Tooth Extraction',
  'Dental Implant','Braces','Veneers','Crowns','Smile Makeover',
  'Gum Treatment','Pediatric Dentistry','Orthodontics','Wisdom Tooth Removal','Fluoride Treatment',
  'Dental Bonding','Night Guard','Teeth Straightening','Oral Cancer Screening','Scaling & Polishing'
];

const BLOOD_GROUPS = ['A+','A-','B+','B-','O+','O-','AB+','AB-'];
const CITIES = ['Chennai','Coimbatore','Madurai','Salem','Tiruchirappalli','Tirunelveli','Erode','Vellore','Thoothukudi','Dindigul'];
const CONDITIONS = ['None','Diabetes','Hypertension','Thyroid','Asthma','Heart Disease','Arthritis','None','None','None'];
const ALLERGIES = ['None','Penicillin','Latex','Aspirin','Sulfa drugs','None','None','Codeine','None','None'];
const MEDICATIONS = ['None','Metformin','Atenolol','Thyroxine','Salbutamol','Aspirin','None','Ibuprofen','None','None'];
const OCCUPATIONS = ['Software Engineer','Teacher','Business Owner','Homemaker','Doctor','Student','Lawyer','Accountant','Nurse','Engineer',
  'Government Employee','Retired','Farmer','Shopkeeper','Driver','Police Officer','Bank Manager','Architect','Journalist','Pharmacist'];
const INSURANCES = ['Star Health','HDFC Ergo','National Insurance','New India Assurance','United India Insurance','No Insurance','Oriental Insurance','Bajaj Allianz'];
const STATUSES = ['Active','Active','Active','Active','Active','Active','Inactive','New'];

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generatePhone() {
  const prefixes = ['98400','97890','96770','94440','91760','87540','86780','63820','79040','73050'];
  return `+91 ${randomFrom(prefixes)} ${String(randomInt(10000,99999))}`;
}

function generateDOB(minAge, maxAge) {
  const age = randomInt(minAge, maxAge);
  const year = 2024 - age;
  const month = String(randomInt(1,12)).padStart(2,'0');
  const day = String(randomInt(1,28)).padStart(2,'0');
  return `${year}-${month}-${day}`;
}

function generateDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function generateFutureDate(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

const AVATAR_COLORS = ['#6366f1','#8b5cf6','#ec4899','#f43f5e','#f97316','#eab308','#10b981','#06b6d4','#3b82f6','#0ea5e9','#14b8a6','#84cc16'];

let patientCounter = 1;
const usedNames = new Set();

function generatePatient() {
  let fname, lname, fullName;
  do {
    fname = FIRST[Math.floor(Math.random() * FIRST.length)];
    lname = LAST[Math.floor(Math.random() * LAST.length)];
    fullName = `${fname} ${lname}`;
  } while (usedNames.has(fullName) && usedNames.size < FIRST.length * LAST.length);
  usedNames.add(fullName);

  const gender = Math.random() > 0.5 ? 'Male' : 'Female';
  const dob = generateDOB(5, 75);
  const age = 2024 - parseInt(dob.split('-')[0]);
  const doctorIndex = randomInt(0, DOCTORS.length - 1);
  const doctor = DOCTORS[doctorIndex];
  const treatment = randomFrom(TREATMENTS);
  const city = randomFrom(CITIES);
  const registrationDaysAgo = randomInt(1, 730);
  const lastVisitDaysAgo = randomInt(1, Math.min(registrationDaysAgo, 365));
  const nextVisitDaysAhead = randomInt(1, 90);
  const totalBills = randomInt(1000, 85000);
  const paidAmount = randomInt(500, totalBills);
  const pending = totalBills - paidAmount;
  const avatarColor = AVATAR_COLORS[(patientCounter - 1) % AVATAR_COLORS.length];
  const id = `PAT-${String(patientCounter).padStart(4,'0')}`;
  patientCounter++;

  return {
    id,
    name: fullName,
    initials: `${fname[0]}${lname[0]}`,
    avatarColor,
    gender,
    age,
    dob,
    bloodGroup: randomFrom(BLOOD_GROUPS),
    phone: generatePhone(),
    email: `${fname.toLowerCase()}.${lname.toLowerCase()}@gmail.com`,
    address: `${randomInt(1,200)}, ${randomFrom(['Anna Nagar','T. Nagar','Adyar','Velachery','Porur','Tambaram','Kodambakkam','Mylapore','Nungambakkam','Perambur'])} Street, ${city} - ${randomInt(600001,643001)}`,
    city,
    occupation: randomFrom(OCCUPATIONS),
    insurance: randomFrom(INSURANCES),
    emergencyContact: `+91 ${randomInt(6,9)}${String(randomInt(100000000,999999999))}`,
    registrationDate: generateDate(registrationDaysAgo),
    lastVisit: generateDate(lastVisitDaysAgo),
    nextAppointment: generateFutureDate(nextVisitDaysAhead),
    assignedDoctor: doctor.name,
    assignedDoctorId: doctor.id,
    treatment,
    status: randomFrom(STATUSES),
    // Medical
    medicalHistory: randomFrom(['Hypertension (controlled)','Diabetes Type 2','No significant history','Thyroid disorder','Asthma (mild)','Previous cardiac surgery','None reported','Epilepsy (controlled)']),
    allergies: randomFrom(ALLERGIES),
    medications: randomFrom(MEDICATIONS),
    existingConditions: randomFrom(CONDITIONS),
    dentalProblems: randomFrom(['Cavities','Gum disease','Missing teeth','Misalignment','Sensitivity','Tooth decay','Cracked tooth','None reported']),
    clinicalNotes: randomFrom([
      'Patient reports occasional sensitivity to cold beverages.',
      'Mild plaque buildup observed. Advised improved brushing technique.',
      'Post-operative healing progressing well.',
      'Patient anxious during procedures. Recommended sedation dentistry.',
      'Regular maintenance check. No active issues found.',
      'Referred for specialist consultation regarding implant feasibility.',
      'Follow-up required in 3 months for crown review.',
      'Patient reports grinding at night. Night guard prescribed.',
    ]),
    prescriptions: randomFrom(['Ibuprofen 400mg (3 days)','Amoxicillin 500mg (5 days)','Metronidazole 400mg (5 days)','Paracetamol 500mg (SOS)','None','Chlorhexidine mouthwash']),
    // Billing
    totalBills,
    paidAmount,
    pendingAmount: Math.max(0, pending),
    paymentStatus: pending <= 0 ? 'Paid' : pending < totalBills * 0.3 ? 'Partial' : 'Pending',
    // Visit history
    previousTreatments: [
      randomFrom(TREATMENTS),
      randomFrom(TREATMENTS),
    ].filter((v,i,a) => a.indexOf(v) === i),
  };
}

// Generate 20 patients
export const PATIENTS = Array.from({ length: 20 }, generatePatient);

export const getPatientById = (id) => PATIENTS.find(p => p.id === id);
