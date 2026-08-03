import React from 'react';
import { ArrowLeft, Calendar, ShieldCheck, Heart, Clock, Check, HelpCircle } from 'lucide-react';

const TREATMENT_DETAILS_DATA = {
  'ROUTINE CHECK UP': {
    title: 'Routine Dental Check Up',
    desc: 'Regular dental check-ups are essential for maintaining healthy teeth and gums. We recommend visiting us twice a year.',
    benefits: ['Plaque and tartar removal', 'Early cavity detection', 'Oral cancer screening', 'Professional cleaning'],
    duration: '30 - 45 Minutes',
    faq: [
      { q: 'Is a check-up painful?', a: 'No, a routine check-up is completely non-invasive and painless.' },
      { q: 'How often should I get one?', a: 'Every 6 months is recommended to catch potential issues early.' }
    ]
  },
  'DENTAL FILLINGS': {
    title: 'Composite Dental Fillings',
    desc: 'Restore the structural integrity of teeth decayed by cavities using safe, tooth-colored composite resin fillings.',
    benefits: ['Natural tooth appearance', 'Stops decay progression', 'Mercury-free materials', 'Bonds directly to tooth structure'],
    duration: '45 - 60 Minutes',
    faq: [
      { q: 'How long do composite fillings last?', a: 'Typically 5 to 10 years, depending on wear and oral hygiene.' },
      { q: 'Can I eat immediately after?', a: 'Yes, composite fillings cure instantly under blue light, so you can eat right away.' }
    ]
  },
  'ROOT CANAL TREATMENT': {
    title: 'Advanced Root Canal Therapy',
    desc: 'Save severely decayed or infected teeth from extraction. Our modern techniques make the procedure comfortable and stress-free.',
    benefits: ['Eliminates tooth pain', 'Prevents spread of infection', 'Saves the natural tooth', 'Restores normal biting force'],
    duration: '60 - 90 Minutes',
    faq: [
      { q: 'Is root canal treatment painful?', a: 'No, with modern local anesthesia, it feels no different than getting a standard filling.' },
      { q: 'How many visits does it take?', a: 'Usually completed in 1 to 2 sessions depending on the tooth structure.' }
    ]
  },
  'WISDOM TOOTH REMOVAL': {
    title: 'Wisdom Tooth Extraction',
    desc: 'Safe and gentle removal of impacted or painful wisdom teeth to protect adjacent teeth and align your jaw.',
    benefits: ['Alleviates pressure pain', 'Prevents future crowding', 'Avoids cysts and gum infection', 'Gentle local sedation options'],
    duration: '60 - 90 Minutes',
    faq: [
      { q: 'What is the recovery time?', a: 'Most patients recover fully within 3 to 7 days with proper care.' },
      { q: 'Will I be asleep?', a: 'We offer local anesthesia as well as conscious sedation to keep you completely relaxed.' }
    ]
  },
  'DENTAL BRIDGES': {
    title: 'Custom Dental Bridges',
    desc: 'Bridge the gap created by one or more missing teeth. A custom bridge restores both your bite and a natural smile profile.',
    benefits: ['Restores your natural smile', 'Improves speaking and chewing', 'Prevents remaining teeth from shifting', 'Highly durable ceramic'],
    duration: '2 appointments',
    faq: [
      { q: 'How long does a bridge last?', a: 'Typically 10 to 15 years with good oral hygiene.' },
      { q: 'Is it hard to clean under a bridge?', a: 'We provide specialized floss threaders to make cleaning simple and effective.' }
    ]
  },
  'DENTAL DENTURE': {
    title: 'Full & Partial Dentures',
    desc: 'Removable dental appliances designed to replace missing teeth and surrounding tissues, custom crafted for comfort.',
    benefits: ['Restores speech clarity', 'Supports facial muscles', 'Improves digestive health via chewing', 'Natural gum-shade matching'],
    duration: '3 appointments',
    faq: [
      { q: 'How do I care for my dentures?', a: 'Brush them daily with denture cleaner and soak them in water overnight.' },
      { q: 'Will it affect how I eat?', a: 'It takes a few weeks to adjust, but you will soon chew with ease.' }
    ]
  },
  'DENTAL IMPLANTS': {
    title: 'Premium Dental Implants',
    desc: 'The gold standard for tooth replacement. Implants act as artificial tooth roots, providing a permanent foundation for crowns.',
    benefits: ['Permanent tooth replacement', 'Prevents jawbone shrinkage', 'Feels and functions like real teeth', 'No damage to surrounding teeth'],
    duration: 'Multi-stage process',
    faq: [
      { q: 'Am I a candidate for implants?', a: 'Most adults with healthy bone density and gums are excellent candidates.' },
      { q: 'Is the implant procedure painful?', a: 'Local numbing ensures zero pain during surgery, with mild soreness afterward.' }
    ]
  },
  'CLEAR ALIGNERS': {
    title: 'Invisible Clear Aligners',
    desc: 'Straighten your teeth discreetly using custom-made transparent plastic trays. Removable for eating and brushing.',
    benefits: ['Virtually invisible look', 'No dietary restrictions', 'Easier oral hygiene routine', 'Comfortable smooth plastic layout'],
    duration: '6 - 18 Months',
    faq: [
      { q: 'How many hours a day must I wear them?', a: 'For best results, wear your aligners 20 to 22 hours per day.' },
      { q: 'Do clear aligners hurt?', a: 'You may feel minor pressure when switching to a new tray, which means teeth are moving correctly.' }
    ]
  },
  'DENTAL BRACES': {
    title: 'Orthodontic Braces',
    desc: 'Correct crowded or misaligned teeth and jaw alignments using modern, low-friction brackets and wires.',
    benefits: ['Corrects severe jaw alignment', 'Promotes long-term dental health', 'Improves face shape aesthetics', 'Options for ceramic/metal brackets'],
    duration: '12 - 24 Months',
    faq: [
      { q: 'Are braces only for kids?', a: 'Not at all! We treat patients of all ages, including many adults.' },
      { q: 'What foods should I avoid?', a: 'Avoid hard, sticky, or very chewy foods that could damage brackets.' }
    ]
  },
  'SMILE MAKEOVERS': {
    title: 'Cosmetic Smile Makeover',
    desc: 'A comprehensive combination of cosmetic treatments (whitening, veneers, bonding) designed to build your dream smile.',
    benefits: ['Boosts self-confidence', 'Addresses multiple cosmetic flaws', 'Custom designed to fit face shape', 'Brighter, symmetrical smile'],
    duration: 'Varies by treatment plan',
    faq: [
      { q: 'How is a smile makeover planned?', a: 'We use digital mockups so you can see your virtual results before starting.' },
      { q: 'Is it expensive?', a: 'We construct plans matching varying budgets and offer 0% payment installments.' }
    ]
  },
  'PEDIATRIC DENTISTRY': {
    title: 'Gentle Kids Dentistry',
    desc: 'Specialized dental care for infants, children, and teenagers in a fun, relaxing, and supportive environment.',
    benefits: ['Gentle, friendly staff', 'Promotes positive dental habits', 'Fissure sealants and fluoride shields', 'Monitors jaw development growth'],
    duration: '30 Minutes',
    faq: [
      { q: 'When should a child first visit?', a: 'By their first birthday or when their first tooth emerges.' },
      { q: 'What are sealants?', a: 'Thin protective coatings applied to chewing surfaces to block decay.' }
    ]
  },
  'GUM TREATMENT': {
    title: 'Periodontal Gum Treatment',
    desc: 'Combat gingivitis and gum disease through deep scaling, root planing, and therapeutic antibiotics.',
    benefits: ['Stops bleeding gums', 'Prevents tooth loss', 'Eliminates chronic bad breath', 'Restores tight gum attachment'],
    duration: '45 - 60 Minutes',
    faq: [
      { q: 'What causes gum disease?', a: 'Plaque buildup that hardens into tartar over time due to improper cleaning.' },
      { q: 'Is gum disease reversible?', a: 'Early stage gingivitis is reversible; advanced periodontics focuses on control.' }
    ]
  },
  'DENTAL CROWN': {
    title: 'Porcelain Dental Crowns',
    desc: 'Protect and reinforce weak, broken, or root-canal-treated teeth using a custom-made porcelain cap.',
    benefits: ['Fully protects cracked teeth', 'Matches natural tooth color', 'Stain-resistant materials', 'Can last 10-15 years with care'],
    duration: '2 appointments',
    faq: [
      { q: 'Will a crown look artificial?', a: 'No, we shade-match porcelain to merge seamlessly with surrounding teeth.' },
      { q: 'Does a crowned tooth need special care?', a: 'Treat it like a natural tooth with regular brushing, flossing, and cleanings.' }
    ]
  },
  'LASER-DENTISTRY': {
    title: 'Laser Dental Procedures',
    desc: 'Use state-of-the-art dental lasers for soft tissue shaping, cavity preparation, and highly effective whitening.',
    benefits: ['Minimal to no bleeding', 'Less swelling and faster healing', 'Often eliminates need for anesthesia', 'Sterilizes target treatment area'],
    duration: '30 - 60 Minutes',
    faq: [
      { q: 'Are lasers safe?', a: 'Completely safe. We provide protective eyewear for patients during treatment.' },
      { q: 'What procedures use lasers?', a: 'Gum shaping, treating cold sores, preparing cavities, and teeth whitening.' }
    ]
  }
};

