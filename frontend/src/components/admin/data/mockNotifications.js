function minsAgo(n) {
  const d = new Date();
  d.setMinutes(d.getMinutes() - n);
  return d.toISOString();
}

export const NOTIFICATIONS = [
  { id:'N-001', type:'appointment', icon:'📅', color:'#3b82f6', title:'New Appointment Booked', body:'Arjun Kumar booked a Root Canal for tomorrow at 10:00 AM', time: minsAgo(5), read:false },
  { id:'N-002', type:'payment', icon:'💳', color:'#10b981', title:'Payment Received', body:'₹8,500 received from Priya Sharma (INV-00045) via UPI', time: minsAgo(18), read:false },
  { id:'N-003', type:'checkin', icon:'✅', color:'#06b6d4', title:'Patient Checked In', body:'Meera Iyer has checked in for her 11:00 AM Dental Cleaning', time: minsAgo(32), read:false },
  { id:'N-004', type:'review', icon:'⭐', color:'#eab308', title:'New 5-Star Review', body:'Kavitha Nair left a 5-star review for Dr. Neemz Williams on Google', time: minsAgo(55), read:false },
  { id:'N-005', type:'message', icon:'💬', color:'#8b5cf6', title:'New Website Inquiry', body:'Karthikeyan Murugan sent an urgent message about tooth pain', time: minsAgo(60), read:false },
  { id:'N-006', type:'cancel', icon:'❌', color:'#ef4444', title:'Appointment Cancelled', body:'Ramesh Kumar cancelled his 3:00 PM appointment (Braces Consultation)', time: minsAgo(90), read:true },
  { id:'N-007', type:'payment', icon:'⏳', color:'#f97316', title:'Payment Pending', body:'₹12,000 pending from Suresh Gupta (INV-00032) – overdue 5 days', time: minsAgo(120), read:true },
  { id:'N-008', type:'appointment', icon:'📅', color:'#3b82f6', title:'New Appointment Booked', body:'Divya Menon booked Teeth Whitening for next Friday at 09:30 AM', time: minsAgo(145), read:true },
  { id:'N-009', type:'treatment', icon:'🦷', color:'#10b981', title:'Treatment Completed', body:'Implant procedure for Vijay Reddy completed by Dr. Arjun Mehta', time: minsAgo(180), read:true },
  { id:'N-010', type:'schedule', icon:'🗓️', color:'#6366f1', title:'Doctor Schedule Updated', body:'Dr. Priya Sharma updated working days – now available Saturdays', time: minsAgo(220), read:true },
  { id:'N-011', type:'appointment', icon:'📅', color:'#3b82f6', title:'New Appointment Booked', body:'Bhavana Singh booked Dental Cleaning for today at 2:30 PM', time: minsAgo(240), read:true },
  { id:'N-012', type:'system', icon:'🔒', color:'#64748b', title:'System Alert', body:'Automatic database backup completed successfully at 02:00 AM', time: minsAgo(300), read:true },
  { id:'N-013', type:'review', icon:'⭐', color:'#eab308', title:'New Review', body:'Saritha Krishnan left a 4-star review on the website for Scaling & Polishing', time: minsAgo(360), read:true },
  { id:'N-014', type:'payment', icon:'💳', color:'#10b981', title:'Payment Received', body:'₹25,000 received from Ananya Rajan (INV-00018) via Credit Card', time: minsAgo(480), read:true },
  { id:'N-015', type:'cancel', icon:'🔄', color:'#f97316', title:'Appointment Rescheduled', body:'Mani Pillai rescheduled from Wednesday to Saturday at 10:00 AM', time: minsAgo(540), read:true },
  { id:'N-016', type:'message', icon:'💬', color:'#8b5cf6', title:'New Website Inquiry', body:'Saravanan Kandasamy enquired about smile makeover packages', time: minsAgo(600), read:true },
  { id:'N-017', type:'checkin', icon:'✅', color:'#06b6d4', title:'Patient Checked In', body:'Lakshmi Subramanian checked in for her 9:30 AM appointment', time: minsAgo(660), read:true },
  { id:'N-018', type:'system', icon:'📊', color:'#64748b', title:'Monthly Report Ready', body:'July 2026 revenue and patient analytics report is now available', time: minsAgo(1440), read:true },
];

export const getUnreadCount = () => NOTIFICATIONS.filter(n => !n.read).length;
