import { APPOINTMENTS } from './mockAppointments';
import { PATIENTS } from './mockPatients';

const PAY_METHODS = ['Cash','UPI','Credit Card','Debit Card','Insurance','Net Banking'];

let invCounter = 1;

export const INVOICES = APPOINTMENTS
  .filter(a => a.status === 'Completed' || a.status === 'Checked In')
  .slice(0, 120)
  .map(appt => {
    const patient = PATIENTS.find(p => p.id === appt.patientId) || PATIENTS[0];
    const consultFee = Math.floor(Math.random() * 400) + 400;
    const treatCost = appt.fee;
    const addlCharges = Math.random() > 0.7 ? Math.floor(Math.random() * 500) + 100 : 0;
    const discount = Math.random() > 0.8 ? Math.floor(Math.random() * 1000) + 200 : 0;
    const subtotal = consultFee + treatCost + addlCharges - discount;
    const tax = Math.round(subtotal * 0.09);
    const total = subtotal + tax;
    const payStatus = Math.random() > 0.25 ? 'Paid' : Math.random() > 0.5 ? 'Partial' : 'Pending';
    const id = `INV-${String(invCounter).padStart(5,'0')}`;
    invCounter++;
    return {
      id,
      appointmentId: appt.id,
      patientId: patient.id,
      patientName: patient.name,
      patientInitials: patient.initials,
      avatarColor: patient.avatarColor,
      treatment: appt.treatment,
      doctor: appt.doctor,
      consultationFee: consultFee,
      treatmentCost: treatCost,
      additionalCharges: addlCharges,
      discount,
      tax,
      total,
      paymentMethod: PAY_METHODS[Math.floor(Math.random() * PAY_METHODS.length)],
      paymentStatus: payStatus,
      invoiceDate: appt.date,
      dueDate: appt.date,
    };
  });