export default function TreatmentDetails({ treatmentName, onBack, onBook }) {
  const details = TREATMENT_DETAILS_DATA[treatmentName] || {
    title: treatmentName,
    desc: 'Professional treatment custom-tailored to suit your clinical requirements.',
    benefits: ['State-of-the-art equipment', 'Comfortable environment', 'Highly trained specialists'],
    duration: 'Varies',
    faq: []
  };

  return (
    <div className="treatment-detail-page">
      {/* Page Hero Banner */}
      <div className="page-hero-banner">
        <div className="page-hero-inner section">
          <button className="back-link-banner" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Treatments</span>
          </button>
          <span className="section-tag" style={{ marginTop: '16px' }}>Clinical Procedure</span>
          <h1 className="page-hero-title">{details.title}</h1>
        </div>
      </div>

      <div className="section" style={{ paddingTop: '60px' }}>
        <div className="grid-2" style={{ alignItems: 'start', gap: '48px' }}>
          
          {/* Left Column: Description & FAQs */}
          <div className="detail-left-col">
            <h2 className="detail-section-subtitle">Procedure Description</h2>
            <p className="detail-long-desc">{details.desc}</p>

            <div className="detail-meta-group">
              <div className="meta-card">
                <Clock size={20} className="meta-card-icon" />
                <div>
                  <strong>Expected Duration</strong>
                  <p>{details.duration}</p>
                </div>
              </div>

              <div className="meta-card">
                <ShieldCheck size={20} className="meta-card-icon" />
                <div>
                  <strong>Hygiene Standards</strong>
                  <p>ISO Class B Sterilized</p>
                </div>
              </div>
            </div>

            {details.faq.length > 0 && (
              <div className="detail-faq-section" style={{ marginTop: '48px' }}>
                <h3 className="detail-section-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HelpCircle size={20} color="var(--color-secondary)" />
                  <span>Common Questions</span>
                </h3>
                <div className="detail-faq-list">
                  {details.faq.map((f, i) => (
                    <div key={i} className="detail-faq-card">
                      <strong>Q: {f.q}</strong>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Key Benefits & Action Panel */}
          <div className="detail-right-col">
            <div className="benefits-action-card">
              <div className="benefits-card-header">
                <Heart size={22} className="benefits-icon" />
                <h3>Key Benefits</h3>
              </div>
              <ul className="benefits-bullet-list">
                {details.benefits.map((benefit, index) => (
                  <li key={index}>
                    <div className="check-bullet">
                      <Check size={14} />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="action-card-divider" />

              <button className="btn btn-primary btn-block btn-ripple" onClick={() => onBook(treatmentName)}>
                <Calendar size={18} />
                <span>BOOK APPOINTMENT NOW</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
