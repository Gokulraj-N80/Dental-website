import { PATIENTS } from './mockPatients';
import { DOCTORS } from './mockDoctors';

const REVIEW_TEXTS = [
  "Absolutely outstanding experience! The team is warm, professional, and incredibly skilled. My smile has never looked better.",
  "I was terrified of dentists but Dr. Neemz made me feel completely at ease. Painless root canal – I could not believe it!",
  "Best dental clinic in the city. State-of-the-art equipment and spotless hygiene. Highly recommended.",
  "My child loved the visit! Dr. Ananya is so gentle and friendly with kids. No more dental anxiety for us.",
  "The implant procedure was explained step by step. Dr. Arjun is a true expert. Very happy with the results.",
  "Clean, modern clinic with experienced staff. Waiting time was minimal and the treatment was superb.",
  "Amazing smile makeover by Dr. Rahul! I get compliments every day. Worth every rupee.",
  "Professional and caring staff. The entire team goes above and beyond to ensure patient comfort.",
  "My braces treatment with Dr. Priya is going great. Clear communication at every stage. Very satisfied.",
  "Had scaling done by Dr. Kavitha. Quick, painless and my teeth feel brand new. Will definitely return.",
  "Emergency treatment was handled with utmost care and urgency. Saved my tooth on the same day!",
  "Transparent pricing with no hidden costs. That's rare and refreshing in healthcare. Great clinic.",
  "The digital X-ray system is impressive. Results are instant and treatment planning was thorough.",
  "Been coming here for 3 years now. Consistent quality and the doctors remember my medical history.",
  "Very hygienic, well-maintained clinic. Every instrument appeared sterilized and fresh. Trust established.",
  "Dr. Deepa explained every step of my root canal. Zero pain during the procedure. Truly remarkable.",
  "Appointment booking was easy, no long waits, and the treatment was completed in one visit. 10/10.",
  "My gum treatment results are incredible. Dr. Kavitha's expertise is evident from day one.",
  "Professional, efficient and genuinely caring. This is the gold standard for dental care in Chennai.",
  "Had veneer consultation with Dr. Rahul. Very honest advice, no upselling. Appreciated that deeply.",
];

const TREATMENTS_LIST = ['Dental Cleaning','Root Canal','Dental Implant','Braces','Veneers','Teeth Whitening','Gum Treatment','Pediatric Dentistry','Smile Makeover','Scaling & Polishing'];

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export const REVIEWS = PATIENTS.slice(0, 30).map((patient, i) => {
  const doctor = DOCTORS[i % DOCTORS.length];
  return {
    id: `REV-${String(i+1).padStart(3,'0')}`,
    patientId: patient.id,
    patientName: patient.name,
    patientInitials: patient.initials,
    avatarColor: patient.avatarColor,
    rating: i < 20 ? 5 : i < 26 ? 4 : 3,
    text: REVIEW_TEXTS[i % REVIEW_TEXTS.length],
    treatment: TREATMENTS_LIST[i % TREATMENTS_LIST.length],
    doctor: doctor.name,
    visitDate: daysAgo(i * 4 + 2),
    reviewDate: daysAgo(i * 4),
    platform: i % 3 === 0 ? 'Google' : i % 3 === 1 ? 'Website' : 'Direct',
    replied: i % 3 !== 0,
    reply: i % 3 !== 0 ? 'Thank you for your kind words! We look forward to seeing you again at DrNeemz Dentistry.' : '',
    status: 'Published',
  };
});
